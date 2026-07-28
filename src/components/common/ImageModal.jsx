import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ExternalLink, ZoomIn } from 'lucide-react';

export const ImageModal = ({
  isOpen,
  images,
  initialIndex = 0,
  title,
  description,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/90"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] my-auto z-[100000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
          <div>
            {title && <h3 className="font-bold text-sm text-slate-100">{title}</h3>}
            {images.length > 1 && (
              <p className="text-xs text-slate-400">
                Image {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomed(!zoomed)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Toggle Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <a
              href={currentImage}
              target="_blank"
              download
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Open full resolution"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Image Showcase */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
          <img
            src={currentImage}
            alt={title || 'Preview'}
            className={`max-h-[65vh] w-auto object-contain transition-transform duration-300 ${
              zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setZoomed(!zoomed)}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Modal Description Footer */}
        {description && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};