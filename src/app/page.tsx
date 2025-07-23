"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { features } from "@/src/locales/features";
import FeatureCard from "@/src/components/FeatureCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";
import { homeTranslations } from "@/src/locales/home";
// import ParkingSimulation from "@/src/components/ParkingSimulation";
import clientsData from "@/src/data/clients.json";

const partners = [
  { src: "/icons/logobca.png", alt: "Partner 1" },
  { src: "/icons/mandiri_logo.png", alt: "Partner 2" },
  { src: "/icons/bni_logo.png", alt: "Partner 3" },
  { src: "/icons/bri_logo.png", alt: "Partner 4" },
  { src: "/icons/nobu_logo.png", alt: "Partner 5" },
  { src: "/icons/logo_gopay.png", alt: "Partner 6" },
  { src: "/icons/logo_linkaja.png", alt: "Partner 7" },
  { src: "/icons/ovo_logo.png", alt: "Partner 8" },
  {
    src: "/images/additional_mitra/bpjs_ketenagakerjaan_mitra.jpg",
    alt: "Partner 9",
  },
  { src: "/images/additional_mitra/bpjs_mitra.png", alt: "Partner 10" },
  { src: "/images/additional_mitra/hikvision_mitra.png", alt: "Partner 11" },
  { src: "/images/additional_mitra/indihome_mitra.png", alt: "Partner 12" },
  { src: "/images/additional_mitra/linknet_mitra.png", alt: "Partner 13" },
  {
    src: "/images/additional_mitra/lippo_insurance_mitra.png",
    alt: "Partner 14",
  },
  { src: "/images/additional_mitra/multipolar_mitra.png", alt: "Partner 15" },
  { src: "/images/additional_mitra/telkomsel_mitra.png", alt: "Partner 16" },
  { src: "/images/additional_mitra/tsi_mitra.png", alt: "Partner 17" },
  { src: "/images/additional_mitra/vemafats_mitra.png", alt: "Partner 18" },
];

type Client = {
  src: string;
  alt: string;
  businessType: string;
  since: string;
  Transaction: string;
  parkingLots: number;
};

// Custom hook for count-up animation
const useCountUp = (
  end: number,
  duration: number = 2000,
  delay: number = 0
) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay]);

  return { count, ref };
};

