import Link from "next/link";
import { homePath, ui, type Locale } from "@/lib/locale";
import Logo from "./Logo";

export default function PortfolioNotFound({ locale }: { locale: Locale }) {
  const text = ui[locale];
  return (
    <main id="conteudo" className="nf" tabIndex={-1}>
      <div className="wrap nf__in">
        <Logo className="nf__logo" />
        <p className="eyebrow">404</p>
        <h1 className="nf__title">{text.notFoundTitle}</h1>
        <p className="nf__text">{text.notFoundText}</p>
        <Link className="btn pri" href={homePath(locale)}>{text.homeAction}</Link>
      </div>
    </main>
  );
}
