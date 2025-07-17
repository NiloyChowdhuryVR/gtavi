import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Intro from "@/components/Intro";
import React from "react";

const page = () => {

  return (
    <div className="relative h-screen w-full bg-black">
        <Hero />
      <Info />
      <Intro/>
      <div  className="h-screen page w-ful absolute">page</div>
    </div>
  );
};

export default page;
