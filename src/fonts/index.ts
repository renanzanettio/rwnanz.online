import localFont from "next/font/local";

// Fontes do site. Todas com licença OFL (os textos estão aqui na pasta).
// O Next copia os arquivos para o build, dá nomes com hash e já injeta o preload.
// Cada fonte vira uma variável de CSS (--font-anton etc.), usada em src/styles/tokens.css.

/** Títulos e números grandes (sempre em maiúsculas). */
export const anton = localFont({
  src: "./anton-latin.woff",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-anton",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
  adjustFontFallback: false,
});

/** Texto corrido, botões e menu. Variável: pesos de 400 a 800. */
export const bricolage = localFont({
  src: "./bricolage-grotesque-latin.woff",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-bricolage",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

/** Anotações "escritas à mão" (só o peso 700). */
export const caveat = localFont({
  src: "./caveat-latin.woff",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-caveat",
  fallback: ["Segoe Script", "cursive"],
  adjustFontFallback: false,
});
