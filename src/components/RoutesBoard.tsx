import { projects, statusMeta } from "@/lib/projects";

export default function RoutesBoard() {
  const routed = projects.filter((p) => p.route);

  return (
    <section id="rotas" className="border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Painel de rotas
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            {routed.length} destinos no ar
          </p>
        </div>

        <div className="mt-10 border-t border-line">
          {routed.map((p, i) => {
            const meta = statusMeta[p.status];
            return (
              <a
                key={p.slug}
                href={p.siteUrl ?? "#"}
                target={p.siteUrl ? "_blank" : undefined}
                rel={p.siteUrl ? "noopener noreferrer" : undefined}
                className="press group grid grid-cols-[3rem_1fr_auto] items-center gap-4 rounded-lg border-b border-line py-6 pr-4 transition hover:bg-paper sm:grid-cols-[4rem_1fr_9rem_auto] sm:gap-6 sm:pr-6"
              >
                <span className="font-mono text-sm text-ink-soft">
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-xl text-ink group-hover:text-route-teal-deep sm:text-2xl">
                    {p.name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-ink-soft sm:whitespace-normal">
                    {p.summary}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-widest text-ink-soft/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="hidden font-mono text-xs uppercase tracking-widest sm:flex sm:items-center sm:gap-2">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${meta.dot}`} />
                  <span className={meta.text}>{meta.label}</span>
                </span>

                <span
                  aria-hidden
                  className="justify-self-end pl-2 font-mono text-lg text-ink-soft transition group-hover:translate-x-1 group-hover:text-route-teal-deep"
                >
                  →
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-xs text-ink-soft">
          Quer ver o resto — inclusive o que não está hospedado?{" "}
          <a href="#projetos" className="underline-hover pb-0.5 text-ink">
            Confira o painel de projetos
          </a>
          .
        </p>
      </div>
    </section>
  );
}
