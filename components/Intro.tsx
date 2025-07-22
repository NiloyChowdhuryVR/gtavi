"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const jasonOpacityRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [totalFrames, setTotalFrames] = useState(60);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const frames = mobile ? 20 : 60;
    setTotalFrames(frames);

    const loadedImages = [];
    for (let i = 1; i <= frames; i++) {
      const padded = i.toString().padStart(4, "0");
      loadedImages.push(
        mobile ? `/frames/frame_${padded}.jpg` : `/frame/frame_${padded}.jpg`
      );
    }

    setImages(loadedImages);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current || images.length === 0) return;
    gsap.to(headRef.current, {
      opacity: 1,
      duration: 3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      sectionRef.current,
      {
        scale: 0.9,
        opacity:0,
        borderRadius: "50px",
        transformOrigin:"top center"
      },
      {
        scale:1,
        opacity:1,
        borderRadius:0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      }
    );

    gsap.to(jasonOpacityRef.current, {
      opacity: 0.4,
      duration: 3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: totalFrames - 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
      onUpdate: () => {
        const currentFrame = Math.round(obj.frame);
        if (imageRef.current && images[currentFrame]) {
          imageRef.current.src = images[currentFrame];
        }
      },
    });
  }, [images]);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* Overlay */}
      <div
        ref={jasonOpacityRef}
        className="absolute inset-0 bg-black opacity-0 z-10"
      />

      {/* Text (absolute inside relative section) */}
      <h1
        ref={headRef}
        className="absolute text-2xl lg:text-6xl font-extrabold z-20 top-8/10 lg:top-2/3 left-1/8 opacity-0 text-white leading-snug"
      >
        "If anything happens,
        <br />
        &nbsp; I'll run away before you."
      </h1>

      {/* Image */}
      <img
        ref={imageRef}
        src={isMobile ? `/frames/frame_0001.jpg` : `/frame/frame_0001.jpg`}
        className="w-full h-full object-cover object-[60%_center] will-change-transform z-0"
        alt="Scroll Animation"
      />
    </div>
  );
};

export default Intro;
