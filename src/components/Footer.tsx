import React from 'react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data';
import { LOGO_SRC, HAS_LOGO } from '../assets/images';
import { Heart, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & tagline */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
              {HAS_LOGO ? (
                <img
                  src={LOGO_SRC}
                  alt={HOSPITAL_INFO.shortName}
                  className="h-10 w-10 object-contain rounded-xl"
                />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <HeartPulse className="text-white w-5 h-5 animate-pulse-slow" />
                </div>
              )}
              <div>
                <span className="font-extrabold text-base leading-none block tracking-tight">NILAYA</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-blue-400 block mt-0.5">
                  Urostone & IVF Hospital
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              State-of-the-art multi-specialty healthcare delivering bloodless urological lasers, modular infection-free operations, and childless IVF treatments in Begusarai, Bihar.
            </p>

            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Certified Licenced Healthcare Provider</span>
            </div>
          </div>

          {/* Col 2: Quick Sections */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Links</h4>
            <ul className="space-y-2.5">
              {['home', 'about-hospital', 'about-directors', 'about-why-choose', 'doctors', 'gallery', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1 group capitalize"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-500 transition-colors" />
                    {id.replace('about-', '').replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Departments</h4>
            <ul className="space-y-2.5">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => onNavigate('departments')}
                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-500 transition-colors" />
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Hotlines & Support */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">OPD & Support</h4>
            <div className="space-y-3.5 text-xs text-slate-400 font-normal">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="leading-relaxed">{HOSPITAL_INFO.address}</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.phone}`} className="font-bold text-white hover:underline">
                  +91 {HOSPITAL_INFO.phone}
                </a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href={`mailto:${HOSPITAL_INFO.email}`} className="hover:underline">
                  {HOSPITAL_INFO.email}
                </a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{HOSPITAL_INFO.workingHours.split(' | ')[0]}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {currentYear} {HOSPITAL_INFO.name}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-slate-300">Privacy Policy</a>
            <span className="text-slate-700">|</span>
            <a href="#about" className="hover:text-slate-300">Clinical Guidelines</a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-600">Reg: 61688 / 64199</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
