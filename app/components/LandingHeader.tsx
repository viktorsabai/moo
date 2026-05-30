"use client";

import { HeaderDemoLink, LandingStepperNav } from "./LandingStepperNav";
import { MooLogo } from "./MooLogo";

export function LandingHeader() {
  return (
    <header className="moo-site-header">
      <div className="moo-site-header-inner">
        <a className="moo-logo-link" href="#top">
          <MooLogo size={30} withWordmark />
        </a>

        <LandingStepperNav />

        <HeaderDemoLink />
      </div>
    </header>
  );
}
