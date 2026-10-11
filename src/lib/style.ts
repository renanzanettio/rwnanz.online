import type { CSSProperties } from "react";

/** Posição na fila de animação de entrada (0, 1, 2…): o CSS usa isso para escalonar os atrasos. */
export const idx = (n: number): CSSProperties => ({ "--i": n }) as CSSProperties;
