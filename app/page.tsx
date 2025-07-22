import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Intro from "@/components/Intro";
import React from "react";

const page = () => {

  return (
    <div className="relative contain h-screen w-full bg-black">
      <div >
        <Hero />
      </div>
      <div>

      <Info />
      </div>
      <Intro/>
      <Footer/>
    </div>
  );
};

export default page;
