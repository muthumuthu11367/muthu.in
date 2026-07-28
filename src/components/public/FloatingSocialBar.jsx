import React from 'react';
import { useData } from '../../context/DataContext';
import { getPlatformIcon, formatExternalUrl } from '../../utils/socialIcons';

export const FloatingSocialBar = () => {
  const { socialLinks } = useData();

  const enabledSocials = socialLinks
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  if (enabledSocials.length === 0) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2">
      <div className="glass-panel p-2 rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col gap-2">
        {enabledSocials.map((soc) => {
          const IconComponent = getPlatformIcon(soc.platform);
          return (
            <a
              key={soc.id}
              href={formatExternalUrl(soc.url)}
              target="_blank"
              rel="noreferrer"
              title={soc.customLabel || soc.platform}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 hover:border-indigo-500/50 transition-all hover:scale-110"
            >
              <IconComponent className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};