import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/src/lib/utils';
import { Button } from "@/src/components/ui/button";
import { 
  ArrowRightIcon, 
  PhoneCallIcon, 
  ShieldCheck,
  Users,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function HeroSection() {
  // Muddy = Before, Green = After
  const muddyImage = "https://i.postimg.cc/rm5LtKBg/before-pic-lanscaper-1-lead-enhanced.jpg";
  const greenImage = "https://i.postimg.cc/xT4Fn9Zp/after-pic-lanscaper-1-lead-upscaled.jpg";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    
    // Direct DOM manipulation for zero-lag performance
    container.style.setProperty('--slider-pos', `${percent}%`);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.buttons === 1) {
        updatePosition(e.clientX);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      updatePosition(e.clientX);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [updatePosition]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center select-none touch-none"
      style={{ '--slider-pos': '50%' } as React.CSSProperties}
    >
      {/* Background Slider Layer */}
      <div className="absolute inset-0 z-0">
        {/* Before Image (Background) */}
        <img 
          src={muddyImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* After Image Overlay */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: 'inset(0 0 0 var(--slider-pos))' }}
        >
          <img 
            src={greenImage} 
            alt="After" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-10" />

        {/* Vertical Divider Line */}
        <div 
          className="absolute inset-y-0 z-20 w-px bg-white/40 backdrop-blur-sm pointer-events-none"
          style={{ left: 'var(--slider-pos)' }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center">
        <div
          className={cn(
            "group mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-1.5 text-white shadow-2xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
          )}
        >
          <ShieldCheck className="size-4 text-forest-light" />
          <span className="text-xs font-semibold uppercase tracking-wider">Sussex's Premier Installers</span>
        </div>

        <h1
          className={cn(
            "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-5xl font-extrabold tracking-tight text-white delay-100 duration-500 ease-out md:text-7xl lg:text-8xl",
            "leading-[0.9] drop-shadow-2xl"
          )}
        >
          The Perfect Lawn, <br /> <span className="text-forest-light">All Year Round.</span>
        </h1>

        <p className="fade-in slide-in-from-bottom-10 mx-auto mt-10 max-w-2xl animate-in fill-mode-backwards text-center text-lg text-white/80 font-medium leading-relaxed delay-200 duration-500 ease-out md:text-xl">
          No mowing, no mud, no maintenance. <br />
          Experience the luxury of a maintenance-free garden today.
        </p>

        <div className="fade-in slide-in-from-bottom-10 mt-12 flex animate-in flex-row flex-wrap items-center justify-center gap-4 fill-mode-backwards delay-300 duration-500 ease-out">
          <a href="tel:07495308444">
            <Button className="rounded-full h-16 px-10 text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95" size="lg" variant="secondary">
              <PhoneCallIcon className="size-5 mr-2" />{" "}
              Free Quote
            </Button>
          </a>
          <a href="#services">
            <Button className="rounded-full h-16 px-10 text-lg font-bold bg-forest hover:bg-forest-dark border-none shadow-2xl transition-all hover:scale-105 active:scale-95" size="lg">
              Our Services{" "}
              <ArrowRightIcon className="size-5 ms-2" />
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom Slider Control */}
      <div className="absolute bottom-12 left-0 right-0 z-40 px-6 flex flex-col items-center gap-4">
        <div 
          ref={trackRef}
          className="relative w-full max-w-2xl h-14 bg-transparent cursor-pointer group"
        >
          {/* Track Labels */}
          <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
            <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest drop-shadow-md">Before</span>
            <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest drop-shadow-md">After</span>
          </div>

          {/* Slider Handle (Arrows) */}
          <div 
            className="absolute top-1/2 w-16 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-forest cursor-ew-resize"
            style={{ 
              left: 'var(--slider-pos)',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="flex items-center gap-0.5 text-forest pointer-events-none">
              <ChevronLeft className="size-5" />
              <ChevronRight className="size-5" />
            </div>
          </div>
        </div>
        
        <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
          Slide to compare transformation
        </p>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const cards = [
    {
      icon: <Users className="w-8 h-8 text-forest" />,
      title: "Pet & Child Friendly",
      desc: "Latest tufting technology with shock-absorption pads. Non-toxic, easy to clean, and completely mud-free."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-forest" />,
      title: "10-Year Guarantee",
      desc: "We only use premium, European-manufactured grass with a 10-year UV warranty. Over 15 realistic varieties."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-forest" />,
      title: "Expert Installation",
      desc: "Our local Sussex team handles everything from deep base preparation to precision edge fixing."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-foreground">Why Brighton Homeowners Choose Us</h2>
          <p className="text-muted-foreground">Transforming gardens into year-round living spaces across Central Sussex.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div 
              key={i}
              className="bg-background p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 bg-forest/5 w-16 h-16 rounded-2xl flex items-center justify-center">{card.icon}</div>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    { title: "Site Analysis", desc: "Measuring site shape and size, accounting for trees and garden structures." },
    { title: "Base Preparation", desc: "Removing topsoil, digging to 9-10cm, adding crusher material and compacting." },
    { title: "Edge Fixing", desc: "Installation of wooden, concrete, or metal edges to secure the grass." },
    { title: "Precision Fitting", desc: "Expert cutting and shaping around contours and trees for a seamless look." },
    { title: "Finishing", desc: "Joining rolls with heat-resistant adhesive and adding infill for stability." }
  ];

  return (
    <section id="process" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-foreground">Our Professional Installation Process</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                  {i + 1}
                </span>
                <div className="h-px bg-border flex-grow md:hidden lg:block"></div>
              </div>
              <h3 className="font-bold mb-2 text-lg text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const reviews = [
    { 
      name: "Sally Hill", 
      area: "Hove", 
      text: "We have a lower ground flat with a small garden that we wanted tidying up. A lot of the other companies did not want to take the job on, but Mark and Anthony did a splendid job and were cheerful and very helpful." 
    },
    { 
      name: "Zak Donnelly", 
      area: "Brighton", 
      text: "Artificial Grass Brighton did a terrific job laying our new lawn and tidying up the back garden. Very pleased with the results" 
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-foreground">Real Feedback from Local Customers</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-background p-10 rounded-3xl shadow-sm border border-border relative">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-foreground/90 italic mb-8 text-lg leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center text-forest font-bold">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{rev.name}</p>
                  <p className="text-xs text-forest font-semibold uppercase tracking-widest">{rev.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const MapPin = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  );
  const Mail = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  );
  const Phone = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  );

  return (
    <footer className="bg-foreground text-background py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <div className="col-span-1">
            <img 
              src="https://i.postimg.cc/Z53zYKNx/lead-landscaper-logo-no-bg.png" 
              alt="Artificial Grass Brighton Logo" 
              className="h-16 w-auto object-contain brightness-0 invert mb-8"
              referrerPolicy="no-referrer"
            />
            <p className="text-background/60 leading-relaxed mb-8">
              Sussex's leading specialists in premium artificial lawn installation. Proudly serving Brighton, Hove, Worthing, and Haywards Heath.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-8">Service Areas</h4>
            <ul className="space-y-4 text-background/60">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-forest-light" /> Brighton & Hove</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-forest-light" /> Eastbourne & Worthing</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-forest-light" /> Haywards Heath</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-forest-light" /> Central Sussex</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-8">Contact Us</h4>
            <ul className="space-y-4 text-background/60">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-forest-light" /> 
                <a href="tel:07495308444" className="hover:text-background transition-colors">07495 308444</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-forest-light" /> 
                <a href="mailto:hello@artificialgrassbrighton.org.uk" className="hover:text-background transition-colors text-sm">hello@artificialgrassbrighton.org.uk</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-background/40">
          <p>© 2024 Artificial Grass Brighton. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-forest rounded-full"></span>
            Expert Installation Across Sussex
          </div>
        </div>
      </div>
    </footer>
  );
}
