import type { CSSProperties } from "react";
import { PINGADO_VIEWBOX, pingadoArt as A } from "./pingado-art";

type Props = {
  /**
   * "hero"  → o Pingado parado, só com animações leves de repouso (acena, vapor, balança).
   * "intro" → o Pingado sendo desenhado e enchido de café e leite (tela de entrada).
   */
  variant?: "hero" | "intro";
  /** prefixo dos ids internos: dois desenhos na mesma página não podem repetir id */
  idPrefix: string;
  className?: string;
  /** true quando o desenho está dentro de um botão que já tem o próprio nome acessível */
  decorative?: boolean;
};

const LABEL =
  "Pingado, o mascote do site: um copo de café com leite sorridente, com café embaixo, leite em cima e a logo RWZ no meio, acenando";

/** Linha do tempo da entrada: atraso e duração em segundos (o CSS lê --d, --t e extras). */
function tl(delay: number, dur: number, extra?: Record<string, string>): CSSProperties {
  return { "--d": `${delay}s`, "--t": `${dur}s`, ...extra } as CSSProperties;
}

export default function Pingado({ variant = "hero", idPrefix, className, decorative = false }: Props) {
  const intro = variant === "intro";
  const clip = `${idPrefix}-copo`;
  const s = (delay: number, dur: number, extra?: Record<string, string>) =>
    intro ? tl(delay, dur, extra) : undefined;
  const draw = intro ? " pg-draw" : "";
  const when = (cls: string) => (intro ? cls : undefined);
  const a11y =
    intro || decorative
      ? ({ "aria-hidden": true } as const)
      : ({ role: "img", "aria-label": LABEL } as const);

  return (
    <svg
      className={`pingado pingado--${variant}${className ? ` ${className}` : ""}`}
      viewBox={PINGADO_VIEWBOX}
      focusable="false"
      {...a11y}
    >
      <defs>
        <clipPath id={clip}>
          <path d={A.glassBody} />
        </clipPath>
      </defs>

      <ellipse className="pg-shadow" cx="232" cy="596" rx="122" ry="9" />

      <g className="pg-bob">
        {/* fios de café e de leite caindo (só na entrada): contorno de tinta + miolo colorido */}
        {intro && (
          <>
            <path className="pg-pour pg-pour--edge" d={A.pourCoffee} pathLength={1} style={tl(0.62, 1.0)} />
            <path className="pg-pour pg-pour--coffee" d={A.pourCoffee} pathLength={1} style={tl(0.62, 1.0)} />
            <path className="pg-pour pg-pour--edge" d={A.pourMilk} pathLength={1} style={tl(1.3, 0.95)} />
            <path className="pg-pour pg-pour--milk" d={A.pourMilk} pathLength={1} style={tl(1.3, 0.95)} />
          </>
        )}

        {/* "impressão" deslocada em cobre, atrás do copo */}
        <path className={`pg-offset${intro ? " pg-slide" : ""}`} d={A.offset} style={s(2.05, 0.35)} />

        {/* vapor */}
        <path className={`pg-steam pg-steam-1${draw}`} d={A.steam[0]} pathLength={1} style={s(2.6, 0.5)} />
        <path className={`pg-steam pg-steam-2${draw}`} d={A.steam[1]} pathLength={1} style={s(2.7, 0.4)} />

        {/* líquidos: o leite fica atrás do café; os dois são recortados pelo formato do copo */}
        <g clipPath={`url(#${clip})`}>
          {/* o leite parte de baixo do café (topo do café ≈ y 320; topo do leite ≈ y 180 + 168 = 348) */}
          <g className={when("pg-rise")} style={s(1.5, 0.6, { "--from": "168px" })}>
            <path className="pg-milk" d={A.milk} />
          </g>
          {/* o café parte abaixo do fundo do copo (topo ≈ y 320 + 190 = 510; o fundo do copo está em y 487) */}
          <g className={when("pg-rise")} style={s(0.85, 0.55, { "--from": "190px" })}>
            <path className="pg-coffee" d={A.coffee} />
          </g>
          <path className={`pg-crema${draw}`} d={A.crema} pathLength={1} style={s(1.8, 0.4)} />
          <g className={when("pg-fade")} style={s(2.05, 0.4)}>
            <path className="pg-hl pg-hl-0" d={A.highlights[0]} />
            <path className="pg-hl pg-hl-1" d={A.highlights[1]} />
            <path className="pg-hl pg-hl-2" d={A.highlights[2]} />
          </g>
        </g>
        <path className={`pg-wall${intro ? " pg-fade" : ""}`} d={A.wall} style={s(2.05, 0.4)} />

        {/* espuma */}
        <g className={when("pg-pop")} style={s(1.98, 0.45, { "--ox": "230px", "--oy": "182px", "--sc": ".5" })}>
          <path className="pg-foam" d={A.foam} />
          <path className="pg-foam-line" d={A.foamLine} />
        </g>

        {/* contorno do copo */}
        <path className={`pg-glass${draw}`} d={A.glassLine} pathLength={1} style={s(0.12, 0.8)} />
        <path className={`pg-glass${draw}`} d={A.rim} pathLength={1} style={s(0.8, 0.25)} />

        {/* rosto (só no leite) */}
        <path className={`pg-ink${draw}`} d={A.eyeL} pathLength={1} style={s(2.25, 0.2)} />
        <path className={`pg-ink${draw}`} d={A.eyeR} pathLength={1} style={s(2.3, 0.2)} />
        <path className={`pg-ink${draw}`} d={A.mouth} pathLength={1} style={s(2.38, 0.25)} />

        {/* logo RWZ (no café) */}
        <g className={when("pg-pop")} style={s(2.3, 0.4, { "--ox": "230px", "--oy": "400px", "--sc": ".6" })}>
          <use className="pg-logo" href="#rwz-logo" x="188" y="364" width="84" height="73" />
        </g>

        {/* braço na cintura, pernas e sapatos */}
        <path className={`pg-line${draw}`} d={A.armRight} pathLength={1} style={s(2.4, 0.3)} />
        <path className={`pg-line${draw}`} d={A.legL} pathLength={1} style={s(2.45, 0.25)} />
        <path className={`pg-line${draw}`} d={A.legR} pathLength={1} style={s(2.5, 0.25)} />
        <g className={when("pg-pop")} style={s(2.62, 0.3, { "--ox": "160px", "--oy": "558px", "--sc": ".3" })}>
          <path className="pg-shoe" d={A.shoeL} />
        </g>
        <g className={when("pg-pop")} style={s(2.68, 0.3, { "--ox": "311px", "--oy": "549px", "--sc": ".3" })}>
          <path className="pg-shoe" d={A.shoeR} />
        </g>

        {/* braço acenando */}
        <g className="pg-wave">
          <path className={`pg-line${draw}`} d={A.armLeft} pathLength={1} style={s(2.35, 0.3)} />
          <path className={`pg-line${draw}`} d={A.hand} pathLength={1} style={s(2.55, 0.25)} />
          <path className={`pg-line pg-line--thin${draw}`} d={A.fingers} pathLength={1} style={s(2.68, 0.2)} />
          <path className={`pg-line pg-line--faint${draw}`} d={A.motion} pathLength={1} style={s(2.8, 0.2)} />
        </g>
      </g>
    </svg>
  );
}
