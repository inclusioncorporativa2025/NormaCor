"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PuertasMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-puerta]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".puertas" restringiría los
       selectores a sus descendientes y `trigger: ".puertas"` no se
       encontraría a sí mismo. */
    const ctx = gsap.context(() => {
      gsap.to("[data-puerta]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".puertas", start: "top 78%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
