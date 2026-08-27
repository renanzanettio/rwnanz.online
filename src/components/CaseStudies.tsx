import { projects, statusMeta } from "@/lib/projects";

export default function CaseStudies() {
  return (
    <section id="projetos" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Projetos
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            {projects.length} estudos de caso
          </p>
        </div>
        <p className="mt-4 max-w-xl text-ink-soft">
          Com hospedagem ou não, esses são os projetos que valem uma olhada
          mais de perto.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {projects.map((p, i) => {
            const meta = statusMeta[p.status];
            return (
              <article
                key={p.slug}
                className="flex flex-col rounded-2xl border border-line bg-paper-raised p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                    <span aria-hidden className={`h-2 w-2 rounded-full ${meta.dot}`} />
                    <span className={meta.text}>{meta.label}</span>
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl text-ink">{p.name}</h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Slot de mídia — adicione imagens/arquivos do projeto quando tiver. */}
                {p.images.length === 0 ? (
                  <div className="mt-5 flex min-h-24 items-center justify-center rounded-xl border border-dashed border-line/80 px-4 text-center font-mono text-[11px] uppercase tracking-widest text-ink-soft/70">
                    Espaço para imagens — adicione depois
                  </div>
                ) : (
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {p.images.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt={`Captura de tela de ${p.name}`}
                        className="aspect-square w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press underline-hover pb-1 text-ink"
                    >
                      {p.repoLabel ?? "Repositório"} ↗
                    </a>
                  )}
                  {p.siteUrl ? (
                    <a
                      href={p.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press underline-hover pb-1 text-route-teal-deep"
                    >
                      Acessar site ↗
                    </a>
                  ) : (
                    <span className="text-ink-soft/60">Sem site público</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
