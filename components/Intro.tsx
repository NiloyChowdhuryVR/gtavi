"use client";
import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [videoDuration, setVideoDuration] = useState(1);
  const [videoSrc, setVideoSrc] = useState("/trial_optimized.mp4");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const mobile = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
    setVideoSrc(mobile ? "/trial_optimized_mobile.mp4" : "/trial_optimized.mp4");
  }, []);

  // Load video duration
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(videoEl.duration || 1);
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoSrc]);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const head = headRef.current;
    const overlay = overlayRef.current;
    if (!section || !video || !head || !overlay) return;
    if (videoDuration === 0) return;

    // Animate headline opacity
    gsap.to(head, {
      opacity: 1,
      duration: 3,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate overlay fade
    gsap.to(overlay, {
      opacity: 0.4,
      duration: 3,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Throttle updating video currentTime with requestAnimationFrame
    const scrubObj = { t: 0 };
    let rafId: number | null = null;

    gsap.to(scrubObj, {
      t: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: isMobile ? false : true, // disable pin on mobile for performance
      },
      onUpdate: () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          if (video && videoDuration > 0) {
            video.currentTime = scrubObj.t * videoDuration;
          }
        });
      },
    });
  }, [videoDuration, isMobile]);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 z-10 pointer-events-none"
      />

      {/* Headline */}
      <h1
        ref={headRef}
        className="absolute text-2xl lg:text-6xl font-extrabold z-20 top-4/5 lg:top-2/3 left-1/8 opacity-0 text-white leading-snug"
      >
        &quot;If anything happens,
        <br />
        &nbsp; I&apos;ll run away before you.&quot;
      </h1>

      {/* Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover object-center will-change-auto z-0"
        preload="auto"
        playsInline
        muted
        style={{
          pointerEvents: "none",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
};

export default Intro;
