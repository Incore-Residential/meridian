import MeridianNav from "@/components/meridian/MeridianNav";
import MeridianHero from "@/components/meridian/MeridianHero";
import MeridianStory from "@/components/meridian/MeridianStory";
import MeridianAmenities from "@/components/meridian/MeridianAmenities";
import MeridianFloorPlans from "@/components/meridian/MeridianFloorPlans";
import MeridianLocation from "@/components/meridian/MeridianLocation";
import MeridianContact from "@/components/meridian/MeridianContact";
import MeridianFooter from "@/components/meridian/MeridianFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-cloud-white font-inter">
      <MeridianNav />
      <MeridianHero />
      <MeridianStory />
      <MeridianAmenities />
      <MeridianFloorPlans />
      <MeridianLocation />
      <MeridianContact />
      <MeridianFooter />
    </div>
  );
};

export default Index;
