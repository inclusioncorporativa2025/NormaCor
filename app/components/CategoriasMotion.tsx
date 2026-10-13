"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CategoriasMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-cat], [data-chip], [data-core]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".categorias" restringiría los
       selectores a sus descendientes y el trigger no se encontraría. */
    const ctx = gsap.context(() => {
      // --- Entrada al entrar en pantalla ---
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".categorias",
          // Arranca cuando la sección ha entrado un poco, no al asomar.
          start: "top 78%",
        },
      });

      tl.to("[data-cat]", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 })
        // El núcleo de la rueda crece desde el centro.
        .fromTo(
          "[data-core]",
          { scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(1.7)" },
          0.1
        )
        // Y las burbujas van saliendo del centro hacia su órbita.
        .to(
          ".categorias [data-chip]",
          { autoAlpha: 1, duration: 0.5, stagger: 0.06 },
          0.35
        );

    });

    return () => ctx.revert();
  }, []);

  return null;
}
