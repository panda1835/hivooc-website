import Hero from "@/components/our-story/Hero";
import HiVOOCStory from "@/components/our-story/HiVOOCStory";
import Founder from "@/components/our-story/Founder";
import Testimonials from "@/components/tailor/Testimonials";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
export default function TailorTripPage() {
  return (
    <main className="w-full">
      <Hero />
      <HiVOOCStory />
      <Founder />

      <Testimonials />
      <GetStarted />
      <TailorMadeTrips />
    </main>
  );
}
