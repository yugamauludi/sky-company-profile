"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/src/context/LanguageContext";
import { contactTranslations } from "@/src/locales/contact";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";

interface FormData {
  title: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    title: "Mr.",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          title: formData.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: "success",
        message: contactTranslations.success[language],
      });
      setFormData({
        title: "mr",
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.log("ERROR SEND MESSAGE:", error);
      
      setSubmitStatus({
        type: "error",
        message: contactTranslations.error[language],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section dengan Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/contact-us.jpg"
            alt="Sky Parking Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFCC0D] to-[#FFA500]">
              {contactTranslations.title[language]}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              {contactTranslations.description[language]}
            </p>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full p-1">
            <div className="w-1.5 h-3 bg-white rounded-full mx-auto" />
          </div>
        </motion.div>
      </div>

      {/* Main Content dengan Glass Effect */}
      <div className="relative z-20 -mt-20 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information Panel */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {contactTranslations.contactInfo[language]}
                </h2>
                <p className="text-gray-600 text-lg">
                  {contactTranslations.contactDescription[language]}
                </p>
              </div>

              {/* Contact Cards dengan Hover Effects */}
              <div className="space-y-6">
                {[
                  {
                    icon: "📞",
                    title: "Phone",
                    content: "(+62)21 55764058",
                    gradient: "from-blue-500 to-blue-600"
                  },
                  {
                    icon: <FaEnvelope className="text-[#FFCC0D] text-4xl" />,
                    title: "Email",
                    content: "business.development@skyparking.co.id",
                    gradient: "from-green-500 to-green-900"
                  },
                  {
                    icon: "📍",
                    title: "Address",
                    content: "Ruko pinangsia karawaci Office park blok H no 20, Lippo Village, Karawaci, Tangerang, Banten",
                    gradient: "from-red-500 to-red-600"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form dengan Animasi */}
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields dengan Enhanced Styling */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="block text-gray-700 mb-2 font-medium">
                      {contactTranslations.titleLabel[language]}
                    </label>
                    <select
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full h-[59px] px-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFCC0D] focus:ring-2 focus:ring-[#FFCC0D]/20 transition-all duration-300"
                    >
                      <option value="mr">{contactTranslations.titleOptions.mr[language]}</option>
                      <option value="mrs">{contactTranslations.titleOptions.mrs[language]}</option>
                      <option value="ms">{contactTranslations.titleOptions.ms[language]}</option>
                    </select>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <label className="block text-gray-700 mb-2 font-medium">
                      {contactTranslations.name[language]}<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-[59px] px-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFCC0D] focus:ring-2 focus:ring-[#FFCC0D]/20 transition-all duration-300"
                    />
                  </motion.div>
                </div>

                {/* Email dan Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <label className="block text-gray-700 mb-2 font-medium">
                      {contactTranslations.email[language]}<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFCC0D] focus:ring-2 focus:ring-[#FFCC0D]/20 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <label className="block text-gray-700 mb-2 font-medium">
                      {contactTranslations.phone[language]}<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFCC0D] focus:ring-2 focus:ring-[#FFCC0D]/20 transition-all duration-300"
                    />
                  </motion.div>
                </div>

                {/* Company */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative group"
                >
                  <label className="block text-gray-700 mb-2 font-medium">
                    {contactTranslations.company[language]}<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFCC0D] focus:ring-2 focus:ring-[#FFCC0D]/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative group"
                >
                  <label className="block text-gray-700 mb-2 font-medium">
                    {contactTranslations.message[language]}<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFCC0D] focus:ring-2 focus:ring-[#FFCC0D]/20 transition-all duration-300 resize-none"
                  />
                </motion.div>

                {/* Submit Button dengan Advanced Animation */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-4 px-8 rounded-xl font-bold text-lg
                    ${isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#FFCC0D] to-[#FFA500] hover:shadow-lg hover:shadow-[#FFCC0D]/20'
                    }
                    transition-all duration-300
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>{contactTranslations.sending[language]}</span>
                      </>
                    ) : (
                      <>
                        <span>{contactTranslations.submit[language]}</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Status Message dengan Enhanced Animation */}
                <AnimatePresence>
                  {submitStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`
                        p-4 rounded-xl text-center font-medium
                        ${submitStatus.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                        }
                      `}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#FFCC0D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FFA500]/10 rounded-full blur-3xl" />
    </div>
  );
}
