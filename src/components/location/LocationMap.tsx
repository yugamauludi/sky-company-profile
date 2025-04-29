"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Location } from "@/src/types/location";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

interface LocationMapProps {
  locations: Location[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  useEffect(() => {
    // Initialize Leaflet icon
    delete (Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: "/icons/marker-icon-2x.png",
      iconUrl: "/icons/marker-icon.png",
      shadowUrl: "/icons/marker-shadow.png",
    });
  }, []);
  return (
    <div className="md:col-span-2 h-[600px] w-full rounded-xl overflow-hidden shadow-lg relative z-0">
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