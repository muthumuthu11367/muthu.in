import React, { useState } from 'react';
import { Layers, Cloud, Palette, Cpu, Check, ArrowRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ServicesSection = () => {
  const { services, sectionTitles } = useData();
  const [selectedService, setSelectedService] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const PREVIEW_LIMIT = 4;
  const displayedServices = isExpanded ? services : services.slice(0, PREVIEW_LIMIT);

  const getServiceIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'cloud': return Cloud;
      case 'palette': return Palette;
      case 'cpu': return Cpu;
      default: return Layers;
    }
  };

  const scrollToContact = () => {
    setSelectedService(null);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <section id="services" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-1 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Offerings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 leading-tight break-words">
            {sectionTitles.services || 'Specialised Engineering Services'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto break-words">
            {sectionTitles.servicesSubtitle || 'Tailored software solutions, cloud architecture engineering, and bespoke UI design systems for high-growth ventures.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedServices.map((srv) => {
            const IconComponent = getServiceIcon(srv.iconName);
            return (
              <div
                key={srv.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/50 transition-all hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {srv.features?.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedService(srv)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {services.length > PREVIEW_LIMIT && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 active:scale-95 min-h-[44px]"
            >
              <span>{isExpanded ? 'Show Less Specialized Services' : `Show More Specialized Services (${services.length - PREVIEW_LIMIT} hidden)`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto bg-slate-950/80">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative my-auto z-[100000] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-100">{selectedService.title}</h3>
              <p className="text-xs text-slate-400">{selectedService.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Key Deliverables</h4>
              <ul className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {selectedService.features?.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/30"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      )}
    </section>
  );
};