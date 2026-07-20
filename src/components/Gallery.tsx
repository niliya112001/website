import React, { useState, useMemo, useEffect } from 'react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';
import { Play, Image as ImageIcon, Video as VideoIcon, X, Eye, Film, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { HOSPITAL_FACILITY_PHOTOS, ADVANCED_EQUIPMENT_PHOTOS } from '../assets/images';

interface SlideshowComponentProps {
  images: string[];
}

function SlideshowComponent({ images }: SlideshowComponentProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {/* Active Image */}
      <img
        src={images[index]}
        alt={`Slideshow image ${index + 1}`}
        className="w-full h-full object-contain transition-opacity duration-500"
      />

      {/* Prev/Next Buttons */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 p-2.5 rounded-full bg-black/40 hover:bg-black/75 border border-white/10 text-white cursor-pointer transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/75 border border-white/10 text-white cursor-pointer transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Control Strip (Play/Pause, Indicator dot) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/55 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:text-blue-400 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><rect x="4" y="4" width="4" height="16"/><rect x="16" y="4" width="4" height="16"/></svg>
          ) : (
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <span className="text-xs font-mono font-bold text-white select-none">
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'facility' | 'equipment' | 'video'>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  // Memoize collage images, excluding the currently active lightbox image
  const collageImages = useMemo(() => {
    let photos = [...HOSPITAL_FACILITY_PHOTOS, ...ADVANCED_EQUIPMENT_PHOTOS];
    
    if (activeMedia && activeMedia.type === 'image') {
      photos = photos.filter(url => url !== activeMedia.url);
    }

    if (photos.length < 4) return [];

    // Use up to 20 images for the background collage
    const list = photos.slice(0, 20);

    return list.map((src, index) => {
      // Deterministic offsets and rotations based on index
      const seed = Math.sin(index + 1);
      const rotation = (seed * 5).toFixed(1); // -5deg to +5deg
      const offsetX = (Math.cos(index + 1) * 15).toFixed(0); // -15px to +15px
      const offsetY = (Math.sin(index * 2) * 15).toFixed(0); // -15px to +15px

      return {
        src,
        style: {
          transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
        }
      };
    });
  }, [activeMedia]);

  const filteredItems = GALLERY.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section
      id="gallery"
      className="relative py-12 bg-gradient-to-tr from-slate-50 via-slate-100 to-blue-50/10 overflow-hidden"
    >
      {/* 1. Dynamic Background Collage Layer (z-0) */}
      {collageImages.length >= 4 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8 w-full h-full opacity-[0.11] blur-[2px]">
            {collageImages.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/40"
                style={img.style}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Soft white/blue gradient overlay (z-1) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 via-slate-100/90 to-blue-50/90 z-[1] pointer-events-none select-none"></div>

      {/* 3. Content layer (z-2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        
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

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(['all', 'facility', 'equipment', 'video'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-md glow-shadow-blue'
                  : 'bg-white text-slate-600 border border-slate-200/60 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {filter === 'all'
                ? 'All'
                : filter === 'facility'
                ? 'Hospital Facility'
                : filter === 'equipment'
                ? 'Advanced Equipment'
                : 'Videos'}
            </button>
          ))}
        </div>

        {/* GALLERY DISPLAY */}
        {filteredItems.length > 0 ? (
          <div className="space-y-8 animate-fade-in">
            {/* Grid */}
            <div className="masonry-grid max-w-6xl mx-auto">
              {filteredItems.map((item) => {
                if (item.type === 'image') {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveMedia(item)}
                      className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-950 cursor-pointer shadow-md hover:shadow-2xl hover-3d-card border border-white/50"
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Glass Card Details Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                            {item.category === 'facility' ? 'Hospital Facility' : 'Advanced Equipment'}
                          </span>
                          <h4 className="text-xs font-bold mt-1 leading-snug">{item.title}</h4>
                          <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-slate-200 font-semibold">
                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                            <span>Enlarge View</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveMedia(item)}
                      className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-950 cursor-pointer shadow-md hover:shadow-2xl hover-3d-card border border-white/50"
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
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
                        <h4 className="text-xs font-bold mt-1 tracking-tight leading-snug">{item.title}</h4>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <Layers className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-400">No images available.</p>
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
                {activeMedia.url === 'slideshow' ? (
                  <SlideshowComponent images={[...HOSPITAL_FACILITY_PHOTOS, ...ADVANCED_EQUIPMENT_PHOTOS]} />
                ) : activeMedia.type === 'image' ? (
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
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                  {activeMedia.category === 'facility'
                    ? 'Hospital Facility'
                    : activeMedia.category === 'equipment'
                    ? 'Advanced Equipment'
                    : 'Videos'}
                </span>
                <h3 className="text-sm font-bold mt-1 tracking-tight">{activeMedia.title}</h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
