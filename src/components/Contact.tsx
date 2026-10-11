import { site } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./Icons";

const rows = [
  { label: "E-mail", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "GitHub", value: site.githubLabel, href: site.github, external: true },
  { label: "LinkedIn", value: site.linkedinLabel, href: site.linkedin, external: true },
] as const;

export default function Contact() {
  return (
    <section className="contact" id="contato" aria-labelledby="contato-titulo">
      <div className="wrap contact__in">
        <div className="contact__main">
          <p className="eyebrow">Contato</p>
          <h2 id="contato-titulo" className="contact__title">
            Vamos
            <br />
            conversar?
          </h2>
          <p className="contact__lead">Tem uma vaga, uma ideia ou um projeto? Me escreve.</p>
        </div>

        <ul className="contact__list">
          {rows.map((row) => (
            <li key={row.label}>
              <a
                className="crow"
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span>
                  <span className="crow__label">{row.label}</span>
                  <span className="crow__value">{row.value}</span>
                </span>
                {row.external ? <ArrowUpRight className="crow__icon" /> : <ArrowRight className="crow__icon" />}
                {row.external && <span className="sr-only"> (abre em uma nova aba)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
