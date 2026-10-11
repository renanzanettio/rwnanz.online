import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="conteudo" className="nf">
      <div className="wrap nf__in">
        <Logo className="nf__logo" />
        <p className="eyebrow">Erro 404</p>
        <h1 className="nf__title">Esse café esfriou.</h1>
        <p className="nf__text">A página que você procurou não existe, ou mudou de rota.</p>
        <Link className="btn pri" href="/">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
