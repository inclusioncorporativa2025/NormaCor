import ComoFuncionaMotion from "./ComoFuncionaMotion";
import Halo from "./Halo";
import { Arrow } from "./Icons";

/* Tres pasos: responde -> detectamos -> contrata y lo solucionamos. El
   número grande es el único adorno de cada fila: nada de ilustración por
   paso, que a este tamaño competía con el texto. */
const pasos = [
  {
    titulo: "Responde",
    texto:
      "Unas preguntas sobre tu plantilla y tu actividad. Pocos minutos y sin saber de leyes.",
  },
  {
    titulo: "Detectamos",
    texto:
      "Cruzamos tus respuestas con la normativa y te decimos qué obligaciones te aplican.",
  },
  {
    titulo: "Contrata y lo solucionamos",
    texto:
      "Eliges lo que necesitas, lo contratas online y nosotras lo implantamos.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="pasos" id="como-funciona">
      <ComoFuncionaMotion />

      <div className="container pasos__grid">
        <div className="pasos__intro">
          {/* Los mismos dos círculos de marca que el hero. */}
          <Halo className="pasos__halo--a" data-halo-paso />
          <Halo tono="lilac" className="pasos__halo--b" data-halo-paso />

          <span className="pasos__mark" data-paso aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <h2 className="pasos__titulo" data-paso>
            Cómo <span>funciona</span>
          </h2>
          <p className="pasos__sub" data-paso>
            Del test al diagnóstico, y del diagnóstico a tenerlo implantado.
            Tres pasos y no hay más.
          </p>
          <a className="btn btn--lg pasos__cta" href="#test" data-paso>
            Hacer test gratuito <Arrow />
          </a>
        </div>

        <ol className="pasos__lista">
          {pasos.map(({ titulo, texto }, i) => (
            <li className="paso" key={titulo} data-paso>
              <p className="paso__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="paso__cuerpo">
                <h3 className="paso__titulo">{titulo}</h3>
                <p className="paso__texto">{texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
