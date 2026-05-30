"use client";

import { useEffect, useRef, useState } from "react";

import { mooContacts } from "../data/contacts";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className={`moo-hero-section${inView ? " is-in" : ""}`}
      id="top"
      ref={sectionRef}
    >
      <span className="moo-hero-kicker moo-hero-reveal">Telegram для ресторанов</span>
      <h1 className="moo-hero-title moo-hero-reveal" id="hero-title">
        Ваш ресторан — в&nbsp;смартфоне каждого гостя
      </h1>
      <p className="moo-hero-sub moo-hero-reveal">
        Заказы, меню и&nbsp;постоянные гости — без&nbsp;комиссии агрегаторов
        и&nbsp;без&nbsp;отдельных приложений. Запуск за&nbsp;48&nbsp;часов.
      </p>
      <div className="moo-hero-actions">
        <a
          className="moo-btn-primary moo-hero-primary moo-hero-reveal"
          href={mooContacts.founder}
          rel="noopener noreferrer"
          target="_blank"
        >
          Начать работу
        </a>
        <a className="moo-btn-secondary moo-hero-secondary moo-hero-reveal" href="#demo">
          Посмотреть, как работает
        </a>
      </div>
    </section>
  );
}
