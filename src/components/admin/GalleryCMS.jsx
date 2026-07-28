import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Image as ImageIcon, Upload, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const GalleryCMS = () => {
  const { gallery, saveGalleryItem, deleteGalleryItem } = useData();
  const [editingItem, setEditingItem] = useState(null);

  const handleLocalPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 12 * 1024 * 1024) {
        toast.error('Image size should be less than 12MB');
        return;
      }
      toast.loading('Processing image...', { id: 'img-proc' });
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawUrl = event.target?.result;
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_SIZE) {
                height *= MAX_SIZE / width;
                width = MAX_SIZE;
              }
            } else {
              if (height > MAX_SIZE) {
                width *= MAX_SIZE / height;
                height = MAX_SIZE;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedUrl = canvas.toDataURL('image/jpeg', 0.82);
              setEditingItem((prev) => (prev ? { ...prev, imageUrl: compressedUrl } : null));
              toast.success('Local photo compressed & ready!', { id: 'img-proc' });
              return;
            }
          } catch (err) {
            console.warn('Canvas compression fallback', err);
          }
          setEditingItem((prev) => (prev ? { ...prev, imageUrl: rawUrl } : null));
          toast.success('Local photo uploaded!', { id: 'img-proc' });
        };
        img.onerror = () => {
          setEditingItem((prev) => (prev ? { ...prev, imageUrl: rawUrl } : null));
          toast.success('Local photo uploaded!', { id: 'img-proc' });
        };
        img.src = rawUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const title = editingItem.title?.trim();
    const imageUrl = editingItem.imageUrl?.trim();

    if (!title) {
      toast.error('Please enter a Title for this media item.');
      return;
    }
    if (!imageUrl) {
      toast.error('Please upload an image or provide an Image URL.');
      return;
    }

    toast.loading('Storing media item in database...', { id: 'save-gal' });
    try {
      await saveGalleryItem({
        ...editingItem,
        title,
        imageUrl,
        category: editingItem.category || 'UI/UX Mockups',
        description: editingItem.description || ''
      });
      toast.success('Media item saved & live on portfolio!', { id: 'save-gal' });
      setEditingItem(null);
    } catch (err) {
      console.error('Save media error:', err);
      toast.error('Error saving media item. Please try again.', { id: 'save-gal' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Media Gallery Manager</h2>
          <p className="text-xs text-slate-400">Manage UI mockups, architecture diagrams, and workstation photos</p>
        </div>
        <button
          onClick={() => setEditingItem({ title: '', category: 'UI/UX Mockups', imageUrl: '', description: '' })}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="h-40 rounded-xl overflow-hidden bg-slate-950">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">{item.title}</h4>
            <p className="text-[10px] text-indigo-400 font-mono">{item.category}</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button onClick={() => setEditingItem(item)} className="p-2 rounded-lg bg-slate-800 text-slate-300"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => deleteGalleryItem(item.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-100">{editingItem.id ? 'Edit Gallery Item' : 'Add Gallery Item'}</h3>
              <button onClick={() => setEditingItem(null)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Title *</label>
                <input type="text" required value={editingItem.title || ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" placeholder="e.g. System Architecture Diagram" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Category</label>
                <select value={editingItem.category || 'UI/UX Mockups'} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200">
                  <option value="UI/UX Mockups">UI/UX Mockups</option>
                  <option value="Architecture Diagrams">Architecture Diagrams</option>
                  <option value="Speaking & Events">Speaking & Events</option>
                  <option value="Code Snapshots">Code Snapshots</option>
                  <option value="Workstation">Workstation</option>
                </select>
              </div>

              {/* Photo Upload Options */}
              <div className="space-y-2">
                <label className="block text-slate-400 font-semibold">Media Photo *</label>

                {editingItem.imageUrl && (
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-2">
                    <img src={editingItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, imageUrl: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2">
                  <label className="flex items-center justify-center gap-2 p-3 bg-indigo-950/40 border border-indigo-800/60 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-300 font-bold transition-all">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Upload Photo From Local Storage</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block text-slate-500 text-[10px] mb-1 font-mono uppercase">Or Enter Image Web URL</label>
                  <input
                    type="text"
                    value={editingItem.imageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 text-xs"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description</label>
                <input type="text" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" placeholder="Short description of this media" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors">Save Media Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};