"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

import ServiciosMotion from "./ServiciosMotion";
import { Arrow } from "./Icons";

/* Ocho tarjetas, las que pide el documento. El precio solo aparece
   cuando está cerrado: los demás no se inventan ni se rellenan con un
   "desde" que luego no se sostenga. */
const servicios = [
  {
    nombre: "Protección de datos",
    foto: "/assets/implantaciones/proteccion-datos.png",
    desc: "Registro de actividades, contratos y política de privacidad.",
    precio: "190 €",
  },
  {
    nombre: "Protocolo de acoso",
    foto: "/assets/implantaciones/protocolo-acoso.png",
    desc: "Protocolo frente al acoso y su procedimiento interno.",
    precio: "180 €",
  },
  {
    nombre: "Desconexión digital",
    foto: "/assets/implantaciones/desconexion-digital.png",
    desc: "Política de desconexión fuera de la jornada.",
    precio: "120 €",
  },
  {
    nombre: "Plan de Igualdad",
    foto: "/assets/implantaciones/plan-igualdad.png",
    desc: "Diagnóstico, negociación y registro en el REGCON.",
    precio: null,
  },
  {
    nombre: "Canal de denuncias",
    foto: "/assets/implantaciones/canal-denuncias.png",
    desc: "Canal interno de información, con gestor y plazos.",
    precio: null,
  },
  {
    nombre: "Compliance penal",
    foto: "/assets/implantaciones/compliance-penal.png",
    desc: "Modelo de prevención de delitos y mapa de riesgos.",
    precio: null,
  },
  {
    nombre: "Seguridad alimentaria",
    foto: "/assets/implantaciones/seguridad-alimentaria.png",
    desc: "APPCC, plan de higiene y control de alérgenos.",
    precio: null,
  },
  {
    nombre: "Inteligencia artificial",
    foto: "/assets/implantaciones/inteligencia-artificial.png",
    desc: "Inventario de sistemas de IA y obligaciones por riesgo.",
    precio: null,
  },
];

const N = servicios.length;
/* La lista va repetida tres veces y se arranca en la copia del medio:
   así siempre hay tarjetas a izquierda y derecha, y al salirse de la
   copia central se salta en silencio a la equivalente. Es lo que hace
   que el bucle no tenga costura. */
const COPIAS = 3;
const TOTAL = N * COPIAS;
const anillo = Array.from({ length: TOTAL }, (_, i) => servicios[i % N]);

