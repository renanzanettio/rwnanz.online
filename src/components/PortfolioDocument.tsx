import type { ReactNode } from "react";
import { anton, bricolage, caveat } from "@/fonts";
import { LogoSprite } from "./Logo";
import { ui, type Locale } from "@/lib/locale";

import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/mascot.css";
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/sections.css";

export const viewport = { themeColor: "#21140E", colorScheme: "dark" } as const;

export default function PortfolioDocument({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body className={`${anton.variable} ${bricolage.variable} ${caveat.variable}`}>
        <LogoSprite />
        <a className="skip" href="#conteudo">{ui[locale].skip}</a>
        {children}
      </body>
    </html>
  );
}
