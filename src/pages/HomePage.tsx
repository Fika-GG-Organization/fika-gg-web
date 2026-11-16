import HeroSection from '@/features/home/components/HeroSection';
import HowItWorksSection from '@/features/home/components/HowItWorksSection';
import PublicEventsSection from '@/features/home/components/PublicEventsSection';
// import { Typography, Box } from '@mui/material';

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<HowItWorksSection />
			<PublicEventsSection />
		</>
	);
}