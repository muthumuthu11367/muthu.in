import React, { useState } from 'react';
import { Camera, ZoomIn, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ImageModal } from '../common/ImageModal';

export const GallerySection = () => {
  const { gallery, sectionTitles } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];
  const PREVIEW_LIMIT = 3;

  const filteredGallery = gallery.filter((g) =>
    selectedCategory === 'All' ? true : g.category === selectedCategory
  );

  const displayedGallery = isExpanded ? filteredGallery : filteredGallery.slice(0, PREVIEW_LIMIT);

  return (
    <section id="gallery" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-indigo-400" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.gallery || 'Media and Archive Gallery'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.gallerySubtitle || 'UI/UX mockups, cloud architecture blueprints, developer setup, and tech conference snapshots.'}
          </p>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setModalImageIndex(index)}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-1 cursor-pointer group relative shadow-lg"
            >
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  {item.category}
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {filteredGallery.length > PREVIEW_LIMIT && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-95 min-h-[44px]"
            >
              <span>{isExpanded ? 'Show Less Gallery Media' : `Show More Gallery Media (${filteredGallery.length - PREVIEW_LIMIT} hidden)`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={modalImageIndex !== null}
        images={filteredGallery.map((g) => g.imageUrl)}
        initialIndex={modalImageIndex || 0}
        title={modalImageIndex !== null ? filteredGallery[modalImageIndex]?.title : ''}
        description={modalImageIndex !== null ? filteredGallery[modalImageIndex]?.description : ''}
        onClose={() => setModalImageIndex(null)}
      />
    </section>
  );
};