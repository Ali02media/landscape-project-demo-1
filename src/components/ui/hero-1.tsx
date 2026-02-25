import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
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
import { StaggerTestimonials } from "./stagger-testimonials";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled || isMobileMenuOpen ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.postimg.cc/Z53zYKNx/lead-landscaper-logo-no-bg.png" 
              alt="Logo" 
              className={cn("h-10 w-auto transition-all", isScrolled || isMobileMenuOpen ? "brightness-100" : "brightness-0 invert")}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors hover:text-forest",
                  isScrolled ? "text-slate-600" : "text-white"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:07495308444" className="hidden sm:block">
              <Button className="rounded-full bg-forest hover:bg-forest-dark text-white border-none px-6">
                <PhoneCallIcon className="size-4 mr-2" />
                07495 308444
              </Button>
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-full transition-colors md:hidden",
                isScrolled || isMobileMenuOpen ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white transition-all duration-500 md:hidden",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-900 uppercase tracking-widest hover:text-forest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:07495308444" className="w-full">
            <Button className="w-full rounded-full h-16 text-lg font-bold bg-forest hover:bg-forest-dark text-white border-none">
              <PhoneCallIcon className="size-5 mr-2" />
              Call 07495 308444
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}

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
      // On touch devices, buttons might be 0, so we check pointerType or just handle it if it's a move
      // Actually, for a slider, we usually want to track while the pointer is down
      if (e.buttons === 1 || e.pointerType === 'touch') {
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
      className="relative w-full h-[100svh] min-h-[600px] md:min-h-[700px] overflow-hidden flex items-center justify-center select-none"
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
            "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl font-extrabold tracking-tight text-white delay-100 duration-500 ease-out sm:text-5xl md:text-7xl lg:text-8xl",
            "leading-[0.9] drop-shadow-2xl"
          )}
        >
          The Perfect Lawn, <br /> <span className="text-forest-light">All Year Round.</span>
        </h1>

        <div className="fade-in slide-in-from-bottom-10 mt-8 md:mt-12 flex animate-in flex-row flex-wrap items-center justify-center gap-3 md:gap-4 fill-mode-backwards delay-300 duration-500 ease-out">
          <a href="tel:07495308444" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-full h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95" size="lg" variant="secondary">
              <PhoneCallIcon className="size-5 mr-2" />{" "}
              Free Quote
            </Button>
          </a>
          <a href="#services" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-full h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold bg-forest hover:bg-forest-dark border-none shadow-2xl transition-all hover:scale-105 active:scale-95" size="lg">
              Our Services{" "}
              <ArrowRightIcon className="size-5 ms-2" />
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom Slider Control */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-40 px-6 flex flex-col items-center gap-3 md:gap-4">
        <div 
          ref={trackRef}
          className="relative w-full max-w-2xl h-12 md:h-14 bg-transparent cursor-pointer group touch-pan-y"
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-foreground">Why Brighton Homeowners Choose Us</h2>
          <p className="text-muted-foreground">Transforming gardens into year-round living spaces across Central Sussex.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 bg-forest/5 w-16 h-16 rounded-2xl flex items-center justify-center">{card.icon}</div>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
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
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-foreground"
        >
          Our Professional Installation Process
        </motion.h2>
        <div className="grid md:grid-cols-5 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform z-10">
                  {i + 1}
                </span>
                <div className="hidden md:block h-px bg-border flex-grow"></div>
              </div>
              <h3 className="font-bold mb-2 text-lg text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              
              {/* Mobile vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-32px] w-px bg-border md:hidden"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-foreground">Real Feedback from Local Customers</h2>
        <p className="text-center text-muted-foreground mt-4">See why Brighton homeowners trust us with their gardens.</p>
      </div>
      <div className="relative">
        <StaggerTestimonials />
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
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/5 flex items-center justify-center hover:bg-forest transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/5 flex items-center justify-center hover:bg-forest transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
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
