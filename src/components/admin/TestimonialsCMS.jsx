import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Star, MapPin, Briefcase, X, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const TestimonialsCMS = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = useData();
  const [editingTst, setEditingTst] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingTst?.clientName || !editingTst?.review) return;
    toast.loading('Saving testimonial...', { id: 'save-tst' });
    await saveTestimonial(editingTst);
    toast.success('Testimonial saved!', { id: 'save-tst' });
    setEditingTst(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Testimonials CMS</h2>
          <p className="text-xs text-slate-400">Manage, moderate, and edit client endorsements and direct site reviews</p>
        </div>
        <button
          onClick={() =>
            setEditingTst({
              clientName: '',
              clientRole: 'Client',
              company: '',
              clientAddress: 'Sirkali, Tamil Nadu, India',
              projectWorkedOn: '',
              clientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
              rating: 5,
              review: '',
              featured: true
            })
          }
          className="px-4 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white flex items-center gap-2 hover:bg-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {t.rating}.0 / 5 Stars
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-100">{t.clientName}</h4>
              <p className="text-xs text-indigo-400 font-semibold">{t.clientRole} {t.company ? `@ ${t.company}` : ''}</p>
              
              {t.clientAddress && (
                <p className="text-[11px] text-pink-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{t.clientAddress}</span>
                </p>
              )}

              {t.projectWorkedOn && (
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-indigo-400" />
                  <span className="font-mono">{t.projectWorkedOn}</span>
                </p>
              )}

              <p className="text-xs text-slate-300 line-clamp-4 italic whitespace-pre-wrap">"{t.review}"</p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800/80 mt-2">
              <img src={t.clientPhoto} alt={t.clientName} className="w-8 h-8 rounded-full object-cover border border-indigo-500/30" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingTst(t)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingTst && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-4 shadow-2xl my-auto z-[100000] max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-100">
                {editingTst.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setEditingTst(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTst.clientName || ''}
                    onChange={(e) => setEditingTst({ ...editingTst, clientName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Address / Location</label>
                  <input
                    type="text"
                    value={editingTst.clientAddress || ''}
                    onChange={(e) => setEditingTst({ ...editingTst, clientAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                    placeholder="Sirkali, Tamil Nadu, India"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={editingTst.clientRole || ''}
                    onChange={(e) => setEditingTst({ ...editingTst, clientRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    value={editingTst.company || ''}
                    onChange={(e) => setEditingTst({ ...editingTst, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Project Details</label>
                <input
                  type="text"
                  value={editingTst.projectWorkedOn || ''}
                  onChange={(e) => setEditingTst({ ...editingTst, projectWorkedOn: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  placeholder="Full Stack Web & Mobile App"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={editingTst.rating || 5}
                  onChange={(e) => setEditingTst({ ...editingTst, rating: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option value={5}>5 Stars - Outstanding</option>
                  <option value={4}>4 Stars - Great</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Below Average</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Detailed Review Description (10 - 15 lines) *</label>
                <textarea
                  rows={10}
                  required
                  value={editingTst.review || ''}
                  onChange={(e) => setEditingTst({ ...editingTst, review: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 leading-relaxed font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Photo / Avatar URL</label>
                <input
                  type="text"
                  value={editingTst.clientPhoto || ''}
                  onChange={(e) => setEditingTst({ ...editingTst, clientPhoto: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTst(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};