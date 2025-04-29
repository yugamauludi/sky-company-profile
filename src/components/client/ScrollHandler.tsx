"use client";
import { useEffect } from "react";

interface ScrollHandlerProps {
  onScroll: (scrolled: boolean) => void;
}

export default function ScrollHandler({ onScroll }: ScrollHandlerProps) {
  useEffect(() => {
    const handleScroll = () => {
      onScroll(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  return null;
}