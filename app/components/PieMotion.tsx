"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PieMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-pie]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".pie" restringiría los selectores
       a sus descendientes y el trigger no se encontraría. */
    const ctx = gsap.context(() => {
      gsap.to("[data-pie]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".pie", start: "top 92%" },
      });

      /* Vida del fondo, muy contenida: las olas se mecen de lado y los
         círculos derivan. Solo traslaciones, nada de escalar en un eje:
         un círculo estirado deja de ser un círculo. Nacen en pausa y
         solo corren con el pie a la vista. */
      const vivos = [
        ...gsap.utils.toArray<SVGGElement>(".pie [data-pie-ola]").map((ola, i) =>
          gsap.to(ola, {
            x: [18, -14, 10][i] ?? 12,
            duration: 11 + i * 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          })
        ),
        ...gsap.utils
          .toArray<SVGElement>(".pie [data-pie-circulo]")
          .map((c, i) =>
            gsap.to(c, {
              x: i % 2 ? -8 : 8,
              y: i % 2 ? 6 : -6,
              duration: 6 + i * 1.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            })
          ),
      ];

      ScrollTrigger.create({
        trigger: ".pie",
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          vivos.forEach((a) => (self.isActive ? a.play() : a.pause())),
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
