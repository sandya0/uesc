import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const topNavRef = useRef(null);
  const centerLinksRef = useRef(null);
  const bottomDescRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlay fade-in
      gsap.fromTo(
        ".overlay",
        { opacity: 0 },
        { opacity: 0.4, duration: 1.2, ease: "power4.out" }
      );

      // Top navigation
      gsap.fromTo(
        topNavRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );

      // Center links intro
      gsap.fromTo(
        centerLinksRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.25,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // Bottom description
      gsap.fromTo(
        bottomDescRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          delay: 1.2,
        }
      );

      // Collect all slot links: center, nav items, scroll down
      const slotLinks = [
        ...Array.from(centerLinksRef.current.children),
        ...Array.from(document.querySelectorAll(".slot-link")),
      ];

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

      // OPTION 2: Y transform for upward movement
      gsap.to(heroRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade effect - add dark background when scrolled past 50%
      gsap.to(".dark-background", {
        opacity: 0.7, // dark background fades in
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "50% top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text elements fade out and blur as you scroll
      gsap.to(".hero-content", {
        opacity: 0.3,
        filter: "blur(3px)",
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });

      return () => {
        listeners.forEach(({ el, enter, leave }) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const centerLinks = ["Featured Activities", "Model United Nation", "2025", "UESC"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center overflow-hidden bg-[#f5f5f5]"
      style={{
        backgroundImage: `url('/images/hero.JPG')`,
        backgroundAttachment: "scroll",
        backgroundPosition: "center center",
      }}
    >

      {/* Overlay */}
      <div className="overlay absolute inset-0 bg-black/40"></div>

      {/* Dark background that appears on scroll - only for hero section */}
      <div className="dark-background absolute inset-0 bg-black opacity-0 pointer-events-none"></div>

      {/* Content */}
      <div className="hero-content relative z-10 text-white w-full h-full flex flex-col justify-between p-6">
        {/* Top navigation */}
        <div
          ref={topNavRef}
          className="flex justify-between items-center text-6xl font-bold uppercase"
        >
          <span>UESC</span>
          <div className="flex-1 flex text-2xl justify-center">
            <span className="slot-link relative h-[1em] overflow-hidden block cursor-pointer">
              <span className="inner-wrapper block relative">
                <span className="inner-text block">What We Do</span>
                <span className="inner-text block absolute top-full">What We Do</span>
              </span>
            </span>
          </div>
          <div className="flex gap-6 text-2xl">
            <a href="https://www.instagram.com/uesc_umn/" target="_blank" rel="noopener noreferrer">
              <span className="slot-link relative h-[1em] overflow-hidden block cursor-pointer">
                <span className="inner-wrapper block relative">
                  <span className="inner-text block">Visit Our Instagram</span>
                  <span className="inner-text block absolute top-full">
                    Visit Our Instagram
                  </span>
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Center links */}
        <div
          ref={centerLinksRef}
          className="flex justify-between items-center w-full gap-10 text-2xl font-bold uppercase"
        >
          {centerLinks.map((text, i) => (
            <span
              key={i}
              className="relative h-[1em] overflow-hidden block cursor-pointer"
            >
              <span className="inner-wrapper block relative">
                <span className="inner-text block">{text}</span>
                <span className="inner-text block absolute top-full">{text}</span>
              </span>
            </span>
          ))}
        </div>

        {/* Bottom description */}
        <div
          ref={bottomDescRef}
          className="flex flex-row justify-between items-end w-full"
        >
          <p className="max-w-2xl font-bold text-3xl leading-relaxed text-left">
            UESC (UMN English Student Council) is an organization that empowers
            UMN students to develop their English skills through engaging
            activities, competitions, and community-building programs.
          </p>
          <span className="slot-link relative h-[1em] overflow-hidden block cursor-pointer uppercase font-bold text-2xl ml-auto self-end">
            <span className="inner-wrapper block relative">
              <span className="inner-text block">Scroll Down</span>
              <span className="inner-text block absolute top-full">Scroll Down</span>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;