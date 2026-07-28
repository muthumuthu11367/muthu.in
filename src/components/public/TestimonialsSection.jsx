import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Star,
  MapPin,
  PlusCircle,
  X,
  Upload,
  Send,
  Briefcase,
  Edit3,
  Trash2,
  Lock,
  UserCheck,
  KeyRound,
  CheckCircle2,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
];

export const TestimonialsSection = () => {
  const { testimonials, saveTestimonial, deleteTestimonial, sectionTitles } = useData();
  const { user: adminUser } = useAuth(); // Super admin user

  // Preview / Show More state
  const [isExpanded, setIsExpanded] = useState(false);
  const PREVIEW_LIMIT = 3;
  const displayedTestimonials = isExpanded ? testimonials : testimonials.slice(0, PREVIEW_LIMIT);

  // Client Session State
  const [clientSession, setClientSession] = useState(() => {
    try {
      const saved = sessionStorage.getItem('client_review_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal Visibility
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isClientLoginModalOpen, setIsClientLoginModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Lock background scrolling when modal is active
  useEffect(() => {
    if (isSubmitModalOpen || isClientLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSubmitModalOpen, isClientLoginModalOpen]);

  // Client Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPasscode, setLoginPasscode] = useState('');

  // Submit / Edit Form Data
  const [formData, setFormData] = useState({
    id: '',
    clientName: '',
    clientAddress: '',
    clientRole: '',
    company: '',
    projectWorkedOn: '',
    rating: 5,
    review: '',
    clientPhoto: PRESET_AVATARS[0],
    authorEmail: '',
    authorPasscode: ''
  });

  useEffect(() => {
    if (clientSession) {
      sessionStorage.setItem('client_review_session', JSON.stringify(clientSession));
    } else {
      sessionStorage.removeItem('client_review_session');
    }
  }, [clientSession]);

  const handleOpenNewSubmit = () => {
    setFormData({
      id: '',
      clientName: clientSession?.email ? clientSession.email.split('@')[0] : '',
      clientAddress: 'Railway Road, Sirkali, Tamil Nadu, India',
      clientRole: 'Client',
      company: '',
      projectWorkedOn: 'Web Application Development',
      rating: 5,
      review: '',
      clientPhoto: PRESET_AVATARS[0],
      authorEmail: clientSession?.email || '',
      authorPasscode: clientSession?.passcode || ''
    });
    setEditingTestimonial(null);
    setIsSubmitModalOpen(true);
  };

  const handleOpenEdit = (tst) => {
    // Check permission
    const isOwner =
      clientSession &&
      tst.authorEmail?.toLowerCase() === clientSession.email.toLowerCase() &&
      tst.authorPasscode === clientSession.passcode;
    const isAdmin = !!adminUser;

    if (!isOwner && !isAdmin) {
      // Prompt for login/authentication for this specific review
      setLoginEmail(tst.authorEmail || '');
      setLoginPasscode('');
      toast.error('Authentication Required: Please enter author password to edit your review.');
      setIsClientLoginModalOpen(true);
      return;
    }

    setFormData({
      id: tst.id,
      clientName: tst.clientName || '',
      clientAddress: tst.clientAddress || '',
      clientRole: tst.clientRole || '',
      company: tst.company || '',
      projectWorkedOn: tst.projectWorkedOn || '',
      rating: tst.rating || 5,
      review: tst.review || '',
      clientPhoto: tst.clientPhoto || PRESET_AVATARS[0],
      authorEmail: tst.authorEmail || clientSession?.email || '',
      authorPasscode: tst.authorPasscode || clientSession?.passcode || ''
    });
    setEditingTestimonial(tst);
    setIsSubmitModalOpen(true);
  };

  const handleDelete = async (tst) => {
    const isOwner =
      clientSession &&
      tst.authorEmail?.toLowerCase() === clientSession.email.toLowerCase() &&
      tst.authorPasscode === clientSession.passcode;
    const isAdmin = !!adminUser;

    if (!isOwner && !isAdmin) {
      setLoginEmail(tst.authorEmail || '');
      setLoginPasscode('');
      toast.error('Access Denied: Only the author of this review can delete it.');
      setIsClientLoginModalOpen(true);
      return;
    }

    if (window.confirm(`Are you sure you want to delete your review "${tst.clientName}"?`)) {
      try {
        await deleteTestimonial(tst.id);
        toast.success('Your review has been deleted successfully.');
      } catch (err) {
        toast.error('Failed to delete review.');
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, clientPhoto: event.target.result }));
          toast.success('Photo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClientLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPasscode.trim()) {
      toast.error('Please enter both Email and Password/Passcode.');
      return;
    }

    const matchedReview = testimonials.find(
      (t) =>
        t.authorEmail?.toLowerCase() === loginEmail.trim().toLowerCase() &&
        t.authorPasscode === loginPasscode.trim()
    );

    if (matchedReview || adminUser) {
      const newSession = { email: loginEmail.trim().toLowerCase(), passcode: loginPasscode.trim() };
      setClientSession(newSession);
      setIsClientLoginModalOpen(false);
      toast.success(`Authenticated as ${loginEmail}! You can now edit/delete your reviews.`);
    } else {
      toast.error('Access Denied: Invalid author Email or Password/Passcode.');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.review.trim()) {
      toast.error('Please enter your Name and Review text.');
      return;
    }
    if (!formData.authorEmail.trim() || !formData.authorPasscode.trim()) {
      toast.error('Please provide an Email and Password/Passcode for review security.');
      return;
    }

    setSubmitting(true);
    toast.loading('Saving review to database...', { id: 'tst-submit' });

    try {
      await saveTestimonial({
        id: formData.id || undefined,
        clientName: formData.clientName,
        clientAddress: formData.clientAddress || 'Railway Road, Sirkali, Tamil Nadu, India',
        clientRole: formData.clientRole || 'Client',
        company: formData.company || 'Direct Client',
        projectWorkedOn: formData.projectWorkedOn || 'Web Application',
        rating: formData.rating,
        review: formData.review,
        clientPhoto: formData.clientPhoto,
        authorEmail: formData.authorEmail.trim().toLowerCase(),
        authorPasscode: formData.authorPasscode.trim(),
        featured: true,
        status: 'approved',
        createdAt: new Date().toISOString()
      });

      // Update local client session
      setClientSession({
        email: formData.authorEmail.trim().toLowerCase(),
        passcode: formData.authorPasscode.trim()
      });

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.7 } });
      toast.success(
        formData.id
          ? 'Your review has been updated in the database!'
          : 'Thank you! Your review has been saved and is displayed live!',
        { id: 'tst-submit' }
      );

      setIsSubmitModalOpen(false);
    } catch (err) {
      toast.error('Failed to save review. Please try again.', { id: 'tst-submit' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-3 border-b border-slate-800/60">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-400" />
              <span>Client Reviews & Endorsements</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
              {sectionTitles.testimonials || 'Client Testimonials'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl break-words">
              {sectionTitles.testimonialsSubtitle || 'Direct client feedback, star ratings, and project reviews automatically saved and updated.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {clientSession ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <UserCheck className="w-4 h-4" />
                <span>Logged in: {clientSession.email}</span>
                <button
                  onClick={() => {
                    setClientSession(null);
                    toast.success('Logged out from client review session.');
                  }}
                  className="ml-2 text-[10px] underline hover:text-emerald-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsClientLoginModalOpen(true)}
                className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span>Edit My Existing Review</span>
              </button>
            )}

            <button
              onClick={handleOpenNewSubmit}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Your Review</span>
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((tst) => {
            const isOwner =
              clientSession &&
              tst.authorEmail?.toLowerCase() === clientSession.email.toLowerCase() &&
              tst.authorPasscode === clientSession.passcode;
            const canManage = isOwner || !!adminUser;

            return (
              <div
                key={tst.id}
                className="glass-panel p-8 rounded-3xl border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between group relative shadow-xl"
              >
                <div className="space-y-4 relative z-10">
                  {/* Rating Stars & Author Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < tst.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-amber-400 ml-1.5">{tst.rating}.0 / 5</span>
                    </div>

                    {isOwner && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                        <span>Your Review</span>
                      </span>
                    )}
                  </div>

                  {/* Review Description (Supports 10-15 lines) */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic whitespace-pre-wrap font-sans">
                    "{tst.review}"
                  </p>
                </div>

                {/* Author Details & Address */}
                <div className="pt-6 mt-6 border-t border-slate-800/60 space-y-3 relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={tst.clientPhoto || PRESET_AVATARS[0]}
                        alt={tst.clientName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                          {tst.clientName}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {tst.clientRole} {tst.company ? `@ ${tst.company}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Owner / Admin Management Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(tst)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 border border-slate-700/80 transition-all cursor-pointer"
                        title="Edit Review (Requires Author Credentials)"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(tst)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                        title="Delete Review (Requires Author Credentials)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Meta details: Address & Project Details */}
                  <div className="pt-2 text-[11px] text-slate-400 space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                    {tst.clientAddress && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tst.clientAddress)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-pink-400 font-medium hover:underline"
                      >
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{tst.clientAddress}</span>
                      </a>
                    )}
                    {tst.projectWorkedOn && (
                      <div className="flex items-center gap-1.5 text-indigo-300">
                        <Briefcase className="w-3 h-3 shrink-0 text-indigo-400" />
                        <span className="truncate font-mono">Project: {tst.projectWorkedOn}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {testimonials.length > PREVIEW_LIMIT && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-95 min-h-[44px]"
            >
              <span>{isExpanded ? 'Show Less Reviews' : `Show More Client Reviews (${testimonials.length - PREVIEW_LIMIT} hidden)`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Client Login Modal */}
      {isClientLoginModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/85"
          onClick={() => setIsClientLoginModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-5 shadow-2xl relative my-auto z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-indigo-400" />
                <h3 className="font-extrabold text-base text-slate-100">Review Author Authentication</h3>
              </div>
              <button
                onClick={() => setIsClientLoginModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              To edit or delete your review, enter the Email address and Password/Passcode you set when creating the review.
            </p>

            <form onSubmit={handleClientLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Author Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="client@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Review Password / Passcode *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPasscode}
                  onChange={(e) => setLoginPasscode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClientLoginModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Submission & Edit Modal (Non-Cut-off Layout) */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/85"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative my-auto z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 flex justify-between items-center border-b border-slate-800 p-5 sm:p-6 bg-slate-900/90 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-100">
                    {editingTestimonial ? 'Edit Your Testimonial' : 'Submit Client Testimonial'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingTestimonial
                      ? 'Update your feedback, star rating, or project details.'
                      : 'Your feedback will be saved directly to the database and published.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body - Guarantees NO cut-off UI */}
            <form onSubmit={handleSubmitReview} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              {/* Author Authentication Credentials (Required for edit/delete ownership) */}
              <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Lock className="w-4 h-4" />
                  <span>Review Security & Credentials (Only you can edit/delete)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@company.com"
                      value={formData.authorEmail}
                      onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Passcode / Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="e.g. MySecret123"
                      value={formData.authorPasscode}
                      onChange={(e) => setFormData({ ...formData, authorPasscode: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">
                  Save this email & password! You will use it whenever you want to edit or delete your review.
                </p>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Address / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Railway Road, Sirkali, Tamil Nadu, India"
                    value={formData.clientAddress}
                    onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Sirkali Tech Solutions"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Details *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. E-Commerce Web Application & Firebase Integration"
                  value={formData.projectWorkedOn}
                  onChange={(e) => setFormData({ ...formData, projectWorkedOn: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Star Rating (1 to 5 Stars) *</label>
                <div className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const starVal = idx + 1;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: starVal })}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= formData.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-bold text-amber-400 ml-2">
                    {formData.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Detailed Review Description (10-15 lines) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-slate-300 font-semibold">
                    Detailed Feedback Description (10 – 15 lines) *
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formData.review.split('\n').filter((l) => l.trim().length > 0).length} line(s) written
                  </span>
                </div>
                <textarea
                  rows={11}
                  required
                  placeholder={`Write your detailed feedback working with Muthu (approx. 10 to 15 lines)...

Topics to include:
- Project scope and key deliverables
- Technical proficiency in React, Firebase, AI integrations
- Communication, velocity, and problem solving
- Overall satisfaction and business impact`}
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
                />
              </div>

              {/* Client Photo / Avatar Upload */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-semibold">Your Photo / Avatar</label>
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={formData.clientPhoto}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shrink-0"
                  />
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white cursor-pointer font-semibold transition-all">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Upload Custom Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-slate-400">Or choose preset avatar:</span>
                  <div className="flex gap-2">
                    {PRESET_AVATARS.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, clientPhoto: url })}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                          formData.clientPhoto === url ? 'border-indigo-500 scale-110' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fixed Footer Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-slate-900 pb-1">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Saving...' : formData.id ? 'Update Review' : 'Submit Review Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};