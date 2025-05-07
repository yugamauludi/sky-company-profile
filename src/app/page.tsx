"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { features } from "@/src/locales/features";
import FeatureCard from "@/src/components/FeatureCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";
import { homeTranslations } from "@/src/locales/home";

const clients = [
  { src: "/images/siloam.jpeg", alt: "Client 1" },
  { src: "/images/lippomall.jpg", alt: "Client 2" },
  { src: "/images/mayapada.jpg", alt: "Client 3" },
  { src: "/images/UPH-University.jpeg", alt: "Client 4" },
  { src: "/images/BCA_FORESTA.jpg", alt: "Client 5" },
  { src: "/images/ARYADUTA.jpg", alt: "Client 6" },
  { src: "/images/ot-orang-tua.jpg", alt: "Client 7" },
];

const partners = [
  { src: "/icons/logobca.png", alt: "Partner 1" },
  { src: "/icons/mandiri_logo.png", alt: "Partner 2" },
  { src: "/icons/bni_logo.png", alt: "Partner 3" },
  { src: "/icons/bri_logo.png", alt: "Partner 4" },
  { src: "/icons/nobu_logo.png", alt: "Partner 5" },
  { src: "/icons/logo_gopay.png", alt: "Partner 6" },
  { src: "/icons/logo_linkaja.png", alt: "Partner 7" },
  { src: "/icons/ovo_logo.png", alt: "Partner 8" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % clients.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
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
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl shadow-2xl p-12"
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

        {/* Partners Section */}
        <section className="py-16">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
            >
              {homeTranslations.partners.title[language]}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={100}
                    height={40}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              {homeTranslations.clients.title[language]}
            </h2>
            <div className="flex flex-col items-center gap-8">
              {/* Featured Client */}
              <div className="w-full max-w-4xl h-[480px] relative overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={clients[activeIndex].src}
                  alt={clients[activeIndex].alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-all duration-700 ease-in-out transform hover:scale-105"
                  priority
                />
              </div>

              {/* Thumbnails container */}
              <div className="flex flex-wrap justify-center gap-4 mt-8 pb-4 w-full max-w-4xl">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      cursor-pointer transition-all duration-300
                      ${
                        activeIndex === index
                          ? "ring-2 ring-[#FFCC0D] scale-105"
                          : "opacity-70 hover:opacity-100"
                      }
                    `}
                  >
                    <div className="w-[100px] h-[70px] relative overflow-hidden rounded-md">
                      <Image
                        src={client.src}
                        alt={client.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
