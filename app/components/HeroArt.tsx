/* Las tres ilustraciones del hero, en SVG en línea.
   En línea y no como <img src=".svg"> por dos razones: los colores salen
   de los tokens CSS, y GSAP puede animar cada pieza por separado. */

const stroke = {
  stroke: "var(--ink)",
  strokeWidth: 3,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

const SHIELD_PATH =
  "M100 16 L170 43 V97 C170 141 138 173 100 188 C62 173 30 141 30 97 V43 Z";

/* Escudo modular: la silueta recortada en bloques, y tres sueltos fuera.
   `uid` distingue el id del clipPath: al pintar el escudo en dos sitios
   habría dos ids iguales y el segundo recorte apuntaría al primero. */
export function ArtShield({ uid = "hero" }: { uid?: string }) {
  const clipId = `shieldClip-${uid}`;
  const mods: [number, number, number, number, string][] = [
    [30, 16, 43, 40, "none"],
    [77, 16, 43, 40, "var(--brand)"],
    [124, 16, 46, 40, "none"],
    [30, 60, 43, 40, "none"],
    [77, 60, 43, 40, "var(--lilac)"],
    [124, 60, 46, 40, "var(--brand)"],
    [30, 104, 43, 40, "var(--brand)"],
    [77, 104, 43, 40, "none"],
    [124, 104, 46, 40, "var(--lilac)"],
    [30, 148, 43, 44, "var(--brand)"],
    [77, 148, 43, 44, "var(--lilac)"],
    [124, 148, 46, 44, "var(--brand)"],
  ];

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={SHIELD_PATH} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {mods.map(([x, y, w, h, fill], i) => (
          <rect
            className="a-mod"
            key={i}
            x={x + 2}
            y={y + 2}
            width={w - 4}
            height={h - 4}
            rx={7}
            fill={fill}
            {...stroke}
          />
        ))}
      </g>

      <path d={SHIELD_PATH} {...stroke} />

      {/* Bloques desprendidos: la idea de "muchas normativas, una sola
          protección". La rotación va en el hijo y no en el elemento con
          clase, para que GSAP anime un grupo limpio y no tenga que
          recomponer un transform que ya existe. */}
      <g className="a-chip">
        <rect
          x="-8"
          y="22"
          width="34"
          height="29"
          rx="7"
          fill="var(--lilac)"
          transform="rotate(-11 9 36)"
          {...stroke}
        />
      </g>
      <g className="a-chip">
        <rect
          x="178"
          y="14"
          width="29"
          height="29"
          rx="7"
          fill="var(--brand)"
          transform="rotate(10 192 28)"
          {...stroke}
        />
      </g>
      <g className="a-chip">
        <rect
          x="172"
          y="138"
          width="31"
          height="31"
          rx="7"
          fill="var(--lilac)"
          transform="rotate(14 187 153)"
          {...stroke}
        />
      </g>
    </svg>
  );
}

/* Fragmentos de interfaz: checklist, calendario, escudo y barra de progreso. */
export function ArtTasks() {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {/* Checklist */}
      <rect x="16" y="36" width="100" height="92" rx="10" fill="var(--lilac)" />
      <rect
        className="a-card"
        x="10"
        y="30"
        width="100"
        height="92"
        rx="10"
        fill="#fff"
        {...stroke}
      />
      {[50, 74, 98].map((y) => (
        <g className="a-card" key={y}>
          <g className="a-check">
            <circle cx="32" cy={y} r="9" fill="var(--brand)" />
            <path d={`M27.5 ${y} l3.5 3.5 5.5 -6`} stroke="#fff" strokeWidth={3} />
          </g>
          <rect x="49" y={y - 5} width="48" height="10" rx="5" fill="var(--brand)" />
        </g>
      ))}

      {/* Calendario */}
      <rect x="126" y="20" width="64" height="54" rx="9" fill="var(--brand-200)" />
      <g className="a-card">
        <path d="M136 15 v7 M174 15 v7" {...stroke} strokeWidth={5} />
        <rect x="120" y="20" width="64" height="54" rx="9" fill="#fff" {...stroke} />
        <path d="M120 36 h64" {...stroke} />
        <rect x="120" y="22" width="64" height="14" rx="7" fill="var(--lilac)" />
        <path d="M120 36 h64" {...stroke} />
        {[46, 60].map((y) =>
          [130, 146, 162].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="10"
              height="9"
              rx="2.5"
              fill="var(--brand)"
            />
          ))
        )}
        <rect className="a-today" x="170" y="46" width="10" height="9" rx="2.5" fill="var(--lilac-400)" />
      </g>

      {/* Escudo */}
      <rect x="128" y="94" width="62" height="62" rx="11" fill="var(--brand-200)" />
      <g className="a-card">
        <rect x="122" y="88" width="62" height="62" rx="11" fill="#fff" {...stroke} />
        <path
          d="M153 102 l18 7 v13 c0 12 -8 21 -18 25 c-10 -4 -18 -13 -18 -25 v-13 Z"
          fill="var(--brand)"
        />
        <path d="M146 121 l5 5 10 -11" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
      </g>

      {/* Barra de progreso */}
      <rect x="22" y="146" width="96" height="28" rx="9" fill="var(--lilac)" />
      <g className="a-card">
        <rect x="16" y="140" width="96" height="28" rx="9" fill="#fff" {...stroke} />
        <rect x="26" y="149" width="76" height="10" rx="5" fill="var(--lilac-200)" />
        <rect
          className="a-bar"
          x="26"
          y="149"
          width="48"
          height="10"
          rx="5"
          fill="var(--brand)"
        />
      </g>
    </svg>
  );
}

/* Expedientes apilados con pestaña, el de delante ya validado. */
export function ArtNotes() {
  const Sheet = ({ x, rot, tab }: { x: number; rot: number; tab: string }) => (
    <g className="a-sheet">
      <g transform={`rotate(${rot} ${x + 46} 110)`}>
        <rect x={x + 10} y="30" width="34" height="18" rx="6" fill={tab} {...stroke} />
        <rect x={x} y="42" width="92" height="124" rx="9" fill="#fff" {...stroke} />
      </g>
    </g>
  );

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <Sheet x={34} rot={-13} tab="var(--brand)" />
      <Sheet x={48} rot={-6.5} tab="var(--lilac)" />

      {/* Expediente de delante, con esquina doblada y sello de validado */}
      <g className="a-sheet">
        <rect x="62" y="30" width="34" height="18" rx="6" fill="var(--brand)" {...stroke} />
        <path
          d="M62 51 a9 9 0 0 1 9 -9 h58 l25 25 v90 a9 9 0 0 1 -9 9 H71 a9 9 0 0 1 -9 -9 Z"
          fill="#fff"
          {...stroke}
        />
        <path d="M129 42 v16 a9 9 0 0 0 9 9 h16" fill="var(--brand-200)" {...stroke} />

        <g className="a-seal">
          <circle cx="108" cy="96" r="21" fill="var(--brand)" />
          <path
            d="M99 96 l7 7 12 -14"
            stroke="#fff"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <rect x="79" y="130" width="58" height="9" rx="4.5" fill="var(--brand-300)" />
        <rect x="79" y="146" width="46" height="9" rx="4.5" fill="var(--brand-300)" />
      </g>
    </svg>
  );
}
