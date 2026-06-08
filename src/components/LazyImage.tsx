import { useState, useEffect, useRef, ReactNode } from 'react';
import { Leaf } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackBg?: string; // Tailwind gradient classes e.g. 'from-orange-400 to-orange-600'
  accentColor?: string; // Hex code for specific subtle outlines or labels
  onLoadStatusChange?: (isLoaded: boolean) => void;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  fallbackBg = 'from-brand-orange-500 to-brand-mango-500',
  accentColor = '#ea580c',
  onLoadStatusChange
}: LazyImageProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Implement standard IntersectionObserver API with threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // start loading images 100px before copy reaches viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoadStatusChange) {
      onLoadStatusChange(true);
    }
  };

  const handleImageError = () => {
    setIsError(true);
    if (onLoadStatusChange) {
      onLoadStatusChange(true); // Treat as completed to satisfy load metrics
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-50/50 ${className}`}
    >
      {/* SKELETON WIREFRAME WHILE NOT YET LOADED AND NO ERROR */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-slate-50/80 p-5 flex flex-col justify-between z-10 select-none">
          {/* Top layout skeleton block */}
          <div className="flex justify-between items-start">
            <span className="w-20 h-4 bg-slate-200/80 rounded-full animate-pulse" />
            <span className="w-10 h-3.5 bg-slate-200/80 rounded animate-pulse" />
          </div>

          {/* Golden/Orange ripple shimmer wave representing juice container density */}
          <div className="relative w-full h-1 bg-slate-200/40 overflow-hidden rounded-full">
            <div className="absolute inset-y-0 -left-[100%] w-full bg-gradient-to-r from-transparent via-brand-orange-400/25 to-transparent animate-shimmer" />
          </div>

          {/* Bottom layout skeleton block */}
          <div className="flex justify-between items-center">
            <span className="w-24 h-3 bg-slate-200/80 rounded animate-pulse" />
            <span className="w-7 h-7 bg-slate-200/80 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* DYNAMIC IMAGE RENDER - TRIGGERS ONLY WHEN INTERSECTING AND VALID */}
      {isIntersected && !isError && src && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`h-full max-h-[220px] object-contain transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
          }`}
        />
      )}

      {/* POLISHED EMBEDDED CARTON ART FOR FAILURE STATES (replaces default broken-link box) */}
      {(isError || !src) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-radial from-orange-50/15 via-white to-white animate-fadeIn">
          {/* A bespoke, minimal geometric carton pack */}
          <div className="relative w-16 h-30 flex flex-col justify-end p-1.5 rounded-t-xl rounded-b-3xl bg-white border-2 border-brand-green-100/60 shadow-xs group-hover:scale-105 transition-transform duration-500">
            
            {/* Liquid content fill gradient representing brand's freshness theme */}
            <div className={`w-full h-[85%] rounded-b-2xl bg-gradient-to-t ${fallbackBg} opacity-90 flex flex-col items-center justify-center p-1`}>
              <Leaf className="w-5 h-5 text-white/30 mb-0.5 animate-pulse" />
              <span className="text-[6.5px] font-mono font-black text-white/70 tracking-widest uppercase text-center block leading-none">
                Fresh Press
              </span>
            </div>

            {/* Simulated bottle top cap styled matching the brand flavor */}
            <div 
              className="absolute -top-1 right-2.5 w-4 h-2.5 rounded-t-sm border-t border-x border-brand-green-100/50"
              style={{ backgroundColor: accentColor }}
            />
          </div>
          
          <span className="mt-2.5 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
            FRUTELLI PURE DRINK
          </span>
        </div>
      )}
    </div>
  );
}
