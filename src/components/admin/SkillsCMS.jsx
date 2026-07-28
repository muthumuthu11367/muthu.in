import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Cpu, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const SkillsCMS = () => {
  const { skills, saveSkill, deleteSkill } = useData();
  const [editingSkill, setEditingSkill] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingSkill?.name) return;
    toast.loading('Saving skill...', { id: 'save-sk' });
    await saveSkill(editingSkill);
    toast.success('Skill saved!', { id: 'save-sk' });
    setEditingSkill(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Skills & Tech Stack</h2>
          <p className="text-xs text-slate-400">Manage proficiencies and technology categories</p>
        </div>
        <button
          onClick={() => setEditingSkill({ name: '', category: 'Frontend', proficiency: 90, iconName: 'Code', featured: true })}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((sk) => (
          <div key={sk.id} className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-100">{sk.name}</h4>
              <span className="text-[10px] text-indigo-400 font-mono">{sk.category} • {sk.proficiency}%</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingSkill(sk)} className="p-2 rounded-lg bg-slate-800 text-slate-300">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteSkill(sk.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingSkill && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-100">{editingSkill.id ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setEditingSkill(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <select
                  value={editingSkill.category || 'Frontend'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Tools & Methods">Tools & Methods</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Proficiency</span>
                  <span>{editingSkill.proficiency}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={editingSkill.proficiency ?? 85}
                  onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description / Summary</label>
                <input
                  type="text"
                  value={editingSkill.description || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingSkill(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};