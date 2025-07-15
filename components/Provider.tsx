"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";

const Provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration:2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    
      // smoothWheel:true,
    });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return <div>{children}</div>;
};

export default Provider;
