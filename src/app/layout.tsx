import type { Metadata } from "next";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "rwnanz.online — Renan Zanetti",
  description:
    "Hub pessoal de Renan Zanetti: portfólio e ponto de partida para todos os projetos hospedados em rwnanz.online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
