"use client";

import { useState } from "react";

import PuertasMotion from "./PuertasMotion";
import { ArtNotes, ArtShield, ArtTasks } from "./HeroArt";
import { Arrow } from "./Icons";

/* Tres entradas según lo que ya sepa quien llega. Se abre la que
   señalas; de salida queda abierta la primera, que es la vía
   principal de captación. */
const puertas = [
  {
    situacion: "No sé qué necesito",
    titulo: "Haz el diagnóstico gratis",
    texto:
      "Respondes unas preguntas sobre tu plantilla y tu actividad, y te decimos qué obligaciones te aplican.",
    cta: "Empezar el test",
    href: "#test",
    Art: () => <ArtTasks />,
  },
  {
    situacion: "Ya sé qué necesito",
    titulo: "Ve directo al catálogo",
    texto:
      "Busca la implantación por nombre o por área, mira qué incluye y contrátala online.",
    cta: "Ver catálogo",
    href: "#catalogo",
    Art: () => <ArtNotes />,
  },
  {
    situacion: "Quiero poner mi empresa al día",
    titulo: "Elige un pack por sector",
    texto:
      "Agrupamos las obligaciones habituales de tu actividad en un pack, a precio cerrado.",
    cta: "Ver packs",
    href: "#packs",
    Art: () => <ArtShield uid="puertas" />,
  },
];

export default function Puertas() {
  const [abierta, setAbierta] = useState(0);

  return (
    <section className="puertas" id="empezar">
      <PuertasMotion />

      <div className="container">
        <h2 className="puertas__titulo" data-puerta>
          ¿Por dónde <span>quieres empezar?</span>
        </h2>

        {/* Sin onMouseLeave: al salir se queda abierta la última que se
            señaló, en vez de volver de golpe a la primera. */}
        <ul className="puertas__grid">
          {puertas.map(({ situacion, titulo, texto, cta, href, Art }, i) => (
            <li
              className={`puerta${abierta === i ? " is-open" : ""}`}
              key={titulo}
              data-puerta
              onMouseEnter={() => setAbierta(i)}
            >
              <div className="puerta__texto-zona">
                <p className="puerta__situacion">{situacion}</p>
                <h3 className="puerta__titulo">{titulo}</h3>
                <div className="puerta__texto-caja">
                  <p className="puerta__texto">{texto}</p>
                </div>

                <a
                  className="puerta__cta"
                  href={href}
                  /* Con el teclado no hay cursor: al enfocar el enlace se
                     abre su panel, o se navegaría a ciegas. */
                  onFocus={() => setAbierta(i)}
                >
                  {cta}
                  <span className="puerta__flecha" aria-hidden="true">
                    <Arrow size={14} />
                  </span>
                </a>
              </div>

              <div className="puerta__art" aria-hidden="true">
                <Art />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
