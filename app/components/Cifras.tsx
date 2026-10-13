import CifrasMotion from "./CifrasMotion";

/* Las tres son comprobables con lo que ya hay en la web: las diez áreas
   son las de la rueda, las quince salen del catálogo y el 100% online es
   el propio flujo de contratación. Nada inventado: el encargo dice que
   solo se usen cifras reales. Hay sitio para una cuarta (empresas al
   día, plazo medio) en cuanto exista el dato. */
const cifras = [
  { n: 10, sufijo: "", rotulo: "Áreas normativas cubiertas" },
  { n: 15, sufijo: "+", rotulo: "Implantaciones en el catálogo" },
  { n: 100, sufijo: " %", rotulo: "Online, de principio a fin" },
];

export default function Cifras() {
  return (
    <section className="cifras" aria-label="Normacor en cifras">
      <CifrasMotion />

      {/* Formas a los lados, para que el hueco hasta los testimonios no
          sea un blanco muerto. Izquierda: mancha azul pálida con su
          curva en S, un arco fino y un punto. Derecha: círculo lila
          macizo saliendo por el borde, el aro fino que lo cruza, un
          círculo pálido detrás y un punto.

          Cada composición solo se sale por el borde de la pantalla; por
          arriba y por abajo queda entera dentro de la sección. Si se
          saliera por abajo, la banda de testimonios, que es opaca, la
          cortaría en recto. */}
      <svg
        className="cifras__formas cifras__formas--izq"
        viewBox="0 0 360 300"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Ola sin aristas: entra tendida por el borde izquierdo, baja
            en S, hace un lomo ancho y vuelve a caer redondeada. Todos los
            tramos enlazan en tangente, también la base, que se curva
            hasta el borde. No sale por abajo: ahí la cortaría en recto
            la banda de testimonios, que arranca en blanco. */}
        <path
          data-forma-cifras
          d="M0 18C56 18 90 54 112 100C132 142 158 158 196 168C240 180 266 212 264 248C262 284 232 298 186 298C116 298 54 294 0 284Z"
          fill="#e9edf7"
        />
        <circle data-forma-cifras cx="-20" cy="160" r="95" stroke="#cfb3e6" strokeWidth="1.4" />
        <circle data-forma-cifras cx="226" cy="132" r="13" fill="#d9c0ea" />
      </svg>
      <svg
        className="cifras__formas cifras__formas--dcha"
        viewBox="0 0 360 300"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle data-forma-cifras cx="150" cy="210" r="80" fill="#efe9f8" />
        <circle data-forma-cifras cx="330" cy="140" r="120" fill="#dbc1ea" />
        <circle data-forma-cifras cx="280" cy="185" r="105" stroke="#c7a3e1" strokeWidth="1.4" />
        <circle data-forma-cifras cx="62" cy="196" r="15" fill="#e6d6f2" />
      </svg>

      <div className="container cifras__fila">
        {cifras.map(({ n, sufijo, rotulo }) => (
          <div className="cifra" key={rotulo} data-cifra>
            <p className="cifra__n">
              {/* GSAP escribe aquí el número mientras sube; el valor de
                  partida es el final, para que sin JS se lea igual. */}
              <span data-cuenta data-hasta={n}>
                {n}
              </span>
              {sufijo}
            </p>
            <p className="cifra__rotulo">{rotulo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
