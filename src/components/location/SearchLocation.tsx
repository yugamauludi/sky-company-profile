import { locationTranslations } from "@/src/locales/location";

interface SearchLocationProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
  language: string;
}

export default function SearchLocation({ searchTerm, onSearchChange, resultsCount, language }: SearchLocationProps) {
  return (
    <div className="mb-6">
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={locationTranslations.search.placeholder[language as keyof typeof locationTranslations.search.placeholder]}
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
        {locationTranslations.search.results[language as keyof typeof locationTranslations.search.results].replace('{count}', resultsCount.toString())}
      </p>
    </div>
  );
}