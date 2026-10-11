import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import SectionHead from "./SectionHead";

export default function Projects() {
  return (
    <section className="sec" id="projetos" aria-labelledby="projetos-titulo">
      <div className="wrap sec__in">
        <SectionHead eyebrow="Projetos" titleId="projetos-titulo" title="O que já saiu do forno">
          Os que estão no ar eu hospedo aqui no rwnanz.online, cada um na sua própria rota. Em cada
          projeto, a divisão entre as duas camadas.
        </SectionHead>

        <div className="cards">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
