import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Trash2, Edit2, Calendar, MapPin, X, Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ExperienceCMS = () => {
  const { about, saveExperience, deleteExperience } = useData();
  const experiences = about.experiences || [];

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: true,
    description: '',
    technologies: ''
  });

  // Open modal for creating a new experience
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: true,
      description: '',
      technologies: ''
    });
    setIsOpen(true);
  };

  // Open modal for editing an existing experience
  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({
      role: exp.role || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || 'Present',
      current: exp.current ?? (exp.endDate === 'Present' || !exp.endDate),
      description: exp.description || '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : (exp.technologies || '')
    });
    setIsOpen(true);
  };

  // Handle "Present" checkbox toggle
  const handleCurrentChange = (e) => {
    const isCurrent = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      current: isCurrent,
      endDate: isCurrent ? 'Present' : ''
    }));
  };

  // Save/Submit Experience Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert technologies string back into an array
    const techArray = typeof formData.technologies === 'string'
      ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.technologies;

    const payload = {
      id: editingId || undefined,
      role: formData.role,
      company: formData.company,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.current ? 'Present' : formData.endDate,
      current: formData.current,
      description: formData.description,
      technologies: techArray
    };

    await saveExperience(payload);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Work Experience Management</h3>
          <p className="text-xs text-slate-400">Add, update, or remove your professional work history.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List Cards */}
      <div className="grid grid-cols-1 gap-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold text-sm text-slate-100">{exp.role}</h4>
                <span className="text-xs text-indigo-400 font-semibold">@ {exp.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  {exp.startDate} – {exp.current ? 'Present' : (exp.endDate || 'N/A')}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  {exp.location}
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 pt-1">
                {exp.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => handleEdit(exp)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500 transition-all"
                title="Edit Experience"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteExperience(exp.id)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all"
                title="Delete Experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
            <Briefcase className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No work experiences found. Add your first one above!</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-slate-800 space-y-6 bg-slate-900 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-100">
                {editingId ? 'Edit Work Experience' : 'Add New Work Experience'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Role */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Job Title / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Stack Developer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tech Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, India / Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Start Date & End Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jan 2025"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none"
                  />
                </div>

                {/* End Date with "Present" Toggle */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-300">End Date</label>
                    <label className="flex items-center gap-1.5 text-[11px] text-indigo-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.current}
                        onChange={handleCurrentChange}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0"
                      />
                      <span>Present</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Dec 2025"
                    value={formData.current ? 'Present' : formData.endDate}
                    disabled={formData.current}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none ${
                      formData.current ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description & Responsibilities</label>
                <textarea
                  rows={3}
                  placeholder="Describe your key contributions and achievements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Tailwind CSS, Firebase"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};