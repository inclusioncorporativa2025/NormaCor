"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Arrow,
  Banknote,
  Bell,
  Clock,
  Cpu,
  DocCheck,
  Food,
  Leaf,
  Scale,
  ShieldCheck,
  Users,
} from "./Icons";

gsap.registerPlugin(ScrollTrigger);

/* Una vuelta completa del anillo. */
const VUELTA = 54;

/* Las diez áreas del catálogo. `foto` puede faltar: dos categorías no
   tienen todavía una imagen que las represente y la ficha se dibuja con
   un panel plano en vez de inventarse una foto que no viene a cuento.
   El segundo chip es un ejemplo real de implantación del área, no un
   precio: una categoría entera no tiene una cifra única. */
const items = [
  {
    nombre: "Igualdad y diversidad",
    foto: "/assets/implantaciones/plan-igualdad.png",
    desc: "Plan de Igualdad, registro retributivo, protocolo de acoso y medidas LGTBI.",
    etiqueta: "Según plantilla",
    ejemplo: "Plan de Igualdad",
    Icon: Scale,
  },
  {
    nombre: "Laboral y digital",
    foto: "/assets/implantaciones/desconexion-digital.png",
    desc: "Desconexión digital, registro de jornada y uso de medios de la empresa.",
    etiqueta: "Según plantilla",
    ejemplo: "Desconexión digital",
    Icon: Clock,
  },
  {
    nombre: "RGPD y web",
    foto: "/assets/implantaciones/proteccion-datos.png",
    desc: "Protección de datos, cookies, política de privacidad y avisos legales de tu web.",
    etiqueta: "Obligación general",
    ejemplo: "Protección de datos",
    Icon: DocCheck,
  },
  {
    nombre: "Compliance y canal",
    foto: "/assets/implantaciones/canal-denuncias.png",
    desc: "Canal interno de información y modelo de prevención de delitos.",
    etiqueta: "Según plantilla",
    ejemplo: "Canal de denuncias",
    Icon: Bell,
  },
  {
    nombre: "Inteligencia artificial",
    foto: "/assets/implantaciones/inteligencia-artificial.png",
    desc: "Inventario de sistemas de IA y obligaciones según su nivel de riesgo.",
    etiqueta: "Según circunstancias",
    ejemplo: "Inventario de sistemas",
    Icon: Cpu,
  },
  {
    nombre: "Menores",
    foto: null,
    desc: "Protección del menor, verificación de edad y certificados de delitos sexuales.",
    etiqueta: "Según actividad",
    ejemplo: "Certificado de delitos sexuales",
    Icon: Users,
  },
  {
    nombre: "Medioambiente",
    foto: "/assets/implantaciones/residuos-envases.png",
    desc: "Residuos, envases y desperdicio alimentario, con sus registros y traslados.",
    etiqueta: "Según actividad",
    ejemplo: "Residuos y envases",
    Icon: Leaf,
  },
  {
    nombre: "Seguridad alimentaria",
    foto: "/assets/implantaciones/seguridad-alimentaria.png",
    desc: "APPCC, plan de higiene y control de alérgenos adaptados a tu establecimiento.",
    etiqueta: "Según actividad",
    ejemplo: "APPCC",
    Icon: Food,
  },
  {
    nombre: "Prevención de riesgos",
    foto: null,
    desc: "Evaluación de riesgos, plan de prevención y vigilancia de la salud.",
    etiqueta: "Obligación general",
    ejemplo: "Evaluación de riesgos",
    Icon: ShieldCheck,
  },
  {
    nombre: "Prevención del blanqueo",
    foto: "/assets/implantaciones/compliance-penal.png",
    desc: "Manual de prevención, diligencia debida con clientes y formación obligatoria.",
    etiqueta: "Según actividad",
    ejemplo: "Manual de prevención",
    Icon: Banknote,
  },
];

