import Hero from "@/components/tailor/Hero";
import Introduction from "@/components/tailor/Introduction";
import Unique from "@/components/tailor/Unique";
import WhatToExpect from "@/components/tailor/WhatToExpect";
import Testimonials from "@/components/tailor/Testimonials";
import GetStarted from "@/components/home/GetStarted";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
export default function TailorTripPage() {
  return (
    <main className="w-full">
      <Hero />
      <Introduction />
      <Unique />
      <WhatToExpect />
      <Testimonials />
      <GetStarted />
      <TailorMadeTrips />
    </main>
  );
}
