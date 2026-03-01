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
    { label: 'Process', href: '#process' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6",
        isScrolled || isMobileMenuOpen ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] py-4" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 satisfying-click">
            <img 
              src="https://i.postimg.cc/Z53zYKNx/lead-landscaper-logo-no-bg.png" 
              alt="Logo" 
              className={cn("h-12 w-auto transition-all duration-500", isScrolled || isMobileMenuOpen ? "brightness-100" : "brightness-0 invert")}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-forest relative group",
                  isScrolled ? "text-slate-600" : "text-white"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-forest transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block satisfying-click">
              <Button className="rounded-full bg-forest hover:bg-forest-dark text-white border-none px-8 h-12 text-sm font-bold tracking-wider shadow-lg">
                <PhoneCallIcon className="size-4 mr-2" />
                Book Survey
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
          <a href="#contact" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full rounded-full h-16 text-lg font-bold bg-forest hover:bg-forest-dark text-white border-none">
              <PhoneCallIcon className="size-5 mr-2" />
              Book Free Survey
            </Button>
          </a>
        </div>
      </div>

      {/* Floating CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: isScrolled ? 1 : 0, 
          scale: isScrolled ? 1 : 0.8,
          y: isScrolled ? 0 : 20
        }}
        className="fixed bottom-8 right-8 z-50 pointer-events-auto sm:hidden"
      >
        <a href="#contact">
          <Button className="rounded-full w-16 h-16 bg-forest text-white shadow-2xl border-none flex items-center justify-center p-0">
            <PhoneCallIcon className="size-6" />
          </Button>
        </a>
      </motion.div>
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

  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

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

        {/* Gradient Overlay for Readability - Darkened for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />

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
            "group mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-xl px-4 py-1.5 text-white shadow-2xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
          )}
        >
          <ShieldCheck className="size-4 text-forest-light" />
          <span className="text-xs font-semibold uppercase tracking-wider drop-shadow-sm">Local & Family Run Sussex Installers</span>
        </div>

        <h1
          className={cn(
            "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl font-bold tracking-tight text-white delay-100 duration-1000 ease-out sm:text-5xl md:text-6xl lg:text-7xl",
            "leading-[0.9] font-display"
          )}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          The Perfect Lawn, <br /> 
          <span className="relative inline-block">
            <span className="relative z-10 text-white">All Year Round.</span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-1 left-0 h-[0.1em] w-full bg-forest-light/60 origin-left -z-0"
            />
          </span>
        </h1>

        <div className="fade-in slide-in-from-bottom-10 mt-8 md:mt-10 flex animate-in flex-row flex-wrap items-center justify-center gap-4 md:gap-6 fill-mode-backwards delay-300 duration-700 ease-out">
          <a href="#contact" className="w-full sm:w-auto satisfying-click">
            <Button className="w-full sm:w-auto rounded-full h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 bg-white text-forest hover:bg-slate-50 border-none" size="lg">
              <PhoneCallIcon className="size-5 mr-2" />{" "}
              Request Free Survey
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom Slider Control */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-40 px-6 flex flex-col items-center gap-3 md:gap-4">
        <div 
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
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
      title: "Pet, Child & School Friendly",
      desc: "Latest tufting technology with shock-absorption pads. Non-toxic, easy to clean, and completely mud-free. Perfect for homes, schools, and nurseries."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-forest" />,
      title: "10-Year Guarantee & 15+ Varieties",
      desc: "We only use premium, European-manufactured grass with a 10-year UV warranty. Choose from over 15 realistic varieties to satisfy any taste."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-forest" />,
      title: "Expert Fitting & Low Maintenance",
      desc: "Our local Sussex team handles everything. The ultimate solution to low maintenance gardening—just hose it down and take back your weekends."
    }
  ];

  return (
    <>
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

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="premium-card p-10 group"
              >
                <div className="mb-8 bg-forest/5 w-20 h-20 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-forest">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-5 leading-tight">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA 1 */}
      <section className="py-20 bg-forest text-white overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"
        />
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Ready to transform your garden?</h3>
            <p className="text-white/70 text-lg">Get a free, no-obligation quote in under 24 hours. No pressure, just expert advice.</p>
          </div>
          <a href="#contact" className="satisfying-click">
            <Button className="rounded-full h-16 md:h-20 px-10 md:px-14 text-xl font-bold bg-white text-forest hover:bg-slate-50 border-none shadow-2xl">
              <PhoneCallIcon className="size-6 mr-3" />
              Book Free Survey
            </Button>
          </a>
        </div>
      </section>
    </>
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
    <>
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
          <div className="grid md:grid-cols-5 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex-shrink-0 w-12 h-12 bg-forest text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 z-10">
                    {i + 1}
                  </span>
                  <div className="hidden md:block h-px bg-border/50 flex-grow"></div>
                </div>
                <h3 className="font-bold mb-3 text-xl leading-tight">{step.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                
                {/* Mobile vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-[-40px] w-px bg-border/50 md:hidden"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA 2 */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tighter">Sussex's Premier Artificial Grass Installers</h3>
          <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            We've transformed over 500 gardens in Brighton & Hove. Let us handle the hard work while you enjoy a perfect lawn all year round.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#contact" className="w-full sm:w-auto satisfying-click">
              <Button className="w-full sm:w-auto rounded-full h-16 md:h-20 px-12 text-xl font-bold bg-forest hover:bg-forest-dark text-white shadow-2xl">
                <PhoneCallIcon className="size-6 mr-3" />
                Book Free Survey
              </Button>
            </a>
            <div className="flex items-center gap-3 text-sm font-bold text-forest uppercase tracking-[0.2em]">
              <CheckCircle2 className="size-6" />
              Free Site Survey
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ComparisonSlider({ before, after, label }: { before: string, after: string, label?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPercent((x / rect.width) * 100);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging) updatePosition(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="flex flex-col gap-4">
      {label && <h4 className="text-lg font-bold text-center text-slate-700">{label}</h4>}
      <div 
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-xl border border-slate-200 touch-none"
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
        >
          <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        
        {/* Divider */}
        <div 
          className="absolute inset-y-0 w-1 bg-white/50 backdrop-blur-md z-10"
          style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(0,0,0,0.2)] flex items-center justify-center border-2 border-forest group-hover:scale-110 transition-transform duration-300">
            <div className="flex items-center gap-0.5 text-forest">
              <ChevronLeft className="size-5" />
              <ChevronRight className="size-5" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-6 left-6 z-20 bg-black/30 backdrop-blur-xl px-4 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-[0.2em] border border-white/10">Before</div>
        <div className="absolute bottom-6 right-6 z-20 bg-forest/60 backdrop-blur-xl px-4 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-[0.2em] border border-white/10">After</div>
      </div>
    </div>
  );
}

export function TransformationsSection() {
  const transformations = [
    {
      before: "https://i.postimg.cc/k57Y39jz/landscpaer-demo-before-pic-2.webp",
      after: "https://i.postimg.cc/B6kdGkP2/landscaper-demo-after-pic-2.webp"
    },
    {
      before: "https://i.postimg.cc/nVqdzC6S/before-pic-landscaper-demo-2.jpg",
      after: "https://i.postimg.cc/pXxsnPvJ/after-pic-landscaper-demo-2.jpg"
    },
    {
      before: "https://i.postimg.cc/Sx9jFbXC/before-pic-3-landscaper-demo.jpg",
      after: "https://i.postimg.cc/KvRRfMmv/after-pic-3-landscaper-demo.jpg"
    }
  ];

  return (
    <section id="transformations" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Garden Transformations</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">Slide to see the difference our premium artificial grass makes. From muddy patches to pristine living spaces.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <ComparisonSlider {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 bg-slate-50/50 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Real Feedback from Local Customers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">See why Brighton homeowners trust us with their gardens. Professionalism and quality in every stitch.</p>
        </motion.div>
      </div>
      <div className="relative">
        <StaggerTestimonials />
      </div>
    </section>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Book Your Free Site Survey</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Ready to transform your outdoor space? Fill out the form below and one of our experts will be in touch within 24 hours to arrange a free, no-obligation site survey and quote.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest">
                    <PhoneCallIcon className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Call Us Directly</p>
                    <a href="tel:07495308444" className="text-xl font-bold hover:text-forest transition-colors">07495 308444</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Our Guarantee</p>
                    <p className="font-bold">10-Year UV Warranty on all installations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">Your request has been received. We'll be in touch shortly.</p>
                <Button 
                  onClick={() => setStatus('idle')}
                  variant="outline" 
                  className="mt-8 rounded-full"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                    <input 
                      required
                      type="text" 
                      id="firstName"
                      placeholder="John"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                    <input 
                      required
                      type="text" 
                      id="lastName"
                      placeholder="Doe"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input 
                    required
                    type="email" 
                    id="email"
                    placeholder="john@example.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    id="phone"
                    placeholder="07123 456789"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Message</label>
                  <textarea 
                    required
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 p-4 bg-forest/5 rounded-xl border border-forest/10">
                  <input 
                    type="checkbox" 
                    id="freeSamples" 
                    className="size-5 rounded border-slate-300 text-forest focus:ring-forest"
                  />
                  <label htmlFor="freeSamples" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Yes, please bring <span className="font-bold text-forest underline">FREE grass samples</span> to my survey!
                  </label>
                </div>

                <Button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full rounded-full h-16 md:h-20 text-xl font-bold bg-forest hover:bg-forest-dark text-white border-none shadow-2xl mt-8 satisfying-click"
                >
                  {status === 'loading' ? "Sending..." : "Request Free Survey"}
                </Button>
              </form>
            )}
          </motion.div>
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
