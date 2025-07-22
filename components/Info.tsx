import React from "react";

const Info = () => {
  return (
    <div className=" flex justify-center h-full items-center py-20 w-full bg-black relative -top-1 overflow-hidden">
      <div
        className=" 
        bg-clip-text text-transparent 
        [background-image:radial-gradient(circle_at_center,_rgb(255,_211,_127)_0%,_rgb(232,_65,_123)_50%,_rgb(112,_30,_101)_80%,_rgba(32,_31,_66,_0)_100%)] 
        bg-fixed bg-cover bg-no-repeat w-[80%] lg:w-[65%]
      "
      >
        <h1 className="text-xl text-center md:text-4xl lg:text-left lg:text-5xl font-extrabold">Madhyamgram, WB.</h1>
        <p className="text-sm md:text-xl text-center lg:text-left lg:text-2xl leading-normal pt-5 font-extrabold">
          I accidentally spilled coffee on my keyboard one night, and instead of
          frying it, the caffeine somehow seeped into my code and sparked
          something wild — a website so alive with GSAP animations, it felt like
          it had a pulse.
          <br />
          Buttons bounced like jelly, colors swirled like a liquid rainbow, and
          every scroll unleashed a burst of motion like a fireworks show
          choreographed by a hyperactive designer.
          <br />I wasn’t coding anymore — I was conducting chaos with a
          keyboard. People didn’t just visit my site; they survived it, like a
          rollercoaster ride through pure, animated madness.
        </p>
      </div>
    </div>
  );
};

export default Info;
