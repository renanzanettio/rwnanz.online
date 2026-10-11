import Image from "next/image";
import { statusMeta, type Project } from "@/lib/projects";
import { ArrowUpRight } from "./Icons";

const NEW_TAB = <span className="sr-only"> (abre em uma nova aba)</span>;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { label, tone } = statusMeta[project.status];
  const cover = project.images?.[0];
  const titleId = `projeto-${project.slug}`;
  const repoText = project.repoLabel ? `${project.repoLabel} no GitHub` : "Repositório";

  return (
    <article className="card reveal" aria-labelledby={titleId}>
      <div className="card__top">
        <span className="card__num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="status">
          <i className={`dot dot--${tone}`} aria-hidden="true" />
          {label}
        </span>
      </div>

      {cover && (
        <div className="card__cover">
          <Image
            src={cover}
            alt={`Captura de tela do projeto ${project.name}`}
            fill
            sizes="(min-width: 1100px) 600px, 100vw"
          />
        </div>
      )}

      <h3 id={titleId} className="card__title">
        {project.name}
      </h3>
      <p className="card__sum">{project.summary}</p>
      <p className="card__desc">{project.description}</p>

      {/* a divisão em camadas: leite (front) em cima, café (back) embaixo */}
      <div className="stack">
        <p className="stack__row stack__row--front">
          <span className="stack__tag">Front</span>
          <span>{project.front.join(" · ")}</span>
        </p>
        <span className="stack__line" aria-hidden="true" />
        <p className="stack__row stack__row--back">
          <span className="stack__tag">Back</span>
          <span>{project.back.join(" · ")}</span>
        </p>
      </div>

      {project.siteUrl || project.repoUrl ? (
        <div className="card__actions">
          {project.siteUrl && (
            <a className="btn pri" href={project.siteUrl} target="_blank" rel="noopener noreferrer">
              Abrir projeto
              <ArrowUpRight />
              {NEW_TAB}
            </a>
          )}
          {project.repoUrl &&
            (project.siteUrl ? (
              <a className="lnk" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                {repoText}
                <ArrowUpRight />
                {NEW_TAB}
              </a>
            ) : (
              <a className="btn ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Ver no GitHub
                <ArrowUpRight />
                {NEW_TAB}
              </a>
            ))}
        </div>
      ) : (
        <p className="card__soon">Ainda sem link público.</p>
      )}
    </article>
  );
}
