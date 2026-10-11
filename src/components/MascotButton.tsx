"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const PHRASES = [
  "oi! eu sou o Pingado.",
  "bora de café?",
  "front em cima, back embaixo.",
  "cuidado, tá quente!",
  "já viu os projetos?",
  "é só chamar.",
];

/**
 * Transforma o Pingado do hero em um botão: ao clicar, ele pula e diz uma frase.
 * O desenho em si (children) continua sendo renderizado no servidor.
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
          if (e.animationName === "pg-hop") setHop(false);
        }}
        aria-label="Pingado, o mascote do site: um copo de café com leite sorridente. Ative para ele dizer algo."
      >
        {children}
      </button>
      <p className="bubble" data-show={show ? "true" : "false"} role="status" aria-live="polite">
        <span key={phrase.n}>{phrase.text}</span>
      </p>
    </>
  );
}
