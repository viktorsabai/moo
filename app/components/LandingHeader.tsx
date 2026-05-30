"use client";

import {
  LANDING_STEPS,
  LandingStepperNav,
  useLandingStep,
} from "./LandingStepperNav";
import { MooLogo } from "./MooLogo";
import { mooCta } from "../data/contacts";

function HeaderContextAction({ activeIndex }: { activeIndex: number }) {
  const step = LANDING_STEPS[activeIndex] ?? LANDING_STEPS[0]!;
  const isLaunch = activeIndex === LANDING_STEPS.length - 1;

  if (isLaunch) {
    return (
      <a
        className="moo-header-start"
        href={mooCta.start.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {mooCta.start.short}
      </a>
    );
  }

  return (
    <a
      aria-current="location"
      className="moo-header-section"
      href={step.href}
      key={step.id}
    >
      {step.label}
    </a>
  );
}

export function LandingHeader() {
  const { activeIndex, fillPct } = useLandingStep();

  return (
    <header className="moo-site-header">
      <div className="moo-site-header-inner">
        <a className="moo-logo-link" href="#top">
          <MooLogo animated={false} size={30} withWordmark />
        </a>

        <LandingStepperNav activeIndex={activeIndex} fillPct={fillPct} />

        <HeaderContextAction activeIndex={activeIndex} />
      </div>

      <div aria-hidden="true" className="moo-header-progress-bar">
        <div className="moo-header-progress-fill" style={{ width: `${fillPct}%` }} />
      </div>
    </header>
  );
}
