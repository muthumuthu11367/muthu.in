import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultThemeSettings } from '../data/defaultData';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const themePresets = [
  {
    name: 'Moonlight Lunar',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#0284c7',
    backgroundColor: '#f8fafc',
    cardBgColor: 'rgba(255, 255, 255, 0.88)',
    mode: 'light'
  },
  {
    name: 'Indigo Dusk',
    primaryColor: '#6366f1',
    secondaryColor: '#a855f7',
    accentColor: '#10b981',
    backgroundColor: '#0f172a',
    cardBgColor: 'rgba(30, 41, 59, 0.7)',
    mode: 'dark'
  },
  {
    name: 'Emerald Aurora',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    accentColor: '#f59e0b',
    backgroundColor: '#064e3b',
    cardBgColor: 'rgba(6, 78, 59, 0.7)',
    mode: 'dark'
  },
  {
    name: 'Sunset Rose',
    primaryColor: '#ec4899',
    secondaryColor: '#f97316',
    accentColor: '#8b5cf6',
    backgroundColor: '#18181b',
    cardBgColor: 'rgba(39, 39, 42, 0.7)',
    mode: 'dark'
  },
  {
    name: 'Cyber Neon',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    accentColor: '#f43f5e',
    backgroundColor: '#090d16',
    cardBgColor: 'rgba(15, 23, 42, 0.8)',
    mode: 'dark'
  },
  {
    name: 'Violet Dream',
    primaryColor: '#8b5cf6',
    secondaryColor: '#d946ef',
    accentColor: '#06b6d4',
    backgroundColor: '#0f172a',
    cardBgColor: 'rgba(30, 41, 59, 0.7)',
    mode: 'dark'
  }
];

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) {
      try { return { ...defaultThemeSettings, ...JSON.parse(saved) }; } catch (e) {}
    }
    return defaultThemeSettings;
  });

  // Apply CSS custom properties and theme classes on changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme.mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--bg-color', theme.backgroundColor);
    root.style.setProperty('--card-bg-color', theme.cardBgColor);
    root.style.setProperty('--glass-blur', `${theme.glassBlur}px`);
    root.style.setProperty('--border-radius', `${theme.borderRadius}px`);
    root.style.setProperty('--font-family', theme.fontFamily);

    localStorage.setItem('portfolio_theme', JSON.stringify(theme));
  }, [theme]);

  // Sync theme with Firestore real-time listener
  useEffect(() => {
    const themeRef = doc(db, 'site_config', 'theme');
    const unsubscribe = onSnapshot(themeRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTheme((prev) => ({ ...prev, ...data }));
      }
    }, (error) => {
      console.warn('Firestore theme sync warning:', error);
    });

    return () => unsubscribe();
  }, []);

  const updateTheme = async (newSettings) => {
    const updated = { ...theme, ...newSettings };
    setTheme(updated);
    try {
      const themeRef = doc(db, 'site_config', 'theme');
      await setDoc(themeRef, updated, { merge: true });
    } catch (err) {
      console.warn('Could not persist theme to Firestore:', err);
    }
  };

  const resetTheme = async () => {
    setTheme(defaultThemeSettings);
    try {
      const themeRef = doc(db, 'site_config', 'theme');
      await setDoc(themeRef, defaultThemeSettings);
    } catch (err) {
      console.warn('Reset theme error:', err);
    }
  };

  const toggleDarkMode = () => {
    const newMode = theme.mode === 'dark' ? 'light' : 'dark';
    const newBg = newMode === 'dark' ? '#0f172a' : '#f8fafc';
    const newCardBg = newMode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)';
    updateTheme({ mode: newMode, backgroundColor: newBg, cardBgColor: newCardBg });
  };

  const applyPreset = async (preset) => {
    await updateTheme({
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      backgroundColor: preset.backgroundColor,
      cardBgColor: preset.cardBgColor,
      mode: preset.mode,
      preset: preset.name
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig: theme,
        presets: themePresets,
        applyPreset,
        updateTheme,
        resetTheme,
        toggleDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};