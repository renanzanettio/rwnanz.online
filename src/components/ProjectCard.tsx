import Image from "next/image";
import Link from "next/link";
import { projectsPath, ui, type Locale } from "@/lib/locale";
import { projectCategories, projectStatuses, type Project } from "@/lib/projects";
import { ArrowRight, ArrowUpRight } from "./Icons";
import styles from "./ProjectLayout.module.css";

export function ProjectMeta({ project, locale }: { project: Project; locale: Locale }) {
  const status = projectStatuses[project.status];
  return (
    <div className={styles.meta}>
      <p className={styles.category}>{projectCategories[project.category][locale]}</p>
      <span className={styles.status}>
        <i className={`dot dot--${status.tone}`} aria-hidden="true" />
        {status.label[locale]}
      </span>
    </div>
  );
}

export default function ProjectCard({
  project,
  locale,
  titleLevel,
}: {
  project: Project;
  locale: Locale;
  titleLevel: 2 | 3;
}) {
  const Title = titleLevel === 2 ? "h2" : "h3";
  const titleId = `projeto-${project.slug}`;
  const text = ui[locale];

  return (
    <article className={project.logo ? `${styles.card} ${styles.cardWithLogo}` : styles.card} aria-labelledby={titleId}>
      {project.logo && (
        <div className={styles.cardLogo}>
          <Image src={project.logo} alt="" width={80} height={80} unoptimized />
        </div>
      )}
      <div className={styles.cardContent}>
        <ProjectMeta project={project} locale={locale} />
        <Title id={titleId} className={styles.cardTitle}>{project.name}</Title>
        <p className={styles.cardSummary}>{project.copy[locale].summary}</p>
      </div>
      <div className={styles.actions}>
        <Link className="btn ghost" href={projectsPath(locale, project.slug)} aria-describedby={titleId}>
          {text.projectAction} <ArrowRight />
        </Link>
        {project.siteUrl && (
          <a
            className="lnk"
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby={titleId}
          >
            {text.projectSite} <ArrowUpRight />
            <span className="sr-only">{text.newTab}</span>
          </a>
        )}
      </div>
    </article>
  );
}
