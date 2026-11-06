"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import type { Locale } from "@/lib/locale";

/** Como o mascote se chama nas falas e no leitor de tela. */
const NAME = "Café Forte";

const dialogue = {
  "pt-BR": {
    label: `${NAME}, mascote do site. Ative para ele dizer algo.`,
    phrases: [`oi! eu sou o ${NAME}.`, "bora de café?", "front em cima, back embaixo.", "já viu os projetos?", "é só chamar."],
  },
  en: {
    label: `${NAME}, the site mascot. Activate to hear from him.`,
    phrases: [`hi! I’m ${NAME}.`, "coffee?", "front end on top, back end below.", "seen the projects yet?", "just say hi."],
  },
};

/**
 * Transforma o mascote do topo em um botão: ao clicar, ele pula e diz uma frase.
 * A imagem (children) continua sendo renderizada no servidor.
 */
export default function MascotButton({ children, locale }: { children: ReactNode; locale: Locale }) {
  const { label, phrases } = dialogue[locale];
  const [phrase, setPhrase] = useState({ text: "", n: 0 });
  const [show, setShow] = useState(false);
  const [hop, setHop] = useState(false);
  const next = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function talk() {
    const text = phrases[next.current % phrases.length];
    next.current += 1;
    setPhrase({ text, n: next.current });
    setShow(true);
    setHop(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(false), 2800);
  }

  return (
    <>
      <button
        type="button"
        className="mascot"
        data-hop={hop ? "true" : undefined}
        onClick={talk}
        onAnimationEnd={(e) => {
          if (e.animationName === "cf-hop") setHop(false);
        }}
        aria-label={label}
      >
        <span className="cf cf--bob">{children}</span>
      </button>
      <p className="bubble" data-show={show ? "true" : "false"} role="status" aria-live="polite">
        <span key={phrase.n}>{phrase.text}</span>
      </p>
    </>
  );
}
