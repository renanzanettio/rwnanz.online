// Ícones simples (linha de 2px), herdam a cor do texto.

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
} as const;

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} className={className ? `icon ${className}` : "icon"}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg {...base} className={className ? `icon ${className}` : "icon"}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className ? `icon ${className}` : "icon"}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
