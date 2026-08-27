export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl text-ink">Bora conversar?</p>
          <p className="mt-2 font-mono text-sm text-ink-soft">
            <a href="mailto:renanzanettio@gmail.com" className="underline-hover pb-0.5">
              renanzanettio@gmail.com
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/renanzanettio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-hover pb-0.5"
            >
              github.com/renanzanettio
            </a>{" "}
            ·{" "}
            <a
              href="https://www.linkedin.com/in/renan-zanetti/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-hover pb-0.5"
            >
              linkedin.com/in/renan-zanetti
            </a>
          </p>
        </div>
        <p className="max-w-xs text-right font-mono text-xs italic text-ink-soft">
          rota nova sempre que eu terminar algo que valha a pena mostrar.
          <br />
          © {year} rwnanz.online
        </p>
      </div>
    </footer>
  );
}
