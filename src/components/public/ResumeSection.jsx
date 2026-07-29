import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  X,
} from 'lucide-react';

import { useData } from '../../context/DataContext';

export const ResumeSection = () => {
  const { hero, about, sectionTitles } = useData();

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // =========================================================
  // OPEN MODAL
  // =========================================================

  const openPreviewModal = () => {
    setShowPreviewModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };

  // =========================================================
  // LOCK PAGE SCROLL WHEN MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    if (!showPreviewModal) return;

    const scrollY = window.scrollY;

    // Completely lock background page
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      window.scrollTo(0, scrollY);
    };
  }, [showPreviewModal]);

  // =========================================================
  // CLOSE MODAL USING ESC KEY
  // =========================================================

  useEffect(() => {
    if (!showPreviewModal) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closePreviewModal();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showPreviewModal]);

  // =========================================================
  // SAFE DATA
  // =========================================================

  const experiences = about?.experiences || [];

  return (
    <>
      {/* ===================================================== */}
      {/* RESUME SECTION */}
      {/* ===================================================== */}

      <section
        id="resume"
        className="
          relative
          z-10
          bg-slate-950
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl space-y-4">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mx-auto max-w-3xl space-y-1 px-2 text-center">

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-md
                border
                border-slate-800
                bg-slate-900
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-300
              "
            >
              <FileText className="h-3.5 w-3.5 text-indigo-400" />

              <span>Curriculum Vitae</span>
            </div>

            <h2
              className="
                break-words
                text-2xl
                font-bold
                leading-tight
                tracking-tight
                text-slate-100
                sm:text-3xl
              "
            >
              {sectionTitles?.resume ||
                'Professional Resume and CV'}
            </h2>

            <p
              className="
                mx-auto
                max-w-2xl
                break-words
                text-xs
                leading-relaxed
                text-slate-400
                sm:text-sm
              "
            >
              {sectionTitles?.resumeSubtitle ||
                'Download my verified curriculum vitae or inspect key architectural career milestones.'}
            </p>

          </div>

          {/* ================================================= */}
          {/* RESUME CARD */}
          {/* ================================================= */}

          <div
            className="
              glass-panel
              relative
              mx-auto
              grid
              max-w-4xl
              grid-cols-1
              items-center
              gap-8
              overflow-hidden
              rounded-3xl
              border
              border-slate-800/80
              p-8
              shadow-2xl
              sm:p-12
              md:grid-cols-12
            "
          >

            {/* =============================================== */}
            {/* LEFT COLUMN */}
            {/* =============================================== */}

            <div className="space-y-4 md:col-span-8">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-tr
                    from-indigo-500
                    to-purple-500
                    text-white
                    shadow-lg
                    shadow-indigo-500/30
                  "
                >
                  <FileText className="h-6 w-6" />
                </div>

                <div className="min-w-0">

                  <h3 className="break-words text-xl font-bold text-slate-100">
                    {hero?.name} – Senior Architect Resume
                  </h3>

                  <p className="text-xs font-semibold text-indigo-400">
                    {hero?.title}
                  </p>

                </div>

              </div>

              {/* Description */}

              <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                Comprehensive overview of{' '}
                {about?.yearsOfExperience || 0}+ years experience in
                Full Stack Software Engineering, Cloud Systems
                Architecture, Firebase Authentication, React 19
                performance tuning, and leading technical teams.
              </p>

              {/* Resume Features */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2
                  pt-2
                  text-xs
                  text-slate-300
                  sm:grid-cols-2
                "
              >

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Verified Employment History</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Academic & Cloud Certifications</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Selected Enterprise Case Studies</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Contact & Recommendation References</span>
                </div>

              </div>

            </div>

            {/* =============================================== */}
            {/* RIGHT COLUMN */}
            {/* =============================================== */}

            <div
              className="
                flex
                flex-col
                justify-center
                gap-3
                md:col-span-4
              "
            >

              {/* Download Resume */}

              <a
                href={hero?.resumeUrl || '#'}
                download={`${hero?.name || 'Muthu'}-Resume.pdf`}
                target={
                  hero?.resumeUrl?.startsWith('http')
                    ? '_blank'
                    : undefined
                }
                rel="noreferrer"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  via-purple-500
                  to-pink-500
                  px-6
                  py-3.5
                  text-xs
                  font-bold
                  text-white
                  shadow-xl
                  shadow-indigo-500/30
                  transition-all
                  hover:opacity-95
                  active:scale-95
                  sm:text-sm
                "
              >
                <Download className="h-4 w-4" />

                <span>Download PDF Resume</span>
              </a>

              {/* Live Overview */}

              <button
                type="button"
                onClick={openPreviewModal}
                className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900
                  px-6
                  py-3.5
                  text-xs
                  font-bold
                  text-slate-200
                  transition-all
                  hover:bg-slate-800
                  hover:text-white
                  sm:text-sm
                "
              >
                <Eye className="h-4 w-4 text-indigo-400" />

                <span>Live CV Overview</span>
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* LIVE CV OVERVIEW MODAL */}
      {/* ===================================================== */}

      {showPreviewModal && (
        <div
          className="
            fixed
            inset-0
            z-[999999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-slate-950/90
            p-3
            backdrop-blur-md
            sm:p-5
          "
          onMouseDown={(event) => {
            // Close only when clicking outside the modal
            if (event.target === event.currentTarget) {
              closePreviewModal();
            }
          }}
        >

          {/* ================================================= */}
          {/* MODAL CONTAINER */}
          {/* ================================================= */}

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            className="
              relative
              z-[1000000]
              flex
              w-full
              max-w-3xl
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-slate-700/80
              bg-slate-900
              p-4
              shadow-2xl
              sm:rounded-3xl
              sm:p-6
            "
            style={{
              maxHeight: 'calc(100dvh - 24px)',
            }}
          >

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div
              className="
                flex
                shrink-0
                items-start
                justify-between
                gap-4
                border-b
                border-slate-800
                pb-3
              "
            >

              <div className="min-w-0">

                <h3
                  id="cv-modal-title"
                  className="
                    break-words
                    text-lg
                    font-bold
                    text-slate-100
                    sm:text-xl
                  "
                >
                  {hero?.name} – Executive Summary
                </h3>

                <p className="mt-1 text-xs font-semibold text-indigo-400">
                  {hero?.title}
                </p>

              </div>

              {/* ============================================= */}
              {/* CLOSE / END BUTTON */}
              {/* ============================================= */}

              <button
                type="button"
                onClick={closePreviewModal}
                aria-label="Close Live CV Overview"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-800
                  text-slate-400
                  transition-all
                  hover:bg-red-500/20
                  hover:text-red-400
                  active:scale-90
                "
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* ================================================= */}
            {/* MODAL CONTENT */}
            {/* ================================================= */}

            <div
              className="
                min-h-0
                flex-1
                space-y-3
                overflow-hidden
                py-3
                text-xs
                leading-relaxed
                text-slate-300
              "
            >

              {/* ============================================= */}
              {/* CAREER HIGHLIGHTS */}
              {/* ============================================= */}

              <div>

                <h4 className="mb-1 text-sm font-bold text-slate-100">
                  Career Highlights
                </h4>

                <p
                  className="
                    line-clamp-3
                    text-xs
                    leading-relaxed
                    text-slate-400
                    sm:line-clamp-none
                  "
                >
                  {about?.summary ||
                    'Professional career summary is currently unavailable.'}
                </p>

              </div>

              {/* ============================================= */}
              {/* PRIMARY ROLES */}
              {/* ============================================= */}

              {experiences.length > 0 && (
                <div>

                  <h4 className="mb-2 text-sm font-bold text-slate-100">
                    Primary Roles
                  </h4>

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-2
                      md:grid-cols-2
                    "
                  >

                    {experiences.slice(0, 4).map((exp) => (
                      <div
                        key={exp.id}
                        className="
                          min-w-0
                          rounded-xl
                          border
                          border-slate-800
                          bg-slate-950
                          p-3
                        "
                      >

                        {/* Role + Company */}

                        <div
                          className="
                            flex
                            flex-col
                            gap-1
                            font-semibold
                            text-slate-100
                            sm:flex-row
                            sm:items-start
                            sm:justify-between
                          "
                        >

                          <span className="break-words">
                            {exp.role} @ {exp.company}
                          </span>

                          <span
                            className="
                              shrink-0
                              whitespace-nowrap
                              text-[10px]
                              text-indigo-400
                            "
                          >
                            {exp.startDate} -{' '}
                            {exp.current
                              ? 'Present'
                              : exp.endDate}
                          </span>

                        </div>

                        {/* Description */}

                        {exp.description && (
                          <p
                            className="
                              mt-1
                              line-clamp-2
                              break-words
                              text-[11px]
                              leading-relaxed
                              text-slate-400
                            "
                          >
                            {exp.description}
                          </p>
                        )}

                      </div>
                    ))}

                  </div>

                </div>
              )}

            </div>

            {/* ================================================= */}
            {/* MODAL FOOTER */}
            {/* ================================================= */}

            <div
              className="
                flex
                shrink-0
                flex-col
                gap-2
                border-t
                border-slate-800
                pt-3
                sm:flex-row
                sm:items-center
                sm:justify-end
              "
            >

              {/* Close / End Button */}

              <button
                type="button"
                onClick={closePreviewModal}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-slate-300
                  transition-all
                  hover:bg-slate-700
                  hover:text-white
                  active:scale-95
                "
              >
                <X className="h-4 w-4" />

                <span>End Overview</span>
              </button>

              {/* Download */}

              <a
                href={hero?.resumeUrl || '#'}
                download={`${hero?.name || 'Muthu'}-Resume.pdf`}
                target={
                  hero?.resumeUrl?.startsWith('http')
                    ? '_blank'
                    : undefined
                }
                rel="noreferrer"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  transition-all
                  hover:bg-indigo-500
                  active:scale-95
                "
              >
                <Download className="h-4 w-4" />

                <span>Download Official PDF</span>
              </a>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ResumeSection;