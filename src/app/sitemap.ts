import type { MetadataRoute } from "next";
import { locales } from "@/lib/locale";
import { pageAlternates } from "@/lib/metadata";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    pageAlternates("home"),
    pageAlternates("projects"),
    ...projects.map((project) => pageAlternates("detail", project)),
  ];

  return pages.flatMap((languages) =>
    locales.map((locale) => ({
      url: languages[locale],
      alternates: { languages },
    })),
  );
}
