import type { CSSProperties } from "react";
import IntroSkip from "./IntroSkip";
import { INK, INK_END } from "./intro-ink";
import { LOGO_FILL, LOGO_STROKE, LOGO_VIEWBOX } from "./logo-paths";

/**
 * Passa o tempo de cada traço (src/components/intro-ink.ts) para o CSS (src/styles/intro.css).
 * --h0 e --h1 são o começo e o fim do deslocamento do tracejado do brilho (já calculados aqui:
 * o navegador não anima valores que vêm de um calc()).
 */
const timing = (s: (typeof INK)[number]) =>
  ({
    "--t": s.land,
    "--dur": s.dur,
    "--hl": s.hl,
    "--h0": +(s.hl + 0.03).toFixed(3),
    "--h1": +(s.hl - 1).toFixed(3),
  }) as CSSProperties;

/**
 * Abertura do site, em cima do fundo espresso:
 * uma xícara vista de cima aparece, gotas de leite caem nela e o leite vai "escrevendo" a logo RWZ
 * (latte art), traço por traço. Quando termina, a xícara some e a logo encolhe e voa até o lugar
 * dela no cabeçalho, enquanto o fundo escuro se dissolve e revela a página.
 *
 * O desenho da logo é o de src/components/logo-paths.ts, sem nenhuma edição: aqui ele só é revelado
 * por uma máscara que percorre o centro de cada traço (src/components/intro-ink.ts).
 *
 * Tudo é CSS (src/styles/intro.css), então termina sozinha; o <IntroSkip /> só permite pular e
 * mede onde fica a logo do cabeçalho para a logo "pousar" exatamente em cima dela.
 * Quem controla se ela roda é o script do <head> (src/app/layout.tsx).
 */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true" style={{ "--ink-end": INK_END } as CSSProperties}>
      <div className="intro__panel">
        <div className="intro__clip">
          {/* a xícara vista de cima: borda de porcelana, café e a crema */}
          <div className="intro__stage">
            <svg className="intro__cup" viewBox="0 0 200 200" focusable="false">
              <defs>
                <radialGradient id="cup-coffee" cx="50%" cy="43%" r="64%">
                  <stop offset="0" stopColor="#74401f" />
                  <stop offset="0.55" stopColor="#4d2d1b" />
                  <stop offset="1" stopColor="#2a1810" />
                </radialGradient>
              </defs>
              <circle className="cup__rim" cx="100" cy="100" r="98.4" />
              <circle className="cup__lip" cx="100" cy="100" r="94.6" />
              <circle className="cup__coffee" cx="100" cy="100" r="90" fill="url(#cup-coffee)" />
              <circle className="cup__crema" cx="100" cy="100" r="88.4" />
              <path className="cup__shine" d="M38 66A66 66 0 0 1 74 33" />
              <circle className="cup__wave" cx="100" cy="100" r="88" />
            </svg>
          </div>

          <p className="intro__hint">toque para pular</p>
        </div>
      </div>

      {/* a logo: fica fora da folha escura, porque é ela que voa até o cabeçalho */}
      <div className="intro__fly">
        <svg className="ink" viewBox={LOGO_VIEWBOX} focusable="false">
          <defs>
            {/* a logo de verdade (a mesma de Logo.tsx): preenchimento + o contorno fino */}
            <g id="ink-shape">
              <path fill="currentColor" d={LOGO_FILL} />
              <path fill="none" stroke="currentColor" strokeLinejoin="round" d={LOGO_STROKE} />
            </g>
            {/* o leite vai sendo revelado ao longo do centro de cada traço... */}
            <mask id="ink-reveal" maskUnits="userSpaceOnUse" x="-20" y="-20" width="176" height="158">
              {INK.map((s) => (
                <path key={s.id} className="ink__pen" d={s.d} pathLength={1} strokeWidth={s.w} style={timing(s)} />
              ))}
            </mask>
            {/* ...e um brilho curto acompanha a ponta (a parte mais "fresca" do leite) */}
            <mask id="ink-head" maskUnits="userSpaceOnUse" x="-20" y="-20" width="176" height="158">
              {INK.map((s) => (
                <path
                  key={s.id}
                  className="ink__pen ink__pen--head"
                  d={s.d}
                  pathLength={1}
                  strokeWidth={s.hw}
                  style={timing(s)}
                />
              ))}
            </mask>
          </defs>

          {/* as ondinhas que cada gota faz no café */}
          <g className="ink__ripples">
            {INK.filter((s) => s.drop).map((s) => (
              <circle key={s.id} className="ink__ripple" cx={s.at[0]} cy={s.at[1]} r="3" style={timing(s)} />
            ))}
          </g>

          <g className="ink__halo" mask="url(#ink-reveal)">
            <use href="#ink-shape" />
          </g>
          <g className="ink__milk" mask="url(#ink-reveal)">
            <use href="#ink-shape" />
          </g>
          <g className="ink__head" mask="url(#ink-head)">
            <use href="#ink-shape" />
          </g>
          {/* no fim, a logo inteira e lisa (igual à do cabeçalho) toma o lugar de tudo isso */}
          <g className="ink__final">
            <use href="#ink-shape" />
          </g>

          {/* as gotas de leite que caem no começo de cada traço */}
          <g className="ink__drops">
            {INK.filter((s) => s.drop).map((s) => (
              <ellipse key={s.id} className="ink__drop" cx={s.at[0]} cy={s.at[1]} rx="2.7" ry="3.5" style={timing(s)} />
            ))}
          </g>
        </svg>
      </div>

      <IntroSkip />
    </div>
  );
}
