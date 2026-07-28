import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  Send,
  Code,
  Home
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Navbar = ({ onOpenThemeCustomizer }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleDarkMode } = useTheme();
  const { isAdmin } = useAuth();
  const { hero } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        mobileMenuOpen
          ? 'py-3 bg-slate-950 border-b border-slate-800 shadow-2xl'
          : scrolled
          ? 'py-3 bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 border-b border-slate-800/60 dark:border-slate-800/60 light:border-slate-200/60 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg gradient-title-indigo tracking-tight leading-none">
              {hero.name || 'Muthu'}
            </span>
            <span className="text-xs text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-medium tracking-wider uppercase mt-1">
              Architect Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 glass-pill px-4 py-1.5 rounded-full border border-slate-700/50 dark:border-slate-800 light:border-slate-200">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/50"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Actions & Utilities */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Light / Dark Mode"
            className="p-2.5 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-amber-400 hover:border-amber-500/50 transition-all hover:scale-105"
          >
            {theme.mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Admin CMS Portal Link */}
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isAdmin
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isAdmin ? 'text-emerald-400' : 'text-indigo-400'}`} />
            <span>Admin Panel</span>
          </Link>

          {/* Hire / Contact CTA */}
          <button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 hover:shadow-indigo-500/35 transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200"
          >
            {theme.mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-slate-950 border-b border-slate-800 text-slate-100 shadow-2xl relative z-[9990]">
          <div className="flex flex-col gap-2">
            {/* Quick Action Top Bar in Mobile Menu */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800/80">
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-extrabold text-slate-100 hover:text-white hover:bg-slate-800 transition-all min-h-[42px]"
              >
                <Home className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Home Page</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600 border border-indigo-500 text-xs font-extrabold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all min-h-[42px]"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Admin Panel</span>
              </Link>
            </div>

            {navLinks.map((link) => (
              <button
                type="button"
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-100 hover:bg-slate-800/90 hover:text-indigo-400 min-h-[42px] flex items-center transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};