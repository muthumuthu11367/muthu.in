import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Layers, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const ServicesCMS = () => {
  const { services, saveService, deleteService } = useData();
  const [editingService, setEditingService] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingService?.title) return;
    toast.loading('Saving service...', { id: 'save-srv' });
    await saveService(editingService);
    toast.success('Service saved!', { id: 'save-srv' });
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Services Manager</h2>
          <p className="text-xs text-slate-400">Services & consulting offerings</p>
        </div>
        <button
          onClick={() => setEditingService({ title: '', description: '', features: [], iconName: 'Layers', featured: true })}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-base text-slate-100">{srv.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => setEditingService(srv)} className="p-2 rounded-lg bg-slate-800 text-slate-300"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => deleteService(srv.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <p className="text-xs text-slate-400">{srv.description}</p>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-100">{editingService.id ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setEditingService(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};