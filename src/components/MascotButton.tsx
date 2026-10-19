"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Como o mascote se chama nas falas e no leitor de tela. */
const NAME = "Café Forte";

const PHRASES = [
  `oi! eu sou o ${NAME}.`,
  "bora de café?",
  "front em cima, back embaixo.",
  "forte por dentro, caprichado por fora.",
  "já viu os projetos?",
  "é só chamar.",
];

/**
 * Transforma o mascote do topo em um botão: ao clicar, ele pula e diz uma frase.
 * A imagem (children) continua sendo renderizada no servidor.
 */
export default function MascotButton({ children }: { children: ReactNode }) {
  const [phrase, setPhrase] = useState({ text: "", n: 0 });
  const [show, setShow] = useState(false);
  const [hop, setHop] = useState(false);
  const next = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function talk() {
    const text = PHRASES[next.current % PHRASES.length];
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
        aria-label={`${NAME}, o mascote do site: um copo de café forte com leite, sorrindo e mostrando os músculos. Ative para ele dizer algo.`}
      >
        <span className="cf cf--bob">{children}</span>
      </button>
      <p className="bubble" data-show={show ? "true" : "false"} role="status" aria-live="polite">
        <span key={phrase.n}>{phrase.text}</span>
      </p>
    </>
  );
}
