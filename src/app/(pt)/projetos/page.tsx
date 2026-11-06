import PortfolioPage from "@/components/PortfolioPage";
import ProjectCatalog from "@/components/ProjectCatalog";
import { portfolioMetadata } from "@/lib/metadata";

const locale = "pt-BR";
export const metadata = portfolioMetadata(locale, "projects");

export default function Page() {
  return (
    <PortfolioPage locale={locale} page="projects">
      <ProjectCatalog locale={locale} />
    </PortfolioPage>
  );
}
