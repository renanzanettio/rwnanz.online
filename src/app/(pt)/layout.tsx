import type { ReactNode } from "react";
import PortfolioDocument, { viewport } from "@/components/PortfolioDocument";
import { baseMetadata } from "@/lib/metadata";

export { viewport };
export const metadata = baseMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return <PortfolioDocument locale="pt-BR">{children}</PortfolioDocument>;
}
