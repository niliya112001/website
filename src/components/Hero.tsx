import React, { useEffect, useState } from 'react';
import { ShieldCheck, HeartPulse, Activity, Sparkles, PhoneCall, CalendarRange } from 'lucide-react';
import { HOSPITAL_INFO } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [stats, setStats] = useState({ years: 0, patients: 0, doctors: 0, beds: 0 });

  useEffect(() => {
    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;

    const targets = { years: 15, patients: 50, doctors: 20, beds: 100 };
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        years: Math.min(Math.round((targets.years / steps) * currentStep), targets.years),
        patients: Math.min(Math.round((targets.patients / steps) * currentStep), targets.patients),
        doctors: Math.min(Math.round((targets.doctors / steps) * currentStep), targets.doctors),
        beds: Math.min(Math.round((targets.beds / steps) * currentStep), targets.beds)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50"
    >
      {/* Dynamic Lighting & Gradient Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/25 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-300/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>

      {/* Floating 3D Decorative Assets */}
      <div className="absolute top-28 right-12 w-16 h-16 bg-white/40 glass-panel rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
        <HeartPulse className="w-8 h-8 text-rose-500 animate-pulse-slow" />
      </div>
      <div className="absolute bottom-16 left-12 w-14 h-14 bg-white/40 glass-panel rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
        <Activity className="w-7 h-7 text-blue-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Textual & Dynamic Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              State-of-the-Art Superspecialty Care
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Your Health, <br className="hidden sm:block" />
              <span className="gradient-text">Our Deepest Commitment</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience elite urology, advanced laparoscopic keyhole surgery, and world-class IVF treatments at <strong>{HOSPITAL_INFO.name}</strong>. Bringing premier clinical protocols and luxury healthcare directly to Begusarai, Bihar.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => onNavigate('appointment')}
                className="relative group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm tracking-wide px-7 py-4 rounded-2xl transition-all duration-300 glow-shadow-blue flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <CalendarRange className="w-4 h-4" />
                Book Appointment Slot
              </button>

              <button
                onClick={() => onNavigate('doctors')}
                className="bg-white/80 hover:bg-white text-slate-800 border border-slate-200/80 hover:border-blue-500/40 font-semibold text-sm tracking-wide px-7 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
              >
                Meet Our Surgeons
              </button>

              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                className="bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold text-sm tracking-wide px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                Emergency Line
              </a>
            </div>

            {/* Key Clinical Trust Badges */}
            <div className="pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 leading-tight">ISO & Government Certified</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 leading-tight">100% Cashless TPA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 leading-tight">Modular Sutureless OT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Glass Dashboard */}
          <div className="lg:col-span-5 relative perspective-1000 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden hover-3d-card transform rotate-y-10 preserve-3d">
              {/* Overlay dynamic lighting inside the card */}
              <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/20 rounded-full filter blur-xl"></div>
              
              {/* Inner details representing modern diagnostics */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest block">NILAYA HEALTHCARE</span>
                    <h3 className="text-xl font-bold tracking-tight">Advanced Robotics & IVF Engine</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <HeartPulse className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Animated Electrocardiogram (ECG) Graphic Path */}
                <div className="my-auto py-4">
                  <svg className="w-full h-24 stroke-white/50 stroke-2 fill-none" viewBox="0 0 400 100">
                    <path
                      d="M 0 50 Q 25 50 50 50 Q 60 50 65 30 T 75 70 T 85 50 L 150 50 Q 160 50 165 20 T 175 80 T 185 50 L 250 50 Q 260 50 265 10 T 275 90 T 285 50 L 400 50"
                      className="stroke-white stroke-[3px] heartbeat-line"
                    />
                  </svg>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-blue-200 font-semibold block uppercase">IVF Success rate</span>
                    <span className="text-lg font-bold tracking-tight">72.4%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-200 font-semibold block uppercase">Laser Recovery</span>
                    <span className="text-lg font-bold tracking-tight">Same Day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Mini Glass Widgets */}
            <div className="absolute -bottom-8 right-4 bg-white/80 glass-panel rounded-2xl p-4 shadow-xl border border-white/40 max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                  <span className="text-pink-600 font-bold text-xs">IVF</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Advanced Embryo</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Cleanroom Setup</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-12 bg-white/80 glass-panel rounded-2xl p-4 shadow-xl border border-white/40 max-w-[200px] animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold text-xs">LASER</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Urosurgery</h4>
                  <p className="text-[10px] text-slate-500 font-medium">No Cut, No Suture</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Counter Stats Container */}
        <div className="mt-10 glass-panel bg-white/60 rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
          <div className="text-center p-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.years}+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Years of Trust</span>
          </div>
          <div className="text-center p-2 pt-6 md:pt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.patients}K+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Happy Patients</span>
          </div>
          <div className="text-center p-2 pt-6 md:pt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.doctors}+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Senior Specialists</span>
          </div>
          <div className="text-center p-2 pt-6 md:pt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.beds}+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Hospital Beds</span>
          </div>
        </div>

      </div>
    </section>
  );
}
