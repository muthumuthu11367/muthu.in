import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Users, Code, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AboutSection = () => {
  const { about, sectionTitles } = useData();
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="about" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.about || 'Architecting Detailed Excellence'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.aboutSubtitle || about.summary}
          </p>
        </div>

        {/* Animated Statistics Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {about.stats.map((st) => (
            <div
              key={st.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-100 mb-1 group-hover:scale-110 transition-transform">
                <span className="gradient-text">
                  {st.prefix || ''}{st.value}{st.suffix || ''}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                {st.label}
              </p>
            </div>
          ))}
        </div>

        {/* Biography & Core Principles */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold gradient-title-indigo">
              Professional Biography
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {about.detailedBio}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean, Testable & Scalable Codebases</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Microservice & Serverless Architectures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enterprise Security & Firestore Rules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Performance Optimization (Lighthouse 95+)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-4 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Experience:</span>
              <span className="text-slate-200 font-semibold">{about.yearsOfExperience}+ Years</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Completed Projects:</span>
              <span className="text-slate-200 font-semibold">{about.completedProjects}+</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Happy Clients:</span>
              <span className="text-slate-200 font-semibold">{about.happyClients}+</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Awards & Honors:</span>
              <span className="text-slate-200 font-semibold">{about.awardsWon}</span>
            </div>
          </div>
        </div>

        {/* Timeline Switcher: Experience & Education */}
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Work Experience</span>
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Education History</span>
              </button>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {activeTab === 'experience' &&
              about.experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:scale-125 group-hover:bg-indigo-500 transition-all" />

                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-base text-slate-100">{exp.role}</h4>
                        <p className="text-xs text-indigo-400 font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {activeTab === 'education' &&
              about.education.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-purple-500 group-hover:scale-125 group-hover:bg-purple-500 transition-all" />

                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-base text-slate-100">{edu.degree}</h4>
                        <p className="text-xs text-purple-400 font-semibold">{edu.institution}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{edu.year}</span>
                      </div>
                    </div>

                    {edu.grade && (
                      <p className="text-xs text-slate-300 font-medium">
                        Grade/GPA: <span className="text-emerald-400 font-bold">{edu.grade}</span>
                      </p>
                    )}

                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-400 pt-1">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function UserIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}