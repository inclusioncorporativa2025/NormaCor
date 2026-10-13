import PieMotion from "./PieMotion";
import { Arrow } from "./Icons";
import PieFondo from "./PieFondo";

/* Las dos primeras columnas repiten el nav; la tercera son las páginas
   legales, que en una empresa de cumplimiento no pueden faltar. Ninguna
   existe todavía: los destinos quedan escritos para que al crearlas
   baste con poner el id o la ruta. */
const columnas = [
  {
    titulo: "Producto",
    links: [
      { href: "#test", label: "Diagnóstico" },
      { href: "#servicios", label: "Soluciones" },
      { href: "#sectores", label: "Sectores" },
      { href: "#packs", label: "Packs" },
    ],
  },
  {
    titulo: "Normacor",
    links: [
      { href: "#recursos", label: "Recursos" },
      { href: "#contacto", label: "Contacto" },
      { href: "#categorias", label: "Áreas normativas" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { href: "#aviso-legal", label: "Aviso legal" },
      { href: "#privacidad", label: "Privacidad" },
      { href: "#cookies", label: "Cookies" },
    ],
  },
];

export default function Pie() {
  return (
    <footer className="pie">
      <PieMotion />

      <PieFondo />

      <div className="container pie__interior">
        <div className="pie__alto">
          <div className="pie__marca" data-pie>
            <a className="pie__logo" href="#top">
              Norma<em>cor</em>
            </a>
            <p className="pie__claim">
              Te decimos qué obligaciones legales tiene tu empresa y te las
              implantamos. Sin reuniones y a precio cerrado.
            </p>
            <a className="pie__cta" href="#test">
              Comprobar mi empresa
              <span className="pie__flecha" aria-hidden="true">
                <Arrow size={14} />
              </span>
            </a>
          </div>

          <nav className="pie__cols" aria-label="Enlaces del pie">
            {columnas.map(({ titulo, links }) => (
              <div className="pie__col" key={titulo} data-pie>
                <h2 className="pie__col-titulo">{titulo}</h2>
                <ul>
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="pie__bajo" data-pie>
          <p>© {new Date().getFullYear()} Normacor</p>
          <p>normacor.es</p>
        </div>
      </div>
    </footer>
  );
}
