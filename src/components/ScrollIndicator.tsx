"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ScrollIndicator = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const position = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTrackWidth = window.innerWidth * 0.8;
      const carWidth = 100;
      const maxTranslateX = scrollTrackWidth - (carWidth / 2);
      const scrollPercentage = (position / maxScroll);
      const translateX = Math.min(scrollPercentage * maxTranslateX, maxTranslateX);
      setScrollPosition(translateX);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 pointer-events-none">
      <div className="w-[80%] mx-auto relative">
        <div className="w-full h-2 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#FFCC0D] transition-all duration-300"
            style={{
              width: `${(scrollPosition / (window.innerWidth * 0.8 - 50)) * 100}%`
            }}
          />
          <div 
            className="absolute top-0 right-0 h-full bg-gray-200/30 transition-all duration-300"
            style={{
              width: `${Math.max(0, 100 - ((scrollPosition / (window.innerWidth * 0.8 - 50)) * 100))}%`
            }}
          />
          <Image
            src="/images/car.png" 
            alt="Scroll Indicator"
            width={100}
            height={50}
            className="transform transition-transform duration-300 absolute -top-8"
            style={{
              transform: `translateX(${scrollPosition}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;