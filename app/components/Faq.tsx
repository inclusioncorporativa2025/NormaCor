"use client";

import { useState } from "react";

import FaqMotion from "./FaqMotion";

/* Seis preguntas sobre el propio servicio, redactadas a partir de lo que
   ofrece Normacor y del criterio comercial del documento ("vender
   implantación, no un documento"). No son de clientes, así que no hay
   nada que inventar: para cambiarlas basta con tocar este array. */
const preguntas = [
  {
    q: "¿El test es de verdad gratuito?",
    a: "Sí. No pedimos tarjeta ni datos de pago para hacerlo, y tampoco hace falta registrarse para empezar. Al final puedes dejar un email para guardar el diagnóstico, nada más.",
  },
  {
    q: "¿Tengo que saber de leyes para usarlo?",
    a: "No. Las preguntas son sobre tu plantilla y tu actividad, en lenguaje normal. Nosotras traducimos tus respuestas a las obligaciones que te aplican.",
  },
  {
    q: "¿Qué incluye cada implantación?",
    a: "No vendemos un documento suelto. Cada implantación es el diagnóstico, la adaptación a tu empresa, los entregables y las instrucciones para ponerlo en marcha.",
  },
  {
    q: "¿Los precios son cerrados?",
    a: "Los que ves son precio cerrado, sin sorpresas. En las implantaciones cuyo precio depende de tu caso lo indicamos como «a consultar» y te lo cerramos antes de contratar.",
  },
  {
    q: "¿Cuánto tardo en tenerlo?",
    a: "El test son unos minutos. A partir de ahí, el plazo depende de la implantación que elijas; lo verás en cada ficha antes de contratar.",
  },
  {
    q: "¿Y si cambia la normativa más adelante?",
    a: "Seguimos los cambios legales y, cuando una implantación lo necesita, te avisamos de que algo que ya tienes ha dejado de valer.",
  },
];

export default function Faq() {
  /* Solo una abierta a la vez; la primera, al entrar. null las cierra
     todas, así que pulsar la abierta la pliega. */
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="faq" id="faq">
      <FaqMotion />

      <div className="container faq__grid">
        <div className="faq__intro">
          <span className="faq__mark" data-faq aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <h2 className="faq__titulo" data-faq>
            Preguntas <span>frecuentes</span>
          </h2>
          <p className="faq__sub" data-faq>
            Lo que más nos preguntan antes de hacer el test. Si te queda otra
            cosa, escríbenos.
          </p>
        </div>

        <ul className="faq__lista">
          {preguntas.map(({ q, a }, i) => {
            const open = abierta === i;
            return (
              <li className={`faq-item${open ? " is-open" : ""}`} key={q} data-faq>
                <h3 className="faq-item__cab">
                  <button
                    type="button"
                    className="faq-item__btn"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setAbierta(open ? null : i)}
                  >
                    <span>{q}</span>
                    <span className="faq-item__signo" aria-hidden="true" />
                  </button>
                </h3>
                {/* Sin `hidden`: el panel se pliega a 0fr por CSS, igual
                    que las tres puertas, en vez de aparecer de golpe. */}
                <div
                  className="faq-item__panel"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <p>{a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
