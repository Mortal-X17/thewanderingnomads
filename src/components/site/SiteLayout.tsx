import type { ReactNode } from "react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export function SiteLayout({
  children,
  extra,
  hideWhatsApp = false,
}: {
  children: ReactNode;
  extra?: ReactNode;
  hideWhatsApp?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-lg focus:bg-forest-solid focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-medium focus:text-white focus:shadow-lift"
      >
        Skip to content
      </a>
      <Nav />
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
      {extra}
      <Footer />
      {hideWhatsApp ? null : <FloatingWhatsApp />}
    </div>
  );
}
