import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Award, Upload, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const CertificatesCMS = () => {
  const { certificates, saveCertificate, deleteCertificate } = useData();
  const [editingCert, setEditingCert] = useState(null);

  const handleLocalPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        toast.error('Image size should be less than 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setEditingCert((prev) => (prev ? { ...prev, imageUrl: result } : null));
          toast.success('Certificate photo loaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingCert?.title) return;
    toast.loading('Saving certificate...', { id: 'save-cert' });
    await saveCertificate(editingCert);
    toast.success('Certificate saved!', { id: 'save-cert' });
    setEditingCert(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Certificates & Badges</h2>
          <p className="text-xs text-slate-400">Manage credentials and professional licenses</p>
        </div>
        <button
          onClick={() => setEditingCert({ title: '', issuer: '', issueDate: '2024-01', credentialUrl: '#', imageUrl: '', category: 'Cloud Architecture' })}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            {cert.imageUrl && (
              <div className="h-32 rounded-xl overflow-hidden bg-slate-950 mb-2">
                <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="font-bold text-base text-slate-100">{cert.title}</h3>
            <p className="text-xs text-indigo-400 font-semibold">{cert.issuer}</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setEditingCert(cert)} className="p-2 rounded-lg bg-slate-800 text-slate-300"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => deleteCertificate(cert.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {editingCert && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-100">{editingCert.id ? 'Edit Certificate' : 'Add Certificate'}</h3>
              <button onClick={() => setEditingCert(null)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Title *</label>
                <input type="text" required value={editingCert.title || ''} onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" placeholder="e.g. AWS Certified Solutions Architect" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Issuer</label>
                  <input type="text" value={editingCert.issuer || ''} onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" placeholder="e.g. Amazon Web Services" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Issue Date</label>
                  <input type="text" value={editingCert.issueDate || ''} onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" placeholder="e.g. 2024-05" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold font-sans">Verification Link URL</label>
                <input type="text" value={editingCert.credentialUrl || ''} onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" placeholder="https://..." />
              </div>

              {/* Photo upload options */}
              <div className="space-y-2 pt-1">
                <label className="block text-slate-400 font-semibold">Badge / Certificate Image</label>

                {editingCert.imageUrl && (
                  <div className="relative h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-2">
                    <img src={editingCert.imageUrl} alt="Badge Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditingCert({ ...editingCert, imageUrl: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <label className="flex items-center justify-center gap-2 p-3 bg-indigo-950/40 border border-indigo-800/60 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-300 font-bold transition-all">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Upload Badge Photo From Local Storage</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalPhotoUpload}
                    className="hidden"
                  />
                </label>

                <div className="pt-2">
                  <label className="block text-slate-500 text-[10px] mb-1 font-mono uppercase">Or Enter Image URL</label>
                  <input type="text" value={editingCert.imageUrl || ''} onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 text-xs" placeholder="https://images.unsplash.com/..." />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setEditingCert(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};