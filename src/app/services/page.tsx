"use client";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import { servicesTranslations } from "@/src/locales/services";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/src/components/Modal/ModalPaymentMethod";

interface TechnologyCard {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export default function Services() {
  const { language } = useLanguage();
  const [selectedCard, setSelectedCard] = useState<TechnologyCard | null>(null);

  const handleCardClick = (card: TechnologyCard) => {
    setSelectedCard(card);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          className="min-h-[300px] flex items-center justify-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/hero2.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-[#FFCC0D] text-center mb-4"
            >
              {servicesTranslations.hero.title[language]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white text-center max-w-3xl mx-auto"
            >
              {servicesTranslations.hero.subtitle[language]}
            </motion.p>
          </div>
        </div>

        {/* Technology Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
            >
              {servicesTranslations.technology.title[language]}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                // {
                //   icon: "/images/scan.png",
                //   alt: "QRIS",
                //   title: servicesTranslations.technology.qris.title[language],
                //   description:
                //     servicesTranslations.technology.qris.description[language],
                // },
                {
                  icon: "/images/id-card.png",
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
                  icon: "/images/ewallet.png",
                  alt: "E-wallet MPM",
                  title:
                    servicesTranslations.technology.ewallet_mpm.title[language],
                  description:
                    servicesTranslations.technology.ewallet_mpm.description[
                      language
                    ],
                },
                {
                  icon: "/images/ewallet.png",
                  alt: "E-wallet CPM",
                  title:
                    servicesTranslations.technology.ewallet_cpm.title[language],
                  description:
                    servicesTranslations.technology.ewallet_cpm.description[
                      language
                    ],
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleCardClick(card)}
                >
                  <div className="h-32 w-32 bg-[#FFCC0D] rounded-full flex items-center justify-center mb-6 hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={card.icon}
                      alt={card.alt}
                      width={64}
                      height={64}
                      className="transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 hover:text-[#FFCC0D] transition-colors duration-300">
                    {servicesTranslations.technology.learnMore[language]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Modal Popup */}
          <Modal
            selectedCard={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        </section>

        {/* Dashboard Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
            >
              {servicesTranslations.dashboard.title[language]}
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2 px-4"
              >
                <h3 className="text-3xl font-bold mb-6">
                  {servicesTranslations.dashboard.subtitle[language]}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {servicesTranslations.dashboard.description[language]}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2 flex justify-center items-center px-4"
              >
                <div className="relative w-full max-w-md mx-auto">
                  <Image
                    src="/icons/chart.png"
                    alt="Dashboard"
                    width={400}
                    height={240}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
            >
              {servicesTranslations.collaboration.title[language]}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {servicesTranslations.collaboration.items[language].map(
                (item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#FFCC0D",
                      color: "white",
                    }}
                    className="bg-white p-4 rounded-lg shadow-md text-center transition-all duration-300"
                  >
                    <p className="font-semibold">{item}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
