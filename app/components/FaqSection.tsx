"use client";

import { useState, type CSSProperties } from "react";

import { FAQ_GROUPS } from "../data/faq";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { MooCtaGroup } from "./MooCtaGroup";

const FAQ_SHIFTS = ["-28px", "24px", "-16px", "20px", "-22px", "18px"] as const;
const FAQ_SCALES = ["0.78", "0.82", "0.8", "0.84", "0.79", "0.83"] as const;

export function FaqSection() {
  const { ref, sectionClass } = useScrollReveal<HTMLElement>(0.15);
  const [activeGroup, setActiveGroup] = useState(0);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [listTick, setListTick] = useState(0);

  const group = FAQ_GROUPS[activeGroup] ?? FAQ_GROUPS[0]!;

  const selectGroup = (index: number) => {
    if (index === activeGroup) return;
    setActiveGroup(index);
    setOpenKey(null);
    setListTick((tick) => tick + 1);
  };

  return (
    <section
      className={`moo-faq moo-scroll-section${sectionClass}`}
      id="faq"
      ref={ref}
    >
      <div className="moo-faq-head">
        <p className="moo-section-label moo-reveal" style={{ "--reveal-d": "0ms" } as CSSProperties}>
          FAQ
        </p>
        <h2 className="moo-faq-title moo-reveal" style={{ "--reveal-d": "70ms" } as CSSProperties}>
          Частые вопросы
        </h2>
      </div>

      <div
        aria-label="Категории вопросов"
        className="moo-faq-tabs moo-reveal"
        role="tablist"
        style={{ "--reveal-d": "140ms" } as CSSProperties}
      >
        {FAQ_GROUPS.map((g, i) => (
          <button
            aria-label={g.label}
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
            <span className="moo-faq-tab-label">{g.shortLabel}</span>
          </button>
        ))}
      </div>

      <div className="moo-faq-list-shell">
        <div className="moo-faq-list moo-faq-list--assemble" key={`${group.id}-${listTick}`}>
          {group.items.map((item, i) => {
            const isOpen = openKey === item.q;
            return (
              <div
                className={`moo-faq-item${isOpen ? " is-open" : ""}`}
                key={item.q}
                style={
                  {
                    "--faq-i": i,
                    "--faq-shift": FAQ_SHIFTS[i % FAQ_SHIFTS.length],
                    "--faq-scale": FAQ_SCALES[i % FAQ_SCALES.length],
                  } as CSSProperties
                }
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
      </div>

      <MooCtaGroup
        className="moo-faq-cta-card moo-reveal"
        revealDelay="280ms"
        variant="faq"
      />
    </section>
  );
}
