import React from 'react';
import { DOCTORS } from '../data';
import { Award, Heart, Clipboard, Clock, CheckCircle2, User, Sparkles } from 'lucide-react';

interface DoctorsProps {
  onNavigate: (sectionId: string) => void;
  onSelectDoctor: (doctorName: string) => void;
}

export default function Doctors({ onNavigate, onSelectDoctor }: DoctorsProps) {
  
  const handleBooking = (doctorName: string) => {
    onSelectDoctor(doctorName);
    onNavigate('appointment');
  };

  return (
    <section
      id="doctors"
      className="py-12 bg-gradient-to-b from-slate-50 via-white to-blue-50/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            CLINICAL LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Meet Our Senior Medical Consultants
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Consult directly with board-certified urosurgeons, laparoscopic specialists, and IVF embryology consultants.
          </p>
        </div>

        {/* Doctors Layout - Clean Symmetric Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/80 glass-panel rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 hover:border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover-3d-card flex flex-col justify-between h-full relative overflow-hidden"
            >
              {/* Subtle accent background glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full filter blur-2xl pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                {/* Header with Avatar and basic info */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Doctor Avatar Image */}
                  <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-md">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                  </div>

                  {/* Name and titles */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">{doc.name}</h3>
                        {doc.hindiName && (
                          <span className="text-xs text-slate-400 font-bold tracking-wide mt-0.5 block font-sans">
                            {doc.hindiName}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-blue-600 block">
                      {doc.title}
                    </span>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="space-y-1.5 pb-4 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualifications</span>
                  <ul className="space-y-1">
                    {doc.qualifications.map((q, i) => (
                      <li key={i} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specialties</span>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.specialties.map((s, i) => (
                      <span key={i} className="bg-slate-100 border border-slate-200/50 text-[10px] font-bold text-slate-600 px-2.5 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Past Consultant experience */}
                {doc.pastExperience && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Corporate Background</span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.pastExperience.map((exp, i) => (
                        <span key={i} className="bg-pink-50 text-[10px] font-bold text-pink-700 px-2.5 py-1 rounded-md border border-pink-100/50">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details Card */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{doc.timing}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium sm:border-l sm:border-slate-200 sm:pl-4">
                    <Clipboard className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Reg: No. {doc.regNo}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 relative z-10">
                <button
                  onClick={() => handleBooking(doc.name)}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-1px] cursor-pointer uppercase"
                >
                  Book Slot with {doc.name.split(' ')[1]}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
