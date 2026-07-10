import React, { useState } from 'react';
import { UPDATES } from '../data';
import { Calendar, Tag, ArrowUpRight, Megaphone, Milestone, Award, Sparkles } from 'lucide-react';

interface LatestUpdatesProps {
  onNavigate: (sectionId: string) => void;
}

export default function LatestUpdates({ onNavigate }: LatestUpdatesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'camp' | 'achievement' | 'health-tip'>('all');

  const filteredUpdates = UPDATES.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'camp':
        return <Megaphone className="w-4 h-4 text-rose-500" />;
      case 'achievement':
        return <Milestone className="w-4 h-4 text-emerald-500" />;
      default:
        return <Award className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section
      id="updates"
      className="py-12 bg-gradient-to-b from-blue-50/10 via-white to-slate-50/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            NEWS & TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Latest Medical Bulletins & Camps
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Stay updated with clinical camp announcements, surgical success telemetry, and health tips published directly by Nilaya specialists.
          </p>
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {(['all', 'camp', 'achievement', 'health-tip'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md glow-shadow-blue'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Updates' : cat === 'camp' ? 'Health Camps' : cat === 'achievement' ? 'Surgical Achievements' : 'Health Advice'}
            </button>
          ))}
        </div>

        {/* Updates List/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredUpdates.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover-3d-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{item.date}</span>
                  </div>
                  
                  {item.tag && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      {getCategoryIcon(item.category)}
                    </div>
                    <h3 className="font-extrabold text-slate-950 text-base leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(item.category === 'camp' ? 'appointment' : 'contact')}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group/btn"
                >
                  {item.category === 'camp' ? 'Register for Camp' : 'Inquire Details'}
                  <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
