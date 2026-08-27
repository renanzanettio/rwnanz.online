import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#topo"
          className="press flex items-center gap-2 font-mono text-sm tracking-tight text-ink"
          aria-label="rwnanz.online, ir para o topo"
        >
          <Image src="/logo.svg" alt="" width={32} height={28} priority />
          rwnanz.online
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-widest text-ink-soft sm:flex">
          <a href="#rotas" className="press underline-hover pb-1">
            Rotas
          </a>
          <a href="#projetos" className="press underline-hover pb-1">
            Projetos
          </a>
          <a href="#sobre" className="press underline-hover pb-1">
            Sobre
          </a>
          <a href="#contato" className="press underline-hover pb-1">
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
