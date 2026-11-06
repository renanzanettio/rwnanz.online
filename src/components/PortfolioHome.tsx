import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Layers from "./Layers";
import Projects from "./Projects";
import { homePath, type Locale } from "@/lib/locale";
import { site, siteCopy } from "@/lib/site";

export default function PortfolioHome({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: "RWZ",
    url: new URL(homePath(locale), site.url),
    email: `mailto:${site.email}`,
    jobTitle: copy.role,
    description: copy.description,
    knowsAbout: copy.focus,
    sameAs: [site.github, site.linkedin],
  };

  return (
    <>
      <main id="conteudo" tabIndex={-1}>
        <Hero locale={locale} />
        <Projects locale={locale} />
        <Layers locale={locale} />
        <About locale={locale} />
        <Contact locale={locale} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
