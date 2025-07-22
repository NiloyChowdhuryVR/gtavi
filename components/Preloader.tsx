"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Preloader = ({
  setIsLoading,
}: {
  setIsLoading: (state: boolean) => void;
}) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    let split;

    // First hide the text
    gsap.set(textRef.current, { opacity: 0 });

    SplitText.create(textRef.current, {
      type: "chars",
      charsClass: "char",
      onSplit: (self) => {
        // Then animate characters in
        split = gsap.fromTo(
          self.chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            delay: 0.7,
            ease: "expo.out",
            onStart: () => {
              gsap.set(textRef.current, { opacity: 1 }); // show parent wrapper when animation starts
            },
            onComplete: () => {
              // Slide the entire screen up
              gsap.to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "power3.inOut",
                delay: 0.3,
                onComplete: () => setIsLoading(false),
              });
            },
          }
        );
        return split;
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen fixed left-0 top-0 flex justify-center items-center w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 z-[999999] text-white overflow-hidden"
    >
      <h1
        ref={textRef}
        className="text-[6rem] md:text-[11rem] lg:text-[16rem] font-extrabold uppercase leading-none opacity-0"
      >
        NILOY
      </h1>
    </div>
  );
};

export default Preloader;
