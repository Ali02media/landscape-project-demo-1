"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    type: 'testimonial',
    testimonial: "We have had a fantastic experience with Artificial Grass Brighton from start to finish. Caroline came round to prepare a quote and it was clear we had a challenging site with steep banks and numerous drain covers to hide. Steve and his team worked hard and tirelessly to prepare the ground for the grass. That preparation meant we have a great result and are delighted with it. There were lots of moving parts to our project and they were all handled seamlessly. I would thoroughly recommend Artificial Grass Brighton to anyone",
    by: "Graham Faultless"
  },
  {
    tempId: 1,
    type: 'testimonial',
    testimonial: "Fantastic job from top to bottom, the gent who came and priced up the job was very pleasant and highly knowledgeable. And the 2 lads that did the work were fantastic, quick and professional on what was the hottest day of the year! All in all 5 stars from me highly recommend",
    by: "Danny Spice"
  },
  {
    tempId: 100,
    type: 'cta',
    title: "Ready for a Mud-Free Garden?",
    desc: "Join hundreds of happy Brighton families. Get your free, no-obligation survey today.",
    buttonText: "Call 07495 308444"
  },
  {
    tempId: 2,
    type: 'testimonial',
    testimonial: "Found them very good to deal with and the quality of the grass they provided for the cost was exceptional , I work in Landscaping and was looking for a company who could plan and execute what I was looking for to create an outdoor space my 3 Grandsons could come visit us and play outside what ever the season, and Xmas day proved just that they ran and rolled around outside and came in for Xmas dinner as clean as before they went outside , I can honestly say I will recommend this company to others as the company I work for doesn’t do Artificial grass and these guys proved they can do it very well , and very efficiently and well within my budget I gave them 1st class",
    by: "Darren Read"
  },
  {
    tempId: 3,
    type: 'testimonial',
    testimonial: "We’re absolutely thrilled with our artificial grass installation! We needed it done urgently, and Caroline was incredibly accommodating, fitting us in quickly. The whole process was smooth and efficient, taking only three days. The team was professional, friendly, and kept everything neat and tidy. The results are fantastic—our space looks amazing! Highly recommend!",
    by: "Paul Thorrington"
  },
  {
    tempId: 101,
    type: 'cta',
    title: "10-Year Guarantee",
    desc: "We only use premium European grass. Built to last, UV resistant, and pet friendly.",
    buttonText: "Get a Free Quote"
  },
  {
    tempId: 4,
    type: 'testimonial',
    testimonial: "This was our second \"lawn\" installation from AG and similarly to the first (front garden) they maintained their very high standards. Steve and his team did an exceptional job in two days, I would highly recommend them for any artificial grass installation project.",
    by: "Mark Rhodes"
  },
  {
    tempId: 5,
    type: 'testimonial',
    testimonial: "The team came and landscaped the whole garden for us over a year ago. The quality of the work, is exceptional. The patio is perfect, the grass immaculate! We couldn’t be happier, the children have loved playing football on the grass everyday of the year regardless of weather. It really is the very best option for children! We all adore it! When we have parties, everyone comments on the garden! A few months back we had a question and one of the team popped over to help us. Would highly recommend Artificial Grass Brighton. Thank you so very very much!",
    by: "Irwin Family"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;
  const isCTA = (testimonial as any).type === 'cta';

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out flex flex-col will-change-transform",
        isCenter 
          ? isCTA ? "z-10 bg-white text-forest border-forest" : "z-10 bg-forest text-white border-forest" 
          : "z-0 bg-white text-slate-900 border-slate-200 hover:border-forest/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0,0,0,0.1)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-200"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      
      {!isCTA && (
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={cn("size-4 fill-current", isCenter ? "text-white" : "text-yellow-400")} 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <div className="flex-grow flex flex-col justify-center overflow-hidden">
        {isCTA ? (
          <div className="text-center">
            <h3 className={cn(
              "text-xl sm:text-2xl font-bold mb-4",
              isCenter ? "text-forest" : "text-slate-900"
            )}>
              {(testimonial as any).title}
            </h3>
            <p className={cn(
              "text-sm sm:text-base mb-6",
              isCenter ? "text-slate-600" : "text-slate-500"
            )}>
              {(testimonial as any).desc}
            </p>
            <a href="#contact" className="inline-block">
              <button className={cn(
                "px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all",
                isCenter ? "bg-forest text-white hover:bg-forest-dark" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}>
                {(testimonial as any).buttonText}
              </button>
            </a>
          </div>
        ) : (
          <h3 className={cn(
            "text-sm sm:text-base font-medium leading-relaxed line-clamp-[8]",
            isCenter ? "text-white" : "text-slate-900"
          )}>
            "{testimonial.testimonial}"
          </h3>
        )}
      </div>

      {!isCTA && (
        <p className={cn(
          "mt-4 text-sm font-bold uppercase tracking-wider",
          isCenter ? "text-white/90" : "text-forest"
        )}>
          {testimonial.by}
        </p>
      )}
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-50/50 flex flex-col items-center"
      style={{ height: 650 }}
    >
      <div className="relative w-full flex-grow">
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
      </div>

      <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 gap-4 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-2xl transition-all rounded-full",
            "bg-white border-2 border-slate-200 text-slate-600 hover:bg-forest hover:text-white hover:border-forest shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-2xl transition-all rounded-full",
            "bg-white border-2 border-slate-200 text-slate-600 hover:bg-forest hover:text-white hover:border-forest shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-20 w-full px-6">
        <a 
          href="https://www.google.com/search?sca_esv=b7a78c7db20616cf&sxsrf=ANbL-n40V8KSkDSS2rEM-a1pSeAr9e12RA:1772054116581&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUjhJsdsDPFMJ4Ae32euSHc8t4QkPE7zvWPZZTGkg9KIo_MuvrYah6r7c7mAqQFGgLBp_xBg9lJtHIuTqeDbFsZdqnOXV_P3LHVJJs6anbGVhYPc2Q%3D%3D&q=Artificial+Grass+Brighton+Reviews&sa=X&ved=2ahUKEwis4JCByPWSAxV0U6QEHStUFGIQ0bkNegQINBAH&biw=1536&bih=776&dpr=1.25" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-forest transition-colors inline-block"
        >
          Rated 4.9 stars on Google. <span className="underline underline-offset-4">Click here to see our 50+ 5 star ratings</span>
        </a>
      </div>
    </div>
  );
};
