import Image from "next/image";

import HeroMotion from "./HeroMotion";
import { Arrow } from "./Icons";
import Halo from "./Halo";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <HeroMotion />

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow" data-anim="eyebrow">
            Test gratuito de obligaciones legales
          </p>

          <h1 className="hero__title" data-anim="title">
            ¿Sabes qué obligaciones legales{" "}
            <span className="accent">tiene tu empresa?</span>
          </h1>

          <p className="hero__sub" data-anim="sub">
            Haz nuestro test gratuito y descubre en pocos minutos qué necesitas
            implantar.
          </p>

          <div className="hero__actions" data-anim="cta">
            <a className="btn btn--lg" href="#test">
              Hacer test gratuito <Arrow />
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <Halo aro={false} className="halo--a" data-halo />
          <Halo tono="lilac" aro={false} className="halo--b" data-halo />

          {/* Decorativa: la pantalla no dice nada que no diga ya el copy. */}
          <Image
            className="hero__pc"
            src="/assets/landing/pc-landing.png"
            alt=""
            width={1586}
            height={992}
            sizes="(max-width: 1000px) 94vw, 760px"
            priority
            data-anim="pc"
          />
        </div>
      </div>

    </section>
  );
}
