import { ui, type Locale } from "@/lib/locale";
import { siteCopy, skills } from "@/lib/site";
import SectionHead from "./SectionHead";

/** Uma faixa da seção: o front-end (leite, em cima) ou o back-end (café, embaixo). */
function Layer({
  tone,
  name,
  hint,
  intro,
  skills,
}: {
  tone: "front" | "back";
  name: string;
  hint: string;
  intro: string;
  skills: readonly string[];
}) {
  return (
    <div className={`layer layer--${tone}`}>
      <div className="layer__head">
        <h3 className="layer__name">{name}</h3>
        <p className="layer__hint">{hint}</p>
      </div>
      <div className="layer__body">
        <p className="layer__text">{intro}</p>
        <ul className="chips">
          {skills.map((skill) => (
            <li key={skill} className="chip">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Layers({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  return (
    <section className="sec sec--surf" id="camadas" aria-labelledby="camadas-titulo">
      <div className="wrap sec__in">
        <SectionHead eyebrow={ui[locale].layers} titleId="camadas-titulo" title={copy.layersTitle}>
          {copy.layersIntro}
        </SectionHead>

        <div className="layers reveal">
          <Layer tone="front" name="Front-end" hint={copy.frontHint} intro={copy.frontIntro} skills={skills.front} />
          {/* a linha de caramelo entre o leite e o café */}
          <svg className="layers__wave" viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              className="layers__wave-fill"
              d="M0 18C100 4 200 32 300 18S500 4 600 18S800 32 900 18S1100 4 1200 18L1200 36L0 36Z"
            />
            <path
              className="layers__wave-line"
              d="M0 18C100 4 200 32 300 18S500 4 600 18S800 32 900 18S1100 4 1200 18"
            />
          </svg>
          <Layer tone="back" name="Back-end" hint={copy.backHint} intro={copy.backIntro} skills={skills.back} />
        </div>
      </div>
    </section>
  );
}
