"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef, useState, useEffect } from "react";

// Register ScrollTrigger with GSAP so we can use scroll-based animations
gsap.registerPlugin(ScrollTrigger);

// Change: now we have 60 frames
const TOTAL_FRAMES = 60;

const Intro = () => {
  // `sectionRef` refers to the scrollable section we want to animate
  const sectionRef = useRef<HTMLDivElement>(null);

  // `imageRef` refers to the <img> tag where we will update the `src` dynamically
  const imageRef = useRef<HTMLImageElement>(null);

  // React state to store all image URLs we’ll use for scroll animation
  const [images, setImages] = useState<string[]>([]);

  // ✅ Load all 60 images into the state when the component mounts
  useEffect(() => {
    const loadedImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      // Pad the number with leading zeroes to match the filename format: frame_0001.jpg
      const padded = i.toString().padStart(4, "0");
      // ✅ Folder is now `/frame` (not `/frames`)
      loadedImages.push(`/frame/frame_${padded}.jpg`);
    }

    setImages(loadedImages);
  }, []);

  // ✅ Scroll animation using GSAP
  useGSAP(() => {
    // Abort if references aren't ready or images not loaded yet
    if (!sectionRef.current || !imageRef.current || images.length === 0) return;

    // This object will have a property `frame` that GSAP will animate
    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: TOTAL_FRAMES - 1, // Animate from 0 to 59
      ease: "none", // Linear interpolation
      scrollTrigger: {
        trigger: sectionRef.current, // Triggered when this section enters viewport
        start: "top top", // Start when top of section hits top of screen
        end: "bottom top", // End when bottom of section hits top of screen
        scrub: true, // Smooth scroll sync
        pin: true, // Pin the section while animation is active
      },
      onUpdate: () => {
        const currentFrame = Math.round(obj.frame);
        if (imageRef.current && images[currentFrame]) {
          imageRef.current.src = images[currentFrame]; // Update image
        }
      },
    });
  }, [images]); // This re-runs when `images` is updated

  return (
    <div className="h-[200vh] overflow-x-hidde">
      <div
        ref={sectionRef}
        className="h-screen w-full bg-black flex items-center justify-center"
      >
        {/* Default frame to show before animation kicks in */}
        <img
          ref={imageRef}
          src="/frame/frame_0001.jpg" // ✅ Start frame updated to `/frame`
          className="w-full h-full object-cover object-[60%_center]"
          alt="Scroll Animation"
        />
      </div>
    </div>
  );
};

export default Intro;
