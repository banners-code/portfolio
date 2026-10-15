import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
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
      <SkillsSection />
      <ServicesSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
