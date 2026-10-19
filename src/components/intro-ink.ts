/**
 * Os traços com que o "leite" escreve a logo na abertura (<Intro />), na ordem em que uma mão
 * desenharia: o tronco do R; o traço de cima (o gancho e a barra, e depois a diagonal que volta
 * dali, sem tirar a caneta); o risquinho que cruza a diagonal; e, por fim, a perna de baixo, que
 * sobe pela direita.
 *
 * IMPORTANTE: estes caminhos NÃO são a logo. Cada um é só o percurso da "caneta" (o centro do traço,
 * no mesmo sistema de coordenadas da logo, viewBox 0 0 136 118) e serve de máscara grossa para ir
 * revelando a logo original de src/components/logo-paths.ts, que não é alterada em nada.
 * As grossuras (w) foram medidas para que, juntas, as máscaras cubram a logo inteira, sem sobrar
 * nenhum pixel (o fim da abertura troca tudo pela logo lisa, então nada pode ficar de fora).
 *
 *  d     o percurso
 *  w     a grossura da máscara (um pouco maior que o traço da logo naquele ponto)
 *  hw    a grossura do brilho que acompanha a ponta do leite
 *  at    onde a gota cai (o começo do percurso)
 *  drop  se uma gota nova cai no começo (a diagonal continua o traço de cima, então não tem gota)
 *  land  quando a gota toca o café e o traço começa (segundos, antes do --k de tokens.css)
 *  dur   quanto tempo o leite leva para escorrer pelo traço (idem)
 *  hl    o comprimento do brilho (fração do percurso)
 */
export type InkStroke = {
  id: string;
  d: string;
  w: number;
  hw: number;
  at: readonly [number, number];
  drop: boolean;
  land: number;
  dur: number;
  hl: number;
};

export const INK: readonly InkStroke[] = [
  {
    id: "tronco",
    d: "M43.00 36.00 C43.10 38.33 43.53 45.17 43.60 50.00 C43.67 54.83 43.60 60.00 43.40 65.00 C43.20 70.00 42.80 75.00 42.40 80.00 C42.00 85.00 41.40 90.17 41.00 95.00 C40.60 99.83 40.17 106.67 40.00 109.00",
    w: 18.2,
    hw: 8,
    at: [43, 36],
    drop: true,
    land: 0.5,
    dur: 0.4,
    hl: 0.33,
  },
  {
    id: "barra",
    d: "M9.00 34.00 C8.95 32.67 8.78 28.67 8.70 26.00 C8.62 23.33 8.45 20.33 8.50 18.00 C8.55 15.67 8.50 13.57 9.00 12.00 C9.50 10.43 10.17 9.30 11.50 8.60 C12.83 7.90 13.92 7.68 17.00 7.80 C20.08 7.92 25.33 8.73 30.00 9.30 C34.67 9.87 40.00 10.62 45.00 11.20 C50.00 11.78 54.17 12.18 60.00 12.80 C65.83 13.42 73.33 14.17 80.00 14.90 C86.67 15.63 94.67 16.55 100.00 17.20 C105.33 17.85 108.17 18.08 112.00 18.80 C115.83 19.52 121.17 21.05 123.00 21.50",
    w: 22.8,
    hw: 8,
    at: [9, 34],
    drop: true,
    land: 0.92,
    dur: 0.62,
    hl: 0.17,
  },
  {
    id: "diagonal",
    d: "M123.00 21.50 C121.27 23.35 116.35 29.00 112.62 32.58 C108.89 36.16 105.12 39.21 100.62 42.98 C96.12 46.75 90.62 51.11 85.62 55.18 C80.62 59.25 74.79 64.31 70.62 67.38 C66.45 70.45 63.89 71.81 60.62 73.58 C57.35 75.35 52.60 77.26 51.00 78.00",
    w: 17.8,
    hw: 8,
    at: [123, 21.5],
    drop: false,
    land: 1.54,
    dur: 0.36,
    hl: 0.26,
  },
  {
    id: "risco",
    d: "M75.50 47.80 C77.92 48.75 84.75 51.22 90.00 53.50 C95.25 55.78 104.17 60.17 107.00 61.50",
    w: 19.0,
    hw: 8,
    at: [75.5, 47.8],
    drop: true,
    land: 1.92,
    dur: 0.26,
    hl: 0.6,
  },
  {
    id: "perna",
    d: "M52.00 79.00 C55.00 80.17 64.00 83.58 70.00 86.00 C76.00 88.42 82.33 91.00 88.00 93.50 C93.67 96.00 99.50 98.83 104.00 101.00 C108.50 103.17 112.42 105.17 115.00 106.50 C117.58 107.83 118.75 108.58 119.50 109.00 C120.00 107.50 121.67 103.17 122.50 100.00 C123.33 96.83 123.83 93.67 124.50 90.00 C125.17 86.33 126.02 81.33 126.50 78.00 C126.98 74.67 127.25 71.33 127.40 70.00",
    w: 19.8,
    hw: 8,
    at: [52, 79],
    drop: true,
    land: 2.2,
    dur: 0.56,
    hl: 0.21,
  },
];

/** Quando o último traço termina (segundos, antes do --k): daqui saem o "assentar" e a decolagem. */
export const INK_END = Math.max(...INK.map((s) => s.land + s.dur));
