import { HeroLanding } from "@/components/landing/hero-landing";
import { LandingSections } from "@/components/landing/landing-sections";
import { Opener } from "@/components/motion/opener";

export default function Home() {
  return (
    <>
      <Opener />
      <HeroLanding />
      <LandingSections />
    </>
  );
}
