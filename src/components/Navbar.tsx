import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Heart, Award, ShieldAlert, Calendar } from 'lucide-react';
import { HOSPITAL_INFO } from '../data';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    setAboutDropdownOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-900/85 backdrop-blur-md shadow-lg border-b border-white/10 py-3 text-white'
          : 'bg-white/70 backdrop-blur-sm border-b border-black/5 py-4 text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand */}
          <div
            id="nav-brand"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleLinkClick('home')}
          >
            <div className="relative flex items-center justify-center w-11 h-11 bg-blue-600 rounded-xl glow-shadow-blue transform group-hover:rotate-12 transition-transform duration-300">
              <Heart className="text-white w-6 h-6 animate-pulse-slow" />
              <div className="absolute inset-0 bg-blue-500 rounded-xl filter blur-sm opacity-30 -z-10 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <div>
              <span className={`font-bold text-lg leading-tight tracking-tight block ${isScrolled ? 'text-white' : 'text-slate-900'}`}>
                NILAYA
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-500 block">
                Urostone & IVF Hospital
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-nav-menu" className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleLinkClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'home'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Interactive Dropdown for About Us (About Hospital, Managing Directors, Why Choose Us) */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection.startsWith('about') || activeSection === 'directors' || activeSection === 'why-choose'
                    ? 'text-blue-500 font-semibold'
                    : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                About Us
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Glassmorphic Dropdown List */}
              {aboutDropdownOpen && (
                <div className={`absolute top-full left-0 w-56 mt-1 rounded-xl shadow-2xl border p-2 transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-slate-900/95 border-white/10 text-white' 
                    : 'bg-white/95 border-slate-200 text-slate-800'
                }`}>
                  <button
                    onClick={() => handleLinkClick('about-hospital')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                      isScrolled ? 'hover:bg-white/10 text-slate-200 hover:text-white' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    <Heart className="w-4 h-4 text-blue-500" />
                    About Hospital
                  </button>
                  <button
                    onClick={() => handleLinkClick('about-directors')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                      isScrolled ? 'hover:bg-white/10 text-slate-200 hover:text-white' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    <Award className="w-4 h-4 text-blue-500" />
                    Managing Directors
                  </button>
                  <button
                    onClick={() => handleLinkClick('about-why-choose')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                      isScrolled ? 'hover:bg-white/10 text-slate-200 hover:text-white' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-blue-500" />
                    Why Choose Us
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('departments')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'departments'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Departments
            </button>

            <button
              onClick={() => handleLinkClick('services')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'services'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleLinkClick('doctors')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'doctors'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Doctors
            </button>

            <button
              onClick={() => handleLinkClick('gallery')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'gallery'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Gallery
            </button>

            <button
              onClick={() => handleLinkClick('updates')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'updates'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Latest Updates
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'contact'
                  ? 'text-blue-500 font-semibold'
                  : isScrolled
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Emergency Call & Book CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
              className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              EMERGENCY: {HOSPITAL_INFO.emergencyPhone}
            </a>

            <button
              onClick={() => handleLinkClick('appointment')}
              className="relative group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide px-5 py-2.5 rounded-xl transition-all duration-300 glow-shadow-blue flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              BOOK APPOINTMENT
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center lg:hidden space-x-3">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
              className="flex items-center bg-rose-500 text-white p-2.5 rounded-xl glow-shadow-blue"
              aria-label="Emergency Call"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl border cursor-pointer ${
                isScrolled 
                  ? 'text-white border-white/20 hover:bg-white/10' 
                  : 'text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-panel-dark text-white border-b border-white/10 py-6 px-4 space-y-3 shadow-2xl animate-fade-in animate-duration-300">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLinkClick('home')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about-hospital')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              About Hospital
            </button>
            <button
              onClick={() => handleLinkClick('about-directors')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Directors Msg
            </button>
            <button
              onClick={() => handleLinkClick('about-why-choose')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleLinkClick('departments')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Departments
            </button>
            <button
              onClick={() => handleLinkClick('services')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleLinkClick('doctors')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Doctors
            </button>
            <button
              onClick={() => handleLinkClick('gallery')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => handleLinkClick('updates')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Latest Updates
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => handleLinkClick('appointment')}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center block shadow-lg glow-shadow-blue cursor-pointer"
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
