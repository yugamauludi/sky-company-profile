/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { locationTranslations } from "@/src/locales/location";
import type { Location } from "@/src/types/location";
import { fetchLocations } from "@/src/services/locationService";
import SearchLocation from "@/src/components/location/SearchLocation";
import LocationCard from "@/src/components/location/LocationCard";

// Import peta secara dinamis dengan SSR dinonaktifkan
const DynamicMap = dynamic(
  () => import('@/src/components/location/LocationMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="md:col-span-2 h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p>Memuat peta...</p>
      </div>
    )
  }
);

export default function Location() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    // Fix untuk gambar marker di Next.js
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: "/icons/marker-icon-2x.png",
      iconUrl: "/icons/marker-icon.png",
      shadowUrl: "/icons/marker-shadow.png",
    });

    const getLocations = async () => {
      const data = await fetchLocations(language);
      const transformedLocations = data.map((loc: any) => ({
        name: loc.location_name,
        position: [loc.coordinate.latitude, loc.coordinate.longitude],
        address: loc.address,
        code: loc.location_code,
      }));
      setLocations(transformedLocations);
    };

    getLocations();
  }, [language]);

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
        <h1 className="text-4xl font-bold text-center mb-4">
          {locationTranslations.title[language]}
        </h1>
        
        {/* Added description section */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-gray-600">
            {locationTranslations.description[language]}
          </p>
        </div>

        <SearchLocation
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultsCount={filteredLocations.length}
          language={language}
        />

        {/* Layout Grid with added information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 max-h-[600px] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white pb-2">
              {locationTranslations.listTitle[language]}
            </h2>
            <div className="space-y-4">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <LocationCard key={index} location={location} />
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  {locationTranslations.search.noResults[language]}
                </p>
              )}
            </div>
          </div>
          <DynamicMap locations={filteredLocations} />
        </div>
      </div>
    </div>
  );
}
