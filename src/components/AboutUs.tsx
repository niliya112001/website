import React, { useState } from 'react';
import { HOSPITAL_INFO, DIRECTORS, DOCTORS, WHY_CHOOSE_US } from '../data';
import { Target, Eye, Shield, Users, ArrowRight, ChevronDown, Award, Zap, TrendingUp, Cpu, Landmark, Sparkles } from 'lucide-react';

interface AboutUsProps {
  initialTab?: 'hospital' | 'directors' | 'why-choose';
  key?: string;
}

export default function AboutUs({ initialTab = 'hospital' }: AboutUsProps) {
  const [activeTab, setActiveTab] = useState<'hospital' | 'directors' | 'why-choose'>(initialTab);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabsInfo = {
    hospital: {
      label: 'About Nilaya Hospital',
      icon: <Landmark className="w-5 h-5 text-blue-500" />,
      tagline: 'Our Clinical Journey & Legacy of Trust'
    },
    directors: {
      label: 'Managing Directors',
      icon: <Users className="w-5 h-5 text-pink-500" />,
      tagline: 'Visionary Leaders & Chief Medical Officers'
    },
    'why-choose': {
      label: 'Why Choose Us',
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      tagline: 'A Higher Standard of Medical Excellence'
    }
  };

  const handleDropdownSelect = (tab: 'hospital' | 'directors' | 'why-choose') => {
    setActiveTab(tab);
    setDropdownOpen(false);
  };

  return (
    <section
      id="about"
      className="py-12 bg-gradient-to-tr from-slate-50 via-slate-100 to-blue-50/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            ABOUT OUR ORGANISATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Dedicated to Healing, Inspired by Innovation
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Nilaya Hospital is Begusarai's premier destination for advanced clinical urology and assisted reproductive IVF technologies.
          </p>
        </div>

        {/* CUSTOM DROPDOWN SELECTOR FOR ABOUT US CATEGORIES (MANDATED REQUIREMENT) */}
        <div className="relative max-w-md mx-auto mb-6 z-30">
          <label className="block text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">
            Select Information Category
          </label>
          
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl glass-panel text-slate-800 font-bold text-sm tracking-wide shadow-lg border border-white hover:border-blue-500/20 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50">
                {tabsInfo[activeTab].icon}
              </div>
              <div className="text-left">
                <span className="block font-bold text-slate-900">{tabsInfo[activeTab].label}</span>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{tabsInfo[activeTab].tagline}</span>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Collapsible Dropdown List */}
          {dropdownOpen && (
            <div className="absolute top-[105%] left-0 right-0 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-100 p-2 space-y-1 z-40 animate-fade-in">
              {Object.keys(tabsInfo).map((tabKey) => {
                const key = tabKey as 'hospital' | 'directors' | 'why-choose';
                return (
                  <button
                    key={key}
                    onClick={() => handleDropdownSelect(key)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      activeTab === key
                        ? 'bg-blue-600/10 text-blue-600 border border-blue-500/15'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-100">
                      {tabsInfo[key].icon}
                    </div>
                    <div>
                      <span className="block font-bold text-xs">{tabsInfo[key].label}</span>
                      <span className="block text-[9px] text-slate-400">{tabsInfo[key].tagline}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Section Contents with animations */}
        <div className="relative min-h-[350px]">
          
          {/* TAB 1: ABOUT HOSPITAL */}
          {activeTab === 'hospital' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in">
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-sm aspect-video sm:aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group hover-3d-card">
                  <img
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600"
                    alt="Nilaya Hospital Building"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">SUPER-SPECIALTY INFRASTRUCTURE</span>
                    <h3 className="text-lg font-bold tracking-tight">NH-31 Begusarai Center</h3>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-6 -right-4 bg-white/90 glass-panel rounded-2xl p-4 shadow-xl border border-white/50 max-w-[150px] text-center">
                  <span className="text-2xl font-black text-blue-600 block">NABL</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase leading-none block mt-0.5">In-house pathology standard</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block">OUR FOUNDATION MESSAGE</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Providing Trust & Healing for Generations</h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Nilaya Urostone & Gynae-IVF Hospital was founded on the bedrock of compassion and medical integrity. We identified a critical gap in super-specialty medical diagnostics in Begusarai and took the lead to establish a state-of-the-art medical theater.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Today, we stand proud as a premier center that performs sutureless Holmium laser operations and delivers advanced clinical solutions for childless couples through state-of-the-art IVF incubation.
                </p>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Our Mission</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                      To provide elite clinical outcomes, zero compromise on infection controls, and highly ethical treatments for patients across Bihar.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center mb-3">
                      <Eye className="w-5 h-5 text-pink-500" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Our Vision</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                      To be the ultimate benchmark in reproductive technologies and surgical urology in Northern India, inspiring utmost community trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGING DIRECTORS */}
          {activeTab === 'directors' && (
            <div className="space-y-12 animate-fade-in">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">LEADERSHIP MESSAGES</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Guided by Elite Surgeons</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DIRECTORS.map((director, idx) => {
                  // Find corresponding doctor records to extract qualifications
                  const doctorRecord = DOCTORS.find(d => d.name === director.name);
                  
                  return (
                    <div
                      key={idx}
                      className="glass-panel bg-white/70 rounded-3xl p-6 sm:p-8 border border-white shadow-xl hover-3d-card flex flex-col md:flex-row gap-6 items-start"
                    >
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-200/60 shadow-md">
                        <img
                          src={director.avatar}
                          alt={director.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="text-lg font-bold text-slate-950 block">{director.name}</h4>
                          <span className="text-xs font-semibold text-blue-600 tracking-wide block">{director.designation}</span>
                          {doctorRecord && (
                            <p className="text-[10px] font-bold text-slate-400 mt-1 block tracking-tight uppercase">
                              {doctorRecord.qualifications[1]}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 italic leading-relaxed font-normal">
                          "{director.message}"
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Signature Verified</span>
                            <span className="font-mono text-sm text-slate-500 font-semibold">{director.signature}</span>
                          </div>
                          
                          <button
                            onClick={() => scrollToSection('doctors')}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Full Credentials
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WHY CHOOSE US */}
          {activeTab === 'why-choose' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in">
              <div className="lg:col-span-5 relative flex justify-center order-last lg:order-first">
                <div className="w-full max-w-sm glass-panel bg-white/80 p-8 rounded-3xl border border-white/60 shadow-2xl relative space-y-6">
                  <div className="absolute -top-10 -left-6 w-20 h-20 bg-emerald-500/10 rounded-full filter blur-xl"></div>
                  
                  <div className="text-center pb-4 border-b border-slate-100">
                    <span className="text-4xl font-black text-emerald-500 block">100%</span>
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-widest mt-1 block">Patient Compliance</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-semibold text-slate-700">Zero Surgical infection record</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-semibold text-slate-700">Verified medical license & registrations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-semibold text-slate-700">Digital hormone tracking telemetry</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-semibold text-slate-700">Direct consultations with Chief Surgeons</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">OUR COMPETITIVE ADVANTAGE</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Engineered for Safer, Successful Treatments</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {WHY_CHOOSE_US.map((item) => {
                    let iconEl = <Award className="w-5 h-5 text-blue-500" />;
                    if (item.icon === 'Zap') iconEl = <Zap className="w-5 h-5 text-amber-500" />;
                    if (item.icon === 'TrendingUp') iconEl = <TrendingUp className="w-5 h-5 text-pink-500" />;
                    if (item.icon === 'Cpu') iconEl = <Cpu className="w-5 h-5 text-purple-500" />;

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                          {iconEl}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-center sm:justify-start">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    Get Clinic Directions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
