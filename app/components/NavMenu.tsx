"use client";

import { useEffect, useRef, useState } from "react";

type Link = { href: string; label: string };

/* Por debajo de 1080px los enlaces del nav no caben: van en un panel
   que se despliega bajo la barra. */
export default function NavMenu({ links }: { links: Link[] }) {
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    const fuera = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false);
    };
    window.addEventListener("keydown", esc);
    document.addEventListener("pointerdown", fuera);
    return () => {
      window.removeEventListener("keydown", esc);
      document.removeEventListener("pointerdown", fuera);
    };
  }, [abierto]);

  return (
    <div className="nav__menu" ref={raiz} data-anim="nav">
      <button
        type="button"
        className={`nav__burger${abierto ? " is-open" : ""}`}
        aria-expanded={abierto}
        aria-controls="nav-panel"
        onClick={() => setAbierto(!abierto)}
      >
        <span aria-hidden="true" />
        <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
      </button>

      <ul
        className={`nav__panel${abierto ? " is-open" : ""}`}
        id="nav-panel"
      >
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setAbierto(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
