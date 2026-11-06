"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { homePath, locales, projectsPath, ui, type Locale } from "@/lib/locale";
import { site } from "@/lib/site";
import Logo from "./Logo";

/**
 * Cabeçalho fixo no topo. No celular o menu vira um painel que abre pelo botão (hambúrguer).
 * Sem JavaScript, os links aparecem em linha normalmente.
 */
export default function Header({
  locale,
  page,
  slug,
}: {
  locale: Locale;
  page: "home" | "projects" | "detail";
  slug?: string;
}) {
  const text = ui[locale];
  const home = homePath(locale);
  const onHome = page === "home";
  const homeSection = (hash: string) => `${onHome ? "" : home}#${hash}`;
  const nav = [
    { href: onHome ? "#projetos" : projectsPath(locale), label: text.projects },
    { href: homeSection("camadas"), label: text.layers },
    { href: homeSection("sobre"), label: text.about },
    { href: homeSection("contato"), label: text.contact },
  ];
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
        <Link className="brand" href={onHome ? "#topo" : home} aria-label={`${site.domain} · ${text.homeAction}`} onClick={close}>
          <Logo className="brand__logo" />
          <span className="brand__name">
            rwnanz<span>.online</span>
          </span>
        </Link>

        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? text.menuClose : text.menuOpen}</span>
          <span className="nav-toggle__bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <nav id="menu" className={open ? "nav is-open" : "nav"} aria-label={text.menu}>
          <ul className="nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hdr__tools">
          <nav className="lang" aria-label={text.language}>
            {locales.map((language) => {
              const label = language === "pt-BR" ? "Português" : "English";
              const shortLabel = language === "pt-BR" ? "PT" : "EN";
              const href = page === "projects" || page === "detail"
                ? projectsPath(language, slug)
                : homePath(language);
              return language === locale ? (
                <span key={language} lang={language} aria-current="true" aria-label={label}>{shortLabel}</span>
              ) : (
                <a key={language} href={href} lang={language} hrefLang={language} aria-label={label}>{shortLabel}</a>
              );
            })}
          </nav>
          <Link className="btn ghost hdr__cta" href={homeSection("contato")}>
            {text.contactAction}
          </Link>
        </div>
      </div>
    </header>
  );
}
