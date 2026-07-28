import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Code, Sparkles, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(true);
  const [isPassReadOnly, setIsPassReadOnly] = useState(true);

  const { loginWithEmail, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    } else {
      // Clear all input state on mount to prevent any cached text or autofill
      setEmail('');
      setPassword('');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success('Successfully authenticated as Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full space-y-6 shadow-2xl relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mx-auto shadow-lg shadow-indigo-500/30">
            <Code className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold gradient-title-indigo tracking-tight">
            Admin CMS Authentication
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Sign in to access the Portfolio CMS control panel.
          </p>
        </div>

        {/* Security Auto-Fill Blocked Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 dark:bg-slate-900/90 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">Fresh Session & Real-Time Verification</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">No cached tokens used. Credentials re-verified live against database on every login.</p>
          </div>
        </div>

        {/* Form configured with anti-autofill directives */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-xs"
          autoComplete="off"
          noValidate
        >
          {/* Decoy hidden inputs to divert browser auto-fill agents */}
          <input
            type="text"
            name="prevent_autofill_username"
            id="prevent_autofill_username"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="password"
            name="prevent_autofill_password"
            id="prevent_autofill_password"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Admin Email <span className="text-xs font-normal text-slate-500">(Auto-fill disabled)</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="cms_email_secure_input"
                name="cms_email_secure_no_autofill"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                aria-autocomplete="none"
                readOnly={isEmailReadOnly}
                onFocus={() => setIsEmailReadOnly(false)}
                onClick={() => setIsEmailReadOnly(false)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-medium transition-all"
                placeholder="Enter admin email"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Password <span className="text-xs font-normal text-slate-500">(Auto-fill disabled)</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="cms_password_secure_input"
                name="cms_password_secure_no_autofill"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                data-lpignore="true"
                data-form-type="other"
                aria-autocomplete="none"
                readOnly={isPassReadOnly}
                onFocus={() => setIsPassReadOnly(false)}
                onClick={() => setIsPassReadOnly(false)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-medium transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In To Admin CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
          <a href="/" className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
            ← Return to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};