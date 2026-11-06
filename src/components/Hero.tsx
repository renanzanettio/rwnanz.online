import { projects } from "@/lib/projects";
import { ui, type Locale } from "@/lib/locale";
import { site, siteCopy } from "@/lib/site";
import { idx } from "@/lib/style";
import { arrowArt } from "./arrows";
import { ArrowDown } from "./Icons";
import MascotButton from "./MascotButton";
import MascotImage from "./MascotImage";

export default function Hero({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const total = projects.length;
  const live = projects.filter((p) => p.status === "live").length;

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__text">
          {site.available && (
            <p className="pill rise" style={idx(0)}>
              <i className="dot dot--live dot--ping" aria-hidden="true" />
              {copy.availability}
            </p>
          )}

          <h1 id="hero-title" className="hero__title rise" style={idx(1)}>
            {copy.headline}
            <br />
            <span>{copy.headlineAccent}</span>
          </h1>

          <p className="hero__lead rise" style={idx(2)}>
            {copy.introduction} <strong>{site.name}</strong>{copy.intro}
          </p>

          <div className="hero__cta rise" style={idx(3)}>
            <a className="btn pri" href="#projetos">
              {copy.viewProjects}
              <ArrowDown />
            </a>
            <a className="btn ghost" href="#contato">
              {ui[locale].contactAction}
            </a>
          </div>
        </div>

        <div className="hero__art">
          {/* o "prato" escuro atrás do mascote, com o anel tracejado e a sombra dos pés */}
          <div className="hero__disc fade-in" style={idx(1)} aria-hidden="true" />
          <div className="hero__ring fade-in" style={idx(2)} aria-hidden="true" />
          <div className="hero__shadow fade-in" style={idx(2)} aria-hidden="true" />

          <svg className="hero__steam" viewBox="0 0 84 70" aria-hidden="true">
            <path d="M24 63C6 46 37 34 24 11M44 59C29 42 57 29 45 4M63 64C50 48 75 36 64 19" />
          </svg>
          <div className="hero__mascot fade-in" style={idx(2)}>
            <MascotButton locale={locale}>
              <MascotImage />
            </MascotButton>
          </div>

          {/* anotações escritas à mão: front-end em cima (o leite), back-end embaixo (o café) */}
          <div className="note note--front" aria-hidden="true">
            <div className="note__title">front-end</div>
            <div className="note__sub">{copy.frontHint}</div>
          </div>
          <svg className="arrow arrow--front" viewBox="0 0 90 60" aria-hidden="true" focusable="false">
            <path d={arrowArt.up.line} />
            <path d={arrowArt.up.head} />
          </svg>

          <svg className="arrow arrow--back" viewBox="0 0 90 60" aria-hidden="true" focusable="false">
            <path d={arrowArt.down.line} />
            <path d={arrowArt.down.head} />
          </svg>
          <div className="note note--back" aria-hidden="true">
            <div className="note__title">back-end</div>
            <div className="note__sub">{copy.backHint}</div>
          </div>
        </div>

        <ul className="hero__stats rise" style={idx(4)}>
          <li>
            <span className="stat__n">{total}</span>
            <span className="stat__l">{copy.projectCount}</span>
          </li>
          <li>
            <span className="stat__n">{live}</span>
            <span className="stat__l">{copy.liveCount}</span>
          </li>
          <li>
            <span className="stat__n">{copy.focus.length}</span>
            <span className="stat__l">{copy.fields}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
