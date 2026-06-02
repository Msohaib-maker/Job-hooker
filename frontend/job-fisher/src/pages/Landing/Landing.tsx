import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";
import LandingVideo from "./LandingVideo";
import LandingHowItWorks from "./LandingHowItWorks";
import LandingFooter from "./LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] overflow-x-hidden font-sans flex flex-col">
      <LandingHeader />
      <LandingHero />
      <LandingVideo />
      <LandingHowItWorks />
      <LandingFooter />
    </div>
  );
};

export default Landing;
