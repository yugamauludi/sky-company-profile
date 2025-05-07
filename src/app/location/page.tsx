/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { locationTranslations } from "@/src/locales/location";
import type { Location } from "@/src/types/location";
import { fetchLocations } from "@/src/services/locationService";
import SearchLocation from "@/src/components/location/SearchLocation";
import LocationCard from "@/src/components/location/LocationCard";
import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("@/src/components/location/LocationMap"),
  { ssr: false }
);

export default function Location() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {

    const getLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchLocations(language);

        if (!data) {
          setLocations([]);
          setError("Data lokasi tidak tersedia");
          return;
        }

        if (!Array.isArray(data)) {
          setLocations([]);
          setError("Format data tidak valid");
          return;
        }

        const transformedLocations = data.map((loc: any) => ({
          name: loc?.location_name ?? "Nama tidak tersedia",
          position: [
            loc?.coordinate?.latitude ?? 0,
            loc?.coordinate?.longitude ?? 0,
          ] as [number, number],
          address: loc?.address ?? "Alamat tidak tersedia",
          code: loc?.location_code ?? "Kode tidak tersedia",
        }));

        setLocations(transformedLocations);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data lokasi");
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    getLocations();
  }, [language]);

  useEffect(() => {
    const filtered = locations.filter(
      (location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [locations, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFCC0D] mb-4"></div>
          </div>
          <p className="text-gray-600 animate-pulse">
            {language === "id"
              ? "Memuat data lokasi..."
              : "Loading locations..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
                  <div
                    key={index}
                    onClick={() => {
                      const [lat, lng] = location.position;
                      setSelectedPosition([lat, lng]);
                    }}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <LocationCard location={location} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  {locationTranslations.search.noResults[language]}
                </p>
              )}
            </div>
          </div>
          <LocationMap
            locations={filteredLocations}
            selectedPosition={selectedPosition}
            className="md:col-span-2 h-[600px] rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}
