import RouteMap from "./RouteMap";

export default function Hero() {
  return (
    <section id="topo" className="mx-auto max-w-5xl px-6 pt-14 pb-20 sm:px-8 sm:pt-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-route-teal-deep">
        Hub pessoal · rwnanz.online
      </p>

      <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.08] text-ink sm:text-6xl">
        Um endereço.
        <br />
        <span className="italic text-route-teal-deep">Vários destinos.</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        Sou Renan Zanetti. Este é o painel central dos projetos que eu construo
        e hospedo — cada um com a sua própria rota, todos partindo daqui.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 font-mono text-sm">
        <a
          href="#rotas"
          className="press rounded-full bg-ink px-6 py-3 text-paper transition hover:bg-route-teal-deep"
        >
          Ver todas as rotas ↓
        </a>
        <a
          href="#sobre"
          className="press rounded-full border border-line px-6 py-3 text-ink transition hover:border-route-teal hover:text-route-teal-deep"
        >
          Sobre mim
        </a>
      </div>

      <div className="mt-16 flex justify-center sm:mt-20 sm:justify-start">
        <RouteMap />
      </div>
    </section>
  );
}
