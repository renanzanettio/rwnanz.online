import PortfolioPage from "@/components/PortfolioPage";
import ProjectDetail from "@/components/ProjectDetail";
import { portfolioMetadata } from "@/lib/metadata";
import { getProject, projectSlugs } from "@/lib/projects";

const locale = "pt-BR";
type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = projectSlugs;

export async function generateMetadata({ params }: Props) {
  const project = getProject((await params).slug);
  return portfolioMetadata(locale, "detail", project);
}

export default async function Page({ params }: Props) {
  const project = getProject((await params).slug);
  return (
    <PortfolioPage locale={locale} page="detail" slug={project.slug}>
      <ProjectDetail project={project} locale={locale} />
    </PortfolioPage>
  );
}
