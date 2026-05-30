"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isPlaying?: boolean;
  phase?: string;
};

export function PhoneDevice({ children, isPlaying = false, phase = "intro" }: Props) {
  return (
    <div className="moo-phone-wrap">
      <div
        className={`moo-phone${isPlaying ? " is-playing" : ""}`}
        data-phase={phase}
      >
        <div aria-hidden="true" className="moo-phone-island" />
        <div className="moo-phone-screen moo-demo-phone">{children}</div>
      </div>
    </div>
  );
}
