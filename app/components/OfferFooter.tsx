"use client";

import type { CSSProperties } from "react";

import { mooContacts } from "../data/contacts";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { MooCtaGroup } from "./MooCtaGroup";

const ONBOARDING_CHECKLIST = [
  "Полный запуск и перенос вашего меню с фото за 48 часов",
  "Настройка ролей прямо в Telegram: Повар, Курьер, Менеджер",
  "Управление ценами, акциями и стоп-листами в один клик",
  "Подписки на обеды и рационы с календарем для гостей",
];

export function OfferFooter() {
  const { ref, inView, sectionClass } = useScrollReveal<HTMLElement>(0.22);

  return (
    <footer className={`moo-footer moo-scroll-section${sectionClass}`} id="contact" ref={ref}>
      <div className="moo-footer-head">
        <p className="moo-section-label moo-reveal" style={{ "--reveal-d": "0ms" } as CSSProperties}>
          Запуск
        </p>
        <h2
          className="moo-footer-title moo-reveal"
          style={{ "--reveal-d": "70ms" } as CSSProperties}
        >
          Одна цена. 48 часов до старта.
        </h2>
        <p
          className="moo-footer-subtitle moo-reveal"
          style={{ "--reveal-d": "140ms" } as CSSProperties}
        >
          0% комиссий навсегда. Без ежемесячной подписки. Вы окупаете коробку за 2 недели
          работы доставки.
        </p>
      </div>

      <div className={`moo-offer-card${inView ? " is-in" : ""}`}>
        <span aria-hidden="true" className="moo-offer-glow" />

        <span className="moo-offer-badge moo-offer-reveal" style={{ "--d": "60ms" } as CSSProperties}>
          <i aria-hidden="true" className="moo-offer-badge-dot" />
          Акция: на тестовый запуск
        </span>

        <div className="moo-offer-price moo-offer-reveal" style={{ "--d": "140ms" } as CSSProperties}>
          <div className="moo-offer-price-row">
            <span className="moo-offer-price-old">30 000 THB</span>
            <span className="moo-offer-save">−10 000 THB</span>
          </div>
          <strong className="moo-offer-price-now">
            20 000 <em>THB</em>
          </strong>
          <p>
            Единоразово под ключ для первых 3-х ресторанов на Пхукете.{" "}
            <strong>Осталось всего 2 места по спец-цене.</strong>
          </p>
        </div>

        <div
          className="moo-offer-seats moo-offer-reveal"
          style={{ "--d": "220ms" } as CSSProperties}
        >
          <span aria-hidden="true" className="moo-offer-seats-dots">
            <i className="is-taken" />
            <i />
            <i />
          </span>
          <span className="moo-offer-seats-label">
            Осталось <b>2 из 3</b> мест по спец-цене
          </span>
        </div>

        <ul className="moo-offer-checklist">
          {ONBOARDING_CHECKLIST.map((item, i) => (
            <li
              className="moo-offer-reveal"
              key={item}
              style={{ "--d": `${300 + i * 90}ms` } as CSSProperties}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="moo-offer-reveal" style={{ "--d": "720ms" } as CSSProperties}>
          <MooCtaGroup variant="offer" />
        </div>

        <p
          className="moo-offer-trust moo-offer-reveal"
          style={{ "--d": "820ms" } as CSSProperties}
        >
          Живой бот уже работает:{" "}
          <a href={mooContacts.demoBot} rel="noopener noreferrer" target="_blank">
            {mooContacts.demoBotHandle}
          </a>
          {" · "}0% комиссий · запуск за 48 часов
        </p>
      </div>
    </footer>
  );
}
