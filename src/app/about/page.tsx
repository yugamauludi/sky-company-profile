"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { aboutTranslations } from "@/src/locales/about";
import { useLanguage } from "@/src/context/LanguageContext";

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          className="min-h-[500px] flex items-center relative"
          style={{
            backgroundImage: 'url("images/logo_system.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.71)",
            }}
          />

          <section
            className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl relative z-10"
            id="homeTitle"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-[#FFCC0D] text-center"
            >
              {" "}
              {aboutTranslations.hero.title[language]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white text-center mt-4"
            >
              {aboutTranslations.hero.description[language]}
            </motion.p>
          </section>
        </div>

        {/* Vision & Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6 text-[#FFCC0D]">
                  {aboutTranslations.vision.title[language]}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {aboutTranslations.vision.description[language]}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6 text-[#FFCC0D]">
                  {aboutTranslations.mission.title[language]}
                </h2>
                <ul className="text-gray-700 space-y-4 list-disc pl-5">
                  {aboutTranslations.mission.points[language].map(
                    (point, index) => (
                      <li key={index}>{point}</li>
                    )
                  )}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ISO Certification Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2 className="text-3xl font-bold text-center mb-12">
              {aboutTranslations.certification.title[language]}
            </motion.h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Image
                  src="/images/iso.png"
                  alt="ISO 9001"
                  width={250}
                  height={350}
                  className="mb-4 hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold">
                  {aboutTranslations.certification.iso9001.title[language]}
                </h3>
                <p className="text-gray-600">
                  {
                    aboutTranslations.certification.iso9001.description[
                      language
                    ]
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-16">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2 className="text-3xl font-bold text-center mb-12">
              {aboutTranslations.awards.title[language]}
            </motion.h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/reward_1.png"
                  alt="Award 1"
                  width={300}
                  height={300}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="/images/reward_2.png"
                  alt="Award 2"
                  width={300}
                  height={300}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src="/images/reward_3.png"
                  alt="Award 3"
                  width={300}
                  height={300}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
