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

export function useLandingStep() {
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

  return { activeIndex, fillPct };
}

type StepperProps = {
  activeIndex: number;
  fillPct: number;
};

/** Desktop: stepper with aligned dots + labels */
export function LandingStepperNav({ activeIndex, fillPct }: StepperProps) {
  return (
    <nav aria-label="Прогресс по лендингу" className="moo-stepper">
      <div className="moo-stepper-track">
        <div aria-hidden="true" className="moo-stepper-rail">
          <div className="moo-stepper-rail-fill" style={{ width: `${fillPct}%` }} />
        </div>

        {LANDING_STEPS.map((step, index) => {
          const state =
            index < activeIndex ? "is-done" : index === activeIndex ? "is-active" : "is-upcoming";

          return (
            <a
              className={`moo-stepper-step ${state}`}
              href={step.href}
              key={step.id}
            >
              <span className="moo-stepper-dot" />
              <span className="moo-stepper-label">{step.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
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
