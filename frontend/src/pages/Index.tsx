import { ThemeProvider } from "@/components/ThemeProvider"
import { HeroSection } from "@/components/HeroSection"
import { PlaygroundSection } from "@/components/PlaygroundSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { ScreenshotSection } from "@/components/ScreenshotSection"
import {InstallExtensionSection} from "@/components/InstallExtensionSection"
import { TechStackSection } from "@/components/TechStackSection"
import { FAQSection } from "@/components/FAQSection"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <HeroSection />
        <PlaygroundSection />
        
        <InstallExtensionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TechStackSection />
        <FAQSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
