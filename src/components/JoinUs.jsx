import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textContent = [
  "At UESC, you can improve your English skills",
  "in a supportive environment, gain valuable", 
  "experience in public speaking and debating,",
  "connect with like-minded peers and mentors,",
  "and unlock leadership opportunities for", 
  "personal growth—all while being part", 
  "of UMN's vibrant student community.",
];

const JoinUs = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const image = imageRef.current;
    const lines = gsap.utils.toArray(textRef.current.querySelectorAll(".line"));

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(image, { autoAlpha: 0, scale: 0.9, x: -100 });
      gsap.set(lines, { yPercent: 100, autoAlpha: 0 });

      // Timeline for scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(image, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }).to(
        lines,
        {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.3,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full text-black flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Image Content - Now on the left for desktop */}
        <div ref={imageRef} className="w-full flex justify-start items-start">
          <img
            src="/images/join.JPG"
            alt="UESC Group Photo"
            className="rounded-lg shadow-2xl object-cover w-full max-w-lg h-[530px]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Text Content - Now on the right for desktop */}
        <div
          className="flex flex-col items-start text-left justify-center"
        >
          <div ref={textRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {textContent.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <div className="line">{line}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;