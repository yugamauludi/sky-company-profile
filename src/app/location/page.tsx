/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useLanguage } from "@/src/context/LanguageContext";
import { locationTranslations } from "@/src/locales/location";
import Image from "next/image";

interface Location {
  name: string;
  position: LatLngTuple;
  address: string;
  code: string;
}

export default function Location() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    // Fix untuk gambar marker di Next.js
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl:
        "/icons/marker-icon-2x.png",
      iconUrl:
        "/icons/marker-icon.png",
      shadowUrl:
        "/icons/marker-shadow.png",
    });

    const fetchLocations = async () => {
      try {
        const clientKey = process.env.NEXT_PUBLIC_SKY_CLIENT_KEY;
        const secretKey = process.env.NEXT_PUBLIC_SKY_SECRET_KEY;
        const baseUrl = process.env.NEXT_PUBLIC_SKY_API_URL;
        const timestamp = "2025-02-21T15:39:42+07:00";

        // Generate signature dengan POST
        const signatureResponse = await fetch(
          `${baseUrl}/v1/partner/generate-signature`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              clientkey: clientKey || "",
              secretkey: secretKey || "",
              timestamp: timestamp,
            },
            body: JSON.stringify({}), // body kosong karena tidak ada data yang perlu dikirim
          }
        );

        if (!signatureResponse.ok) {
          throw new Error(locationTranslations.error.signature[language]);
        }

        const signatureData = await signatureResponse.json();

        // Get all locations dengan POST
        const locationsResponse = await fetch(
          `${baseUrl}/v1/partner/get-alllocation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              clientkey: clientKey || "",
              secretkey: secretKey || "",
              timestamp: timestamp,
              signature: signatureData.signature,
            },
            body: JSON.stringify({}), // body kosong karena tidak ada data yang perlu dikirim
          }
        );

        if (!locationsResponse.ok) {
          throw new Error(locationTranslations.error.locations[language]);
        }

        const locationsData = await locationsResponse.json();

        // Transform data
        const transformedLocations = locationsData.data.map((loc: any) => ({
          name: loc.location_name,
          position: [
            loc.coordinate.latitude,
            loc.coordinate.longitude,
          ] as LatLngTuple,
          address: loc.address,
          code: loc.location_code,
        }));

        setLocations(transformedLocations);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLocations();
  }, [language]);

  // Fungsi untuk filter lokasi
  useEffect(() => {
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [locations, searchTerm]);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          {locationTranslations.title[language]}
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locationTranslations.search.placeholder[language]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent outline-none transition duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            {locationTranslations.search.results[language].replace('{count}', filteredLocations.length.toString())}
          </p>
        </div>

        {/* Layout Grid: Kolom Kiri (Daftar Lokasi) dan Kolom Kanan (Peta) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom Kiri: Daftar Lokasi */}
          <div className="md:col-span-1 max-h-[600px] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white pb-2">
              {locationTranslations.listTitle[language] || "Daftar Lokasi"}
            </h2>
            <div className="space-y-4">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <div key={index} className="location-card bg-white p-4 rounded-lg shadow flex items-center space-x-3">
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
                ))
              ) : (
                <p className="text-gray-500 text-center">{locationTranslations.search.noResults[language] || "Tidak ada lokasi ditemukan."}</p>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Peta */}
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
                {filteredLocations.map((location, index) => (
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
        </div>
      </div>
    </div>
  );
}
