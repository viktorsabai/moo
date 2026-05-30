"use client";

import { mooContacts } from "../data/contacts";
import { MooLogo } from "./MooLogo";

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
          <a href="#contact">Запуск</a>
        </nav>

        <a
          className="moo-site-cta"
          href={mooContacts.founder}
          rel="noopener noreferrer"
          target="_blank"
        >
          Начать
        </a>
      </div>
    </header>
  );
}
