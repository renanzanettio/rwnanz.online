import Link from "next/link";
import { projectsPath, ui, type Locale } from "@/lib/locale";
import { projects } from "@/lib/projects";
import { siteCopy } from "@/lib/site";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "./Icons";
import SectionHead from "./SectionHead";
import styles from "./ProjectLayout.module.css";

export function ProjectList({ locale, featured = false }: { locale: Locale; featured?: boolean }) {
  const visible = featured ? projects.filter((project) => project.featured) : projects;
  return (
    <div className={styles.list}>
      {visible.map((project) => (
        <ProjectCard key={project.slug} project={project} locale={locale} titleLevel={featured ? 3 : 2} />
      ))}
    </div>
  );
}

export default function Projects({ locale }: { locale: Locale }) {
  const text = ui[locale];
  const copy = siteCopy[locale];
  return (
    <section className="sec" id="projetos" aria-labelledby="projetos-titulo">
      <div className="wrap sec__in">
        <SectionHead eyebrow={text.projects} titleId="projetos-titulo" title={copy.projectsTitle}>
          {copy.projectsIntro}
        </SectionHead>
        <ProjectList locale={locale} featured />
        <Link className={`lnk ${styles.allLink}`} href={projectsPath(locale)}>{text.allProjects} <ArrowRight /></Link>
      </div>
    </section>
  );
}
