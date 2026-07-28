import React, { useState } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { getPlatformIcon } from '../../utils/socialIcons';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export const ContactSection = () => {
  const { hero, socialLinks, submitContactMessage, sectionTitles } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await submitContactMessage(formData);
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Message delivered successfully!');

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitting(false);
      toast.error('Could not send message. Please try WhatsApp directly.');
    }
  };

  return (
    <section id="contact" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Inquiries & Opportunities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.contact || "Let's Build Something Extraordinary"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.contactSubtitle || 'Have an ambitious project, cloud architecture request, or engineering lead opportunity? Send a message directly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Maps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-slate-100">Contact Channels</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`mailto:${hero.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Email Inquiry</span>
                    <p className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{hero.email}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${hero.whatsappNumber?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">WhatsApp Direct Chat</span>
                    <p className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{hero.whatsappNumber}</p>
                  </div>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hero.location || 'Railway Road, Sirkali, Tamil Nadu, India')}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Click to open location in Google Maps"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-pink-500/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Exact Map Location</span>
                    <p className="font-bold text-slate-200 group-hover:text-pink-400 transition-colors">{hero.location}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Business Hours</span>
                    <p className="font-bold text-slate-200">Mon – Fri: 09:00 – 18:00 PST</p>
                  </div>
                </div>

                {socialLinks.filter((s) => s.enabled).length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Connect on Social Media</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {socialLinks
                        .filter((s) => s.enabled)
                        .map((soc) => {
                          const IconComponent = getPlatformIcon(soc.platform);
                          return (
                            <a
                              key={soc.id}
                              href={soc.url}
                              target="_blank"
                              rel="noreferrer"
                              title={soc.customLabel || soc.platform}
                              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-all flex items-center gap-2 text-xs font-semibold"
                            >
                              <IconComponent className="w-4 h-4 text-indigo-400" />
                              <span>{soc.platform}</span>
                            </a>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps Simulation Box */}
            <div className="glass-panel p-4 rounded-3xl border border-slate-800 overflow-hidden relative h-48 bg-slate-950 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Map Location"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-8 h-8 text-indigo-400 mb-2" />
                <p className="text-xs font-bold text-slate-100">{hero.location}</p>
                <p className="text-[10px] text-slate-400">Available worldwide for remote contracts</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">Message Received!</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out. I usually respond within 2-4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-6 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-100">Direct Contact Form</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="s.jenkins@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">Subject / Scope</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Architecture Contract / SaaS Build"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">Project Description / Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail your timeline, budget, technical goals, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Transmitting Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};