// CountUp component
const CountUpNumber = ({
  end,
  suffix = "",
  duration = 2000,
  delay = 0,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) => {
  const { count, ref } = useCountUp(end, duration, delay);

  return (
    <div
      ref={ref}
      className="text-4xl font-bold text-[#FFCC0D] mb-2 group-hover:text-yellow-300 transition-colors duration-300"
    >
      {count}
      {suffix}
    </div>
  );
};

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setClients(clientsData as Client[]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % clients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [clients.length]);

  function formatNumberWithDots(num: number): string {
    const parts = [];
    let n = num;

    while (n >= 1000) {
      const remainder = n % 1000;
      parts.unshift(remainder.toString().padStart(3, "0"));
      n = Math.floor(n / 1000);
    }

    parts.unshift(n.toString());

    return parts.join(".");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow relative">
        {/* Hero Section */}
        <div className="min-h-[80vh] flex items-center relative overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-section-home-page.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>

          <section
            className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl relative z-10"
            id="homeTitle"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 max-w-90 text-[#FFCC0D]"
            >
              {homeTranslations.hero.title[language]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl max-w-140 text-white"
            >
              {homeTranslations.hero.description[language]}
            </motion.p>
          </section>
        </div>
        {/* Features Section dengan Split Level */}
        <section className="relative -mt-24 z-20 pb-16">
          <div
            className="absolute inset-0 top-24 z-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3)), url("/images/hero.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            id="feature"
            className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-b from-white via-white/20 to-transparent rounded-3xl p-12"
            >
              <motion.div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  {homeTranslations.features.title[language]}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-xl text-gray-600"
                >
                  {homeTranslations.features.subtitle[language]}
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features[language].map((feature, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FeatureCard
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        {/* Company Overview Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/parking-pattern.jpg')] opacity-5"></div>
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFCC0D] mb-6">
                {language === "en"
                  ? "Seamless Parking Experience"
                  : "Pengalaman Parkir yang Lancar"}
              </h2>
              <div className="w-32 h-1 bg-[#FFCC0D] mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {language === "en"
                  ? "Indonesia's most preferred parking solution provider with over 55 million transactions per annum"
                  : "Penyedia solusi parkir terpilih di Indonesia dengan lebih dari 55 juta transaksi per tahun"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  number: 55,
                  suffix: "M",
                  label:
                    language === "en"
                      ? "Annual Transactions"
                      : "Transaksi Tahunan",
                  icon: "📊",
                },
                {
                  number: 126,
                  label: language === "en" ? "Locations" : "Lokasi",
                  icon: "📍",
                },
                {
                  number: 25,
                  label: language === "en" ? "Cities" : "Kota",
                  icon: "🏙️",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:border-[#FFCC0D]/50 transition-all duration-300 group hover:scale-105"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <CountUpNumber
                    end={stat.number}
                    suffix={stat.suffix || ""}
                    duration={2500}
                    delay={index * 300}
                  />
                  <div className="text-white text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Partners Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {homeTranslations.partners.title[language]}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {homeTranslations.partners.subtitle[language]}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-center h-24"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className="object-contain h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Client Section */}
        {/* Client Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent mb-4">
                {homeTranslations.clients.title[language]}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {homeTranslations.clients.subtitle[language]}
              </p>
            </motion.div>

            {/* Split Layout - Image and Info Side by Side */}
            <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
              {/* Image Container */}
              <div className="relative">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl bg-white">
                  {clients.map((client, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        x: activeIndex === index ? 0 : 100,
                        zIndex: activeIndex === index ? 10 : 1,
                      }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className={`absolute inset-0 ${
                        activeIndex === index ? "block" : "hidden"
                      }`}
                    >
                      <div className="relative h-full w-full flex items-center justify-center p-8">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="object-contain drop-shadow-lg"
                          priority={index < 3}
                        />
                      </div>

                      {/* Floating Business Type Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                          client.businessType.includes("GOVERNMENT")
                            ? "bg-blue-500 text-white"
                            : client.businessType.includes("Healthcare")
                            ? "bg-green-500 text-white"
                            : client.businessType.includes("Mall")
                            ? "bg-purple-500 text-white"
                            : "bg-[#FFCC0D] text-gray-900"
                        }`}
                      >
                        {client.businessType}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FFCC0D] rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-2xl"></div>
              </div>

              {/* Info Container */}
              <div className="space-y-6">
                {clients.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : -50,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`${activeIndex === index ? "block" : "hidden"}`}
                  >
                    {/* Client Name */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-4xl font-bold text-gray-800 mb-6 leading-tight"
                    >
                      {client.alt}
                    </motion.h3>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
                      >
                        <p className="text-gray-500 text-sm font-medium mb-1">
                          Operational Since
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {client.since}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
                      >
                        <p className="text-gray-500 text-sm font-medium mb-1">
                          Transactions
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {client.Transaction}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#FFCC0D]"
                      >
                        <p className="text-gray-500 text-sm font-medium mb-1">
                          Parking Lots
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {formatNumberWithDots(client.parkingLots)}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scrollable Thumbnail Navigation */}
            <div className="mb-8">
              <div className="overflow-x-auto scrollbar-hide">
                <div
                  className="flex gap-4 px-4 min-w-max mx-auto"
                  style={{ width: "fit-content" }}
                >
                  {clients.map((client, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveIndex(index)}
                      className={`cursor-pointer transition-all duration-300 group flex-shrink-0 ${
                        activeIndex === index
                          ? "ring-4 ring-[#FFCC0D] shadow-xl"
                          : "opacity-70 hover:opacity-100 shadow-lg"
                      }`}
                    >
                      <div className="w-28 h-20 relative overflow-hidden rounded-xl bg-white p-2 group-hover:bg-gray-50 transition-colors">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="object-contain p-1"
                        />
                        {/* Active indicator dot */}
                        <div
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
                            activeIndex === index
                              ? "bg-[#FFCC0D] scale-100"
                              : "bg-transparent scale-0"
                          }`}
                        ></div>
                      </div>

                      {/* Client name on hover */}
                      <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs font-medium text-gray-600 truncate w-28">
                          {client.alt}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center mt-4 space-x-1">
                {clients.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "bg-[#FFCC0D] w-6" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <ParkingSimulation />
//     </div>
//   );
// }
