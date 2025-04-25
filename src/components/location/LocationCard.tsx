import Image from "next/image";
import { Location } from "@/src/types/location";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="location-card bg-white p-4 rounded-lg shadow flex items-center space-x-3">
      <Image
        src="/icons/marker-card.png"
        alt="logo-sky"
        width={24}
        height={30}
      />
      <div>
        <h3 className="font-bold text-sm">{location.name}</h3>
        <p className="text-xs text-gray-600">
          {location.address}
        </p>
      </div>
    </div>
  );
}