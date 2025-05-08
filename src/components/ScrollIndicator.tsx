"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ScrollIndicator = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTrackWidth = window.innerWidth * 0.8;
      const carWidth = 150;
      const maxTranslateX = scrollTrackWidth - carWidth;
      const scrollPercentage = (position / maxScroll);
      const translateX = scrollPercentage * maxTranslateX;
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
              width: `${scrollPosition}px`
            }}
          />
          <div 
            className="absolute top-0 right-0 h-full bg-gray-200/30 transition-all duration-300"
            style={{
              width: `calc(100% - ${scrollPosition}px)`
            }}
          />
          <Image
            src="/images/car.png" 
            alt="Scroll Indicator"
            width={150}
            height={75}
            className="transform transition-transform duration-300 absolute -top-12"
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