import PortfolioHome from "@/components/PortfolioHome";
import PortfolioPage from "@/components/PortfolioPage";
import { portfolioMetadata } from "@/lib/metadata";

const locale = "pt-BR";
export const metadata = portfolioMetadata(locale, "home");

export default function Page() {
  return (
    <PortfolioPage locale={locale} page="home">
      <PortfolioHome locale={locale} />
    </PortfolioPage>
  );
}
