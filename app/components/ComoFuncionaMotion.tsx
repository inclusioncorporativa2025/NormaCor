"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ComoFuncionaMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-paso]", { autoAlpha: 1, y: 0 });
      gsap.set("[data-halo-paso]", { autoAlpha: 1 });
      return;
    }

    /* Sin acotar el contexto a ".pasos": el ámbito de gsap.context()
       restringe los selectores a los DESCENDIENTES del elemento, así que
       `trigger: ".pasos"` se buscaría dentro de sí mismo y el tween se
       dispararía de inmediato. Los selectores van prefijados a mano. */
    const ctx = gsap.context(() => {
      // --- Entrada al entrar en pantalla ---
      gsap.to("[data-paso]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".pasos", start: "top 78%" },
      });

      /* Deriva lenta, la misma del hero: uno sube a la derecha creciendo
         y el otro baja a la izquierda encogiendo. Nacen en pausa; animar
         fuera de pantalla es gasto de CPU para nada. */
      const deriva = [
        gsap.to(".pasos__halo--a", {
          x: 26,
          y: -20,
          scale: 1.1,
          transformOrigin: "50% 50%",
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        }),
        gsap.to(".pasos__halo--b", {
          x: -22,
          y: 16,
          scale: 0.9,
          transformOrigin: "50% 50%",
          duration: 9.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        }),
      ];

      /* La deriva no puede arrancar antes de que acabe la entrada: las
         dos escriben `scale` y dos tweens sobre la misma propiedad se
         pisan, gana el último de cada frame. `nacidos` guarda si ya
         puede correr, porque el ScrollTrigger de abajo salta antes. */
      let nacidos = false;
      let visible = false;
      const ritmo = () =>
        deriva.forEach((d) => (nacidos && visible ? d.resume() : d.pause()));

      /* Cada círculo aterriza en SU opacidad, leída de la hoja de estilo:
         con `autoAlpha: 1` el tween deja un opacity inline que se come
         el valor del CSS y los discos salen macizos. */
      gsap.utils
        .toArray<HTMLElement>("[data-halo-paso]")
        .forEach((circulo, i) =>
          gsap.fromTo(
            circulo,
            { autoAlpha: 0, scale: 0.55 },
            {
              autoAlpha:
                Number(getComputedStyle(circulo).getPropertyValue("--op")) || 1,
              scale: 1,
              transformOrigin: "50% 50%",
              duration: 1.1,
              delay: i * 0.14,
              ease: "power3.out",
              scrollTrigger: { trigger: ".pasos", start: "top 80%" },
              onComplete: () => {
                nacidos = true;
                ritmo();
              },
            }
          )
        );

      ScrollTrigger.create({
        trigger: ".pasos",
        start: "top 85%",
        end: "bottom top",
        onToggle: (self) => {
          visible = self.isActive;
          ritmo();
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
