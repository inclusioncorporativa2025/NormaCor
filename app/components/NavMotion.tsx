"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* La barra se queda siempre a la vista. Lo único que cambia al bajar es
   su forma: pasados unos píxeles se encoge en una cápsula flotante, y
   eso lo hace el CSS; aquí solo se pone la clase. */
export default function NavMotion() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!nav) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => nav.classList.toggle("is-flotante", self.scroll() > 24),
    });

    return () => st.kill();
  }, []);

  return null;
}
