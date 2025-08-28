import React, { useEffect, useRef } from "react";
// Import GSAP and ScrollTrigger from a CDN to resolve the bundling error
import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

// It's important to register the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const JoinUs = () => {
  // Create refs for the elements we want to animate
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // This is the modern, safe way to use GSAP in React.
    // It creates a context for our animations, which allows for easy cleanup.
    const ctx = gsap.context(() => {
      // Set the initial state of the elements before animation
      // They will be invisible and slightly offset
      gsap.set(imageRef.current, { autoAlpha: 0, scale: 0.9, x: -100 });
      gsap.set(paragraphRef.current, { autoAlpha: 0, y: 50 });

      // Create a timeline for a sequenced animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Start animation when the top of the section is 70% from the top of the viewport
          toggleActions: "play none none none", // Play the animation once and don't reverse it
        },
      });

      // Add animations to the timeline
      tl.to(imageRef.current, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(paragraphRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6"); // Overlap with the previous animation for a smoother effect

    }, sectionRef); // Scope the context to our main section element

    // Cleanup function that runs when the component unmounts
    // This is crucial for preventing memory leaks in SPAs
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
    <section
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
            ref={textContentRef}
            className="flex flex-col items-start text-left justify-center"
        >
            <p
            ref={paragraphRef}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
            >
            At UESC, you can improve your English skills in a supportive
            environment, gain valuable experience in public speaking and
            debating, connect with like-minded peers and mentors, and unlock
            leadership opportunities for personal growth—all while being part of
            UMN's vibrant student community.
            </p>
        </div>
        </div>
    </section>
    );


};

export default JoinUs;
