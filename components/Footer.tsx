"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
// useGSAP(() => {
//   gsap.fromTo(
//     containerRef.current,
//     { scale: 1, borderRadius: "0px" }, // start
//     {
//       scale: 0.95,
//       borderRadius: "50px",
//       transformOrigin:"top center",
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top center",
//         end: "bottom top",
//         scrub: 1,
//         markers: true,
//       },
//     }
//   );
// }, []);


  return (
    
    <div ref={containerRef} className="w-full h-screen bg-gradient-to-r from-fuchsia-600 to-pink-600 flex justify-center items-center">
      <div
        ref={innerRef}
        className="w-[90%] h-full py-16 flex flex-col justify-between items-center gap-4 transition-transform origin-center"
      >
        <div className="uppercase text-[1rem]">
          <h2 className="text-center">waiting to be unleashed!</h2>
        </div>
        <div className="border-b w-full">
          <h1 className="text-[6rem] md:text-[11rem] lg:text-[16rem]  text-center font-extrabold">
            GTA VI
          </h1>
        </div>
        <div className="flex w-full flex-col lg:flex-row gap-5 justify-between items-center text-xs md:text-base">
          <p>© 1917 - 8091 All Rights Reserved</p>
          <div className="flex gap-5">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms and Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
