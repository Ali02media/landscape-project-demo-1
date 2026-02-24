import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { 
  ArrowRightIcon, 
  PhoneCallIcon, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Star,
  MapPin,
  Mail,
  Phone
} from "lucide-react";

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-5xl relative">
			{/* Top Shades */}
			<div
				aria-hidden="true"
				className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
			>
				<div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-forest/.08),transparent)] contain-strict" />
			</div>

			{/* X Bold Faded Borders */}
			<div
				aria-hidden="true"
				className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block"
			>
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
			</div>

			<div className="relative flex flex-col items-center justify-center gap-5 pt-32 pb-30">
				{/* X Content Faded Borders */}
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-1 size-full overflow-hidden"
				>
					<div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
					<div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
					<div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
					<div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
				</div>

				<div
					className={cn(
						"group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
				>
					<ShieldCheck className="size-3 text-forest" />
					<span className="text-xs">10-Year Manufacturer Guarantee</span>
				</div>

				<h1
					className={cn(
						"fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl",
						"text-shadow-[0_0px_50px_theme(--color-forest/.1)]"
					)}
				>
					The Perfect Lawn, <br /> <span className="text-forest">All Year Round.</span>
				</h1>

				<p className="fade-in slide-in-from-bottom-10 mx-auto max-w-xl animate-in fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:text-lg md:text-xl">
					No mowing, no mud, no maintenance. <br />
					Premium artificial grass installation across Brighton & Hove.
				</p>

				<div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
					<a href="tel:07495308444">
						<Button className="rounded-full" size="lg" variant="secondary">
							<PhoneCallIcon className="size-4 mr-2" />{" "}
							Get a Free Quote
						</Button>
					</a>
					<a href="#services">
						<Button className="rounded-full" size="lg">
							Our Services{" "}
							<ArrowRightIcon className="size-4 ms-2" />
						</Button>
					</a>
				</div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Why Brighton Homeowners Choose Us</h2>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">Our Professional Installation Process</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                  {i + 1}
                </span>
                <div className="h-px bg-border flex-grow md:hidden lg:block"></div>
              </div>
              <h3 className="font-bold mb-2 text-lg">{step.title}</h3>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">Real Feedback from Local Customers</h2>
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
                  <p className="font-bold">{rev.name}</p>
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
