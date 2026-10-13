import Categorias from "./components/Categorias";
import Cifras from "./components/Cifras";
import ComoFunciona from "./components/ComoFunciona";
import CtaFinal from "./components/CtaFinal";
import Faq from "./components/Faq";
import Fondo from "./components/Fondo";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Pie from "./components/Pie";
import Puertas from "./components/Puertas";
import Servicios from "./components/Servicios";
import Testimonios from "./components/Testimonios";

export default function Home() {
  return (
    <>
      {/* Fuera del hero: ese lleva `isolation: isolate` y encerraba el
          z-index de la barra en su propia pila, así que todo lo que
          venía después se le ponía encima al bajar. */}
      <Nav />

      {/* El lienzo de formas necesita un padre posicionado que mida lo
          que mide la página entera. */}
      <div className="pagina">
        <Fondo />

        <main>
          <Hero />
          <Puertas />
          <ComoFunciona />
          <Servicios />
          <Categorias />
          <Cifras />
          <Testimonios />
          <CtaFinal />
          
        </main>
      </div>

      <Pie />
    </>
  );
}
