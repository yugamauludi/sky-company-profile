/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carWidth = 100; // Car width in pixels

  // Throttle function to limit scroll updates (for better performance)
  const throttle = (func: (...args: any[]) => void, limit: number) => {
    let inThrottle: boolean;
return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // Scroll handler
  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage = maxScroll > 0 ? Math.min(position / maxScroll, 1) : 0;
    setScrollProgress(scrollPercentage);
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    const container = document.getElementById("scroll-container");
    if (container) {
      setContainerWidth(container.offsetWidth);
    }
  }, []);

  const throttledHandleScroll = useCallback(throttle(handleScroll, 16), [handleScroll]);

  useEffect(() => {
    handleScroll();
    handleResize();

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [throttledHandleScroll, handleResize]);

  if (typeof window === "undefined") return null;

  const progressBarWidth = `${scrollProgress * 100}%`;
  const carTranslate = scrollProgress * (containerWidth - carWidth);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 pointer-events-none">
      <div id="scroll-container" className="w-[80%] mx-auto relative">
        {/* Progress Track */}
        <div className="w-full h-2 bg-gray-200/30 rounded-full relative overflow-hidden">
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-full bg-[#FFCC0D] rounded-full transition-all duration-100 ease-out"
            style={{
              width: progressBarWidth,
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Car */}
        <div
          className="absolute -top-8 left-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(${carTranslate}px)`,
            width: `${carWidth}px`,
          }}
        >
          <Image
            src="/images/car.png"
            alt="Scroll Indicator"
            width={100}
            height={50}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
