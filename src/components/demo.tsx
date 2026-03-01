import { motion } from 'motion/react';
import { 
	Navbar,
	HeroSection, 
	WhyUsSection, 
	ProcessSection, 
	TransformationsSection,
	TestimonialsSection, 
	ContactSection,
	Footer 
} from "@/src/components/ui/hero-1";

export default function DemoOne() {
	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="flex w-full flex-col"
		>
			<Navbar />
			<main className="grow">
				<HeroSection />
				<WhyUsSection />
				<ProcessSection />
				<TransformationsSection />
				<TestimonialsSection />
				<ContactSection />
			</main>
			<Footer />
		</motion.div>
	);
}
