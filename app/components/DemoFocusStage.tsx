"use client";

import type { ReactNode } from "react";

type Props = {
  anchor?: string;
  children: ReactNode;
  phase?: string;
};

export function DemoFocusStage({ anchor = "menu", children, phase = "intro" }: Props) {
  return (
    <div className="moo-focus-stage moo-demo-phone">
      <div className="moo-focus-chrome" aria-hidden="true">
        <span>×</span>
        <strong>MOO</strong>
        <span>···</span>
      </div>
      <div className="moo-focus-viewport" data-anchor={anchor} data-phase={phase}>
        <div className="moo-focus-inner">{children}</div>
      </div>
    </div>
  );
}
