import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TechnologyCard {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

interface ModalProps {
  selectedCard: TechnologyCard | null;
  onClose: () => void;
}

export default function ModalPaymentMethod({ selectedCard, onClose }: ModalProps) {
  if (!selectedCard) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[90%] md:w-[95vw] max-w-2xl overflow-hidden"
        >
          {/* Video Background berdasarkan jenis kartu */}
          <div className="relative w-full aspect-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain opacity-30"
            >
              <source
                src={
                  selectedCard.alt === "QRIS Tap"
                    ? "/videos/qris_tap_animation.mp4"
                    : selectedCard.alt === "Prepaid Card"
                    ? "/videos/prepaid-card-animation.mp4"
                    : selectedCard.title.includes("MPM")
                    ? "/videos/ewallet_mpm_animation.mp4"
                    : "/videos/ewallet_cpm_animation.mp4"
                }
                type="video/mp4"
              />
            </video>
          </div>

          {/* Content dengan z-index lebih tinggi */}
          <div className="relative z-10 px-4 pb-8 pt-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 absolute top-1 right-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex items-center justify-center -mt-20">
              <div className="h-24 w-24 bg-[#FFCC0D] rounded-full flex items-center justify-center shadow-lg">
                <Image
                  src={selectedCard.icon}
                  alt={selectedCard.alt}
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mt-6 mb-4">
              {selectedCard.title}
            </h3>
            <p className="text-gray-600 text-base md:text-xl text-center leading-relaxed px-4">
              {selectedCard.description}
            </p>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}