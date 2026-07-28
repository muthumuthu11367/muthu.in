import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, Sparkles, Check, X, Image as ImageIcon, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const ProjectsCMS = () => {
  const { projects, saveProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState(null);
  const [techInput, setTechInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleCreateNew = () => {
    setEditingProject({
      title: '',
      shortDescription: '',
      fullDescription: '',
      category: 'Full Stack',
      technologies: [],
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
      githubUrl: '',
      demoUrl: '',
      featured: false,
      published: true,
      status: 'Completed',
      challenges: '',
      solutions: ''
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingProject?.title) {
      toast.error('Project title is required');
      return;
    }
    toast.loading('Saving project...', { id: 'save-proj' });
    await saveProject(editingProject);
    toast.success('Project saved successfully!', { id: 'save-proj' });
    setEditingProject(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project permanently?')) {
      await deleteProject(id);
      toast.success('Project deleted');
    }
  };

  const handleLocalThumbnailUpload = (e) => {
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
          setEditingProject((prev) => (prev ? { ...prev, thumbnail: result } : null));
          toast.success('Project thumbnail loaded from local storage!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalGalleryPhotoUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.size > 8 * 1024 * 1024) {
          toast.error(`${file.name} is larger than 8MB`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result) {
            setEditingProject((prev) => ({
              ...prev,
              images: [...(prev?.images || []), result]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
      toast.success('Local gallery photos added!');
    }
  };

  const addTechTag = () => {
    if (techInput.trim()) {
      setEditingProject((prev) => ({
        ...prev,
        technologies: [...(prev?.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechTag = (index) => {
    setEditingProject((prev) => ({
      ...prev,
      technologies: (prev?.technologies || []).filter((_, i) => i !== index)
    }));
  };

  const addGalleryImage = () => {
    if (imageUrlInput.trim()) {
      setEditingProject((prev) => ({
        ...prev,
        images: [...(prev?.images || []), imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Projects Manager</h2>
          <p className="text-xs text-slate-400">Add, edit, publish, or feature portfolio case studies</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-950">
                <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-bold text-indigo-400 font-mono">
                  {proj.category}
                </span>
                {proj.featured && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-slate-100 line-clamp-1">{proj.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.shortDescription}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${proj.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                {proj.published ? 'Published' : 'Hidden'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingProject(proj)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 bg-slate-950/85 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-2xl w-full space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto my-auto z-[100000]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setEditingProject(null)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={editingProject.category || 'Full Stack'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI / Cloud">AI / Cloud</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>

                {/* Thumbnail & Local Upload Section */}
                <div className="space-y-2 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                  <label className="block text-slate-300 font-semibold">Project Cover Thumbnail</label>
                  {editingProject.thumbnail && (
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                      <img src={editingProject.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <label className="flex items-center justify-center gap-2 p-2.5 bg-indigo-950/50 border border-indigo-800/60 hover:border-indigo-500 rounded-xl cursor-pointer text-indigo-300 font-bold transition-all text-xs">
                      <Upload className="w-4 h-4 text-indigo-400" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLocalThumbnailUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or enter Image URL"
                      value={editingProject.thumbnail || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 text-xs"
                    />
                  </div>
                </div>

                {/* Gallery Screenshots & Local Upload */}
                <div className="space-y-2 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-300 font-semibold">Project Screenshots & Gallery Photos</label>
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-lg cursor-pointer text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photos</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleLocalGalleryPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                    {editingProject.images?.map((img, idx) => (
                      <div key={idx} className="relative h-20 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 group">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditingProject((prev) => ({
                            ...prev,
                            images: (prev?.images || []).filter((_, i) => i !== idx)
                          }))}
                          className="absolute top-1 right-1 p-1 bg-red-600/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Full Detailed Case Study</label>
                <textarea
                  rows={4}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 resize-none"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-slate-400 mb-1">Technologies Used</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. React 19"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                  <button type="button" onClick={addTechTag} className="px-4 bg-indigo-600 rounded-xl text-white">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editingProject.technologies?.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1">
                      {t}
                      <X className="w-3 h-3 cursor-pointer text-red-400" onClick={() => removeTechTag(idx)} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>Featured Project</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>Published to Portfolio</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};