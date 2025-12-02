import Hero from "@/components/home/Hero";
import SellingPoint from "@/components/home/SellingPoint";
import TailorMadeTrips from "@/components/home/TailorMadeTrips";
import ShortTrips from "@/components/home/ShortTrips";
import DailyExperiences from "@/components/home/DailyExperiences";
import GetStarted from "@/components/home/GetStarted";
import Reviews from "@/components/home/Reviews";
import News from "@/components/home/News";
import Partners from "@/components/home/Partners";
import Support from "@/components/home/Support";
import Gallery from "@/components/home/Gallery";
import { Separator } from "@/components/ui/separator";
export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <SellingPoint />
      <TailorMadeTrips />
      <Separator />
      <ShortTrips />
      <Separator />
      <DailyExperiences />
      <GetStarted />
      <Reviews />
      <Separator />
      <News />
      <Partners />
      <Support />
      <Gallery />
    </main>
  );
}
