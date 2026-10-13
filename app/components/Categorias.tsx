import CategoriasMotion from "./CategoriasMotion";
import OrbitPicker from "./OrbitPicker";
import { Arrow } from "./Icons";

export default function Categorias() {
  return (
    <section className="categorias" id="categorias">
      <CategoriasMotion />

      <div className="container">
        <div className="rueda__panel">
          <div className="rueda__copy">
            <h2 className="rueda__title" data-cat>
              Diez áreas <span>normativas</span>
            </h2>
            <p className="rueda__sub" data-cat>
              Pulsa un área para ver qué entra en ella. El catálogo está
              agrupado así para que encuentres lo tuyo sin saber cómo se llama
              la ley.
            </p>
            <div data-cat>
              <a className="btn btn--lg" href="#catalogo">
                Ver todas las implantaciones <Arrow />
              </a>
            </div>
          </div>

          <div className="rueda__cloud">
            <OrbitPicker />
          </div>
        </div>
      </div>
    </section>
  );
}
