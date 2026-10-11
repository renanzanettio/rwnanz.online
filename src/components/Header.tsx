"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import Logo from "./Logo";

/**
 * Cabeçalho fixo no topo. No celular o menu vira um painel que abre pelo botão (hambúrguer).
 * Sem JavaScript, os links aparecem em linha normalmente.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // fecha com Esc (devolvendo o foco ao botão) e ao tocar fora do cabeçalho
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // ao girar o celular / alargar a janela, o painel não faz mais sentido
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 760px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="hdr" ref={root}>
      <div className="wrap hdr__bar">
        <a className="brand" href="#topo" aria-label={`${site.domain}, voltar ao topo`} onClick={close}>
          <Logo className="brand__logo" />
          <span className="brand__name">
            rwnanz<span>.online</span>
          </span>
        </a>

        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className="nav-toggle__bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <nav id="menu" className={open ? "nav is-open" : "nav"} aria-label="Principal">
          <ul className="nav__list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn ghost nav__cta" href="#contato" onClick={close}>
            Falar comigo
          </a>
        </nav>

        <a className="btn ghost hdr__cta" href="#contato">
          Falar comigo
        </a>
      </div>
    </header>
  );
}
