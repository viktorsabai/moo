"use client";

import { useEffect, useRef, useState } from "react";

import { mooContacts } from "../data/contacts";
import { FAQ_GROUPS } from "../data/faq";

export function FaqSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [openKey, setOpenKey] = useState<string | null>(FAQ_GROUPS[0]?.items[0]?.q ?? null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const group = FAQ_GROUPS[activeGroup] ?? FAQ_GROUPS[0]!;

  const selectGroup = (index: number) => {
    setActiveGroup(index);
    setOpenKey(FAQ_GROUPS[index]?.items[0]?.q ?? null);
  };

  return (
    <section className="moo-faq" id="faq" ref={sectionRef}>
      <div className="moo-faq-head">
        <p className="moo-section-label">FAQ</p>
        <h2 className="moo-faq-title">Частые вопросы</h2>
        <p className="moo-faq-lead">
          Коротко о том, как MOO работает у вас в ресторане.
        </p>
      </div>

      <div className="moo-faq-tabs" role="tablist" aria-label="Категории вопросов">
        {FAQ_GROUPS.map((g, i) => (
          <button
            aria-selected={i === activeGroup}
            className={`moo-faq-tab${i === activeGroup ? " is-active" : ""}`}
            key={g.id}
            onClick={() => selectGroup(i)}
            role="tab"
            type="button"
          >
            <span aria-hidden="true" className="moo-faq-tab-emoji">
              {g.emoji}
            </span>
            <span className="moo-faq-tab-label">{g.label}</span>
            <span aria-hidden="true" className="moo-faq-tab-count">
              {g.items.length}
            </span>
          </button>
        ))}
      </div>

      <div className={`moo-faq-list${inView ? " is-in" : ""}`} key={group.id}>
        {group.items.map((item, i) => {
          const isOpen = openKey === item.q;
          return (
            <div
              className={`moo-faq-item${isOpen ? " is-open" : ""}`}
              key={item.q}
              style={{ "--faq-i": i } as React.CSSProperties}
            >
              <button
                aria-expanded={isOpen}
                className="moo-faq-q"
                onClick={() => setOpenKey(isOpen ? null : item.q)}
                type="button"
              >
                <span>{item.q}</span>
                <span aria-hidden="true" className="moo-faq-icon">
                  <i />
                  <i />
                </span>
              </button>

              <div className="moo-faq-body">
                <div className="moo-faq-body-inner">
                  {item.a.map((block, bi) =>
                    block.type === "p" ? (
                      <p key={bi}>{block.text}</p>
                    ) : (
                      <ul key={bi}>
                        {block.items.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="moo-faq-cta">
        <p>Остался вопрос?</p>
        <a
          className="moo-btn-secondary"
          href={mooContacts.founder}
          rel="noopener noreferrer"
          target="_blank"
        >
          Спросить в Telegram
        </a>
      </div>
    </section>
  );
}
