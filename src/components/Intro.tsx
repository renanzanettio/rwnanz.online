import IntroSkip from "./IntroSkip";
import Pingado from "./Pingado";

/** Estrelinha de quatro pontas (rabisco), desenhada em torno do ponto 0,0. */
const SPARK = "M0 -10C1 -3 3 -1 10 0C3 1 1 3 0 10C-1 3 -3 1 -10 0C-3 -1 -1 -3 0 -10Z";

/**
 * Abertura do site: uma folha de papel cor de leite onde o Pingado é rabiscado,
 * enchido de café e leite, e acena. Depois a folha sobe e revela a página.
 * Tudo é CSS (src/styles/intro.css), então termina sozinha; o <IntroSkip /> só permite pular.
 * Quem controla se ela roda é o script do <head> (src/app/layout.tsx).
 */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__panel">
        <div className="intro__clip">
          <div className="intro__stage">
            <div className="intro__ring" />
            <Pingado variant="intro" idPrefix="intro" />
            <svg className="spark spark--1" viewBox="-12 -12 24 24" focusable="false">
              <path d={SPARK} />
            </svg>
            <svg className="spark spark--2" viewBox="-12 -12 24 24" focusable="false">
              <path d={SPARK} />
            </svg>
            <svg className="spark spark--3" viewBox="-12 -12 24 24" focusable="false">
              <path d={SPARK} />
            </svg>
          </div>

          <p className="intro__caption">
            <span className="intro__cap intro__cap--a">
              passando o café
              <span className="intro__dots">
                <i>.</i>
                <i>.</i>
                <i>.</i>
              </span>
            </span>
            <span className="intro__cap intro__cap--b">pronto! pode entrar</span>
          </p>

          <p className="intro__hint">toque para pular</p>
        </div>

        {/* borda ondulada, com a linha de caramelo (a "crema"), pendurada embaixo da folha */}
        <svg className="intro__edge" viewBox="0 0 1200 60" preserveAspectRatio="none" focusable="false">
          <path
            className="intro__edge-fill"
            d="M0 0H1200V26C1100 46 1000 6 900 26S700 46 600 26S400 6 300 26S100 46 0 26Z"
          />
          <path
            className="intro__edge-line"
            d="M1200 26C1100 46 1000 6 900 26S700 46 600 26S400 6 300 26S100 46 0 26"
          />
        </svg>
      </div>

      <IntroSkip />
    </div>
  );
}
