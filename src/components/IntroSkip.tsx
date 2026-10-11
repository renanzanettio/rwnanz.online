"use client";

import { useEffect } from "react";

/**
 * Não desenha nada. Só cuida de duas coisas da abertura (<Intro />):
 *  - deixar a pessoa pular (toque/clique, Esc, Enter ou Espaço);
 *  - soltar o bloqueio de rolagem quando a folha começa a subir (e marcar o fim quando ela termina).
 * A abertura em si é feita só com CSS, então ela termina sozinha mesmo se este código não rodar
 * (e o script do <head> solta a rolagem depois de 5 s de qualquer jeito).
 */
export default function IntroSkip() {
  useEffect(() => {
    const root = document.documentElement;
    const overlay = document.querySelector<HTMLElement>(".intro");
    const panel = overlay?.querySelector<HTMLElement>(".intro__panel");
    if (!overlay || !panel || root.getAttribute("data-intro") !== "play") return;

    let hideTimer: number | undefined;

    const finish = () => {
      root.removeAttribute("data-lock");
      root.setAttribute("data-intro", "done");
    };
    const stopListening = () => {
      overlay.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
      panel.removeEventListener("animationstart", onStart);
      panel.removeEventListener("animationend", onEnd);
    };
    function skip() {
      stopListening();
      // a hidratação pode chegar depois do fim da abertura: nesse caso só limpa
      if (getComputedStyle(overlay!).visibility === "hidden") return finish();
      root.removeAttribute("data-lock");
      root.setAttribute("data-intro", "skipping");
      hideTimer = window.setTimeout(finish, 450);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    }
    function onStart(e: Event) {
      // a folha começou a subir: a página já pode rolar (a faixa da barra de rolagem vira a barra de verdade)
      if ((e as AnimationEvent).animationName === "intro-lift") root.removeAttribute("data-lock");
    }
    function onEnd(e: Event) {
      if ((e as AnimationEvent).animationName === "intro-lift") {
        stopListening();
        finish();
      }
    }

    if (getComputedStyle(overlay).visibility === "hidden") {
      finish();
      return;
    }
    overlay.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);
    panel.addEventListener("animationstart", onStart);
    panel.addEventListener("animationend", onEnd);

    return () => {
      stopListening();
      window.clearTimeout(hideTimer);
    };
  }, []);

  return null;
}
