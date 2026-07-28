import React, { useState } from 'react';
import { Plus, Edit3, Trash2, GraduationCap, Calendar, MapPin, X, Save, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const EducationCMS = () => {
  const { about, saveEducation, deleteEducation } = useData();
  const [editingEdu, setEditingEdu] = useState(null);
  const [highlightInput, setHighlightInput] = useState('');

  const educationList = about.education || [];

  const handleCreateNew = () => {
    setEditingEdu({
      degree: '',
      institution: '',
      location: '',
      year: `${new Date().getFullYear() - 4} - ${new Date().getFullYear()}`,
      grade: '',
      highlights: []
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingEdu?.degree || !editingEdu?.institution) {
      toast.error('Degree/Qualification and Institution are required');
      return;
    }
    toast.loading('Saving education record...', { id: 'save-edu' });
    await saveEducation(editingEdu);
    toast.success('Education record saved successfully!', { id: 'save-edu' });
    setEditingEdu(null);
  };

  const handleDelete = async (id, degree) => {
    if (window.confirm(`Delete education record "${degree}" permanently?`)) {
      toast.loading('Deleting education record...', { id: 'del-edu' });
      await deleteEducation(id);
      toast.success('Education record deleted', { id: 'del-edu' });
    }
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setEditingEdu((prev) => ({
        ...prev,
        highlights: [...(prev?.highlights || []), highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const removeHighlight = (index) => {
    setEditingEdu((prev) => ({
      ...prev,
      highlights: (prev?.highlights || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <span>Education History Manager</span>
          </h2>
          <p className="text-xs text-slate-400">Add, edit, or remove academic qualifications, degrees, and university honors</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Education</span>
        </button>
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationList.map((edu) => (
          <div
            key={edu.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-100">{edu.degree}</h3>
                  <p className="text-xs text-purple-400 font-semibold">{edu.institution}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  {edu.year}
                </span>
              </div>

              {edu.location && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>{edu.location}</span>
                </div>
              )}

              {edu.grade && (
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Grade / Distinction: <strong className="text-emerald-400">{edu.grade}</strong></span>
                </div>
              )}

              {edu.highlights && edu.highlights.length > 0 && (
                <div className="space-y-1 pt-1">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Highlights & Achievements</p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {edu.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">ID: {edu.id}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingEdu(edu)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-all"
                  title="Edit Education Record"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id, edu.degree)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer transition-all"
                  title="Delete Education Record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {educationList.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
          <GraduationCap className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No education entries found. Click "Add New Education" above to create one.</p>
        </div>
      )}

      {/* Modal for Creating or Editing Education */}
      {editingEdu && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-slate-100">
                  {editingEdu.id ? 'Edit Education Record' : 'Add New Education Entry'}
                </h3>
              </div>
              <button
                onClick={() => setEditingEdu(null)}
                className="p-2 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Degree / Qualification *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B.Tech in Computer Science"
                    value={editingEdu.degree || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Institution / University *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    value={editingEdu.institution || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. California, USA"
                    value={editingEdu.location || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Years / Period</label>
                  <input
                    type="text"
                    placeholder="e.g. 2020 - 2024"
                    value={editingEdu.year || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, year: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Grade / Distinction</label>
                  <input
                    type="text"
                    placeholder="e.g. 3.9 GPA / First Class"
                    value={editingEdu.grade || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2">
                <label className="block text-slate-400 font-semibold">Key Highlights & Honors</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Dean's Honor Roll, Specialization in AI"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addHighlight();
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="px-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-bold cursor-pointer transition-all shrink-0"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {editingEdu.highlights?.map((h, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between text-xs">
                      <span>{h}</span>
                      <X className="w-4 h-4 cursor-pointer text-red-400 hover:text-red-300 shrink-0" onClick={() => removeHighlight(idx)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEdu(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Education</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};