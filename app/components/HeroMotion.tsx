"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function HeroMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-anim]", { autoAlpha: 1, y: 0 });
      return;
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const build = () => {
      if (cancelled) return;

      /* Acotado al hero: los selectores de GSAP son de documento, y otras
         secciones usan las mismas clases. */
      ctx = gsap.context(() => {
        /* El titular se parte en líneas y cada una sube desde detrás de su
           propia máscara. `mask: "lines"` crea el contenedor con overflow
           oculto, así la línea aparece por el borde en vez de desvanecerse. */
        const split = SplitText.create(".hero__title", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
        });

        gsap.set(".hero__title", { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

        /* Resuelto a mano contra el documento: la barra ya no vive
           dentro del hero y el ámbito del contexto solo ve a sus
           descendientes. */
        tl.to(
          document.querySelectorAll("[data-anim='nav']"),
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }
        )
          .to("[data-anim='eyebrow']", { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
          .from(split.lines, { yPercent: 115, duration: 1.05, stagger: 0.1 }, 0.28)
          .to("[data-anim='sub']", { autoAlpha: 1, y: 0 }, "-=0.6")
          .to("[data-anim='cta']", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.65")
          .to(
            "[data-anim='pc']",
            { autoAlpha: 1, y: 0, duration: 1.1 },
            "-=0.5"
          )
          .from(
            "[data-halo]",
            { scale: 0.55, opacity: 0, transformOrigin: "50% 50%", duration: 1.1,
              ease: "power3.out", stagger: 0.14 },
            "-=0.95"
          );

        /* Flotación del portátil, al acabar la entrada para no pelearse con
           su tween por la misma `y`. Es un PNG, así que solo se puede mover
           entero; si hiciera falta animar la interfaz por dentro habría que
           dibujarla en SVG. */
        tl.call(() => {
          gsap.to(".hero__pc", {
            y: -13,
            duration: 3.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          /* Los dos círculos derivan y respiran con periodos distintos, así
             que su posición relativa no se repite y el fondo nunca "late". */
          gsap.to(".halo--a", {
            x: 26,
            y: -20,
            scale: 1.1,
            transformOrigin: "50% 50%",
            duration: 7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          gsap.to(".halo--b", {
            x: -22,
            y: 16,
            scale: 0.9,
            transformOrigin: "50% 50%",
            duration: 9.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }, ".hero");
    };

    /* Sin esperar a las fuentes, SplitText mide los saltos de línea con la
       tipografía de respaldo y parte el titular por donde no toca. */
    document.fonts.ready.then(build);

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
