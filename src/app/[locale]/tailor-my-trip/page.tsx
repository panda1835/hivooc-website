import TailorForm from '@/components/tailor/TailorForm';
import TailorMadeTrips from '@/components/home/TailorMadeTrips';
import ShortTrips from '@/components/home/ShortTrips';
import DailyExperiences from '@/components/home/DailyExperiences';
import { Separator } from '@/components/ui/separator';
export default function TailorPage() {
  return (
    <div className='flex flex-col'>
<div className="min-h-screen bg-branding-yellow py-12 px-4 md:px-8 flex justify-center items-start">
      <TailorForm />
      
    </div>
      <TailorMadeTrips />
      <Separator />
      <ShortTrips />
      <Separator />
      <DailyExperiences />
    </div>
    
  );
}
