import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Layers from "@/components/Layers";
import Projects from "@/components/Projects";
import { site } from "@/lib/site";

// Dados estruturados (ajudam o Google a entender quem é a pessoa por trás do site)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: "RWZ",
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Desenvolvedor júnior",
  description: site.description,
  knowsAbout: ["Desenvolvimento web", "Desenvolvimento mobile", "Visão computacional"],
  sameAs: [site.github, site.linkedin],
};

export default function Home() {
  return (
    <>
      <Intro />

      <div id="topo">
        <Header />
        <main id="conteudo" tabIndex={-1}>
          <Hero />
          <Projects />
          <Layers />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>

      <script
        type="application/ld+json"
        // o replace evita que um "</script>" dentro dos textos feche a tag por engano
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
