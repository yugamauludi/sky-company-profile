"use client";
import dynamic from 'next/dynamic';
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import { Location } from "@/src/types/location";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  locations: Location[];
}

// Dynamically import the map component with no SSR
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-2 h-[600px] w-full rounded-xl overflow-hidden shadow-lg relative z-0 bg-gray-100 flex items-center justify-center">
      <div>Loading map...</div>
    </div>
  )
});

export default function LocationMap({ locations }: LocationMapProps) {
  return <Map locations={locations} />;
}