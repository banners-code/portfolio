import { AboutSection } from "@/components/sections/AboutSection";
import { BotsSection } from "@/components/sections/BotsSection";
import { BuildsSection } from "@/components/sections/BuildsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { SectionRail } from "@/components/layout/SectionRail";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function HomePage() {
  return (
    <>
      <IntroOverlay />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BuildsSection />
      <BotsSection />
      <SkillsSection />
      <ServicesSection />
      <FaqSection />
      <ContactSection />
      {/* After the content, so keyboard focus reaches it last. */}
      <SectionRail />
    </>
  );
}
