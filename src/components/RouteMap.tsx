import { projects } from "@/lib/projects";

const VIEW_H = 300;
const MARGIN_Y = 60;
const CENTER_Y = VIEW_H / 2;

export default function RouteMap() {
  const routed = projects.filter((p) => p.route);
  const usable = VIEW_H - MARGIN_Y * 2;
  const step = routed.length > 1 ? usable / (routed.length - 1) : 0;
  const yFor = (i: number) =>
    routed.length === 1 ? CENTER_Y : MARGIN_Y + step * i;

  return (
    <svg
      viewBox={`0 0 620 ${VIEW_H}`}
      className="h-auto w-full max-w-xl"
      role="img"
      aria-label="Diagrama de rotas: rwnanz.online no centro, ligado a cada site hospedado"
    >
      <defs>
        <filter id="route-wobble" x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
        </filter>
      </defs>

      <g filter="url(#route-wobble)">
        {routed.map((p, i) => (
          <path
            key={p.slug}
            d={`M 108 ${CENTER_Y} C 220 ${CENTER_Y}, 220 ${yFor(i)}, 340 ${yFor(i)}`}
            className={p.status === "no-ar" ? "route-line-active" : "route-line"}
          />
        ))}
      </g>

      <g filter="url(#route-wobble)">
        <circle cx="88" cy={CENTER_Y} r="20" fill="var(--ink)" />
        <circle cx="88" cy={CENTER_Y} r="20" fill="none" stroke="var(--route-teal)" strokeWidth="2" />
      </g>
      <text
        x="88"
        y={CENTER_Y + 46}
        textAnchor="middle"
        className="font-mono"
        fontSize="12"
        fill="var(--ink)"
      >
        rwnanz.online
      </text>

      {routed.map((p, i) => (
        <g key={p.slug}>
          <g filter="url(#route-wobble)">
            <line
              x1="340"
              y1={yFor(i)}
              x2="360"
              y2={yFor(i)}
              stroke={p.status === "no-ar" ? "var(--route-teal)" : "var(--line)"}
              strokeWidth="2"
            />
            <circle
              cx="366"
              cy={yFor(i)}
              r="6"
              fill={p.status === "no-ar" ? "var(--route-teal)" : "var(--paper)"}
              stroke={p.status === "no-ar" ? "var(--route-teal)" : "var(--route-mustard)"}
              strokeWidth="2"
            />
          </g>
          <text x="382" y={yFor(i) + 4} className="font-mono" fontSize="13" fill="var(--ink)">
            {p.name}
          </text>
          <text
            x="382"
            y={yFor(i) + 20}
            className="font-mono"
            fontSize="10"
            letterSpacing="0.08em"
            fill={p.status === "no-ar" ? "var(--route-teal-deep)" : "var(--route-mustard)"}
          >
            {p.status === "no-ar" ? "NO AR" : "EM BREVE"}
          </text>
        </g>
      ))}
    </svg>
  );
}
