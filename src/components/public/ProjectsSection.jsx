import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Search,
  Filter,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ProjectsSection = () => {
  const { projects, sectionTitles } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI / Cloud', 'UI/UX'];
  const PREVIEW_LIMIT = 3;

  const publishedProjects = projects.filter((p) => p.published !== false);

  const filteredProjects = publishedProjects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, PREVIEW_LIMIT);

  const openProjectModal = (proj) => {
    setActiveModalProject(proj);
    setModalImageIndex(0);
  };

  return (
    <section id="projects" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Selected Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.projects || 'Future Portfolio Projects'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.projectsSubtitle || 'A showcase of production web applications, multi-tenant SaaS platforms, and enterprise cloud microservices.'}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
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

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-2 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    {proj.category}
                  </span>

                  {proj.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3
                    onClick={() => openProjectModal(proj)}
                    className="font-bold text-lg text-slate-100 hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {proj.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies?.length > 4 && (
                      <span className="px-2 py-1 text-[10px] text-slate-500">
                        +{proj.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-slate-800/60 mt-4">
                <button
                  onClick={() => openProjectModal(proj)}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View Case Study →
                </button>

                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
                      title="Live Preview Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {filteredProjects.length > PREVIEW_LIMIT && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-95 min-h-[44px]"
            >
              <span>{isExpanded ? 'Show Less Projects' : `Show More Portfolio Projects (${filteredProjects.length - PREVIEW_LIMIT} hidden)`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No projects found matching your filter criteria.</p>
          </div>
        )}
      </div>

      {/* Full Project Preview Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/90"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col my-auto z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                  {activeModalProject.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">{activeModalProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              {/* Image Carousel */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-black border border-slate-800">
                <img
                  src={activeModalProject.images?.[modalImageIndex] || activeModalProject.thumbnail}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                {activeModalProject.images && activeModalProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setModalImageIndex((prev) => (prev - 1 + activeModalProject.images.length) % activeModalProject.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white border border-slate-700"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setModalImageIndex((prev) => (prev + 1) % activeModalProject.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white border border-slate-700"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tech Stack Used</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies?.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Overview</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModalProject.fullDescription || activeModalProject.shortDescription}
                </p>
              </div>

              {/* Challenges & Solutions */}
              {(activeModalProject.challenges || activeModalProject.solutions) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {activeModalProject.challenges && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Engineering Challenge</span>
                      </h5>
                      <p className="text-xs text-slate-300">{activeModalProject.challenges}</p>
                    </div>
                  )}

                  {activeModalProject.solutions && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Architecture Solution</span>
                      </h5>
                      <p className="text-xs text-slate-300">{activeModalProject.solutions}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    <Github className="w-4 h-4" />
                    <span>Repository</span>
                  </a>
                )}
                {activeModalProject.demoUrl && (
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Production Site</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};