type P = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Arrow = ({ size = 15 }: P) => (
  <svg {...base(size)} className="arrow" strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const DocCheck = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M6 3.5h7L18.5 9v11.5H6z" />
    <path d="M12.8 3.6V9h5.5" />
    <path d="m9 14.5 2 2 3.6-3.8" />
  </svg>
);

export const Bell = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M18 15.5V11a6 6 0 1 0-12 0v4.5L4.5 18h15L18 15.5Z" />
    <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
  </svg>
);

export const ShieldCheck = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.9-7 9.4-4.1-1.5-7-5.2-7-9.4V6l7-2.8Z" />
    <path d="m9.2 12 1.9 1.9 3.7-3.8" />
  </svg>
);

/* Billete: para prevención del blanqueo. Antes esa área usaba Chart, que
   es una gráfica y no decía nada del dinero. */
export const Banknote = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 10v4M18 10v4" />
  </svg>
);

export const Chart = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M4.5 19.5h15" />
    <path d="M7.5 19.5v-6M12 19.5V7M16.5 19.5v-9" />
  </svg>
);

export const Bolt = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M13.5 3 5.8 13.4h5.2L10.5 21l7.7-10.4H13L13.5 3Z" />
  </svg>
);

export const Clock = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="13" r="7.8" />
    <path d="M12 8.8V13l2.8 1.8" />
    <path d="M9.6 3.4h4.8" />
  </svg>
);

export const Scale = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M12 4.5v15M7 19.5h10" />
    <path d="M5 8.2h14M5 8.2 2.8 13a2.6 2.6 0 0 0 4.4 0L5 8.2Zm14 0L16.8 13a2.6 2.6 0 0 0 4.4 0L19 8.2Z" />
  </svg>
);

export const Leaf = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M5 19c-1.8-5.4 1.2-11 8.2-12.3L19 5.5c.7 6.6-2.2 11.4-8 12.2-2.4.3-4.4-.2-6-1.7Z" />
    <path d="M9 15.5c1.4-2.6 3.4-4.6 6-6" />
  </svg>
);

export const Cpu = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <rect x="7" y="7" width="10" height="10" rx="2.5" />
    <path d="M10 2.8v3M14 2.8v3M10 18.2v3M14 18.2v3M2.8 10h3M2.8 14h3M18.2 10h3M18.2 14h3" />
  </svg>
);

export const Food = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M6.6 3.2v6.4a2.6 2.6 0 0 0 5.2 0V3.2" />
    <path d="M9.2 9.8v11" />
    <path d="M17.8 3.2c-1.7 1.1-2.6 3-2.6 5.6 0 1.7.7 2.8 2.1 3.2v8.8" />
  </svg>
);

export const Users = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M15.5 20v-1.4a3.4 3.4 0 0 0-3.4-3.4H7.4A3.4 3.4 0 0 0 4 18.6V20" />
    <circle cx="9.75" cy="8.2" r="3.1" />
    <path d="M20 20v-1.3a3.4 3.4 0 0 0-2.6-3.3M15.2 5.3a3.1 3.1 0 0 1 0 5.9" />
  </svg>
);
