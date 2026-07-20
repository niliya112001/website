import React, { useEffect, useState } from 'react';
import { ShieldCheck, HeartPulse, Activity, Sparkles, PhoneCall, CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react';
import { HOSPITAL_INFO } from '../data';
import { LOGO_SRC, HERO_BGS, heroBgPlaceholder } from '../assets/images';

interface HeroProps {
  onOpenAppointment: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onOpenAppointment, onNavigate }: HeroProps) {
  const [stats, setStats] = useState({ years: 0, patients: 0, doctors: 0, beds: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Preload background slider images for smooth transitions
  useEffect(() => {
    HERO_BGS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Autoplay slider logic with tab visibility suspension
  useEffect(() => {
    if (HERO_BGS.length <= 1) return;

    let intervalId: any;
    let isTabActive = true;

    const startAutoplay = () => {
      intervalId = setInterval(() => {
        if (isTabActive) {
          setCurrentImageIndex((prev) => (prev + 1) % HERO_BGS.length);
        }
      }, 5000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabActive = false;
        clearInterval(intervalId);
      } else {
        isTabActive = true;
        startAutoplay();
      }
    };

    startAutoplay();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;

    const targets = { years: 1, patients: 5, doctors: 2, beds: 20 };
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

  const sliderImages = HERO_BGS.length > 0 ? HERO_BGS : [heroBgPlaceholder];

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 group"
    >
      {/* 1. Dynamic Background Image Slider (Layer 0 - Bottom) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {sliderImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* 2. Soft white/blue gradient overlay (Layer 1) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-blue-50/85 to-indigo-50/90 z-[2] pointer-events-none select-none"></div>

      {/* 3. Center aligned large logo watermark (Layer 2) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[3]">
        <img
          src={LOGO_SRC}
          alt=""
          aria-hidden="true"
          className="w-[280px] h-[280px] sm:w-[580px] sm:h-[580px] lg:w-[800px] lg:h-[800px] object-contain opacity-[0.09] blur-[1px]"
        />
      </div>

      {/* 4. Previous and Next arrows on hover (Layer 3) */}
      {sliderImages.length > 1 && (
        <>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[10] p-3 rounded-full bg-white/40 hover:bg-white/70 text-slate-800 transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] p-3 rounded-full bg-white/40 hover:bg-white/70 text-slate-800 transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* 5. Slider indicators (Layer 3) */}
      {sliderImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[10]">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                index === currentImageIndex ? 'bg-blue-600 w-6' : 'bg-slate-400/50 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

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
                onClick={onOpenAppointment}
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

          {/* Right Column: Floating 3D Premium Medical Dashboard */}
          <div className="lg:col-span-5 relative perspective-1000 flex justify-center py-8 lg:py-0">
            {/* Ambient Background Glow Blooms */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/25 rounded-full filter blur-[80px] pointer-events-none animate-pulse-slow"></div>
            <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/20 rounded-full filter blur-[90px] pointer-events-none"></div>

            {/* The Main 3D Card Panel with Premium CSS classes */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/4.5] premium-dashboard-card p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              
              {/* Radial reflection & lighting overlays (Top and Bottom glow gradients) */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(98,150,255,.55), transparent 55%)' }}></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(110,60,255,.45), transparent 50%)' }}></div>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
              
              {/* Premium sweep shine effect overlay */}
              <div className="absolute inset-0 animate-shine pointer-events-none mix-blend-overlay"></div>

              {/* Card Header */}
              <div className="flex justify-between items-start translate-z-30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute"></span>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest pl-1">Live Telemetry</span>
                  </div>
                  <h3 className="font-extrabold text-[28px] sm:text-[32px] lg:text-[40px] leading-tight tracking-tight text-white mt-1.5">NILAYA UROSTONE
& GYNAE-IVF HOSPITAL</h3>
                </div>
                
                {/* Heart Button */}
                <div className="w-10 h-10 rounded-xl heart-icon-button flex items-center justify-center border border-white/20 select-none">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* ECG Line (Futuristic Glowing Line Drawing) */}
              <div className="my-auto py-2 translate-z-20 flex flex-col justify-center">
                <div className="flex justify-between items-center px-2 mb-2">
                  <span className="text-[9px] font-semibold text-white/70 uppercase tracking-wider">Cardiac Telemetry</span>
                  <span className="text-xs font-mono text-cyan-300 animate-pulse font-bold">78 BPM</span>
                </div>
                <div className="relative h-20 bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-2">
                  <svg className="w-full h-full stroke-blue-500 stroke-2 fill-none overflow-visible" viewBox="0 0 400 100">
                    <path
                      d="M 0 50 Q 25 50 50 50 Q 60 50 65 20 T 75 80 T 85 50 L 150 50 Q 160 50 165 10 T 175 90 T 185 50 L 250 50 Q 260 50 265 30 T 275 70 T 285 50 L 400 50"
                      className="stroke-blue-950/40 stroke-[2px]"
                    />
                    <path
                      d="M 0 50 Q 25 50 50 50 Q 60 50 65 20 T 75 80 T 85 50 L 150 50 Q 160 50 165 10 T 175 90 T 185 50 L 250 50 Q 260 50 265 30 T 275 70 T 285 50 L 400 50"
                      className="stroke-cyan-400 stroke-[3px] ecg-path"
                    />
                  </svg>
                </div>
              </div>

              {/* Badges / Indicators */}
              <div className="grid grid-cols-2 gap-3 mb-4 translate-z-20">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between shadow-inner">
                  <span className="text-[9px] text-white/70 font-bold uppercase tracking-wider block">IVF Success Rate</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-pink-400">72.4%</span>
                    <span className="text-[10px] text-pink-300 font-bold">Max</span>
                  </div>
                  <span className="text-[8px] font-semibold text-white/50 mt-0.5 block">EMBRYOLOGY CERTIFIED</span>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between shadow-inner">
                  <span className="text-[9px] text-white/70 font-bold uppercase tracking-wider block">Laser Recovery</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-cyan-300">Same-Day</span>
                  </div>
                  <span className="text-[8px] font-semibold text-white/50 mt-0.5 block">SUTURELESS / NO CUT</span>
                </div>
              </div>

              {/* Bottom Specs Badge Strip */}
              <div className="flex gap-2 justify-between border-t border-white/5 pt-4 translate-z-10">
                <span className="bg-white/10 border border-white/15 text-[9px] font-bold text-white rounded-lg px-2 py-1 uppercase tracking-wider select-none">UROLOGY ACTIVE</span>
                <span className="bg-white/10 border border-white/15 text-[9px] font-bold text-white rounded-lg px-2 py-1 uppercase tracking-wider select-none">IVF LAB SECURE</span>
                <span className="bg-white/10 border border-white/15 text-[9px] font-bold text-white rounded-lg px-2 py-1 uppercase tracking-wider select-none">LASER ENGAGED</span>
              </div>
            </div>

            {/* Overlapping Floating Mini 3D Glass Cards */}
            {/* Card 1: Holmium Laser */}
            <div className="absolute -top-6 -left-8 floating-glass-card rounded-2xl p-3.5 max-w-[170px] z-10 select-none pointer-events-none" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                  <span className="text-blue-600 font-extrabold text-[10px]">LASER</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 leading-tight">Holmium Laser</h4>
                  <p className="text-[9px] text-slate-500 font-medium mt-0.5">Kidney Stone Removal</p>
                </div>
              </div>
            </div>

            {/* Card 2: IVF Cleanroom */}
            <div className="absolute -bottom-6 -right-6 floating-glass-card rounded-2xl p-3.5 max-w-[170px] z-10 select-none pointer-events-none" style={{ animationDelay: '1.2s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center shrink-0 border border-pink-200">
                  <span className="text-pink-600 font-extrabold text-[10px]">IVF</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 leading-tight">IVF Cleanroom</h4>
                  <p className="text-[9px] text-slate-500 font-medium mt-0.5">Advanced Embryology</p>
                </div>
              </div>
            </div>

            {/* Card 3: Robotic Surgery */}
            <div className="absolute top-1/2 -right-12 floating-glass-card rounded-2xl p-3.5 max-w-[170px] z-10 select-none pointer-events-none" style={{ animationDelay: '2.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                  <span className="text-emerald-600 font-extrabold text-[10px]">URO</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 leading-tight">Advanced Urology</h4>
                  <p className="text-[9px] text-slate-500 font-medium mt-0.5">Minimal Blood Loss</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Counter Stats Container */}
        <div className="mt-10 glass-panel bg-white/60 rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
          <div className="text-center p-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.years}+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Year of Trust</span>
          </div>
          <div className="text-center p-2 pt-6 md:pt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.patients}K+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Happy Patients</span>
          </div>
          <div className="text-center p-2 pt-6 md:pt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block">{stats.doctors}+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1 block">Specialists</span>
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
