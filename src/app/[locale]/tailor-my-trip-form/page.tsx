import TailorForm from '@/components/tailor/TailorForm';
import TailorMadeTrips from '@/components/home/TailorMadeTrips';
import ShortTrips, { type ShortTrip } from '@/components/home/ShortTrips';
import DailyExperiences from '@/components/home/DailyExperiences';
import { Separator } from '@/components/ui/separator';

export default function TailorPage() {
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
    <div className='flex flex-col'>
      <div className="min-h-screen bg-branding-yellow py-12 px-4 md:px-8 flex justify-center items-start">
        <TailorForm />
      </div>
      <TailorMadeTrips />
      <Separator />
      <ShortTrips trips={customTripsArray} />
      <Separator />
      <DailyExperiences />
    </div>
  );
}
