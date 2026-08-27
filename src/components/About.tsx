import Image from "next/image";

const skills = [
  "JavaScript",
  "React",
  "React Native",
  "Next.js",
  "PHP",
  "Python",
  "Java",
  "C#",
  "MySQL",
  "MongoDB",
];

export default function About() {
  return (
    <section id="sobre" className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:gap-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-route-teal-deep">
          Sobre
        </p>
        <div className="max-w-xl">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            Renan Zanetti.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Estudante de Desenvolvimento de Software Multiplataformas na
            Fatec de Registro, técnico em Desenvolvimento de Sistemas pela
            Etec de Registro. Já passei por suporte de TI e infraestrutura
            (PRODESP/Stefanini) e hoje foco em projetos de desenvolvimento
            web, mobile e visão computacional — em busca de uma posição como
            desenvolvedor júnior.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-8 font-mono text-sm text-ink-soft">
            Baseado no Brasil. Disponível para novos projetos.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <Image src="/logo.svg" alt="" width={40} height={35} />
            <span className="font-display italic text-lg text-ink-soft">
              — Renan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
