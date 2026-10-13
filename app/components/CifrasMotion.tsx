"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CifrasMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-cifra]", { autoAlpha: 1, y: 0 });
      return;
    }

    /* Contexto sin ámbito: acotarlo a ".cifras" restringiría los
       selectores a sus descendientes y el trigger no se encontraría. */
    const ctx = gsap.context(() => {
      gsap.to("[data-cifra]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".cifras", start: "top 82%" },
      });

      /* La cuenta: se anima un objeto y se escribe el número redondeado
         en cada frame. `once` porque un contador que se reinicia cada
         vez que pasas por delante cansa. */
      gsap.utils.toArray<HTMLElement>(".cifras [data-cuenta]").forEach((el) => {
        const hasta = Number(el.dataset.hasta ?? 0);
        const v = { n: 0 };
        el.textContent = "0";
        gsap.to(v, {
          n: hasta,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => (el.textContent = String(Math.round(v.n))),
          scrollTrigger: { trigger: ".cifras", start: "top 78%", once: true },
        });
      });

      /* Deriva de las formas de los lados. Solo traslaciones y cortas:
         con más recorrido se acercarían al borde de la sección y se
         cortarían en recto. Nacen en pausa y solo corren a la vista. */
      const vivas = gsap.utils
        .toArray<SVGElement>(".cifras [data-forma-cifras]")
        .map((f, i) =>
          gsap.to(f, {
            x: i % 2 ? -7 : 7,
            y: i % 3 === 0 ? 6 : -6,
            duration: 6 + (i % 4) * 1.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          })
        );

      ScrollTrigger.create({
        trigger: ".cifras",
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          vivas.forEach((a) => (self.isActive ? a.play() : a.pause())),
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
