"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Location } from "@/src/types/location";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Icon } from "leaflet";

interface LocationMapProps {
  locations: Location[];
  selectedPosition?: [number, number] | null;
  className?: string;
}

export default function LocationMap({ locations, selectedPosition, className }: LocationMapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (Icon.Default.prototype as any)._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: "/icons/marker-icon-2x.png",
        iconUrl: "/icons/marker-icon.png",
        shadowUrl: "/icons/marker-shadow.png",
      });
    }
  }, []);

  useEffect(() => {
    if (selectedPosition && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(selectedPosition, 15, {
        duration: 1.5
      });
    }
  }, [selectedPosition]);

  return (
    <div className={className || "md:col-span-2 h-[600px] w-full rounded-xl overflow-hidden shadow-lg relative z-0"}>
      <MapContainer
        ref={mapRef}
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