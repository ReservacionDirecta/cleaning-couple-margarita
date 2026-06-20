import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import ServicesSection from '@/components/ServicesSection';
import PricingSection from '@/components/PricingSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServicesSection />
      <PricingSection />
      <Testimonials />
      <FAQ />
    </>
  );
}
