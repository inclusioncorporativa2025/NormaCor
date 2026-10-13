"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimoniosMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-testi]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".testimonios" restringiría los
       selectores a sus descendientes y el trigger no se encontraría. */
    const ctx = gsap.context(() => {
      gsap.to("[data-testi]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".testimonios", start: "top 80%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
