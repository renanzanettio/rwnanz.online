import { ui, type Locale } from "@/lib/locale";
import { site, siteCopy } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./Icons";

const rows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "GitHub", value: site.githubLabel, href: site.github, external: true },
  { label: "LinkedIn", value: site.linkedinLabel, href: site.linkedin, external: true },
] as const;

export default function Contact({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  return (
    <section className="contact" id="contato" aria-labelledby="contato-titulo">
      <div className="wrap contact__in">
        <div className="contact__main">
          <p className="eyebrow">{ui[locale].contact}</p>
          <h2 id="contato-titulo" className="contact__title">
            {copy.contactTitle[0]}
            <br />
            {copy.contactTitle[1]}
          </h2>
          <p className="contact__lead">{copy.contactLead}</p>
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
                {row.external && <span className="sr-only">{ui[locale].newTab}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
