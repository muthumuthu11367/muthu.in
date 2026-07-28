import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Cpu,
  Layers,
  Award,
  Image,
  MessageSquareQuote,
  Share2,
  Mail,
  Sliders,
  Palette,
  ShieldAlert,
  LogOut,
  Home,
  Code,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminSidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose
}) => {
  const { logout } = useAuth();
  const { messages } = useData();

  const unreadCount = messages.filter((m) => !m.read).length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'site_settings', label: 'Hero & Title Customizer', icon: Sliders },
    { id: 'experience', label: 'Experience Manager', icon: Briefcase },
    { id: 'education', label: 'Education Manager', icon: GraduationCap },
    { id: 'projects', label: 'Projects Manager', icon: FolderGit2 },
    { id: 'skills', label: 'Skills Manager', icon: Cpu },
    { id: 'services', label: 'Services Manager', icon: Layers },
    { id: 'certificates', label: 'Certificates CMS', icon: Award },
    { id: 'gallery', label: 'Gallery CMS', icon: Image },
    { id: 'testimonials', label: 'Testimonials CMS', icon: MessageSquareQuote },
    { id: 'socials', label: 'Social Media Manager', icon: Share2 },
    { id: 'messages', label: 'Contact Messages', icon: Mail, badge: unreadCount },
    { id: 'theme', label: 'Theme Customizer', icon: Palette },
    { id: 'account', label: 'Account & Security', icon: ShieldAlert },
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    onClose();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[9990] md:hidden transition-opacity"
        />
      )}

      {/* Slide-In Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[9999] w-80 sm:w-72 md:w-64 bg-slate-950 border-r border-slate-800/90 flex flex-col justify-between h-screen text-slate-100 p-3.5 sm:p-4 shrink-0 overflow-y-auto transition-transform duration-200 ease-in-out md:sticky md:top-0 md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-3">
          {/* Brand & Mobile Close Header */}
          <div className="flex items-center justify-between px-1.5 py-1 border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30 shrink-0">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white tracking-wide leading-tight">CMS Admin Panel</h2>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">Firebase Connected</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer shadow-sm active:scale-95 transition-all"
              aria-label="Close admin menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Direct Navigation Quick Actions */}
          <div className="p-2 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block">
              Quick Navigation
            </span>

            {/* Direct Home Page Link */}
            <Link
              to="/"
              onClick={onClose}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-200 hover:text-white flex items-center justify-between text-xs font-bold transition-all min-h-[42px] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Main Homepage (Public Site)</span>
              </div>
              <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded-full text-indigo-200 font-mono">Live</span>
            </Link>
          </div>

          {/* Touch-Friendly Mobile Navigation Menu List */}
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block pt-1">
              Admin Features & Tools
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[42px] cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/60'
                        : 'text-slate-100 hover:text-white hover:bg-slate-800/90 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-extrabold shrink-0 shadow-sm ml-1">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Admin Actions */}
        <div className="pt-3 border-t border-slate-800 space-y-2 mt-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 hover:text-red-100 text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[42px] cursor-pointer shadow-sm active:scale-95"
          >
            <LogOut className="w-4 h-4 text-red-400 shrink-0" />
            <span>Logout Admin Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};