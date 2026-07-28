import React, { useState } from 'react';
import { Cpu, Search, Sparkles, Filter, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SkillsSection = () => {
  const { skills, sectionTitles } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Tools & Methods'];
  const PREVIEW_LIMIT = 6;

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, PREVIEW_LIMIT);

  return (
    <section id="skills" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.skills || 'Skills and Technologies'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.skillsSubtitle || 'A comprehensive overview of my enterprise tech stack, framework proficiencies, and developer tooling.'}
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Top Row: Title & Percentage */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-indigo-400 font-mono">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Description / Subtext */}
              {skill.description && (
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              )}

              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {filteredSkills.length > PREVIEW_LIMIT && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-95 min-h-[44px]"
            >
              <span>{isExpanded ? 'Show Less Skills' : `Show More Skills (${filteredSkills.length - PREVIEW_LIMIT} hidden)`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No skills match your search query "{searchQuery}".</p>
          </div>
        )}
      </div>
    </section>
  );
};