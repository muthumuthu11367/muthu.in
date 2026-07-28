import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const AccountSettingsCMS = () => {
  const { user, updateUserPassword, updateUserEmail } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState(user?.email || '');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Please enter current and new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    toast.loading('Updating password & invalidating sessions...', { id: 'pwd' });
    try {
      await updateUserPassword(currentPassword, newPassword);
      toast.success('Password updated! Session terminated. Please log in with your new password.', { id: 'pwd', duration: 5000 });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.message || 'Failed to update password. Verify current password.', { id: 'pwd' });
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (!newEmail || !currentPassword) {
      toast.error('Current password required to change email');
      return;
    }
    toast.loading('Updating email & invalidating sessions...', { id: 'eml' });
    try {
      await updateUserEmail(newEmail, currentPassword);
      toast.success('Admin email updated! Please log in with your new email.', { id: 'eml', duration: 5000 });
      setCurrentPassword('');
    } catch (err) {
      toast.error(err.message || 'Failed to update email.', { id: 'eml' });
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Account Security & Credentials</h2>
        <p className="text-xs text-slate-400">Change admin email, update password, and manage Firebase authentication settings</p>
      </div>

      {/* Password Change Box */}
      <form onSubmit={handlePasswordChange} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 text-xs">
        <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <KeyRound className="w-4 h-4 text-indigo-400" />
          <span>Change Admin Password</span>
        </h3>

        <div>
          <label className="block text-slate-400 mb-1">Current Password *</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">New Password *</label>
            <input
              type="password"
              required
              placeholder="Min 6 chars"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Update Password
          </button>
        </div>
      </form>

      {/* Email Change Box */}
      <form onSubmit={handleEmailChange} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 text-xs">
        <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Mail className="w-4 h-4 text-indigo-400" />
          <span>Update Admin Email Address</span>
        </h3>

        <div>
          <label className="block text-slate-400 mb-1">New Email Address</label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Current Password (to authorize change) *</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Update Email
          </button>
        </div>
      </form>
    </div>
  );
};