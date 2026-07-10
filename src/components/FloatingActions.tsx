import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageSquare } from 'lucide-react';
import { HOSPITAL_INFO } from '../data';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    // Generate simple WhatsApp api link to chat with the hospital
    const text = encodeURIComponent(`Hello Nilaya Hospital, I want to book an appointment.`);
    window.open(`https://wa.me/91${HOSPITAL_INFO.phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp chat */}
      <button
        onClick={handleWhatsApp}
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer glow-shadow-emerald"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5.5 h-5.5" />
      </button>

      {/* Emergency Call quick dialing */}
      <a
        href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
        className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform glow-shadow-blue md:hidden"
        aria-label="Call Emergency Hotline"
      >
        <Phone className="w-5.5 h-5.5 animate-bounce" />
      </a>

      {/* Back to top scroll tracker */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border border-white/10"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
