import TestimoniosMotion from "./TestimoniosMotion";

/* RANURAS VACÍAS A PROPÓSITO. El encargo dice que solo se usen
   testimonios reales, así que aquí no hay ninguna cita inventada: lo
   que se ve es el hueco con su forma definitiva. Para publicarlo basta
   con sustituir `cita`, `nombre` y `cargo` por los de verdad. */
const testimonios = [
  {
    id: 1,
    cita: "Aquí va la frase literal del cliente, tal como la dijo. Dos o tres líneas bastan: cuanto más concreta, más convence.",
    nombre: "Nombre Apellido",
    cargo: "Cargo · Empresa",
  },
  {
    id: 2,
    cita: "Mejor una pega resuelta que un elogio general. Qué le preocupaba, qué hicimos y cómo quedó.",
    nombre: "Nombre Apellido",
    cargo: "Cargo · Empresa",
  },
  {
    id: 3,
    cita: "Si el cliente da un dato suyo (plazo, inspección superada, horas ahorradas), va aquí y vale por todo lo demás.",
    nombre: "Nombre Apellido",
    cargo: "Cargo · Empresa",
  },
];

export default function Testimonios() {
  return (
    <section className="testimonios" id="testimonios">
      <TestimoniosMotion />

      <div className="container">
        <h2 className="testimonios__titulo" data-testi>
          Lo que dicen <span>quienes ya lo tienen resuelto</span>
        </h2>

        <ul className="testimonios__lista">
          {testimonios.map(({ id, cita, nombre, cargo }) => (
            <li className="testi" key={id} data-testi>
              <span className="testi__comilla" aria-hidden="true">
                &rdquo;
              </span>
              <blockquote className="testi__cita">{cita}</blockquote>
              <footer className="testi__autor">
                <span className="testi__inicial" aria-hidden="true" />
                <span>
                  <strong>{nombre}</strong>
                  <em>{cargo}</em>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
