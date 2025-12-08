import Hero from "@/components/short-trip/Hero";
import Pricing from "@/components/short-trip/Pricing";
import Support from "@/components/home/Support";
import GetStarted from "@/components/home/GetStarted";
import ShortTrips from "@/components/home/ShortTrips";
import { getTranslations } from "next-intl/server";
import { type ShortTrip } from "@/components/home/ShortTrips"
import TripInfo from "@/components/short-trip/TripInfo";

export default async function ShortTripPage() {
  const t = await getTranslations();
  const customTripsArray: ShortTrip[] = [
      {
        id: 1,
        category: "PRE-MADE TRIP",
        title: "Vietnam Primate Photography",
        description:
          "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
        image: "/short-trip/image1.jpg",
        link: "/trips/vietnam-primate-photography",
        bestTimeToTravel: "APR - JUN",
        tripLength: "16 DAYS",
      },
      {
        id: 2,
        category: "PRE-MADE TRIP",
        title: "Vietnam Primate Photography",
        description:
          "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
        image: "/short-trip/image2.JPG",
        link: "/trips/vietnam-primate-photography-2",
        bestTimeToTravel: "APR - JUN",
        tripLength: "16 DAYS",
      },
      {
        id: 3,
        category: "PRE-MADE TRIP",
        title: "Vietnam Primate Photography",
        description:
          "Every journey is crafted to match your interests, pace, and wildlife dreams. No two experiences are the same.",
        image: "/short-trip/image3.jpg",
        link: "/trips/vietnam-primate-photography-3",
        bestTimeToTravel: "APR - JUN",
        tripLength: "16 DAYS",
      },
    ];
  return (
    <main className="flex flex-col w-full">
      <Hero 
        title="Nature Adventure by Jeep in Son Tra Peninsula"
        timeSlots={[
            { label: "MORNING", time: "5AM - 11 AM" },
            { label: "AFTERNOON", time: "1:30 PM - 7:30 PM" }
        ]} 
      />
      <Pricing 
        title="Exploring the majestic geography of Son Tra Peninsula"
        description="Exploring the majestic geography of Son Tra Peninsula and its wildlife on a JEEP is an amazing experience; giving you real sense of adventure. You'll take in the vast green forests and immense sea while breathing in the fresh air. Say Hi to a family of the colorful Red-shanked Douc highlights your day."
        pricingTiers={[
          { pax: "1 pax", price: 224 },
          { pax: "2 pax", price: 134 },
          { pax: "3 pax", price: 137 },
          { pax: "4 pax", price: 114 }
        ]}
      />
      <TripInfo 
        ages="> 6yrs old"
        duration="3 hours"
        toursPerDay="2 tours per day"
        tourTimes="Morning/Afternoon"
        guide="Live Wildlife Expert Guide"
        guideLanguages={[
          "1 speaking English",
          "1 speaking Vietnamese"
        ]}
        photographicLocation="Photogenic Location"
        locationDetails="Of wildlife & endemic plant"
        images={[
          "/short-trip/image1.jpg",
          "/short-trip/image2.JPG",
          "/short-trip/image3.jpg",
          "/short-trip/image1.jpg",
          "/short-trip/image2.JPG",
          "/short-trip/image3.jpg",
          "/short-trip/image1.jpg",
          "/short-trip/image2.JPG"
        ]}
      />
      <GetStarted />
      <ShortTrips 
        title={t("ShortTrips.relatedShortTrip")}
        description={t("ShortTrips.description")}
        trips={customTripsArray}
      />
      <Support />

    </main>
  );
}
