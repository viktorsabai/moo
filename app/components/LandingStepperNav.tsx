"use client";

import { useEffect, useState } from "react";

import { mooCta } from "../data/contacts";

export const LANDING_STEPS = [
  { id: "top", label: "Старт", href: "#top" },
  { id: "demo", label: "Демо", href: "#demo" },
  { id: "calc", label: "Экономия", href: "#calc" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "contact", label: "Запуск", href: "#contact" },
] as const;

function TelegramPlane({ size = 14 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="moo-cta-plane"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M21.5 4.3 2.9 11.5c-1.1.4-1.1 1.6 0 2l4.7 1.5 1.8 5.6c.2.6 1 .8 1.5.3l2.6-2.4 4.6 3.4c.6.4 1.4.1 1.6-.6L23 5.7c.2-1-.6-1.8-1.5-1.4z" />
    </svg>
  );
}

function getActiveStepIndex() {
  const probe = window.scrollY + window.innerHeight * 0.28;
  let index = 0;

  for (let i = 0; i < LANDING_STEPS.length; i += 1) {
    const step = LANDING_STEPS[i]!;
    const node = document.getElementById(step.id);
    if (node && node.offsetTop <= probe) {
      index = i;
    }
  }

  return index;
}

export function LandingStepperNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setActiveIndex(getActiveStepIndex());
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const fillPct =
    LANDING_STEPS.length <= 1 ? 0 : (activeIndex / (LANDING_STEPS.length - 1)) * 100;

  const activeStep = LANDING_STEPS[activeIndex] ?? LANDING_STEPS[0]!;

  return (
    <div className="moo-header-stepper-wrap">
      <nav aria-label="Прогресс по лендингу" className="moo-stepper">
        <div aria-hidden="true" className="moo-stepper-rail">
          <div className="moo-stepper-rail-fill" style={{ width: `${fillPct}%` }} />
        </div>

        <ol className="moo-stepper-list">
          {LANDING_STEPS.map((step, index) => {
            const state =
              index < activeIndex ? "is-done" : index === activeIndex ? "is-active" : "is-upcoming";

            return (
              <li className={`moo-stepper-item ${state}`} key={step.id}>
                <a className="moo-stepper-link" href={step.href}>
                  <span className="moo-stepper-dot" />
                  <span className="moo-stepper-label">{step.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <p aria-live="polite" className="moo-stepper-caption">
        {activeStep.label}
      </p>
    </div>
  );
}

export function HeaderDemoLink() {
  return (
    <a
      className="moo-header-demo-link"
      href={mooCta.demoBot.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <TelegramPlane />
      <span className="moo-header-demo-text">{mooCta.demoBot.short}</span>
    </a>
  );
}
