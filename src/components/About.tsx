import { site } from "@/lib/site";

export default function About() {
  return (
    <section className="sec" id="sobre" aria-labelledby="sobre-titulo">
      <div className="wrap sec__in about">
        <div className="about__head">
          <p className="eyebrow">Sobre</p>
          <h2 id="sobre-titulo" className="sec-title">
            Renan
            <br />
            Zanetti
          </h2>
        </div>

        <div className="about__body">
          <p className="about__text reveal">{site.about.text}</p>

          <dl className="path">
            {site.about.path.map((step) => (
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
