import React from 'react';
import {
  FolderGit2,
  Cpu,
  Layers,
  Mail,
  Activity,
  Award,
  MessageSquareQuote,
  Clock,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DashboardOverview = ({ onNavigate }) => {
  const { projects, skills, services, certificates, testimonials, messages, activityLogs } = useData();

  const unreadMessages = messages.filter((m) => !m.read);

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderGit2, color: 'text-indigo-400', bg: 'bg-indigo-500/10', tab: 'projects' },
    { label: 'Active Skills', value: skills.length, icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/10', tab: 'skills' },
    { label: 'Services', value: services.length, icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-500/10', tab: 'services' },
    { label: 'Messages', value: messages.length, badge: unreadMessages.length, icon: Mail, color: 'text-pink-400', bg: 'bg-pink-500/10', tab: 'messages' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-900/30 via-slate-900 to-purple-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">
            Welcome to Portfolio <span className="gradient-text">Admin CMS</span>
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time control plane synced directly with Firestore. Manage projects, certifications, testimonials, contact form inquiries, and live theme customization.
          </p>
        </div>
        <button
          onClick={() => onNavigate('projects')}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 shrink-0"
        >
          Manage Projects →
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              onClick={() => onNavigate(s.tab)}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {s.badge && s.badge > 0 ? (
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-pink-400 border border-pink-500/40 text-xs font-bold">
                    {s.badge} Unread
                  </span>
                ) : null}
              </div>
              <p className="text-2xl font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors">
                {s.value}
              </p>
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Content Breakdown & Recent Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Content Summary */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Content Summary</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Featured Projects</span>
              <span className="font-bold text-slate-100">{projects.filter((p) => p.featured).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Certificates & Credentials</span>
              <span className="font-bold text-slate-100">{certificates.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400">Endorsements / Testimonials</span>
              <span className="font-bold text-slate-100">{testimonials.length}</span>
            </div>
          </div>
        </div>

        {/* Audit Activity Log */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Security & System Activity Trail</span>
          </h3>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-indigo-400 uppercase text-[10px]">{log.action}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{log.details}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">No security logs recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};