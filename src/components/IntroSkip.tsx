"use client";

import { useEffect } from "react";

/**
 * Não desenha nada. Só cuida de três coisas da abertura (<Intro />):
 *  - deixar a pessoa pular (toque/clique, Esc, Enter ou Espaço);
 *  - soltar o bloqueio de rolagem quando a logo decola e a folha escura começa a sumir
 *    (e marcar o fim quando ela termina);
 *  - medir onde fica a logo do cabeçalho, para a logo da abertura voar e pousar exatamente em cima dela.
 * A abertura em si é feita só com CSS, então ela termina sozinha mesmo se este código não rodar
 * (o CSS tem uma estimativa do lugar da logo, e o script do <head> solta a rolagem depois de 5 s).
 */
export default function IntroSkip() {
  useEffect(() => {
    const root = document.documentElement;
    const overlay = document.querySelector<HTMLElement>(".intro");
    const panel = overlay?.querySelector<HTMLElement>(".intro__panel");
    const fly = overlay?.querySelector<HTMLElement>(".intro__fly");
    if (!overlay || !panel || root.getAttribute("data-intro") !== "play") return;

    let hideTimer: number | undefined;

    /** Diz ao CSS (--fx, --fy, --fs) quanto a logo da abertura precisa andar e encolher para cobrir a do cabeçalho. */
    const aim = () => {
      const mark = document.querySelector<HTMLElement>(".brand__logo");
      if (!fly || !mark) return;
      const to = mark.getBoundingClientRect();
      // a logo da abertura fica sempre no centro da abertura (que cobre a tela toda) e o tamanho dela
      // vem do CSS: nenhuma das duas medidas é afetada pelo voo, então valem mesmo se a janela mudar de tamanho durante ele
      const from = overlay.getBoundingClientRect();
      const w = parseFloat(getComputedStyle(fly).width);
      if (!to.width || !w) return;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      overlay.style.setProperty("--fx", `${dx.toFixed(2)}px`);
      overlay.style.setProperty("--fy", `${dy.toFixed(2)}px`);
      overlay.style.setProperty("--fs", (to.width / w).toFixed(4));
    };

    const finish = () => {
      root.removeAttribute("data-lock");
      root.setAttribute("data-intro", "done");
    };
    const stopListening = () => {
      overlay.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", aim);
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
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        // sem isto o Espaço também rolaria a página para baixo assim que a abertura fosse pulada
        if (e.key === " ") e.preventDefault();
        skip();
      }
    }
    function onStart(e: Event) {
      // a logo decolou: a página já pode rolar (a faixa da barra de rolagem vira a barra de verdade)
      if ((e as AnimationEvent).animationName === "intro-leave") root.removeAttribute("data-lock");
    }
    function onEnd(e: Event) {
      if ((e as AnimationEvent).animationName === "intro-leave") {
        stopListening();
        finish();
      }
    }

    if (getComputedStyle(overlay).visibility === "hidden") {
      finish();
      return;
    }
    aim();
    overlay.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", aim);
    panel.addEventListener("animationstart", onStart);
    panel.addEventListener("animationend", onEnd);

    return () => {
      stopListening();
      window.clearTimeout(hideTimer);
    };
  }, []);

  return null;
}
