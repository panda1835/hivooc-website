import dynamic from "next/dynamic";

export interface MapLocation {
  name: string;
  lat: number;
  lng: number;
}

interface TripMapProps {
  locations: MapLocation[];
}

const TripMapClient = dynamic(() => import("./TripMapClient"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-500">
      Loading map...
    </div>
  ),
});

export default function TripMap({ locations }: TripMapProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-[#192B28]">Map</h2>
      <TripMapClient locations={locations} />
    </div>
  );
}