export default function OrbitPicker() {
  const [sel, setSel] = useState<number | null>(null);
  const [mirando, setMirando] = useState<number | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const escenaRef = useRef<HTMLDivElement>(null);
  const fichaRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const giros = useRef<gsap.core.Tween[]>([]);
  /* De dónde nace la ficha: el círculo que se ha pulsado. Se guarda al
     pulsar porque el anillo queda parado y no se mueve mientras tanto. */
  const origen = useRef<{ x: number; y: number; d: number } | null>(null);
  /* Solo puede haber una animación viva: la nueva mata a la anterior. */
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const cerrando = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add("all", () => {
      const ring = ringRef.current;
      if (!ring) return;
      const orbes = ring.querySelectorAll<HTMLElement>("[data-chip]");

      /* El anillo rota y cada burbuja rota lo mismo al revés: orbita pero
         el texto no se pone del revés. Misma duración y ease "none" en
         ambos, o se desfasan. */
      giros.current = [
        gsap.to(ring, {
          rotation: 360,
          duration: VUELTA,
          ease: "none",
          repeat: -1,
          paused: true,
        }),
        gsap.to(orbes, {
          rotation: -360,
          duration: VUELTA,
          ease: "none",
          repeat: -1,
          paused: true,
        }),
      ];

      const st = ScrollTrigger.create({
        trigger: ".categorias",
        start: "top 95%",
        end: "bottom top",
        onToggle: (self) =>
          giros.current.forEach((t) => (self.isActive ? t.play() : t.pause())),
      });

      return () => {
        st.kill();
        giros.current = [];
      };
    });

    return () => {
      tlRef.current?.kill();
      mm.revert();
    };
  }, []);

  /* La ficha crece desde el círculo pulsado. Va en useLayoutEffect para
     medir después de que React la pinte pero antes de que se vea. */
  useLayoutEffect(() => {
    const ficha = fichaRef.current;
    const o = origen.current;
    if (sel === null || !ficha || !o) return;

    const r = ficha.getBoundingClientRect();
    const escena = escenaRef.current!.getBoundingClientRect();
    const cx = r.left + r.width / 2 - escena.left;
    const cy = r.top + r.height / 2 - escena.top;

    /* Cancela lo que hubiera en marcha. Sin esto, si se abre una ficha
       mientras la anterior se cierra, el `onComplete` del cierre viejo
       llega después y borra la selección recién hecha: desaparece todo. */
    tlRef.current?.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;
    cerrando.current = false;

    /* La órbita se va del todo; no se queda detrás. En escritorio la
       desvanece GSAP. En móvil la quita el CSS (`.escena.is-open`) para
       que la ficha suba a su sitio, y aquí solo se trae la ficha a la
       vista. */
    if (window.matchMedia("(min-width: 900px)").matches) {
      tl.to(
        orbitRef.current,
        { autoAlpha: 0, scale: 0.82, duration: 0.4, ease: "power2.in" },
        0
      );
    } else {
      /* La escena y no la ficha: la ficha arranca desplazada por la
         animación y se mediría mal. Sin la rejilla, empiezan a la par. */
      escenaRef.current!.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    tl
      // La ficha sale despedida del círculo, con un punto de rebote.
      .fromTo(
        ficha,
        {
          x: o.x - cx,
          y: o.y - cy,
          scale: o.d / r.width,
          rotate: -8,
          autoAlpha: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
        },
        0.08
      )
      // Y el contenido entra después, escalonado.
      .from(
        ficha.querySelectorAll(".ficha__cuerpo > *"),
        { y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" },
        0.34
      );
  }, [sel]);

  useEffect(() => {
    if (sel === null) return;

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };

    /* Pulsar fuera cierra. Va en `pointerdown` y no en `click`: el clic que
       abre la ficha ya ha disparado su pointerdown antes de que exista este
       oyente, así que no se cierra sola al abrirse. Y se excluye la órbita
       para que pulsar otra burbuja cambie de ficha en vez de cerrarla. */
    const fuera = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest(".ficha") || t?.closest(".orbit")) return;
      cerrar();
    };

    window.addEventListener("keydown", esc);
    document.addEventListener("pointerdown", fuera);
    return () => {
      window.removeEventListener("keydown", esc);
      document.removeEventListener("pointerdown", fuera);
    };
  });

  /* El giro se para al entrar en TODA la órbita, no al señalar una burbuja:
     si no, hay que perseguir con el ratón un blanco en movimiento. */
  const parar = (quieto: boolean) =>
    giros.current.forEach((t) => (quieto ? t.pause() : t.play()));



  const abrir = (i: number, boton: HTMLButtonElement) => {
    const disco = boton.querySelector(".orb__disc")!.getBoundingClientRect();
    const escena = escenaRef.current!.getBoundingClientRect();
    origen.current = {
      x: disco.left + disco.width / 2 - escena.left,
      y: disco.top + disco.height / 2 - escena.top,
      d: disco.width,
    };
    setSel(i);
    parar(true);
  };

  // Al cerrar, la ficha vuelve a encogerse hacia su círculo.
  const cerrar = () => {
    // Si ya se está cerrando, no encadenar un segundo cierre encima.
    if (cerrando.current) return;

    const ficha = fichaRef.current;
    const o = origen.current;
    if (!ficha || !o) {
      setSel(null);
      parar(false);
      return;
    }
    const r = ficha.getBoundingClientRect();
    const escena = escenaRef.current!.getBoundingClientRect();

    tlRef.current?.kill();
    cerrando.current = true;

    tlRef.current = gsap
      .timeline({
        onComplete: () => {
          cerrando.current = false;
          setSel(null);
          parar(false);
        },
      })
      .to(
        ficha.querySelectorAll(".ficha__cuerpo > *"),
        { y: 10, autoAlpha: 0, duration: 0.2, stagger: 0.03 },
        0
      )
      .to(
        ficha,
        {
          x: o.x - (r.left + r.width / 2 - escena.left),
          y: o.y - (r.top + r.height / 2 - escena.top),
          scale: o.d / r.width,
          rotate: -6,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        0.1
      )
      .to(
        orbitRef.current,
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0.22
      );
  };

  const activo = sel === null ? null : items[sel];
  const abierto = sel !== null;

  return (
    <div className={`escena${abierto ? " is-open" : ""}`} ref={escenaRef}>
      <div
        className="orbit"
        ref={orbitRef}
        onMouseEnter={() => parar(true)}
        /* En táctil no hay hover: el giro se para al tocar, antes de que
           el dedo levante, para no fallar una burbuja en movimiento. */
        onPointerDown={() => parar(true)}
        onMouseLeave={() => {
          if (!abierto) parar(false);
          setMirando(null);
        }}
      >
        <span className="orbit__path" aria-hidden="true" />

        <div className="orbit__core" data-core>
          <span className="mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          Normacor
        </div>

        <div className="ring" ref={ringRef}>
          {items.map(({ nombre, Icon }, i) => (
            <span
              className="spoke"
              key={nombre}
              style={{ ["--a" as string]: `${-90 + (360 / items.length) * i}deg` }}
            >
              <button
                type="button"
                className={`orb${sel === i ? " is-on" : ""}${
                  mirando === i ? " is-hover" : ""
                }`}
                data-chip
                aria-expanded={sel === i}
                onClick={(e) => (sel === i ? cerrar() : abrir(i, e.currentTarget))}
                onMouseEnter={() => setMirando(i)}
                onFocus={() => {
                  setMirando(i);
                  parar(true);
                }}
                onBlur={() => {
                  setMirando(null);
                  if (!abierto) parar(false);
                }}
              >
                <span className="orb__c">
                  <span className="orb__disc">
                    <Icon size={22} />
                  </span>
                  <span className="orb__label">{nombre}</span>
                </span>
              </button>
            </span>
          ))}
        </div>
      </div>

      {activo && (
        <div className="ficha" ref={fichaRef} key={activo.nombre}>
          {activo.foto ? (
            <>
              <Image
                className="ficha__foto"
                src={activo.foto}
                alt=""
                fill
                sizes="368px"
              />
              {/* Capa de marca encima de la foto: es el .jpg que acompaña a
                  cada .png, a media opacidad, para teñirla y que se note. */}
              <Image
                className="ficha__capa"
                src={activo.foto.replace(".png", ".jpg")}
                alt=""
                fill
                sizes="368px"
                aria-hidden="true"
              />
              {/* Velo plano: el resto del contraste que necesita el texto. */}
              <span className="ficha__velo" aria-hidden="true" />
            </>
          ) : (
            /* Sin foto todavía: fondo plano de marca con el icono del área
               en grande, que es mejor que una imagen que no dice nada. */
            <span className="ficha__sinfoto" aria-hidden="true">
              <activo.Icon size={120} />
            </span>
          )}

          <button type="button" className="ficha__atras" onClick={cerrar}>
            <Arrow size={15} />
            <span className="sr-only">Volver a las categorías</span>
          </button>

          <div className="ficha__cuerpo">
            <p className="ficha__nombre">{activo.nombre}</p>
            <p className="ficha__desc">{activo.desc}</p>

            <div className="ficha__chips">
              <span className="ficha__chip">
                <activo.Icon size={14} />
                {activo.etiqueta}
              </span>
              <span className="ficha__chip">p. ej. {activo.ejemplo}</span>
            </div>

            <a className="ficha__cta" href="#catalogo">
              Ver el área
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
