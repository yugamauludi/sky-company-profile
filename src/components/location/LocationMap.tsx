"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import type { Location } from "@/src/types/location";

interface LocationMapProps {
  locations: Location[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (!mapInitialized.current && typeof window !== "undefined") {
      // Inisialisasi icon hanya sekali di client-side
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (Icon.Default.prototype as any)._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: "/icons/marker-icon-2x.png",
        iconUrl: "/icons/marker-icon.png",
        shadowUrl: "/icons/marker-shadow.png",
      });
      mapInitialized.current = true;
    }
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {locations.map((location, index) => (
            <Marker key={index} position={location.position}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{location.name}</h3>
                  <p className="text-sm text-gray-600">
                    {location.address}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}