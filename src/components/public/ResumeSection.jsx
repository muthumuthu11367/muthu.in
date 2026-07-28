import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, CheckCircle2, ExternalLink, Sparkles, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ResumeSection = () => {
  const { hero, about, sectionTitles } = useData();
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (showPreviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreviewModal]);

  return (
    <section id="resume" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.resume || 'Professional Resume and CV'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.resumeSubtitle || 'Download my verified curriculum vitae or inspect key architectural career milestones.'}
          </p>
        </div>

        {/* Resume Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800/80 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden">

          {/* Left Column */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">{hero.name} – Senior Architect Resume</h3>
                <p className="text-xs text-indigo-400 font-semibold">{hero.title}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Comprehensive overview of {about.yearsOfExperience}+ years experience in Full Stack Software Engineering, Cloud Systems Architecture, Firebase Authentication, React 19 performance tuning, and leading technical teams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Employment History</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Academic & Cloud Certifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Selected Enterprise Case Studies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Contact & Recommendation References</span>
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="md:col-span-4 flex flex-col gap-3 justify-center">
            <a
              href={hero.resumeUrl || '#'}
              download={`${hero.name || 'Muthu'}-Resume.pdf`}
              target={hero.resumeUrl?.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/30 hover:opacity-95 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </a>

            <button
              onClick={() => setShowPreviewModal(true)}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Live CV Overview</span>
            </button>
          </div>
        </div>
      </div>

      {/* CV Preview Modal Overlay */}
      {showPreviewModal && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/90"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 p-6 sm:p-8 rounded-3xl max-w-3xl w-full space-y-6 shadow-2xl relative my-auto z-[100000] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{hero.name} – Executive Summary</h3>
                <p className="text-xs text-indigo-400 font-semibold">{hero.title}</p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">Career Highlights</h4>
                <p>{about.summary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-2">Primary Roles</h4>
                <div className="space-y-2">
                  {about.experiences.map((exp) => (
                    <div key={exp.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between font-semibold text-slate-100">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-indigo-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <a
                href={hero.resumeUrl || '#'}
                download={`${hero.name || 'Muthu'}-Resume.pdf`}
                target={hero.resumeUrl?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};