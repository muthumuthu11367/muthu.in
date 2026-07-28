import React from 'react';
import { X, RotateCcw, Palette, Check, Sparkles, Sliders } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeCustomizerModal = ({ isOpen, onClose }) => {
  const { theme, updateTheme, resetTheme } = useTheme();

  if (!isOpen) return null;

  const presets = [
    { name: 'Luxury Indigo', key: 'luxury', primary: '#6366f1', secondary: '#ec4899', accent: '#10b981', bg: '#0f172a' },
    { name: 'Cyberpunk Neon', key: 'cyberpunk', primary: '#06b6d4', secondary: '#f43f5e', accent: '#a855f7', bg: '#090d16' },
    { name: 'Glass Emerald', key: 'emerald', primary: '#10b981', secondary: '#3b82f6', accent: '#f59e0b', bg: '#062016' },
    { name: 'Obsidian Gold', key: 'gold', primary: '#eab308', secondary: '#f97316', accent: '#e11d48', bg: '#12100e' },
    { name: 'Royal Sapphire', key: 'sapphire', primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4', bg: '#0b1329' },
  ];

  const applyPreset = (preset) => {
    updateTheme({
      preset: preset.key,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.bg,
      cardBgColor: theme.mode === 'dark' ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.85)',
    });
  };

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end bg-slate-950/70">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 h-full overflow-y-auto p-6 pt-16 sm:pt-20 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100">Theme Customizer</h3>
                <p className="text-xs text-slate-400">Personalize styling & color palette</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Mode Toggle */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Appearance Mode
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => updateTheme({ mode: 'dark', backgroundColor: '#0f172a', cardBgColor: 'rgba(30, 41, 59, 0.75)' })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  theme.mode === 'dark' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Dark Mode</span>
              </button>
              <button
                onClick={() => updateTheme({ mode: 'light', backgroundColor: '#f8fafc', cardBgColor: 'rgba(255, 255, 255, 0.85)' })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  theme.mode === 'light' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Light Mode</span>
              </button>
            </div>
          </div>

          {/* Luxury Presets */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Curated Theme Presets
            </label>
            <div className="grid grid-cols-1 gap-2">
              {presets.map((p) => {
                const isActive = theme.preset === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => applyPreset(p)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-800/90 border-indigo-500/80 text-white shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-semibold">{p.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.primary }} />
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.secondary }} />
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.accent }} />
                      {isActive && <Check className="w-4 h-4 text-indigo-400 ml-1" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Family Selection */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Font Family (Inter)
            </label>
            <div className="space-y-2">
              {[
                { label: 'Inter (Clean & Professional)', value: "'Inter', sans-serif" },
                { label: 'Roboto', value: "'Roboto', sans-serif" },
                { label: 'Open Sans', value: "'Open Sans', sans-serif" },
                { label: 'Montserrat', value: "'Montserrat', sans-serif" }
              ].map((font) => (
                <button
                  key={font.label}
                  onClick={() => updateTheme({ fontFamily: font.value })}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    theme.fontFamily === font.value
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                  {theme.fontFamily === font.value && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Color Adjusters */}
          <div className="space-y-4 mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Custom Accent Colors
            </label>
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Primary Color</span>
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Secondary Color</span>
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Accent Highlight</span>
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
            </div>
          </div>

          {/* Glassmorphism Controls */}
          <div className="space-y-4 mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Glassmorphism & Radius
            </label>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Glass Backdrop Blur</span>
                <span className="text-indigo-400 font-mono">{theme.glassBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={theme.glassBlur}
                onChange={(e) => updateTheme({ glassBlur: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Border Radius</span>
                <span className="text-indigo-400 font-mono">{theme.borderRadius}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="28"
                value={theme.borderRadius}
                onChange={(e) => updateTheme({ borderRadius: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Toggles */}
          <div className="space-y-3 mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Interactive Effects
            </label>
            <label className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">Glowing Cursor Follower</span>
              <input
                type="checkbox"
                checked={theme.cursorAnimation}
                onChange={(e) => updateTheme({ cursorAnimation: e.target.checked })}
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300">Floating Background Mesh</span>
              <input
                type="checkbox"
                checked={theme.bgMeshAnimation}
                onChange={(e) => updateTheme({ bgMeshAnimation: e.target.checked })}
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex gap-2">
          <button
            onClick={() => resetTheme()}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-95 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20"
          >
            <span>Apply & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};