import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/hero.JPG')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-white w-full h-full flex flex-col justify-between p-6">
        {/* Top navigation */}
        <div className="flex justify-between items-center text-6xl font-bold uppercase">
          <span>UESC</span>
          <div className="flex-1 flex justify-center">
            <span className="text-2xl">What We Do</span>
          </div>
          <div className="flex gap-6 text-2xl">
            <span>Visit Our Instagram</span>
          </div>
        </div>

        {/* Center links */}
        <div className="flex justify-between items-center w-full gap-10 text-2xl font-bold uppercase">
          <span>Featured Activities</span>
          <span>Model United Nation</span>
          <span>2025</span>
          <span>UESC</span>
        </div>

        {/* Bottom description */}
        <div className="flex flex-row justify-between items-end w-full">
          <p className="max-w-2xl font-bold text-3xl leading-relaxed text-left">
            UESC (UMN English Student Council) is an organization that empowers
            UMN students to develop their English skills through engaging
            activities, competitions, and community-building programs.
          </p>
          <span className="uppercase font-bold text-2xl ml-auto self-end">Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
