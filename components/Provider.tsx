"use client";
import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import Preloader from "./Preloader";

const Provider = ({ children }: { children: React.ReactNode }) => {

  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: DOMHighResTimeStamp) 
    {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return <div>
    {isLoading?<Preloader setIsLoading={setIsLoading}/>:null}
    {children}</div>;
};

export default Provider;
