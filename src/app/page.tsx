import { HeroLanding } from "@/components/landing/hero-landing";
import { LandingSections } from "@/components/landing/landing-sections";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <HeroLanding />
      <LandingSections />
      <Footer />
    </>
  );
}
