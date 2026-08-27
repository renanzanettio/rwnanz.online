import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoutesBoard from "@/components/RoutesBoard";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <RoutesBoard />
        <CaseStudies />
        <About />
      </main>
      <Footer />
    </>
  );
}
