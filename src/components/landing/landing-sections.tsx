import { PeptideMarquee } from "./peptide-marquee";
import { HowItWorks } from "./how-it-works";
import { ToolsIndex } from "./tools-index";
import { LibrarySection } from "./library-section";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { StickyBar } from "./sticky-bar";

export function LandingSections() {
  return (
    <>
      <div className="mt-6 sm:mt-8">
        <PeptideMarquee />
      </div>
      <HowItWorks />
      <ToolsIndex />
      <LibrarySection />
      <Faq />
      <FinalCta />
      <StickyBar />
    </>
  );
}
