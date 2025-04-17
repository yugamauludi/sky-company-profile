'use client';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { commonTranslations } from "@/src/locales/common";
import { useLanguage } from "@/src/context/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <Image
          src="/images/pattern.png"
          alt="Background Pattern"
          fill
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-8 pt-16 pb-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-between">
          <div className="space-y-6 max-w-xl">
            <div className="flex items-end space-x-3">
              <Image
                src="/images/logo.png"
                alt="Sky Parking Logo"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFCC0D] to-yellow-500">
                {commonTranslations.footer.company.title[language]}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {commonTranslations.footer.company.description[language]}
            </p>
          </div>
          <div className="space-y-6 md:ml-auto">
            <h4 className="text-xl font-semibold mb-6 text-[#FFCC0D]">
              {commonTranslations.footer.contact.title[language]}
            </h4>
            <ul className="text-gray-300 space-y-6">
              <li className="flex items-center space-x-3 hover:text-[#FFCC0D] transition-colors">
                <FaEnvelope className="text-[#FFCC0D] text-xl" />
                <span>business.development@skyparking.co.id</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-[#FFCC0D] transition-colors">
                <FaPhone className="text-[#FFCC0D] text-xl" />
                <span>(021) 55764058</span>
              </li>
              <li className="flex space-x-3 hover:text-[#FFCC0D] transition-colors">
                <FaMapMarkerAlt className="text-[#FFCC0D] text-xl flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Ruko pinangsia karawaci Office park blok H no 20, Lippo
                  Village, Karawaci, Tangerang, Banten
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700/50 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            {commonTranslations.footer.copyright[language]}{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
