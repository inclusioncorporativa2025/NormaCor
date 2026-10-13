"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaFinalMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-cierre]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".cierre" restringiría los
       selectores a sus descendientes y el trigger no se encontraría. */
    const ctx = gsap.context(() => {
      gsap.to("[data-cierre]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".cierre", start: "top 80%" },
      });

      /* Las dos cintas se mecen de lado en sentidos contrarios, y el cruce
         —que sale de la transparencia de la lila— se desplaza con ellas.
         Nacen en pausa y solo corren con la caja a la vista. */
      const olas = gsap.utils
        .toArray<SVGPathElement>("[data-ola-cierre]")
        .map((ola, i) =>
          gsap.to(ola, {
            x: i ? -36 : 36,
            duration: 12 + i * 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          })
        );

      ScrollTrigger.create({
        trigger: ".cierre",
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          olas.forEach((o) => (self.isActive ? o.play() : o.pause())),
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
