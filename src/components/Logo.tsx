import { LOGO_FILL, LOGO_STROKE, LOGO_VIEWBOX } from "./logo-paths";

/** Define a logo uma única vez na página; os <Logo /> só apontam para ela. */
export function LogoSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <symbol id="rwz-logo" viewBox={LOGO_VIEWBOX}>
          <path fill="currentColor" d={LOGO_FILL} />
          <path fill="none" stroke="currentColor" strokeLinejoin="round" d={LOGO_STROKE} />
        </symbol>
      </defs>
    </svg>
  );
}

/** A logo RWZ. Pega a cor do texto ao redor (`color`). */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
      <use href="#rwz-logo" />
    </svg>
  );
}