export default function Servicios() {
  const [activo, setActivo] = useState(N);
  const pistaRef = useRef<HTMLDivElement>(null);
  /* El arrastre necesita leer la posición actual sin provocar renders. */
  const activoRef = useRef(N);
  activoRef.current = activo;
  /* El primer dibujo va sin animación: si no, la cinta entra deslizándose
     desde la primera tarjeta cada vez que se monta. */
  const seco = useRef(true);
  /* Si se ha arrastrado, el clic que viene detrás no cuenta como clic. */
  const arrastro = useRef(false);

  const paso = () => {
    const pista = pistaRef.current;
    const t = pista?.querySelector<HTMLElement>("[data-tarjeta]");
    if (!pista || !t) return 0;
    /* El ancho se mide, no se calcula: depende de un clamp en vw y
       replicarlo aquí sería tenerlo escrito en dos sitios. */
    return t.offsetWidth + (parseFloat(getComputedStyle(pista).columnGap) || 0);
  };

  const colocar = (destino: number, animado: boolean) => {
    const pista = pistaRef.current;
    if (!pista) return;
    const p = paso();
    if (!p) return;

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = animado && !reducido ? 0.7 : 0;

    gsap.to(pista, {
      x: -destino * p,
      duration: dur,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        /* Al terminar, si nos hemos salido de la copia del medio
           volvemos a su gemela. El salto no se ve: la tarjeta de debajo
           es la misma. */
        const dentro = N + (((destino - N) % N) + N) % N;
        if (dentro !== destino) {
          seco.current = true;
          setActivo(dentro);
        }
      },
    });

    pista.querySelectorAll<HTMLElement>("[data-tarjeta]").forEach((t, i) => {
      /* Cuanto más lejos del centro, más pequeña y más apagada. Dos
         escalones a cada lado: a partir del tercero ya no se ve. */
      const d = Math.min(Math.abs(i - destino), 3);
      gsap.to(t, {
        scale: [1, 0.9, 0.8, 0.8][d],
        opacity: [1, 0.55, 0.22, 0][d],
        duration: dur,
        ease: "power3.out",
        overwrite: "auto",
      });
      /* El enlace de las que no están en el centro sale del tabulador:
         si no, se pasea por enlaces medio fuera de la pantalla y además
         repetidos, que la lista va triplicada. Va en el enlace y no en
         la tarjeta porque `inert` en la tarjeta mataría también el clic
         que la trae al centro. */
      t.querySelector(".tarjeta__link")?.toggleAttribute("inert", d !== 0);
    });
  };

  useLayoutEffect(() => {
    colocar(activo, !seco.current);
    seco.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo]);

  /* --- Arrastre --- */
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;

    let cogido = false;
    let xRaton = 0;
    let xPista = 0;

    const abajo = (e: PointerEvent) => {
      if (e.button !== 0) return;
      cogido = true;
      arrastro.current = false;
      xRaton = e.clientX;
      xPista = Number(gsap.getProperty(pista, "x"));
      gsap.killTweensOf(pista);
    };

    const mueve = (e: PointerEvent) => {
      if (!cogido) return;
      const dx = e.clientX - xRaton;
      /* Un temblor de cinco píxeles es un clic, no un arrastre. */
      if (Math.abs(dx) > 5 && !arrastro.current) {
        arrastro.current = true;
        /* El puntero se captura aquí y no al pulsar: capturado, el
           navegador entrega el `click` a la pista en vez de a la
           tarjeta, y pulsar una vecina para traerla al centro dejaba
           de funcionar. */
        pista.setPointerCapture(e.pointerId);
      }
      if (!arrastro.current) return;
      gsap.set(pista, { x: xPista + dx });
    };

    const suelta = (e: PointerEvent) => {
      if (!cogido) return;
      cogido = false;
      if (pista.hasPointerCapture(e.pointerId)) {
        pista.releasePointerCapture(e.pointerId);
      }
      /* Sin arrastre no hay nada que recolocar: el clic se encarga. */
      if (!arrastro.current) return;
      const p = paso();
      if (!p) return;
      const x = Number(gsap.getProperty(pista, "x"));
      /* La tarjeta que haya quedado más cerca del centro, acotada al
         anillo para no salirse de las copias que existen. */
      const destino = Math.min(TOTAL - 1, Math.max(0, Math.round(-x / p)));
      if (destino === activoRef.current) colocar(destino, true);
      else setActivo(destino);
    };

    pista.addEventListener("pointerdown", abajo);
    pista.addEventListener("pointermove", mueve);
    pista.addEventListener("pointerup", suelta);
    pista.addEventListener("pointercancel", suelta);
    return () => {
      pista.removeEventListener("pointerdown", abajo);
      pista.removeEventListener("pointermove", mueve);
      pista.removeEventListener("pointerup", suelta);
      pista.removeEventListener("pointercancel", suelta);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mover = (salto: number) => setActivo((a) => a + salto);
  /* El punto de abajo manda a la tarjeta equivalente de la copia del
     medio, no a la primera de la lista. */
  const irA = (i: number) => setActivo(N + i);

  return (
    <section className="servicios" id="servicios">
      <ServiciosMotion />

      <div className="container">
        <h2 className="servicios__titulo" data-serv>
          Lo que implantamos
        </h2>
      </div>

      {/* Fuera del contenedor: la cinta va a todo el ancho para que se
          vean la anterior y la siguiente asomando por los lados. */}
      <div className="carrusel" data-serv>
        <button
          type="button"
          className="carrusel__nav carrusel__nav--prev"
          onClick={() => mover(-1)}
        >
          <Arrow size={16} />
          <span className="sr-only">Servicio anterior</span>
        </button>

        <div className="carrusel__pista" ref={pistaRef}>
          {anillo.map(({ nombre, foto, desc, precio }, i) => (
            <article
              className="tarjeta"
              key={`${nombre}-${i}`}
              data-tarjeta
              /* Pulsar una vecina la trae al centro. Si venimos de
                 arrastrar, el clic de cierre no cuenta. */
              onClick={() => {
                if (!arrastro.current && i !== activo) setActivo(i);
              }}
            >
              <div className="tarjeta__foto">
                <Image
                  src={foto}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 80vw, 22rem"
                  draggable={false}
                  priority={i === N}
                />
              </div>

              {/* El bloque de texto monta sobre la foto, como en la
                  referencia, para que la tarjeta no sea dos mitades. */}
              <div className="tarjeta__cuerpo">
                <h3 className="tarjeta__nombre">{nombre}</h3>
                <p className="tarjeta__desc">{desc}</p>

                <div className="tarjeta__pie">
                  {precio && <p className="tarjeta__precio">{precio}</p>}
                  <a className="tarjeta__link" href="#catalogo">
                    Ver implantación
                    <span className="tarjeta__flecha" aria-hidden="true">
                      <Arrow size={13} />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="carrusel__nav carrusel__nav--next"
          onClick={() => mover(1)}
        >
          <Arrow size={16} />
          <span className="sr-only">Servicio siguiente</span>
        </button>
      </div>

      <div className="container">
        <div className="carrusel__puntos" role="tablist" aria-label="Servicios">
          {servicios.map(({ nombre }, i) => (
            <button
              type="button"
              key={nombre}
              role="tab"
              aria-selected={i === (((activo % N) + N) % N)}
              className={`punto${
                i === (((activo % N) + N) % N) ? " is-on" : ""
              }`}
              onClick={() => irA(i)}
            >
              <span className="sr-only">{nombre}</span>
            </button>
          ))}
        </div>

        <div className="servicios__pie" data-serv>
          <a className="btn btn--lg" href="#catalogo">
            Ver todas las implantaciones <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
