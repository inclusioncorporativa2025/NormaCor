import NavMenu from "./NavMenu";
import NavMotion from "./NavMotion";

/* Solo "Soluciones" apunta a una sección que ya existe. El resto son
   destinos pendientes: quedan escritos para que al crearlos baste con
   poner el id, no para que naveguen hoy. */
const links = [
  { href: "#test", label: "Diagnóstico" },
  { href: "#servicios", label: "Soluciones" },
  { href: "#sectores", label: "Sectores" },
  { href: "#packs", label: "Packs" },
  { href: "#recursos", label: "Recursos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  return (
    <nav className="nav" aria-label="Navegación principal">
      <NavMotion />

      <div className="container nav__inner">
        <a className="brand" href="#top" data-anim="nav">
          Norma<em>cor</em>
        </a>

        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href} data-anim="nav">
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <span className="nav__spacer" />

        <a className="btn nav__cta" href="#test" data-anim="nav">
          Comprobar mi empresa
        </a>

        <NavMenu links={links} />
      </div>
    </nav>
  );
}
