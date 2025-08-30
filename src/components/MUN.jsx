import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MUN = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageRightRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const title = titleRef.current;
    const imageLeft = imageLeftRef.current;
    const imageRight = imageRightRef.current;

    const ctx = gsap.context(() => {
      // --- SET INITIAL STATE ---
      // Title is hidden and moved down
      gsap.set(title, { autoAlpha: 0, y: 50 });
      // Images are hidden, scaled down, and moved horizontally
      gsap.set([imageLeft, imageRight], {
        autoAlpha: 0,
        scale: 0.9,
        x: (i) => (i === 0 ? -50 : 50), // Left image moves from -50, right from 50
      });

      // --- CREATE TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // Animation starts when the top of the section is 80% down the viewport
          end: "top 30%",   // Animation is complete when the top of the section is 30% down the viewport
          scrub: 1,         // Animation progress is tied to scrollbar with a 1-second smooth lag
        },
      });

      tl.to(title, {
        autoAlpha: 1,
        y: 0,
        duration: 1, // Duration acts as a ratio within the scrub
        ease: "power3.out",
      }).to(
        [imageLeft, imageRight],
        {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2, // Animate images one after the other with a 0.2s delay
        },
        "-=0.7" // Start this animation 0.7s before the previous one ends
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP animations on component unmount
  }, []);

  return (
    <section
      id="MUN-activities"
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-black"
    >
      <div className="w-full mx-auto">
        {/* Title Section */}
        <div ref={titleRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none mb-4 sm:mb-0">
          </h1>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase self-end leading-none">
            MODEL UNITED NATIONS
          </h2>
        </div>

        {/* Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={imageLeftRef} className="w-full">
            <img
              src="/images/mun1.JPG"
              alt="MUN Activity 1"
              className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-auto md:max-h-[500px]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
              }}
            />
          </div>
          <div ref={imageRightRef} className="w-full">
            <img
              src="/images/mun2.JPG"
              alt="MUN Activity 2"
              className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-auto md:max-h-[600px]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUN;