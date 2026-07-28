import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Briefcase, Calendar, MapPin, X, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const ExperienceCMS = () => {
  const { about, saveExperience, deleteExperience } = useData();
  const [editingExp, setEditingExp] = useState(null);
  const [techInput, setTechInput] = useState('');

  const experiences = about.experiences || [];

  const handleCreateNew = () => {
    setEditingExp({
      role: '',
      company: '',
      location: 'Remote',
      startDate: new Date().getFullYear().toString(),
      endDate: 'Present',
      current: true,
      description: '',
      technologies: []
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingExp?.role || !editingExp?.company) {
      toast.error('Role and Company are required');
      return;
    }
    toast.loading('Saving work experience...', { id: 'save-exp' });
    await saveExperience(editingExp);
    toast.success('Experience saved successfully!', { id: 'save-exp' });
    setEditingExp(null);
  };

  const handleDelete = async (id, role) => {
    if (window.confirm(`Delete experience record "${role}" permanently?`)) {
      await deleteExperience(id);
      toast.success('Experience deleted');
    }
  };

  const addTechTag = () => {
    if (techInput.trim()) {
      setEditingExp((prev) => ({
        ...prev,
        technologies: [...(prev?.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechTag = (index) => {
    setEditingExp((prev) => ({
      ...prev,
      technologies: (prev?.technologies || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Work Experience Manager</h2>
          <p className="text-xs text-slate-400">Add, edit, or remove career milestones and company positions</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-100">{exp.role}</h3>
                  <p className="text-xs text-indigo-400 font-semibold">{exp.company}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>{exp.location}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">{exp.description}</p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-indigo-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${exp.current ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                {exp.current ? 'Current Role' : 'Past Role'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Edit Experience"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.role)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                  title="Delete Experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400">No work experiences found. Click "Add New Experience" above to add one.</p>
        </div>
      )}

      {/* Edit/Create Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-100">
                  {editingExp.id ? 'Edit Work Experience' : 'Add New Work Experience'}
                </h3>
              </div>
              <button onClick={() => setEditingExp(null)} className="p-2 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Job Title / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={editingExp.role || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google Cloud"
                    value={editingExp.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA (Remote)"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Start Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2021"
                    value={editingExp.startDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={editingExp.current}
                    placeholder={editingExp.current ? 'Present' : 'e.g. 2023'}
                    value={editingExp.current ? 'Present' : editingExp.endDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingExp.current ?? true}
                    onChange={(e) => setEditingExp({ ...editingExp, current: e.target.checked, endDate: e.target.checked ? 'Present' : editingExp.endDate })}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span className="text-slate-300 font-semibold">Currently Work Here</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Responsibilities & Achievements</label>
                <textarea
                  rows={4}
                  placeholder="Describe your responsibilities, impact, and engineering contributions..."
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 resize-none"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-slate-400 mb-1">Technologies & Tools</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. React 19, TypeScript, Firebase"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                  <button type="button" onClick={addTechTag} className="px-4 bg-indigo-600 rounded-xl text-white font-bold cursor-pointer">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editingExp.technologies?.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1 font-mono">
                      {t}
                      <X className="w-3 h-3 cursor-pointer text-red-400" onClick={() => removeTechTag(idx)} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingExp(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg flex items-center gap-2 cursor-pointer">
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