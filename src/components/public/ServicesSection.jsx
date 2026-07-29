import React, { useEffect, useState } from 'react';
import {
  Layers,
  Cloud,
  Palette,
  Cpu,
  Check,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Send,
} from 'lucide-react';

import { useData } from '../../context/DataContext';

export const ServicesSection = () => {
  const { services = [], sectionTitles = {} } = useData();

  const [selectedService, setSelectedService] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Input field state
  const [deliverableInput, setDeliverableInput] = useState('');

  const PREVIEW_LIMIT = 4;

  const displayedServices = isExpanded
    ? services
    : services.slice(0, PREVIEW_LIMIT);

  // ==========================================
  // SERVICE ICON
  // ==========================================

  const getServiceIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'cloud':
        return Cloud;

      case 'palette':
        return Palette;

      case 'cpu':
        return Cpu;

      default:
        return Layers;
    }
  };

  // ==========================================
  // OPEN SERVICE MODAL
  // ==========================================

  const openServiceModal = (service) => {
    setDeliverableInput('');
    setSelectedService(service);
  };

  // ==========================================
  // CLOSE SERVICE MODAL
  // ==========================================

  const closeServiceModal = () => {
    setSelectedService(null);
    setDeliverableInput('');
  };

  // ==========================================
  // DISABLE BACKGROUND SCROLL
  // ==========================================

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  // ==========================================
  // CLOSE MODAL WITH ESC KEY
  // ==========================================

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && selectedService) {
        closeServiceModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedService]);

  // ==========================================
  // SCROLL TO CONTACT SECTION
  // ==========================================

  const scrollToContact = () => {
    closeServiceModal();

    setTimeout(() => {
      const contactSection = document.querySelector('#contact');

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  // ==========================================
  // HANDLE DELIVERABLE SUBMIT
  // ==========================================

  const handleDeliverableSubmit = (event) => {
    event.preventDefault();

    const requirement = deliverableInput.trim();

    if (!requirement) {
      return;
    }

    console.log('Selected Service:', selectedService?.title);
    console.log('User Requirement:', requirement);

    /*
      You can later send this data to:

      - EmailJS
      - Firebase
      - Backend API
      - WhatsApp
      - Contact Form
    */

    scrollToContact();
  };

  return (
    <>
      {/* ====================================== */}
      {/* SERVICES SECTION */}
      {/* ====================================== */}

      <section
        id="services"
        className="relative z-10 bg-slate-950 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
      >
        <div className="mx-auto max-w-7xl space-y-4">

          {/* ================================== */}
          {/* HEADER */}
          {/* ================================== */}

          <div className="mx-auto max-w-3xl space-y-1 px-2 text-center">

            <div className="inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">

              <Layers className="h-3.5 w-3.5 text-indigo-400" />

              <span>Offerings</span>

            </div>

            <h2 className="break-words text-2xl font-bold leading-tight tracking-tight text-slate-100 sm:text-3xl">
              {sectionTitles.services ||
                'Specialised Engineering Services'}
            </h2>

            <p className="mx-auto max-w-2xl break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
              {sectionTitles.servicesSubtitle ||
                'Tailored software solutions, cloud architecture engineering, and bespoke UI design systems for high-growth ventures.'}
            </p>

          </div>

          {/* ================================== */}
          {/* SERVICES GRID */}
          {/* ================================== */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {displayedServices.map((srv) => {
              const IconComponent = getServiceIcon(srv.iconName);

              return (
                <div
                  key={srv.id}
                  className="
                    glass-panel
                    group
                    flex
                    flex-col
                    justify-between
                    rounded-3xl
                    border
                    border-slate-800/80
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-indigo-500/50
                  "
                >

                  {/* ========================== */}
                  {/* CARD CONTENT */}
                  {/* ========================== */}

                  <div className="space-y-4">

                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-indigo-500/30
                        bg-gradient-to-tr
                        from-indigo-500/20
                        to-purple-500/20
                        text-indigo-400
                        shadow-lg
                        transition-all
                        group-hover:bg-indigo-500
                        group-hover:text-white
                      "
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Title */}

                    <h3 className="text-lg font-bold text-slate-100 transition-colors group-hover:text-indigo-400">
                      {srv.title}
                    </h3>

                    {/* Description */}

                    <p className="text-xs leading-relaxed text-slate-400">
                      {srv.description}
                    </p>

                    {/* Preview Key Deliverables */}

                    {srv.features?.length > 0 && (
                      <ul className="space-y-2 border-t border-slate-800/80 pt-3">

                        {srv.features
                          .slice(0, 3)
                          .map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-xs text-slate-300"
                            >

                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />

                              <span>{feature}</span>

                            </li>
                          ))}

                      </ul>
                    )}

                  </div>

                  {/* ========================== */}
                  {/* SERVICE DETAILS BUTTON */}
                  {/* ========================== */}

                  <button
                    type="button"
                    onClick={() => openServiceModal(srv)}
                    className="
                      mt-6
                      flex
                      min-h-[44px]
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-800
                      bg-slate-900
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-slate-300
                      transition-all
                      hover:border-indigo-500
                      hover:bg-indigo-600
                      hover:text-white
                    "
                  >

                    <span>Service Details</span>

                    <ArrowRight className="h-3.5 w-3.5" />

                  </button>

                </div>
              );
            })}

          </div>

          {/* ================================== */}
          {/* SHOW MORE / SHOW LESS */}
          {/* ================================== */}

          {services.length > PREVIEW_LIMIT && (
            <div className="flex justify-center pt-4">

              <button
                type="button"
                onClick={() => setIsExpanded((previous) => !previous)}
                className="
                  flex
                  min-h-[44px]
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-700/80
                  bg-slate-900
                  px-6
                  py-3
                  text-xs
                  font-bold
                  text-indigo-400
                  shadow-lg
                  transition-all
                  hover:border-indigo-500/50
                  hover:bg-slate-800
                  hover:shadow-indigo-500/10
                  active:scale-95
                "
              >

                <span>
                  {isExpanded
                    ? 'Show Less Specialized Services'
                    : `Show More Specialized Services (${
                        services.length - PREVIEW_LIMIT
                      } hidden)`}
                </span>

                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}

              </button>

            </div>
          )}

        </div>
      </section>

      {/* ====================================== */}
      {/* SERVICE DETAILS MODAL */}
      {/* ====================================== */}

      {selectedService && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-slate-950/85
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeServiceModal();
            }
          }}
        >

          {/* ================================== */}
          {/* MODAL BOX */}
          {/* ================================== */}

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="
              relative
              z-[100000]
              max-h-[90vh]
              w-full
              max-w-lg
              overflow-y-auto
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-6
              shadow-2xl
              sm:p-8
            "
            onMouseDown={(event) => event.stopPropagation()}
          >

            {/* ================================ */}
            {/* CLOSE BUTTON */}
            {/* ================================ */}

            <button
              type="button"
              onClick={closeServiceModal}
              aria-label="Close service details"
              className="
                absolute
                right-4
                top-4
                z-50
                flex
                h-9
                w-9
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                bg-slate-800
                text-slate-400
                transition-all
                hover:bg-slate-700
                hover:text-white
              "
            >
              <X className="h-5 w-5" />
            </button>

            {/* ================================ */}
            {/* SERVICE HEADER */}
            {/* ================================ */}

            <div className="mb-6 space-y-2 pr-12">

              <h3
                id="service-modal-title"
                className="text-2xl font-bold text-slate-100"
              >
                {selectedService.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-400">
                {selectedService.description}
              </p>

            </div>

            {/* ================================ */}
            {/* KEY DELIVERABLES */}
            {/* ================================ */}

            <div className="space-y-3">

              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Key Deliverables
              </h4>

              {/* Deliverables List */}

              {selectedService.features?.length > 0 && (
                <ul className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950 p-4">

                  {selectedService.features.map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-xs text-slate-200"
                      >

                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                        <span>{feature}</span>

                      </li>
                    )
                  )}

                </ul>
              )}

              {/* ============================== */}
              {/* INTERACTIVE INPUT FORM */}
              {/* ============================== */}

              <form
                onSubmit={handleDeliverableSubmit}
                className="relative z-20 space-y-3 pt-2"
              >

                <div className="space-y-2">

                  <label
                    htmlFor="serviceRequirement"
                    className="block text-xs font-semibold text-slate-300"
                  >
                    Your Service Requirement
                  </label>

                  <input
                    id="serviceRequirement"
                    name="serviceRequirement"
                    type="text"
                    value={deliverableInput}
                    onChange={(event) =>
                      setDeliverableInput(event.target.value)
                    }
                    placeholder="Example: Logo Design"
                    autoComplete="off"
                    className="
                      relative
                      z-30
                      block
                      h-12
                      w-full
                      cursor-text
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-950
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      placeholder:text-slate-500
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-500/20
                      pointer-events-auto
                    "
                  />

                </div>

                {/* Typed Text Preview */}

                {deliverableInput.trim() && (
                  <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3">

                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Your Requirement
                    </p>

                    <p className="mt-1 break-words text-sm text-slate-200">
                      {deliverableInput}
                    </p>

                  </div>
                )}

                {/* Submit Button */}

                <button
                  type="submit"
                  disabled={!deliverableInput.trim()}
                  className="
                    flex
                    min-h-[44px]
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-500
                    px-4
                    py-3
                    text-xs
                    font-bold
                    text-white
                    shadow-lg
                    shadow-indigo-500/20
                    transition-all
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >

                  <Send className="h-4 w-4" />

                  Submit Requirement

                </button>

              </form>

            </div>

            {/* ================================ */}
            {/* DIVIDER */}
            {/* ================================ */}

            <div className="my-5 border-t border-slate-800" />

            {/* ================================ */}
            {/* REQUEST QUOTE BUTTON */}
            {/* ================================ */}

            <button
              type="button"
              onClick={scrollToContact}
              className="
                relative
                z-20
                w-full
                cursor-pointer
                rounded-xl
                bg-gradient-to-r
                from-indigo-500
                to-purple-500
                px-4
                py-3
                text-xs
                font-bold
                text-white
                shadow-lg
                shadow-indigo-500/30
                transition-all
                hover:opacity-90
              "
            >
              Request Custom Quote
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default ServicesSection;