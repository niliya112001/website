import React, { useState } from 'react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';
import { Play, Image as ImageIcon, Video as VideoIcon, X, Eye, Film, Layers } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [imageFilter, setImageFilter] = useState<'all' | 'facility' | 'equipment'>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const images = GALLERY.filter(item => item.type === 'image');
  const videos = GALLERY.filter(item => item.type === 'video');

  const filteredImages = images.filter(img => {
    if (imageFilter === 'all') return true;
    return img.category === imageFilter;
  });

  return (
    <section
      id="gallery"
      className="py-12 bg-gradient-to-tr from-slate-50 via-slate-100 to-blue-50/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-600/10 px-3.5 py-1.5 rounded-full">
            HOSPITAL TOURS & EXHIBITS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Our Digital Gallery & Media tours
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Take a virtual tour of our diagnostic center, clinical consultation cabins, embryology incubators, and cleanroom facilities.
          </p>
        </div>

        {/* Media Switcher Buttons */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex gap-1.5 border border-slate-300/30">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-blue-600 text-white shadow-md glow-shadow-blue'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Image Gallery ({images.length})
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white shadow-md glow-shadow-blue'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <VideoIcon className="w-4 h-4" />
              Video Gallery ({videos.length})
            </button>
          </div>
        </div>

        {/* IMAGE GALLERY DISPLAY */}
        {activeTab === 'image' && (
          <div className="space-y-8 animate-fade-in">
            {/* Category Sub-Filters */}
            <div className="flex justify-center gap-2">
              {(['all', 'facility', 'equipment'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setImageFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                    imageFilter === filter
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200/60 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {filter === 'all' ? 'All Images' : filter === 'facility' ? 'Hospital Facilities' : 'Advanced Equipment'}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid max-w-6xl mx-auto">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setActiveMedia(img)}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-950 cursor-pointer shadow-md hover:shadow-2xl hover-3d-card border border-white/50"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Glass Card Details Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">{img.category}</span>
                      <h4 className="text-xs font-bold mt-1 leading-snug">{img.title}</h4>
                      <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-slate-200 font-semibold">
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span>Enlarge View</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEO GALLERY DISPLAY */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveMedia(vid)}
                className="group relative rounded-3xl overflow-hidden aspect-video bg-slate-950 cursor-pointer shadow-lg hover:shadow-2xl hover-3d-card border border-white"
              >
                {vid.thumbnail && (
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                
                {/* Dark overlay & Play overlay */}
                <div className="absolute inset-0 bg-slate-950/45 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 relative z-10 glow-shadow-blue">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Subtitle / Title Strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-5 text-white">
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block flex items-center gap-1">
                    <Film className="w-3.5 h-3.5" />
                    Interactive Video Review
                  </span>
                  <h4 className="text-xs font-bold mt-1 tracking-tight leading-snug">{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MEDIA LIGHTBOX / MODAL VIEWER */}
        {activeMedia && (
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative space-y-4">
              
              {/* Media Block rendering */}
              <div className="w-full aspect-[4/3] max-w-3xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                {activeMedia.type === 'image' ? (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={activeMedia.url}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Caption */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full max-w-3xl text-white">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">{activeMedia.category}</span>
                <h3 className="text-sm font-bold mt-1 tracking-tight">{activeMedia.title}</h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
