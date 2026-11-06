import { ui, type Locale } from "@/lib/locale";
import { siteCopy } from "@/lib/site";
import { ProjectList } from "./Projects";

export default function ProjectCatalog({ locale }: { locale: Locale }) {
  return (
    <main id="conteudo" className="sec" tabIndex={-1}>
      <div className="wrap sec__in">
        <div className="project-heading">
          <h1 className="sec-title">{ui[locale].projects}</h1>
          <p className="sec-lead">{siteCopy[locale].catalogIntro}</p>
        </div>
        <ProjectList locale={locale} />
      </div>
    </main>
  );
}
