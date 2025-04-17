import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-[#FFCC0D] group"
    >
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
        />
      </motion.div>
      <h3 className="text-xl font-bold mb-4 group-hover:text-white">{title}</h3>
      <p className="text-gray-600 group-hover:text-white">{description}</p>
    </motion.div>
  );
}