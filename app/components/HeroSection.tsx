"use client";

import type { CSSProperties } from "react";

import { useScrollReveal } from "../hooks/useScrollReveal";
import { MooCtaGroup } from "./MooCtaGroup";

export function HeroSection() {
  const { ref, sectionClass } = useScrollReveal<HTMLElement>(0.35);

  return (
    <section
      aria-labelledby="hero-title"
      className={`moo-hero-section moo-scroll-section${sectionClass}`}
      id="top"
      ref={ref}
    >
      <span
        className="moo-hero-kicker moo-reveal"
        style={{ "--reveal-d": "0ms" } as CSSProperties}
      >
        Telegram для ресторанов
      </span>
      <h1
        className="moo-hero-title moo-reveal"
        id="hero-title"
        style={{ "--reveal-d": "80ms" } as CSSProperties}
      >
        Ваш ресторан — в&nbsp;смартфоне каждого гостя
      </h1>
      <p className="moo-hero-sub moo-reveal" style={{ "--reveal-d": "160ms" } as CSSProperties}>
        Заказы, меню и&nbsp;постоянные гости — без&nbsp;комиссии агрегаторов
        и&nbsp;без&nbsp;отдельных приложений. Запуск за&nbsp;48&nbsp;часов.
      </p>
      <MooCtaGroup
        className="moo-hero-actions-wrap"
        revealClass="moo-reveal"
        revealDelay="260ms"
        variant="hero"
      />
    </section>
  );
}
