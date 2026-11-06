import type { ComponentProps, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function PortfolioPage({
  children,
  ...header
}: ComponentProps<typeof Header> & { children: ReactNode }) {
  return (
    <div id="topo" className={header.page === "home" ? "portfolio-home" : undefined}>
      <Header {...header} />
      {children}
      <Footer />
    </div>
  );
}
