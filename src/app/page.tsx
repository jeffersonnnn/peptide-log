import { HeroLanding } from "@/components/landing/hero-landing";
import { ReconCalculator } from "@/components/calculator/recon-calculator";

export default function Home() {
  return (
    <>
      <HeroLanding />
      <div id="calculator">
        <ReconCalculator />
      </div>
    </>
  );
}
