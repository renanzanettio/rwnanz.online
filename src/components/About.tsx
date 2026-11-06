import { ui, type Locale } from "@/lib/locale";
import { siteCopy } from "@/lib/site";

export default function About({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  return (
    <section className="sec" id="sobre" aria-labelledby="sobre-titulo">
      <div className="wrap sec__in about">
        <div className="about__head">
          <p className="eyebrow">{ui[locale].about}</p>
          <h2 id="sobre-titulo" className="sec-title">
            Renan
            <br />
            Zanetti
          </h2>
        </div>

        <div className="about__body">
          <p className="about__text reveal">{copy.about}</p>

          <dl className="path">
            {copy.path.map((step) => (
              <div key={step.place} className="path__row reveal">
                <dt>{step.place}</dt>
                <dd>{step.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
