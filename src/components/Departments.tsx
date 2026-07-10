import React, { useState } from 'react';
import { DEPARTMENTS } from '../data';
import { Heart, Activity, Stethoscope, Shield, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface DepartmentsProps {
  onNavigate: (sectionId: string) => void;
}

export default function Departments({ onNavigate }: DepartmentsProps) {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-pink-500 animate-pulse-slow" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-emerald-500" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-indigo-500" />;
      default:
        return <Stethoscope className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section
      id="departments"
      className="py-12 bg-gradient-to-b from-blue-50/20 via-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            CLINICAL SPECIALTIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Our Key Clinical Departments
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Equipped with modern diagnostics and senior consultants to address complex urological disorders and reproductive fertility challenges.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEPARTMENTS.map((dept) => {
            const isExpanded = selectedDept === dept.id;

            return (
              <div
                key={dept.id}
                className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover-3d-card flex flex-col justify-between"
              >
                {/* Visual Accent Corner Glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${dept.color} opacity-5 filter blur-xl rounded-tr-3xl group-hover:opacity-15 transition-opacity`}></div>

                <div className="space-y-4">
                  {/* Compact Clinical Image Banner with Overlaid Icon */}
                  {dept.image && (
                    <div className="w-full h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative shrink-0">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 right-2 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200/50 flex items-center justify-center shadow-sm">
                        {React.cloneElement(getIcon(dept.icon), { className: 'w-4 h-4' })}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-extrabold text-slate-950 text-base group-hover:text-blue-600 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
                      {dept.description}
                    </p>
                  </div>

                  {/* Sub-services list removed to keep design compact as requested */}
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => onNavigate('appointment')}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors group/btn cursor-pointer"
                  >
                    Consult Doctor
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Question Helpline */}
        <div className="mt-16 bg-white/70 glass-panel rounded-3xl p-6 border border-white/50 shadow-md max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-5 justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Have questions about a medical department?</h4>
              <p className="text-xs text-slate-500 font-normal">Connect directly with our reception counter for clear guidance.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Inquire Now
          </button>
        </div>

      </div>
    </section>
  );
}
