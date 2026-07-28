import React from 'react';
import {
  Download,
  Send,
  MessageCircle,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  Award,
  Briefcase
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { getPlatformIcon, formatExternalUrl } from '../../utils/socialIcons';

export const HeroSection = () => {
  const { hero, about, socialLinks } = useData();
  const activeSocials = socialLinks.filter((s) => s.enabled);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <section className="relative flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Classical Headline & Content */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">Available for Lead Roles & Projects</span>
          </div>

          {/* Title & Name */}
          <div className="space-y-1.5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {hero.name || 'Muthu'}
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-400 tracking-wide">
              {hero.title || 'Senior Full Stack Developer'}
            </h2>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            {hero.shortBio}
          </p>

          {/* Location & Experience Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-300">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hero.location || 'Railway Road, Sirkali, Tamil Nadu, India')}`}
              target="_blank"
              rel="noreferrer"
              title="Open Google Maps location"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{hero.location}</span>
            </a>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{about.yearsOfExperience}+ Years Industry Exp</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToContact}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/40 shadow-md shadow-indigo-950/40 transition-all cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>Contact & Hire</span>
            </button>

            <a
              href={hero.resumeUrl || '#resume'}
              download={`${hero.name || 'Muthu'}-Resume.pdf`}
              target={hero.resumeUrl?.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Download CV</span>
            </a>

            <a
              href={`https://wa.me/${hero.whatsappNumber?.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-2 text-slate-400 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider mr-1.5 text-[11px]">Connect:</span>
            {activeSocials.length > 0 ? (
              activeSocials.map((soc) => {
                const IconComponent = getPlatformIcon(soc.platform);
                return (
                  <a
                    key={soc.id}
                    href={formatExternalUrl(soc.url)}
                    target="_blank"
                    rel="noreferrer"
                    title={soc.customLabel || soc.platform}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all shadow-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })
            ) : (
              <>
                {hero.githubUrl && (
                  <a href={formatExternalUrl(hero.githubUrl)} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {hero.linkedinUrl && (
                  <a href={formatExternalUrl(hero.linkedinUrl)} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-slate-800 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column: Original Natural Color Portrait shifted lower below Navbar */}
        <div className="lg:col-span-5 flex justify-center pt-2 sm:pt-4 lg:pt-6">
          <div className="w-full max-w-sm space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-900/90 shadow-xl shadow-slate-950/60 aspect-square group">
              <img
                src={hero.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={hero.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Classical Key Stats Card */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/90 border border-slate-800/90 rounded-2xl text-center shadow-md">
              <div>
                <p className="text-2xl font-extrabold text-slate-100">{about.yearsOfExperience}+</p>
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="border-l border-slate-800">
                <p className="text-2xl font-extrabold text-slate-100">{about.completedProjects}+</p>
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Projects Shipped</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};