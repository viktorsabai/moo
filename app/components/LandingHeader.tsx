"use client";

import { MooLogo } from "./MooLogo";
import { LandingScrollProgress } from "./LandingScrollProgress";
import { MooCtaGroup } from "./MooCtaGroup";

export function LandingHeader() {
  return (
    <header className="moo-site-header">
      <div className="moo-site-header-inner">
        <a className="moo-logo-link" href="#top">
          <MooLogo size={30} withWordmark />
        </a>

        <nav aria-label="Навигация" className="moo-site-nav">
          <a href="#demo">Демо</a>
          <a href="#calc">Экономия</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Запуск</a>
        </nav>

        <MooCtaGroup variant="header" />
      </div>
      <LandingScrollProgress />
    </header>
  );
}
