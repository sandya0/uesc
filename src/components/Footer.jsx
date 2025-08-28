import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Featured", href: "#about-us" },
    { name: "Debate", href: "#debate-activities" },
    { name: "Scrabble", href: "#scrabble-activities" },
    { name: "MUN", href: "#MUN-activities" },
    { name: "Speech", href: "#Speech-activities" },
  ];

  const footerRef = useRef(null);

  useEffect(() => {
    const slotLinks = footerRef.current.querySelectorAll(".slot-link");

    const listeners = [];
    slotLinks.forEach((linkWrapper) => {
      const innerWrapper = linkWrapper.querySelector(".inner-wrapper");

      const handleEnter = () => {
        gsap.to(innerWrapper, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.inOut",
        });
      };

      const handleLeave = () => {
        gsap.to(innerWrapper, {
          y: "0%",
          duration: 0.3,
          ease: "power2.inOut",
        });
      };

      linkWrapper.addEventListener("mouseenter", handleEnter);
      linkWrapper.addEventListener("mouseleave", handleLeave);

      listeners.push({ el: linkWrapper, enter: handleEnter, leave: handleLeave });
    });

    return () => {
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <footer className="text-black font-sans min-h-screen flex flex-col" ref={footerRef}>
      <div className="w-full px-6 flex-grow flex flex-col justify-center">
        {/* Main content grid */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          
          {/* Left Section: Image and Logo */}
          <div>
            <div className="w-full mb-8 overflow-hidden rounded-lg">
              <img 
                src="/images/footer.JPG"
                alt="UESC Event" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <h2 className="text-8xl font-bold">UESC</h2>
          </div>

          {/* Middle Section: Links */}
          <div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-5xl font-bold">
                    <span className="slot-link relative h-[1.1em] overflow-hidden block cursor-pointer">
                      <span className="inner-wrapper block relative">
                        <span className="inner-text block">{link.name}</span>
                        <span className="inner-text block absolute top-full">{link.name}</span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Contact Info */}
          <div className="w-80 text-left text-3xl">
            <div>
              <p className=" mb-4">UMN English Student Council (UESC) Empowering Voices, Building Confidence, Creating Community</p>
              <p>
                Universitas Multimedia Nusantara Jl. Boulevard Raya, Gading Serpong, Tangerang, Banten – Indonesia
              </p>
              <div className="mt-6">
                <a href="mailto:uesc@umn.ac.id" className="block hover:underline">uesc@umn.ac.id</a>
                <a href="https://www.instagram.com/uesc_umn" target="_blank" rel="noopener noreferrer" className="block hover:underline">@uesc_umn</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6">
        {/* Bottom row for copyright and credits */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 text-xl font-bold">
          <p>
            © 2025 UMN English Student Council. All Rights Reserved.
          </p>
          <a href="https://www.instagram.com/uesc_umn" target="_blank" rel="noopener noreferrer">
            <span className="slot-link relative h-[1.2em] overflow-hidden block cursor-pointer">
              <span className="inner-wrapper block relative">
                <span className="inner-text block">Instagram</span>
                <span className="inner-text block absolute top-full">Instagram</span>
              </span>
            </span>
          </a>
          <p>Made by Sandya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
