import type { Metadata } from "next";
import { homePath, projectsPath, ui, type Locale } from "./locale";
import type { Project } from "./projects";
import { site, siteCopy } from "./site";

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.domain,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  icons: { icon: ["/favicon.ico", "/icon.svg"], apple: "/apple-icon.png" },
  formatDetection: { telephone: false, email: false, address: false },
};

type PageKind = "home" | "projects" | "detail";

export function pageAlternates(kind: PageKind, project?: Project) {
  const path = (locale: Locale) => kind === "home" ? homePath(locale) : projectsPath(locale, project?.slug);
  const portuguese = new URL(path("pt-BR"), site.url).href;
  return {
    "pt-BR": portuguese,
    en: new URL(path("en"), site.url).href,
    "x-default": portuguese,
  };
}

export function portfolioMetadata(locale: Locale, kind: PageKind, project?: Project): Metadata {
  const copy = siteCopy[locale];
  const title = kind === "home" ? copy.title : `${project?.name ?? ui[locale].projects} — ${site.name}`;
  const description = kind === "home" ? copy.description : project?.copy[locale].summary ?? copy.catalogIntro;
  const languages = pageAlternates(kind, project);
  const url = languages[locale];
  const image = {
    url: project?.images?.[0]?.src ?? "/opengraph-image.png",
    alt: project?.images?.[0]?.alt[locale] ?? `${site.name} · ${site.domain}`,
  };

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      url,
      siteName: site.domain,
      locale: locale === "pt-BR" ? "pt_BR" : "en",
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
