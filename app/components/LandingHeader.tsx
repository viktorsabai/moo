"use client";

import {
  HeaderDemoLink,
  LANDING_STEPS,
  LandingStepperNav,
  useLandingStep,
} from "./LandingStepperNav";
import { MooLogo } from "./MooLogo";

export function LandingHeader() {
  const { activeIndex, fillPct } = useLandingStep();

  return (
    <header className="moo-site-header">
      <div className="moo-site-header-inner">
        <a className="moo-logo-link" href="#top">
          <MooLogo size={30} withWordmark />
        </a>

        <LandingStepperNav activeIndex={activeIndex} fillPct={fillPct} />

        <HeaderDemoLink />
      </div>

      <div aria-hidden="true" className="moo-header-progress-bar">
        <div className="moo-header-progress-fill" style={{ width: `${fillPct}%` }} />
      </div>
    </header>
  );
}
