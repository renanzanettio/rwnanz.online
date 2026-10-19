import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { anton, bricolage, caveat } from "@/fonts";
import { LogoSprite } from "@/components/Logo";
import { site } from "@/lib/site";

// A ordem importa: o que vem depois pode sobrescrever o que vem antes.
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/mascot.css";
import "../styles/intro.css";
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/sections.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.domain,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Renan Zanetti",
    "RWZ",
    "portfólio",
    "desenvolvedor júnior",
    "desenvolvedor web",
    "desenvolvedor mobile",
    "visão computacional",
    "Next.js",
    "React",
    "React Native",
    "Kotlin",
    "Node.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.domain,
    locale: site.locale,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#21140E",
  colorScheme: "dark",
};

/**
 * Roda antes da página aparecer (fica no <head>) e decide se a abertura toca:
 *  - marca <html class="js"> (o CSS só liga animações quando o JavaScript existe);
 *  - toca a abertura uma vez por sessão (`?intro` na URL força tocar de novo);
 *  - pula se a pessoa pediu menos movimento ou se a rota não é a página inicial;
 *  - trava a rolagem enquanto a abertura toca (o IntroSkip destrava; 5 s é a rede de segurança).
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add("js");try{var q=/[?&]intro(=|&|$)/.test(location.search),r=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,s=sessionStorage;if(location.pathname!=="/"||r||(s.getItem("rwz:intro")&&!q)){d.setAttribute("data-intro","skip")}else{s.setItem("rwz:intro","1");d.setAttribute("data-intro","play");d.setAttribute("data-lock","");setTimeout(function(){d.removeAttribute("data-lock")},5000)}}catch(e){d.setAttribute("data-intro","skip")}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // suppressHydrationWarning: o script do <head> acrescenta atributos ao <html> antes do React carregar
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className={`${anton.variable} ${bricolage.variable} ${caveat.variable}`}>
        <LogoSprite />
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
