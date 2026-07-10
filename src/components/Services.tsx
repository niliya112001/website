import React from 'react';
import { SERVICES } from '../data';
import { Flame, Sparkles, Layers, Thermometer, CreditCard, FlameKindling, ShieldCheck, Heart } from 'lucide-react';

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'FlameKindling':
        return <FlameKindling className="w-5 h-5 text-pink-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'Thermometer':
        return <Thermometer className="w-5 h-5 text-indigo-500" />;
      default:
        return <CreditCard className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section
      id="services"
      className="py-12 bg-gradient-to-tr from-slate-50 via-blue-50/10 to-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            OUR CORE FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Specialized Care & Hospital Services
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Designed to support premium urological surgeries, high-resolution color Dopplers, and customized assisted reproductive protocols under extreme safety standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="group relative bg-white/75 glass-panel rounded-3xl p-6 sm:p-8 border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 hover-3d-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Compact Service Image with overlaid Icon and Tag */}
                {svc.image && (
                  <div className="w-full h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative shrink-0">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Overlaid Icon Badge */}
                    <div className="absolute bottom-2 left-2 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200/50 flex items-center justify-center shadow-sm">
                      {React.cloneElement(getIcon(svc.icon), { className: 'w-4 h-4' })}
                    </div>
                    {/* Overlaid Tag */}
                    {svc.tag && (
                      <span className="absolute top-2 right-2 text-[9px] font-extrabold text-slate-800 bg-white/95 backdrop-blur-sm border border-slate-200/50 px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                        {svc.tag}
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-slate-950 text-base group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
                    {svc.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hospital Assured</span>
                </div>

                <button
                  onClick={() => onNavigate('appointment')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
