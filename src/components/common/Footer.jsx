import React from 'react';
import { ArrowUp, Code, Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { detectPlatform, getPlatformIcon, formatExternalUrl } from '../../utils/socialIcons';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { hero, socialLinks, sectionTitles } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const enabledSocials = socialLinks.filter((s) => s.enabled);

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-10 pb-8 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">
                {hero.name || 'Alex Vance'}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {hero.shortBio || 'Enterprise Full Stack Architect crafting scalable web platforms, AI solutions, and luxury user interfaces.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for Freelance & Lead Roles</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {['#about', '#skills', '#services', '#projects', '#certificates', '#gallery', '#testimonials', '#contact'].map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-indigo-400 transition-colors capitalize flex items-center gap-1.5"
                  >
                    <span className="text-indigo-500 text-xs">›</span>
                    <span>{href.replace('#', '')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${hero.email}`} className="hover:text-indigo-400 transition-colors">
                  {hero.email || 'alex.vance.dev@example.com'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${hero.whatsappNumber?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  {hero.whatsappNumber || '+1 (234) 567-890'} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hero.location || 'Railway Road, Sirkali, Tamil Nadu, India')}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Open exact Google Maps location for Railway Road, Sirkali, Tamil Nadu, India"
                  className="hover:text-pink-400 transition-colors flex items-center gap-2 group/loc text-slate-300"
                >
                  <MapPin className="w-4 h-4 text-pink-400 shrink-0 group-hover/loc:scale-110 transition-transform" />
                  <span className="group-hover/loc:underline">{hero.location || 'Railway Road, Sirkali, Tamil Nadu, India'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Channels & CMS Portal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Connect & Admin
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {enabledSocials.map((s) => {
                const IconComponent = getPlatformIcon(s.platform);
                return (
                  <a
                    key={s.id}
                    href={formatExternalUrl(s.url)}
                    target="_blank"
                    rel="noreferrer"
                    title={s.platform}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800 transition-all"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-indigo-400 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Admin CMS Login</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="break-words max-w-full">
            {sectionTitles.footerBottomText || `© ${new Date().getFullYear()} ${hero.name || 'Alex Vance'}. All rights reserved. Enterprise Portfolio CMS.`}
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 mx-0.5" /> React 19 & Firebase
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:bg-slate-800 transition-all"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};