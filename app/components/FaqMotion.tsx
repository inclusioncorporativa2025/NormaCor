"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FaqMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-faq]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".faq" restringiría los selectores
       a sus descendientes y el trigger no se encontraría. */
    const ctx = gsap.context(() => {
      gsap.to("[data-faq]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".faq", start: "top 80%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
