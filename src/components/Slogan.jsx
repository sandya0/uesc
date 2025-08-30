import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Slogan = () => {
  const sectionRef = useRef(null);
  // line1Ref and line2Ref are no longer needed for the animation trigger
  // but can be kept if used for other purposes.

  useEffect(() => {
    // gsap.context() is great for scoping and cleanup!
    const ctx = gsap.context(() => {
      // Select all the inner wrappers for the letters
      const letters = sectionRef.current.querySelectorAll(".inner-wrapper");

      // The animation itself remains the same
      gsap.to(letters, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1, // go up then back down
        stagger: {
          each: 0.05,
          from: "random",
        },
        // We pause the animation initially so it doesn't run on load
        paused: true, 
        
        // This is the magic part!
        scrollTrigger: {
          trigger: sectionRef.current, // The element that triggers the animation
          start: "top 80%", // When the top of the trigger hits 80% down from the top of the viewport
          // You can also use values like "top center", "bottom bottom", etc.
          
          // Defines what happens on enter/leave/enter back/leave back
          // "restart" will replay the animation every time it enters the viewport
          toggleActions: "restart none none none", 
        },
      });
    }, sectionRef); // Scope the context to the sectionRef

    // Cleanup
    return () => ctx.revert();
  }, []);

  // Helper to wrap letters into slot structure (this function doesn't need to change)
    const renderSlotWords = (text) => {
      return text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]"> 
          {word.split("").map((char, i) => (
            <span
              key={i}
              className="slot-wrapper relative inline-block h-[1em] overflow-hidden"
            >
              <span className="inner-wrapper block relative">
                <span className="block">{char}</span>
                <span className="block absolute top-full">{char}</span>
              </span>
            </span>
          ))}
        </span>
      ));
    };

  
  return (
    <section
      ref={sectionRef}
      className="min-h-[50vh] w-full bg-gray-100 text-black flex flex-col justify-center p-6 sm:p-12 lg:p-16 overflow-hidden"
    >
      <div className="flex-wrap flex-col">
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-wide leading-tight text-left">
          {renderSlotWords("Empowering Voices")}
        </h2>

        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-wide leading-tight mt-2 sm:mt-4 text-left sm:text-right">
          {renderSlotWords("Building Confidence")}
        </h2>
      </div>
    </section>
  );
};

export default Slogan;