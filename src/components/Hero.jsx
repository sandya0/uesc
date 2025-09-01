import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isLoading = false }) => {
  const heroRef = useRef(null);
  const topNavRef = useRef(null);
  const centerLinksRef = useRef(null);
  const bottomDescRef = useRef(null);
  const revealImageRef = useRef(null);
  const bgContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const darkBackgroundRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        topNavRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );

      gsap.fromTo(
        centerLinksRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.25, ease: "power4.out", delay: 0.3 }
      );

      gsap.fromTo(
        bottomDescRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 1.2 }
      );

      const slotLinks = [
        ...Array.from(centerLinksRef.current.children),
        ...Array.from(document.querySelectorAll(".slot-link")),
      ];

      const listeners = [];
      slotLinks.forEach((linkWrapper) => {
        const innerWrapper = linkWrapper.querySelector(".inner-wrapper");
        if (!innerWrapper) return;

        const handleEnter = () =>
          gsap.to(innerWrapper, { y: "-100%", duration: 0.3, ease: "power2.inOut" });
        const handleLeave = () =>
          gsap.to(innerWrapper, { y: "0%", duration: 0.3, ease: "power2.inOut" });

        linkWrapper.addEventListener("mouseenter", handleEnter);
        linkWrapper.addEventListener("mouseleave", handleLeave);
        listeners.push({ el: linkWrapper, enter: handleEnter, leave: handleLeave });
      });

      // Curtain + Zoom effect for "UESC"
      const uescLink = document.querySelector(".uesc-curtain-trigger");
      if (uescLink && revealImageRef.current && bgContainerRef.current) {
        const handleEnter = () => {
          // Front reveal image zooms OUT (shrinks)
          gsap.to(revealImageRef.current, {
            y: "-100%",
            scale: 0.9, // smaller than 1 → zoom out
            duration: 0.9,
            opacity: 0.9,
            ease: "power2.out",
          });

          // Background image zooms IN (grows)
          gsap.to(bgContainerRef.current, {
            scale: 1.2, // larger than 1 → zoom in
            duration: 1.2,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          // Reset reveal image
          gsap.to(revealImageRef.current, {
            y: "0%",
            scale: 1, // back to normal size
            duration: 0.9,
            ease: "power2.inOut",
          });

          // Reset background image
          gsap.to(bgContainerRef.current, {
            scale: 1, // back to normal
            duration: 1.2,
            ease: "power3.out",
          });
        };

        uescLink.addEventListener("mouseenter", handleEnter);
        uescLink.addEventListener("mouseleave", handleLeave);
        listeners.push({ el: uescLink, enter: handleEnter, leave: handleLeave });
      }

      // Scroll effects
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

      if (darkBackgroundRef.current) {
        gsap.to(darkBackgroundRef.current, {
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "50% top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".hero-content",
        { opacity: 1, filter: "blur(0px)", y: 0 },
        {
          opacity: 0.3,
          filter: "blur(3px)",
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "80% top",
            scrub: true,
          },
        }
      );

      return () => {
        listeners.forEach(({ el, enter, leave }) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      };
    }, heroRef);

    return () => ctx.revert();
  }, [isLoading]);

  const centerLinks = ["Featured Activities", "UESC 2025"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden bg-black opacity-80">
        <div ref={bgContainerRef} className="absolute inset-0 will-change-transform">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/footer.jpg')`,
            }}
          />
          <div
            ref={revealImageRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform opacity-90"
            style={{
              backgroundImage: `url('/images/hero.jpg\')`,
              backgroundPosition: "center center",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 text-white w-full h-full flex flex-col justify-between p-4 sm:p-6">
        <div
          ref={topNavRef}
          className="flex justify-between items-center text-4xl sm:text-5xl lg:text-6xl font-bold uppercase"
        >
          <span>UESC</span>
          <div className="hidden md:flex flex-1 text-lg sm:text-xl lg:text-2xl justify-center">
            <span className="slot-link relative h-[1.1em] overflow-hidden block cursor-pointer">
              <span className="inner-wrapper block relative">
                <span className="inner-text block">What We Do</span>
                <span className="inner-text block absolute top-full">What We Do</span>
              </span>
            </span>
          </div>
          <div className="flex gap-4 sm:gap-6 text-lg sm:text-xl lg:text-2xl">
            <a
              href="https://www.instagram.com/uesc_umn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="slot-link relative h-[1.1em] overflow-hidden block cursor-pointer">
                <span className="inner-wrapper block relative">
                  <span className="inner-text block">Visit Our Instagram</span>
                  <span className="inner-text block absolute top-full">Visit Our Instagram</span>
                </span>
              </span>
            </a>
          </div>
        </div>

        <div
          ref={centerLinksRef}
          className="flex flex-row justify-between items-center w-full gap-4 sm:gap-6 lg:gap-10 text-lg sm:text-xl lg:text-2xl font-bold uppercase"
        >
          {centerLinks.map((text, i) => (
            <span
              key={i}
              className={`relative h-[1.1em] overflow-hidden block cursor-pointer ${
                text === "Featured Activities" || text === "Model United Nation"
                  ? "hidden md:block"
                  : ""
              } ${text === "UESC 2025" ? "uesc-curtain-trigger" : ""}`}
            >
              <span className="inner-wrapper block relative">
                <span className="inner-text block">{text}</span>
                <span className="inner-text block absolute top-full">{text}</span>
              </span>
            </span>
          ))}
        </div>

        <div
          ref={bottomDescRef}
          className="flex flex-col sm:flex-row justify-between items-end w-full gap-4 sm:gap-0"
        >
          <p className="max-w-full lg:max-w-2xl font-bold text-xl sm:text-2xl lg:text-3xl leading-relaxed text-left">
            UESC (UMN English Student Council) is an organization that empowers UMN students
            to develop their English skills through engaging activities, competitions, and
            community-building programs.
          </p>
          <span className="slot-link relative h-[1.2em] overflow-hidden block cursor-pointer uppercase font-bold text-lg sm:text-xl lg:text-2xl ml-0 sm:ml-auto self-start sm:self-end mt-4 sm:mt-0">
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
