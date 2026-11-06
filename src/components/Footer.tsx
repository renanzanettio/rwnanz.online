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

        <div className="ftr__meta">
          <span>
            © {currentYear} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
