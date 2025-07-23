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
        {/* Hero Section dengan Parallax Effect */}
        <div
          className="min-h-[600px] flex items-center relative overflow-hidden"
          style={{
            backgroundImage: 'url("images/logo_system.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />

          <section className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-[#FFCC0D] mb-6 leading-tight"
              >
                {aboutTranslations.hero.title[language]}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed"
              >
                {aboutTranslations.hero.description[language]}
              </motion.p>
            </motion.div>
          </section>
        </div>

        {/* Vision & Mission Section dengan Floating Cards */}
        {/* <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white/80 -z-10" />
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-2xl p-10 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[#FFCC0D]/20"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FFCC0D] to-yellow-500 bg-clip-text text-transparent">
                    {aboutTranslations.vision.title[language]}
                  </h2>
                </motion.div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {aboutTranslations.vision.description[language]}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-2xl p-10 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[#FFCC0D]/20"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FFCC0D] to-yellow-500 bg-clip-text text-transparent">
                    {aboutTranslations.mission.title[language]}
                  </h2>
                </motion.div>
                <ul className="space-y-6">
                  {aboutTranslations.mission.points[language].map(
                    (point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-start space-x-3 text-gray-700"
                      >
                        <span className="text-[#FFCC0D] text-xl">•</span>
                        <span className="text-lg leading-relaxed">{point}</span>
                      </motion.li>
                    )
                  )}
                </ul>
              </motion.div>
            </div>
          </div>
        </section> */}

        <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {aboutTranslations.evolution.title[language]}
            </motion.h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#FFCC0D] to-yellow-500 h-full"></div>

              <div className="space-y-16">
                {[
                  {
                    year: "2015",
                    title: "Traditional Parking",
                    description: "Memulai dengan sistem parkir konvensional",
                  },
                  {
                    year: "2017",
                    title: "Cashless Era",
                    description: "Transisi ke sistem pembayaran non-tunai",
                  },
                  {
                    year: "2019",
                    title: "Manless Technology",
                    description: "Implementasi teknologi tanpa petugas",
                  },
                  {
                    year: "2024",
                    title: "Ticketless (In Progress)",
                    description: "Pengembangan sistem tanpa tiket",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="text-2xl font-bold text-[#FFCC0D] mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FFCC0D] rounded-full border-4 border-white shadow-lg"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Innovation */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {aboutTranslations.technology.title[language]}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "License Plate Recognition (LPR)",
                  description:
                    "Teknologi pengenalan plat nomor otomatis untuk akses tanpa tiket",
                  icon: "🚗",
                  features: [
                    "Ticketless Entry",
                    "Automatic Gate Opening",
                    "Real-time Recognition",
                  ],
                },
                {
                  title: "Digital Membership",
                  description:
                    "Sistem keanggotaan digital dengan input nomor plat dan STNK",
                  icon: "📱",
                  features: [
                    "Digital Registration",
                    "Auto Vehicle Detection",
                    "Member Benefits",
                  ],
                },
                {
                  title: "Command Center Dashboard",
                  description:
                    "Pusat kontrol terpusat untuk monitoring semua lokasi parkir",
                  icon: "🖥️",
                  features: [
                    "Real-time Monitoring",
                    "Analytics Dashboard",
                    "Remote Control",
                  ],
                },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-5xl mb-6 text-center">{tech.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {tech.description}
                  </p>

                  <div className="space-y-3">
                    {tech.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-[#FFCC0D] rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Portfolio Showcase */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {aboutTranslations.portfolio.title[language]}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Public Transportation",
                  icon: "🚊",
                  description:
                    "Solusi parkir untuk stasiun LRT, bandara, dan transportasi publik",
                },
                {
                  category: "Healthcare & Education",
                  icon: "🏥",
                  description:
                    "Sistem parkir untuk rumah sakit dan institusi pendidikan",
                },
                {
                  category: "Shopping Malls",
                  icon: "🏬",
                  description:
                    "Manajemen parkir untuk pusat perbelanjaan dan retail",
                },
                {
                  category: "Office Towers",
                  icon: "🏢",
                  description:
                    "Solusi parkir untuk gedung perkantoran dan bisnis",
                },
                {
                  category: "Residential",
                  icon: "🏘️",
                  description:
                    "Sistem parkir untuk kompleks perumahan dan apartemen",
                },
                {
                  category: "Hotel & Leisure",
                  icon: "🏨",
                  description:
                    "Manajemen parkir untuk hotel dan fasilitas rekreasi",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4 text-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                    {service.category}
                  </h3>
                  <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ISO Certification Section dengan 3D Card Effect */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {aboutTranslations.certification.title[language]}
            </motion.h2>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-12 rounded-3xl shadow-2xl transform hover:shadow-[#FFCC0D]/30"
              >
                <div className="text-center space-y-8">
                  <div className="relative transform transition-all duration-300 hover:scale-105">
                    <Image
                      src="/images/iso.png"
                      alt="ISO 9001"
                      width={300}
                      height={400}
                      className="mx-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FFCC0D] to-yellow-500 bg-clip-text text-transparent">
                      {aboutTranslations.certification.iso9001.title[language]}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {
                        aboutTranslations.certification.iso9001.description[
                          language
                        ]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Awards Section dengan Interactive Gallery */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {aboutTranslations.awards.title[language]}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: num * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="relative bg-white rounded-3xl shadow-xl overflow-hidden flex items-center justify-center h-full"
                >
                  <div className="p-8 flex items-center justify-center">
                    <Image
                      src={`/images/reward_${num}.png`}
                      alt={`Award ${num}`}
                      width={400}
                      height={400}
                      className="w-full h-auto transform transition-transform duration-300 hover:scale-105 object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
