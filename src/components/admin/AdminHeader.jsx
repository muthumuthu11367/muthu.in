import React from 'react';
import { ShieldCheck, UserCheck, Database, Home, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const AdminHeader = ({ onToggleMobileSidebar, activeTabTitle }) => {
  const { user } = useAuth();
  const { seedInitialDataToFirestore } = useData();

  const handleSeedData = async () => {
    if (window.confirm('Seed default portfolio content into Firestore?')) {
      toast.loading('Seeding data to Firestore...', { id: 'seed' });
      await seedInitialDataToFirestore();
      toast.success('Firestore populated with default content!', { id: 'seed' });
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-3 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2">
        {/* Mobile Drawer Menu Toggle Button */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs border border-indigo-500/50 min-h-[44px] flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-600/30 active:scale-95 shrink-0"
          aria-label="Open Admin Navigation Menu"
          title="Open Admin Navigation Menu"
        >
          <Menu className="w-5 h-5 text-white shrink-0" />
          <span className="text-xs font-extrabold text-white">Admin Menu</span>
        </button>

        {activeTabTitle && (
          <span className="md:hidden text-[11px] font-bold text-slate-300 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 truncate max-w-[110px]">
            {activeTabTitle}
          </span>
        )}

        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-xs font-bold transition-all min-h-[44px] border border-slate-700/80 shrink-0 shadow-sm"
          title="Return to Public Homepage"
        >
          <Home className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-xs font-extrabold text-white">Home</span>
        </Link>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Firebase Admin</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleSeedData}
          className="px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[44px] cursor-pointer"
          title="Populate fresh Firestore with default content"
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Seed Firestore Data</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono min-h-[44px]">
          <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span className="truncate max-w-[120px] sm:max-w-none">{user?.email || 'admin@example.com'}</span>
        </div>
      </div>
    </header>
  );
};