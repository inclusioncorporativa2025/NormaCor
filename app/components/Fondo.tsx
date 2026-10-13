"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Formas sueltas detrás de toda la página, para que el blanco no sea
   una pared. Van en un solo lienzo y no sección por sección: así las
   posiciones se leen de una vez y ninguna cae donde no toca.
   `arriba` va en porcentaje de la altura total del documento, así que
   si cambia mucho el alto de alguna sección hay que repasarlos. */
type Forma = {
  tipo: "blob" | "disco" | "aro" | "punto";
  arriba: string;
  izq?: string;
  der?: string;
  ancho: string;
  color: string;
  op: number;
  /* Ritmo de la deriva: cuanto más grande, más lenta. */
  seg: number;
};

/* Vacío a propósito: las formas se van colocando una a una donde se
   pidan. Añadir una es una línea aquí.

   Dos reglas al hacerlo:
   - Pocas. Son fondo, no decoración: en cuanto se amontonan le quitan
     sitio al contenido en vez de acompañarlo.
   - Ninguna puede pisar las dos bandas de color ni el pie. Son opacos,
     y una forma que entre por su borde no se desvanece: se corta en
     seco con el filo de la banda. Hay que dejarlas enteras dentro de
     los tramos blancos, con unos 45px de margen para la deriva. */
const formas: Forma[] = [];

/* Esquina superior izquierda: tres círculos perfectos con el centro
   fuera del encuadre, de modo que solo se ve su arco. Dos rellenos que
   se solapan dejando una banda más clara entre ellos, y uno de solo
   trazo por fuera.

   Los centros y radios están elegidos para que cada arco entre por el
   borde izquierdo y salga por el de arriba sin llegar a tocar los otros
   dos lados: si tocaran, el recorte del SVG los cortaría en recto y se
   vería el filo. */
function Onda() {
  return (
    <svg
      className="fondo__onda"
      viewBox="0 0 560 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* El tono más claro, el que llega más abajo. */}
      <circle cx="60" cy="-80" r="360" fill="var(--lilac-50)" />
      {/* El tono con más color, por dentro del anterior. */}
      <circle cx="20" cy="-110" r="300" fill="var(--lilac-100)" />
      {/* El aro, por fuera de los dos: es lo que impide que la esquina
          se lea como un degradado. */}
      <circle
        cx="100"
        cy="-60"
        r="420"
        stroke="var(--lilac-400)"
        strokeWidth="1"
        opacity="0.45"
      />
    </svg>
  );
}

export default function Fondo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* Cada una se mueve a su aire y con su propio periodo: si
         compartieran duración se vería la rejilla y dejaría de parecer
         que flotan. */
      gsap.utils.toArray<HTMLElement>(".forma").forEach((f, i) => {
        const lado = i % 2 ? -1 : 1;
        gsap.to(f, {
          x: lado * (14 + (i % 5) * 7),
          y: -lado * (10 + (i % 4) * 9),
          scale: i % 3 === 0 ? 1.08 : 0.94,
          rotation: f.classList.contains("forma--blob") ? lado * 12 : 0,
          transformOrigin: "50% 50%",
          duration: Number(f.dataset.seg ?? 15),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, raiz);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fondo" aria-hidden="true" ref={ref}>
      <Onda />

      {formas.map((f, i) => (
        <span
          key={i}
          className={`forma forma--${f.tipo}`}
          data-seg={f.seg}
          style={{
            top: f.arriba,
            left: f.izq,
            right: f.der,
            width: f.ancho,
            opacity: f.op,
            ...(f.tipo === "aro"
              ? { borderColor: f.color }
              : { background: f.color }),
          }}
        />
      ))}
    </div>
  );
}
