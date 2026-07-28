import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { detectPlatform, getPlatformIcon, SUPPORTED_PLATFORMS, formatExternalUrl } from '../../utils/socialIcons';
import toast from 'react-hot-toast';

export const SocialCMS = () => {
  const { socialLinks, saveSocialLink, deleteSocialLink } = useData();
  const [editingLink, setEditingLink] = useState(null);

  const normalizeUrl = (rawUrl) => {
    let trimmed = rawUrl.trim();
    if (!trimmed) return '';
    return formatExternalUrl(trimmed);
  };

  const handlePlatformSelect = (selectedPlatform) => {
    setEditingLink((prev) => {
      let defaultUrl = prev?.url || '';
      if (!defaultUrl || defaultUrl === 'https://') {
        const lower = selectedPlatform.toLowerCase();
        if (lower.includes('linkedin')) defaultUrl = 'https://linkedin.com/in/';
        else if (lower.includes('github')) defaultUrl = 'https://github.com/';
        else if (lower.includes('twitter') || lower.includes('x (')) defaultUrl = 'https://x.com/';
        else if (lower.includes('instagram')) defaultUrl = 'https://instagram.com/';
        else if (lower.includes('leetcode')) defaultUrl = 'https://leetcode.com/';
        else if (lower.includes('youtube')) defaultUrl = 'https://youtube.com/@';
      }
      return {
        ...prev,
        platform: selectedPlatform,
        url: defaultUrl
      };
    });
  };

  const handleUrlChange = (url) => {
    setEditingLink((prev) => {
      const autoDetected = detectPlatform(url);
      const platform = (prev?.platform && prev.platform !== 'Custom Link') ? prev.platform : autoDetected;
      return {
        ...prev,
        url,
        platform
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingLink) return;

    const formattedUrl = normalizeUrl(editingLink.url || '');
    if (!formattedUrl) {
      toast.error('Please enter a valid social URL.');
      return;
    }

    const platform = editingLink.platform || detectPlatform(formattedUrl);

    toast.loading('Storing social profile...', { id: 'save-soc' });
    try {
      await saveSocialLink({
        ...editingLink,
        platform,
        url: formattedUrl,
        enabled: editingLink.enabled ?? true
      });
      toast.success('Social profile updated & live!', { id: 'save-soc' });
      setEditingLink(null);
    } catch (err) {
      toast.error('Failed to save social profile', { id: 'save-soc' });
    }
  };

  const toggleEnable = async (soc) => {
    await saveSocialLink({ ...soc, enabled: !soc.enabled });
    toast.success(`${soc.platform} ${!soc.enabled ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Social Media Manager</h2>
          <p className="text-xs text-slate-400">Select platforms, configure URLs, and display social icons across your portfolio</p>
        </div>
        <button
          onClick={() => setEditingLink({ platform: 'LinkedIn', url: 'https://linkedin.com/in/', enabled: true, order: socialLinks.length + 1 })}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Profile</span>
        </button>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        {socialLinks.map((soc) => {
          const IconComponent = getPlatformIcon(soc.platform);
          return (
            <div key={soc.id} className="flex items-center justify-between p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-100">{soc.platform}</h4>
                    {soc.customLabel && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{soc.customLabel}</span>
                    )}
                  </div>
                  <a
                    href={formatExternalUrl(soc.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400/80 hover:text-indigo-300 flex items-center gap-1 line-clamp-1"
                  >
                    <span>{soc.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleEnable(soc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    soc.enabled
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {soc.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button onClick={() => setEditingLink(soc)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteSocialLink(soc.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingLink && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-100">{editingLink.id ? 'Edit Social Profile' : 'Add Social Profile'}</h3>
              <button onClick={() => setEditingLink(null)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Social Platform *</label>
                <select
                  value={editingLink.platform || 'LinkedIn'}
                  onChange={(e) => handlePlatformSelect(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-indigo-400 font-bold focus:outline-none focus:border-indigo-500"
                >
                  {SUPPORTED_PLATFORMS.map((plat) => (
                    <option key={plat} value={plat}>{plat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Profile / Direct Target URL *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://linkedin.com/in/myusername"
                  value={editingLink.url || ''}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Custom Button Label (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Follow me on LinkedIn"
                  value={editingLink.customLabel || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, customLabel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              {/* Icon Live Preview Card */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
                  {React.createElement(getPlatformIcon(editingLink.platform || 'LinkedIn'), { className: 'w-5 h-5' })}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-200">{editingLink.platform || 'LinkedIn'}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{editingLink.url || 'No URL configured'}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setEditingLink(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all">Save Social Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};