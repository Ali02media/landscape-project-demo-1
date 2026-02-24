import { 
	HeroSection, 
	WhyUsSection, 
	ProcessSection, 
	TestimonialsSection, 
	Footer 
} from "@/src/components/ui/hero-1";
import { Header } from "@/src/components/ui/header-1";

export default function DemoOne() {
	return (
		<div className="flex w-full flex-col">
			<Header />
			<main className="grow">
				<HeroSection />
				<WhyUsSection />
				<ProcessSection />
				<TestimonialsSection />
			</main>
			<Footer />
		</div>
	);
}
