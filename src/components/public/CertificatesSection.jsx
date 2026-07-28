import React, { useState, useEffect } from 'react';
import {
  Award,
  ExternalLink,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  Eye,
  ZoomIn,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CertificatesSection = () => {
  const { certificates, sectionTitles } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  // Lock background body scrolling when modal is open to prevent scroll overlap
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  const categories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))];
  const PREVIEW_LIMIT = 3;

  const filteredCerts = certificates.filter((c) =>
    selectedCategory === 'All' ? true : c.category === selectedCategory
  );

  const displayedCerts = isExpanded ? filteredCerts : filteredCerts.slice(0, PREVIEW_LIMIT);

  return (
    <section id="certificates" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Accreditations & Certificates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.certificates || 'Certifications'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.certificatesSubtitle || 'Verified industry certifications from Google Cloud, AWS, Meta, and major tech institutions. Click any certificate to view its official high-resolution credential image.'}
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Certificate Image Frame with Click to Open Modal */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative h-48 overflow-hidden bg-slate-950 cursor-pointer group/img"
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Hover Lightbox Indicator Overlay */}
                  <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="px-4 py-2 rounded-xl bg-indigo-600/90 text-white font-bold text-xs flex items-center gap-2 shadow-xl backdrop-blur-md transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                      <span>View Full Certificate</span>
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    {cert.category}
                  </span>

                  <span className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="font-bold text-base text-slate-100 group-hover:text-indigo-400 transition-colors cursor-pointer flex items-start justify-between gap-2"
                  >
                    <span>{cert.title}</span>
                  </h3>
                  <p className="text-xs text-indigo-400 font-semibold">{cert.issuer}</p>

                  {cert.credentialId && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ID: {cert.credentialId}</span>
                    </div>
                  )}

                  {cert.description && (
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4 gap-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>View Image</span>
                </button>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {filteredCerts.length > PREVIEW_LIMIT && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-95 min-h-[44px]"
            >
              <span>
                {isExpanded
                  ? 'Show Less Certifications'
                  : `Show More Certifications (${filteredCerts.length - PREVIEW_LIMIT} hidden)`}
              </span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Full Certificate Image Lightbox / Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/90"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[85vh] my-auto z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span>{selectedCert.title}</span>
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium">Issued by {selectedCert.issuer}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close certificate viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Certificate High-Res Image Display */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950">
              <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-slate-900 shadow-2xl group">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                />

                {/* Decorative Certificate Watermark Seal */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 backdrop-blur-md text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Official Verified Credential Format</span>
                </div>
              </div>

              {/* Certificate Metadata Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Credential ID
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {selectedCert.credentialId || 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Issue Date
                  </span>
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedCert.issueDate}</span>
                  </span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl sm:col-span-2 lg:col-span-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Category
                  </span>
                  <span className="text-xs font-semibold text-indigo-400">
                    {selectedCert.category}
                  </span>
                </div>
              </div>

              {selectedCert.description && (
                <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-2xl text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-slate-200 mb-1">Scope of Competency & Accreditation:</p>
                  <p>{selectedCert.description}</p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
              <a
                href={selectedCert.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <ZoomIn className="w-4 h-4 text-indigo-400" />
                <span>Open Full-Res Image</span>
              </a>

              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all cursor-pointer"
                >
                  <span>Verify Official Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};