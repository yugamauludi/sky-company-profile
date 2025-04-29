// export default Navbar;
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { commonTranslations } from "@/src/locales/common";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  // useEffect(() => {
  //   // Only run on client side
  //   if (typeof window !== 'undefined') {
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 20);
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     // Initial check
  //     handleScroll();
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 transition-all duration-300 bg-white"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Sky Parking Logo"
              width={45}
              height={45}
              className="h-auto hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold text-gray-800">SKY Parking</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: commonTranslations.navbar.links[language].home },
              { href: "/about", label: commonTranslations.navbar.links[language].about },
              { href: "/services", label: commonTranslations.navbar.links[language].services },
              { href: "/location", label: commonTranslations.navbar.links[language].location },
              { href: "/contact", label: commonTranslations.navbar.links[language].contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-600 hover:text-[#FFCC0D] transition-colors duration-300 py-2
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFCC0D] 
                  after:left-0 after:-bottom-1 after:transition-all after:duration-300
                  hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex rounded-full overflow-hidden border-2 border-[#FFCC0D]">
              <button
                onClick={() => setLanguage("id")}
                className={`px-4 py-1.5 transition-colors duration-300 ${
                  language === "id"
                    ? "bg-[#FFCC0D] text-white font-medium"
                    : "bg-transparent text-gray-600 hover:bg-[#FFCC0D]/10"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1.5 transition-colors duration-300 ${
                  language === "en"
                    ? "bg-[#FFCC0D] text-white font-medium"
                    : "bg-transparent text-gray-600 hover:bg-[#FFCC0D]/10"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-[#FFCC0D] transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {[
              { href: "/", label: commonTranslations.navbar.links[language].home },
              { href: "/about", label: commonTranslations.navbar.links[language].about },
              { href: "/services", label: commonTranslations.navbar.links[language].services },
              { href: "/location", label: commonTranslations.navbar.links[language].location },
              { href: "/contact", label: commonTranslations.navbar.links[language].contact },
            ].map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ x: 10 }}
                className="px-4"
              >
                <Link
                  href={link.href}
                  className="block text-gray-600 hover:text-[#FFCC0D] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex rounded-full overflow-hidden border-2 border-[#FFCC0D] w-fit mx-4">
              <button
                onClick={() => setLanguage("id")}
                className={`px-4 py-1.5 transition-colors duration-300 ${
                  language === "id"
                    ? "bg-[#FFCC0D] text-white font-medium"
                    : "bg-transparent text-gray-600 hover:bg-[#FFCC0D]/10"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1.5 transition-colors duration-300 ${
                  language === "en"
                    ? "bg-[#FFCC0D] text-white font-medium"
                    : "bg-transparent text-gray-600 hover:bg-[#FFCC0D]/10"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
