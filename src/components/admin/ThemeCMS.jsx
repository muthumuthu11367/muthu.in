import React from 'react';
import { Palette, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export const ThemeCMS = () => {
  const { themeConfig, updateTheme, applyPreset, presets } = useTheme();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Luxury Theme Customizer</h2>
        <p className="text-xs text-slate-400">Modify global color palettes, glassmorphism opacity, typography font scales, and theme presets</p>
      </div>

      {/* Theme Presets */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Curated Color Presets</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                applyPreset(p);
                toast.success(`Theme preset applied: ${p.name}`);
              }}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left space-y-3 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-200 group-hover:text-indigo-400 transition-colors">{p.name}</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.primaryColor }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.secondaryColor }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accentColor }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Typography Font Selection */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-slate-100 flex items-center justify-between">
          <span>Typography & Font Family</span>
          <span className="text-xs font-normal text-indigo-400">Inter (Default)</span>
        </h3>
        <p className="text-xs text-slate-400">Select the typography font applied across all portfolio headings and body text</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { name: 'Inter (Default - Clean & Professional)', value: "'Inter', sans-serif" },
            { name: 'Roboto', value: "'Roboto', sans-serif" },
            { name: 'Open Sans', value: "'Open Sans', sans-serif" },
            { name: 'Montserrat', value: "'Montserrat', sans-serif" }
          ].map((font) => (
            <button
              key={font.name}
              onClick={() => {
                updateTheme({ fontFamily: font.value });
                toast.success(`Font updated to ${font.name}`);
              }}
              className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                themeConfig.fontFamily === font.value
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span style={{ fontFamily: font.value }}>{font.name}</span>
              {themeConfig.fontFamily === font.value && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Color Customizer Controls */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="font-bold text-base text-slate-100">Custom Accent Colors</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-2">Primary Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeConfig.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border border-slate-800 cursor-pointer"
              />
              <span className="font-mono text-slate-300">{themeConfig.primaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2">Secondary Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeConfig.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border border-slate-800 cursor-pointer"
              />
              <span className="font-mono text-slate-300">{themeConfig.secondaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2">Glow Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeConfig.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border border-slate-800 cursor-pointer"
              />
              <span className="font-mono text-slate-300">{themeConfig.accentColor}</span>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-200 block">Dark / Light Mode Toggle</span>
            <span className="text-slate-400">Switch current canvas contrast mode</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateTheme({ mode: 'dark' })}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                themeConfig.mode === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </button>
            <button
              onClick={() => updateTheme({ mode: 'light' })}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                themeConfig.mode === 'light' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};