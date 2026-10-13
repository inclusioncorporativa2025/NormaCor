import CtaFinalMotion from "./CtaFinalMotion";
import { Arrow } from "./Icons";
import CierreOlas from "./CierreOlas";

export default function CtaFinal() {
  return (
    <section className="cierre" id="empezar-ya">
      <CtaFinalMotion />
      <CierreOlas />

      <div className="container">
        <div className="cierre__panel">

          <h2 className="cierre__titulo" data-cierre>
            ¿Comprobamos qué le <span>falta a tu empresa?</span>
          </h2>
          <p className="cierre__sub" data-cierre>
            El test es gratuito y no pide datos de pago. En unos minutos tienes
            el listado de lo que te obliga la ley y cuánto cuesta resolverlo.
          </p>

          <div className="cierre__acciones" data-cierre>
            <a className="btn btn--lg" href="#test">
              Comprobar mi empresa <Arrow />
            </a>
            <a className="btn" href="#catalogo">
              Ver el catálogo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
