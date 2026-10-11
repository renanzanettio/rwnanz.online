import { currentYear, site } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__row">
        <div className="ftr__brand">
          <Logo className="ftr__logo" />
          <span className="ftr__name">
            rwnanz<span>.online</span>
          </span>
        </div>

        <p className="ftr__note">Rota nova sempre que eu terminar algo que valha a pena mostrar.</p>

        <div className="ftr__meta">
          <span>
            © {currentYear} {site.name}
          </span>
          {/* link comum (recarrega a página) de propósito: o ?intro faz a abertura rodar de novo */}
          <a className="ftr__replay" href="/?intro">
            rever a abertura
          </a>
        </div>
      </div>
    </footer>
  );
}
