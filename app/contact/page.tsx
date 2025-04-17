"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/LanguageContext";
import { contactTranslations } from "@/locales/contact";
import {motion} from "framer-motion";

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
    <div className="min-h-screen py-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFCC0D]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FFCC0D]/5 rounded-full translate-x-1/2" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#FFCC0D]/10 rounded-full" />
      
      <div className="container mx-auto px-4 max-w-3xl relative">
        <div className="text-center mb-8 min-h-[80px]">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[50px] font-bold bg-gradient-to-r from-[#FFCC0D] to-[#FFA500] bg-clip-text text-transparent"
          >
            {contactTranslations.title[language]}
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">
                {contactTranslations.titleLabel[language]}
              </label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full h-[47.8px] px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent transition-all duration-300"
              >
                <option value="mr">{contactTranslations.titleOptions.mr[language]}</option>
                <option value="mrs">{contactTranslations.titleOptions.mrs[language]}</option>
                <option value="ms">{contactTranslations.titleOptions.ms[language]}</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                {contactTranslations.name[language]}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">
                {contactTranslations.email[language]}<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                {contactTranslations.phone[language]}<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {contactTranslations.company[language]}<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {contactTranslations.message[language]}<span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCC0D] focus:border-transparent transition-all duration-300 resize-none"
            />
          </div>

          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-4 rounded-xl ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#FFCC0D] to-[#FFA500] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            {isSubmitting && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>
              {isSubmitting 
                ? contactTranslations.sending[language]
                : contactTranslations.submit[language]
              }
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
