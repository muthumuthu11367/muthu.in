import React, { useState, useEffect } from 'react';
import { Sliders, Save, Upload, FileText, Download, Heading, Sparkles, Plus, Trash2, Play, Type } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const SiteSettingsCMS = () => {
  const { hero, about, sectionTitles, updateHero, updateAbout, updateSectionTitles } = useData();
  const [heroForm, setHeroForm] = useState(hero);
  const [aboutForm, setAboutForm] = useState(about);
  const [titlesForm, setTitlesForm] = useState(sectionTitles);
  const [newTitleInput, setNewTitleInput] = useState('');

  useEffect(() => {
    setHeroForm(hero);
  }, [hero]);

  useEffect(() => {
    setAboutForm(about);
  }, [about]);

  useEffect(() => {
    setTitlesForm(sectionTitles);
  }, [sectionTitles]);

  const addTypedTitle = () => {
    if (newTitleInput.trim()) {
      setHeroForm((prev) => ({
        ...prev,
        typedTitles: [...(prev.typedTitles || []), newTitleInput.trim()]
      }));
      setNewTitleInput('');
      toast.success('Added new title variation');
    }
  };

  const removeTypedTitle = (index) => {
    setHeroForm((prev) => ({
      ...prev,
      typedTitles: (prev.typedTitles || []).filter((_, i) => i !== index)
    }));
  };

  const handleLocalProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        toast.error('Image size should be less than 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setHeroForm((prev) => ({ ...prev, profileImage: result }));
          toast.success('Local profile photo uploaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalPdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        toast.error('Please select a valid PDF document (.pdf)');
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        toast.error('PDF file size should be under 12MB');
        return;
      }
      toast.loading('Reading PDF document...', { id: 'pdf-proc' });
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setHeroForm((prev) => ({ ...prev, resumeUrl: result }));
          toast.success(`Uploaded PDF CV: ${file.name}`, { id: 'pdf-proc' });
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read PDF file.', { id: 'pdf-proc' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    toast.loading('Updating Hero config...', { id: 'save-hero' });
    await updateHero(heroForm);
    toast.success('Hero section updated!', { id: 'save-hero' });
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    toast.loading('Updating About section & live stats...', { id: 'save-about' });

    const numYears = Number(aboutForm.yearsOfExperience) || 0;
    const numProjects = Number(aboutForm.completedProjects) || 0;
    const numClients = Number(aboutForm.happyClients) || 0;
    const numAwards = Number(aboutForm.awardsWon) || 0;

    const updatedStats = (aboutForm.stats || []).map((st) => {
      const label = (st.label || '').toLowerCase();
      if (label.includes('year') || label.includes('experience')) {
        return { ...st, value: numYears };
      }
      if (label.includes('project')) {
        return { ...st, value: numProjects };
      }
      if (label.includes('client') || label.includes('customer')) {
        return { ...st, value: numClients };
      }
      if (label.includes('award') || label.includes('badge') || label.includes('honor')) {
        return { ...st, value: numAwards };
      }
      return st;
    });

    const payload = {
      ...aboutForm,
      yearsOfExperience: numYears,
      completedProjects: numProjects,
      happyClients: numClients,
      awardsWon: numAwards,
      stats: updatedStats
    };

    await updateAbout(payload);
    toast.success('About section and dynamic portfolio stats saved!', { id: 'save-about' });
  };

  const handleSaveTitles = async (e) => {
    e.preventDefault();
    toast.loading('Updating section titles across live site...', { id: 'save-titles' });
    await updateSectionTitles(titlesForm);
    toast.success('All section titles updated live!', { id: 'save-titles' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Hero & Bio Editor</h2>
        <p className="text-xs text-slate-400">Modify global developer bio, profile image, and typing headline</p>
      </div>

      {/* Hero Settings */}
      <form onSubmit={handleSaveHero} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">Hero Section Configuration</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Developer Full Name</label>
            <input
              type="text"
              value={heroForm.name}
              onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Primary Title</label>
            <input
              type="text"
              value={heroForm.title}
              onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <label className="block text-slate-400 font-semibold">Profile Photo</label>
          {heroForm.profileImage && (
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-2">
              <img src={heroForm.profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center justify-center gap-2 p-3 bg-indigo-950/40 border border-indigo-800/60 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-300 font-bold transition-all">
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Upload Photo From Local Storage</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalProfileUpload}
                className="hidden"
              />
            </label>
            <input
              type="text"
              placeholder="Or enter Image Web URL"
              value={heroForm.profileImage}
              onChange={(e) => setHeroForm({ ...heroForm, profileImage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
        </div>

        {/* Animated Title & Animation Customizer */}
        <div className="p-5 bg-slate-950 border border-indigo-500/30 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Hero Title Animation Customizer</h4>
                <p className="text-[11px] text-slate-400">Customize 'Senior Full Stack Developer' title variations and animation styles</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Live Realtime Sync
            </span>
          </div>

          {/* Title List */}
          <div className="space-y-2 text-xs">
            <label className="block text-slate-300 font-semibold">Animated Title Variations (Cycles automatically on Hero section)</label>
            <div className="space-y-2">
              {(heroForm.typedTitles || []).map((titleItem, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={titleItem}
                    onChange={(e) => {
                      const updated = [...(heroForm.typedTitles || [])];
                      updated[idx] = e.target.value;
                      setHeroForm({ ...heroForm, typedTitles: updated });
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeTypedTitle(idx)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                    title="Remove Title Variation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add New Title Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add title e.g. Senior Full Stack Developer"
                  value={newTitleInput}
                  onChange={(e) => setNewTitleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTypedTitle();
                    }
                  }}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={addTypedTitle}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Title</span>
                </button>
              </div>
            </div>
          </div>

          {/* Animation Style & Timing Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Animation Transition Style</label>
              <select
                value={heroForm.animationStyle || 'typing'}
                onChange={(e) => setHeroForm({ ...heroForm, animationStyle: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="typing">⌨️ Typewriter Effect (Char by Char)</option>
                <option value="fade">✨ Smooth Fade Crossfade</option>
                <option value="slide">🚀 Upward Slide Transition</option>
                <option value="glow">🎨 Vivid Gradient Text</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Typing Speed (ms per char)</label>
              <input
                type="number"
                min={20}
                max={300}
                value={heroForm.typingSpeed || 80}
                onChange={(e) => setHeroForm({ ...heroForm, typingSpeed: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pause Delay (ms before next title)</label>
              <input
                type="number"
                min={500}
                max={10000}
                value={heroForm.pauseDuration || 2000}
                onChange={(e) => setHeroForm({ ...heroForm, pauseDuration: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Global Contact Info & Primary Links */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Contact Details & Primary URLs</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. alex@developer.com"
                value={heroForm.email || ''}
                onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Updates mailto: links across portfolio</p>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. +1 (555) 234-5678"
                value={heroForm.whatsappNumber || ''}
                onChange={(e) => setHeroForm({ ...heroForm, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Updates wa.me direct chat links</p>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location & Remote *</label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco, CA (Remote)"
                value={heroForm.location || ''}
                onChange={(e) => setHeroForm({ ...heroForm, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Updates location badges and maps</p>
            </div>
          </div>

          {/* Resume / CV PDF Upload Section */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between items-center">
              <label className="block text-slate-300 font-semibold text-xs">Curriculum Vitae (CV) / Resume (PDF Format)</label>
              {heroForm.resumeUrl && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                  CV Configured
                </span>
              )}
            </div>

            {heroForm.resumeUrl ? (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-100">
                      {heroForm.resumeUrl.startsWith('data:application/pdf')
                        ? 'Local PDF CV Document Attached'
                        : 'Web PDF URL Configured'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate max-w-xs">
                      {heroForm.resumeUrl.length > 50
                        ? `${heroForm.resumeUrl.substring(0, 48)}...`
                        : heroForm.resumeUrl}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={heroForm.resumeUrl}
                    download={`${heroForm.name || 'Muthu'}-Resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold flex items-center gap-1.5 border border-indigo-500/30 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Test PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setHeroForm((prev) => ({ ...prev, resumeUrl: '' }))}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center justify-center gap-2 p-3 bg-indigo-950/40 border border-indigo-800/60 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-300 font-bold transition-all">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Upload CV (PDF File)</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleLocalPdfUpload}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                placeholder="Or paste direct PDF Web URL (https://...)"
                value={heroForm.resumeUrl || ''}
                onChange={(e) => setHeroForm({ ...heroForm, resumeUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs pt-1">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">GitHub Profile URL</label>
              <input
                type="text"
                placeholder="https://github.com/username"
                value={heroForm.githubUrl || ''}
                onChange={(e) => setHeroForm({ ...heroForm, githubUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all">
            <Save className="w-4 h-4" />
            <span>Save Profile & Contact Details</span>
          </button>
        </div>
      </form>

      {/* About Settings */}
      <form onSubmit={handleSaveAbout} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">About & Bio Section</h3>

        <div className="text-xs">
          <label className="block text-slate-400 mb-1">Detailed Biography</label>
          <textarea
            rows={4}
            value={aboutForm.detailedBio}
            onChange={(e) => setAboutForm({ ...aboutForm, detailedBio: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Years Experience</label>
            <input
              type="number"
              value={aboutForm.yearsOfExperience}
              onChange={(e) => setAboutForm({ ...aboutForm, yearsOfExperience: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Projects Shipped</label>
            <input
              type="number"
              value={aboutForm.completedProjects}
              onChange={(e) => setAboutForm({ ...aboutForm, completedProjects: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Happy Clients</label>
            <input
              type="number"
              value={aboutForm.happyClients}
              onChange={(e) => setAboutForm({ ...aboutForm, happyClients: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Awards Won</label>
            <input
              type="number"
              value={aboutForm.awardsWon}
              onChange={(e) => setAboutForm({ ...aboutForm, awardsWon: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 font-bold text-xs text-white flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Save About Section</span>
          </button>
        </div>
      </form>

      {/* Dynamic Section Titles CMS */}
      <form onSubmit={handleSaveTitles} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Heading className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Live Section Titles, Subtitles & Bottom Text</h3>
              <p className="text-xs text-slate-400">Dynamically edit and update all main section headings, subtitles, and footer bottom text in real time</p>
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All Titles & Text</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* About Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">1. About Section Title</label>
            <input
              type="text"
              required
              value={titlesForm.about || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, about: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Architecting Detailed Excellence"
            />
            <label className="block text-slate-400 font-semibold pt-1">About Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.aboutSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, aboutSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing your background..."
            />
          </div>

          {/* Skills Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">2. Skills and Technologies Title</label>
            <input
              type="text"
              required
              value={titlesForm.skills || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, skills: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Skills and Technologies"
            />
            <label className="block text-slate-400 font-semibold pt-1">Skills Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.skillsSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, skillsSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing your stack..."
            />
          </div>

          {/* Services Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">3. Specialised Engineering Services Title</label>
            <input
              type="text"
              required
              value={titlesForm.services || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, services: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Specialised Engineering Services"
            />
            <label className="block text-slate-400 font-semibold pt-1">Services Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.servicesSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, servicesSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing offerings..."
            />
          </div>

          {/* Projects Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">4. Future Portfolio Projects Title</label>
            <input
              type="text"
              required
              value={titlesForm.projects || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, projects: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Future Portfolio Projects"
            />
            <label className="block text-slate-400 font-semibold pt-1">Projects Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.projectsSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, projectsSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing works..."
            />
          </div>

          {/* Certifications Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">5. Certifications Section Title</label>
            <input
              type="text"
              required
              value={titlesForm.certificates || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, certificates: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Certifications"
            />
            <label className="block text-slate-400 font-semibold pt-1">Certifications Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.certificatesSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, certificatesSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing credentials..."
            />
          </div>

          {/* Gallery Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">6. Media and Archive Gallery Title</label>
            <input
              type="text"
              required
              value={titlesForm.gallery || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, gallery: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Media and Archive Gallery"
            />
            <label className="block text-slate-400 font-semibold pt-1">Gallery Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.gallerySubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, gallerySubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing gallery items..."
            />
          </div>

          {/* Resume Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">7. Professional Resume and CV Title</label>
            <input
              type="text"
              required
              value={titlesForm.resume || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, resume: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Professional Resume and CV"
            />
            <label className="block text-slate-400 font-semibold pt-1">Resume Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.resumeSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, resumeSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing resume download..."
            />
          </div>

          {/* Testimonials Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <label className="block text-indigo-400 font-bold">8. Client Testimonials Title</label>
            <input
              type="text"
              required
              value={titlesForm.testimonials || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, testimonials: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Client Testimonials"
            />
            <label className="block text-slate-400 font-semibold pt-1">Testimonials Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.testimonialsSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, testimonialsSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle describing client reviews..."
            />
          </div>

          {/* Contact Section */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 md:col-span-2">
            <label className="block text-indigo-400 font-bold">9. Contact Section Title ("Let's Build Something Extraordinary")</label>
            <input
              type="text"
              required
              value={titlesForm.contact || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, contact: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. Let's Build Something Extraordinary"
            />
            <label className="block text-slate-400 font-semibold pt-1">Contact Subtitle / Description</label>
            <textarea
              rows={2}
              value={titlesForm.contactSubtitle || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, contactSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200 resize-none"
              placeholder="Subtitle for contact section..."
            />
          </div>

          {/* Footer Bottom Text */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 md:col-span-2">
            <label className="block text-indigo-400 font-bold">10. Portfolio Bottom Text (Footer Copyright & Branding)</label>
            <input
              type="text"
              value={titlesForm.footerBottomText || ''}
              onChange={(e) => setTitlesForm({ ...titlesForm, footerBottomText: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-slate-200"
              placeholder="e.g. © 2026 Muthu. All rights reserved. Enterprise Portfolio CMS."
            />
            <p className="text-[11px] text-slate-500">This bottom text appears at the very end of the live portfolio website footer.</p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All Titles, Subtitles & Bottom Text</span>
          </button>
        </div>
      </form>
    </div>
  );
};