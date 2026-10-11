import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { idx } from "@/lib/style";
import { arrowArt } from "./pingado-art";
import { ArrowDown } from "./Icons";
import MascotButton from "./MascotButton";
import Pingado from "./Pingado";

export default function Hero() {
  const total = projects.length;
  const live = projects.filter((p) => p.status === "no-ar").length;

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__text">
          {site.available && (
            <p className="pill rise" style={idx(0)}>
              <i className="dot dot--live dot--ping" aria-hidden="true" />
              Disponível para novos projetos
            </p>
          )}

          <h1 id="hero-title" className="hero__title rise" style={idx(1)}>
            Do front ao back,
            <br />
            <span>camada por camada.</span>
          </h1>

          <p className="hero__lead rise" style={idx(2)}>
            Sou o <strong>Renan Zanetti</strong>, desenvolvedor júnior. Construo web, mobile e visão
            computacional — e hospedo meus projetos aqui, cada um na sua própria rota.
          </p>

          <div className="hero__cta rise" style={idx(3)}>
            <a className="btn pri" href="#projetos">
              Ver projetos
              <ArrowDown />
            </a>
            <a className="btn ghost" href="#contato">
              Falar comigo
            </a>
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__disc fade-in" style={idx(1)} aria-hidden="true" />
          <div className="hero__ring fade-in" style={idx(2)} aria-hidden="true" />

          <MascotButton>
            <Pingado variant="hero" idPrefix="hero" decorative />
          </MascotButton>

          <div className="note note--front" aria-hidden="true">
            <div className="note__title">front-end</div>
            <div className="note__sub">o que você vê</div>
            <svg className="note__arrow" viewBox="0 0 90 60" focusable="false">
              <path d={arrowArt.up.line} />
              <path d={arrowArt.up.head} />
            </svg>
          </div>

          <div className="note note--back" aria-hidden="true">
            <svg className="note__arrow" viewBox="0 0 90 60" focusable="false">
              <path d={arrowArt.down.line} />
              <path d={arrowArt.down.head} />
            </svg>
            <div className="note__title">back-end</div>
            <div className="note__sub">o que sustenta</div>
          </div>
        </div>

        <ul className="hero__stats rise" style={idx(4)}>
          <li>
            <span className="stat__n">{total}</span>
            <span className="stat__l">{total === 1 ? "projeto" : "projetos"}</span>
          </li>
          <li>
            <span className="stat__n">{live}</span>
            <span className="stat__l">no ar agora</span>
          </li>
          <li>
            <span className="stat__n">3</span>
            <span className="stat__l">frentes: web, mobile e visão computacional</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
