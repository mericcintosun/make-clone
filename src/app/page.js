import HeroSection from "@/components/homePage/HeroSection";
import PlatformBenefits from "@/components/homePage/PlatformBenefits";
import Partners from "@/components/homePage/Partners";
import DepartmentalImpact from "@/components/homePage/DepartmentalImpact";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PlatformBenefits />
      <Partners />
      <DepartmentalImpact />
    </div>
  );
}
