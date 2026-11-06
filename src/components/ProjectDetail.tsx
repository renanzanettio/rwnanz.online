import Image from "next/image";
import Link from "next/link";
import { projectsPath, ui, type Locale } from "@/lib/locale";
import type { Project } from "@/lib/projects";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";
import { ProjectMeta } from "./ProjectCard";
import ProjectShowcase from "./ProjectShowcase";
import styles from "./ProjectLayout.module.css";

type Chapter = { id: string; number: string; label: string };
type Action = { href: string; label: string };

function ChapterLabel({ chapter }: { chapter: Chapter }) {
  return (
    <p className={styles.chapterLabel}>
      <span aria-hidden="true">{chapter.number}</span>
      {chapter.label}
    </p>
  );
}

function ProjectLink({ action, locale, className }: { action: Action; locale: Locale; className: string }) {
  const external = !action.href.startsWith("#");
  return (
    <a
      className={className}
      href={action.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {action.label} {external ? <ArrowUpRight /> : <ArrowDown />}
      {external && <span className="sr-only">{ui[locale].newTab}</span>}
    </a>
  );
}

export default function ProjectDetail({ project, locale }: { project: Project; locale: Locale }) {
  const text = ui[locale];
  const copy = project.copy[locale];
  const technical = [
    { title: text.projectRole, body: copy.contribution },
    { title: text.projectDecisions, body: copy.decisions },
    { title: text.projectLessons, body: copy.lessons },
  ].filter(({ body }) => body);
  const images = project.images ?? [];
  const [featured, companion] = images.filter((image) => image.preview);
  const cover = project.heroImage ?? featured ?? images[0];
  const coverCompanion = !project.heroImage && cover?.platform === "web" && companion?.platform === "mobile"
    ? companion
    : undefined;
  const videoId = /^[\w-]{11}$/.test(project.youtubeId ?? "") ? project.youtubeId : undefined;
  const video = videoId ? { id: videoId, url: `https://www.youtube.com/watch?v=${videoId}` } : undefined;
  const hasDemo = images.length > 0 || !!video;
  const hasTechnical = project.tech.length > 0 || technical.length > 0;
  const externalLinks: Action[] = [];
  if (project.siteUrl) externalLinks.push({ href: project.siteUrl, label: text.projectSite });
  if (video) externalLinks.push({ href: video.url, label: text.projectWatch });
  if (project.repoUrl) {
    externalLinks.push({
      href: project.repoUrl,
      label: project.organization ? text.organization : text.projectCode,
    });
  }
  const hasBuild = hasTechnical || externalLinks.length > 0;
  const heroLinks = [...externalLinks];
  if (hasDemo) {
    heroLinks.splice(project.siteUrl ? 1 : 0, 0, { href: "#demo", label: text.projectDemoAction });
  }

  const intro = { id: "apresentacao", number: "01", label: text.projectIntro };
  const idea = { id: "ideia", number: "02", label: text.projectIdea };
  const demo = { id: "demo", number: "03", label: text.projectInUse };
  const build = { id: "bastidores", number: hasDemo ? "04" : "03", label: hasTechnical ? text.projectBuild : text.projectAccess };
  const chapters: Chapter[] = [intro, idea];
  if (hasDemo) chapters.push(demo);
  if (hasBuild) chapters.push(build);

  return (
    <main id="conteudo" className={`sec ${styles.detail}`} tabIndex={-1}>
      <article className={`wrap ${styles.detailInner}`}>
        <div className={styles.masthead}>
          <Link className={styles.back} href={projectsPath(locale)}>
            <ArrowRight /> {text.allProjects}
          </Link>
          <span className={styles.notebook}>{text.projectNotebook}</span>
        </div>

        <header id={intro.id} className={cover ? `${styles.intro} ${styles.introWithCover}` : styles.intro}>
          <div className={styles.introCopy}>
            <ChapterLabel chapter={intro} />
            <h1 className="sec-title">{project.name}</h1>
            <p className={styles.introSummary}>{copy.heroSummary ?? copy.summary}</p>
            <ProjectMeta project={project} locale={locale} />
            {heroLinks.length > 0 && (
              <div className={styles.heroActions}>
                {heroLinks.slice(0, 2).map((action, index) => (
                  <ProjectLink
                    key={action.href}
                    action={action}
                    locale={locale}
                    className={index === 0 ? "btn pri" : "lnk"}
                  />
                ))}
              </div>
            )}
          </div>

          {cover && (
            <figure className={styles.cover}>
              <div className={project.heroImage ? styles.coverArt : styles.coverStage}>
                <div className={cover.platform === "web" ? styles.coverBrowser : cover.platform === "mobile" ? styles.coverPhone : undefined}>
                  <Image
                    src={cover.src}
                    width={cover.width}
                    height={cover.height}
                    sizes={cover.platform === "mobile" ? "220px" : "(min-width: 820px) 680px, 92vw"}
                    alt={cover.alt[locale]}
                    fetchPriority="high"
                    loading="eager"
                  />
                </div>
                {coverCompanion && (
                  <div className={styles.coverCompanion}>
                    <Image
                      src={coverCompanion.src}
                      width={coverCompanion.width}
                      height={coverCompanion.height}
                      sizes="140px"
                      alt={coverCompanion.alt[locale]}
                    />
                  </div>
                )}
              </div>
              {cover.caption && <figcaption>{cover.caption[locale]}</figcaption>}
            </figure>
          )}
        </header>

        <nav className={styles.chapterNav} aria-label={text.projectChapters}>
          <ol role="list">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`}><span aria-hidden="true">{chapter.number}</span>{chapter.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section className={styles.idea} id={idea.id} aria-labelledby="idea-title">
          <div>
            <ChapterLabel chapter={idea} />
            <h2 className={styles.chapterTitle} id="idea-title">{copy.contextTitle ?? text.projectContext}</h2>
          </div>
          <div className={styles.ideaCopy}>
            <p>{copy.context}</p>
            <p>{copy.solution}</p>
          </div>
        </section>

        {hasDemo && (
          <section className={styles.demo} id={demo.id} aria-labelledby="demo-title">
            <ChapterLabel chapter={demo} />
            <h2 className={styles.chapterTitle} id="demo-title">{copy.demoTitle ?? text.projectDemo}</h2>
            <ProjectShowcase images={images} video={video} name={project.name} locale={locale} />
          </section>
        )}

        {hasBuild && (
          <section className={styles.build} id={build.id} aria-labelledby="build-title">
            <div>
              <ChapterLabel chapter={build} />
              <h2 className={styles.chapterTitle} id="build-title">{hasTechnical ? text.projectStory : text.projectAccess}</h2>
              {technical.map(({ title, body }) => (
                <div className={styles.buildNote} key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
              {project.tech.length > 0 && (
                <ul className={styles.technology} aria-label={text.projectTech} role="list">
                  {project.tech.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </div>
            {externalLinks.length > 0 && (
              <div className={styles.ticket}>
                {hasTechnical && <h3>{text.projectAccess}</h3>}
                <ul role="list">
                  {externalLinks.map((action) => (
                    <li key={action.href}><ProjectLink action={action} locale={locale} className={styles.ticketLink} /></li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </article>
    </main>
  );
}
