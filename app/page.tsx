import Hero from "@/components/Hero";
import Info from "@/components/Info";
import React from "react";

const page = () => {
  return (
    <div className="relative h-screen w-full bg-black">
      <div>
        <Hero />
      </div>
      <Info />
      <div className="h-screen page w-ful absolute bg-white">page</div>
    </div>
  );
};

export default page;
