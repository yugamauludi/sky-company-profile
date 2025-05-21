"use client";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import { servicesTranslations } from "@/src/locales/services";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/src/components/Modal/ModalPaymentMethod";
import { useRef } from "react";

interface TechnologyCard {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export default function Services() {
  const { language } = useLanguage();
  const [selectedCard, setSelectedCard] = useState<TechnologyCard | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (card: TechnologyCard) => {
    setSelectedCard(card);
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth = 280;
      const cardGap = 24;
      const scrollAmount =
        direction === "left" ? -(cardWidth + cardGap) : cardWidth + cardGap;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section dengan Background Image dan Gradient Overlay */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/hero2.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 container mx-auto px-4 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#FFCC0D] mb-8 leading-tight">
              {servicesTranslations.hero.title[language]}
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
              {servicesTranslations.hero.subtitle[language]}
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <button
                onClick={() => {
                  const targetSection = document.querySelector(
                    "#technology-section"
                  );
                  targetSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="bg-[#FFCC0D] text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
              >
                Mulai Sekarang
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Technology Section dengan Card 3D Effect */}
        <section
          id="technology-section"
          className="py-24 bg-gradient-to-b from-gray-900 to-gray-800"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFCC0D] mb-6">
                {servicesTranslations.technology.title[language]}
              </h2>
              <div className="w-24 h-1 bg-[#FFCC0D] mx-auto rounded-full"></div>
            </motion.div>

            <div className="relative px-12">
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#FFCC0D] p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#FFCC0D] p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
              >
                {[
                  {
                    icon: "/images/tap-to-pay.png",
                    alt: "QRIS Tap",
                    title:
                      servicesTranslations.technology.qrisTap.title[language],
                    description:
                      servicesTranslations.technology.qrisTap.description[
                        language
                      ],
                  },
                  {
                    icon: "/images/debit-card.png",
                    alt: "Prepaid Card",
                    title:
                      servicesTranslations.technology.prepaid_card.title[
                        language
                      ],
                    description:
                      servicesTranslations.technology.prepaid_card.description[
                        language
                      ],
                  },
                  {
                    icon: "/images/id-card.png",
                    alt: "Member Sky Parking",
                    title:
                      servicesTranslations.technology.member.title[language],
                    description:
                      servicesTranslations.technology.member.description[
                        language
                      ],
                  },
                  {
                    icon: "/images/ewallet.png",
                    alt: "QRIS MPM",
                    title:
                      servicesTranslations.technology.ewallet_mpm.title[
                        language
                      ],
                    description:
                      servicesTranslations.technology.ewallet_mpm.description[
                        language
                      ],
                  },
                  {
                    icon: "/images/ewallet.png",
                    alt: "QRIS CPM",
                    title:
                      servicesTranslations.technology.ewallet_cpm.title[
                        language
                      ],
                    description:
                      servicesTranslations.technology.ewallet_cpm.description[
                        language
                      ],
                  },
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-none w-[280px] snap-center group bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFCC0D]/20 hover:scale-105"
                    onClick={() => handleCardClick(card)}
                  >
                    <div className="relative h-40 w-40 mx-auto mb-8">
                      <div className="absolute inset-0 bg-[#FFCC0D]/20 rounded-full"></div>
                      <div className="h-full w-full bg-[#FFCC0D] rounded-full flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                        <Image
                          src={card.icon}
                          alt={card.alt}
                          width={80}
                          height={80}
                          className="transform transition-all duration-500 group-hover:rotate-12"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white text-center mb-4 group-hover:text-[#FFCC0D] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-center group-hover:text-white transition-colors duration-300">
                      {servicesTranslations.technology.learnMore[language]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section dengan Floating Elements */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/parking-lot.jpg')] opacity-20 bg-cover bg-center bg-no-repeat"></div>
          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="flex flex-col gap-16">
              <motion.div
                initial={{ opacity: 3, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {servicesTranslations.dashboard.title[language]}
                </h2>
                <div className="w-20 h-1 bg-[#FFCC0D] rounded-full"></div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FFCC0D] to-yellow-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/images/dashboard_image.png"
                        alt="Dashboard"
                        width={1200} // Ubah ukuran width menjadi lebih besar
                        height={600} // Ubah ukuran height menjadi lebih besar
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {servicesTranslations.dashboard.subtitle[language]}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {servicesTranslations.dashboard.description[language]}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collaboration Section dengan Animated Grid */}
        <section className="py-24 bg-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFCC0D] mb-6">
                {servicesTranslations.collaboration.title[language]}
              </h2>
              <div className="w-24 h-1 bg-[#FFCC0D] mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
              {servicesTranslations.collaboration.items[language].map(
                (item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      rotateZ: 5,
                    }}
                    className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-center w-full h-24 flex items-center justify-center transform transition-all duration-300 hover:shadow-lg hover:shadow-[#FFCC0D]/20 border border-white/10"
                  >
                    <p className="font-bold text-lg text-white">{item}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Modal Component */}
        <Modal
          selectedCard={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      </main>
    </div>
  );
}
