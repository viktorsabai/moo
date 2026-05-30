import type { CSSProperties, ReactNode } from "react";

import { mooCta } from "../data/contacts";

type Variant = "hero" | "offer" | "faq";

type Props = {
  variant: Variant;
  className?: string;
  revealClass?: string;
  revealDelay?: string;
};

function TelegramPlane({ size = 16 }: { size?: number }) {
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

function StartButton({
  className,
  short = false,
  pulse = false,
}: {
  className?: string;
  short?: boolean;
  pulse?: boolean;
}) {
  return (
    <a
      className={`moo-btn-primary${pulse ? " moo-cta-pulse" : ""}${className ? ` ${className}` : ""}`}
      href={mooCta.start.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {short ? mooCta.start.short : mooCta.start.label}
    </a>
  );
}

function DemoBotButton({
  className,
  short = false,
  hero = false,
}: {
  className?: string;
  short?: boolean;
  hero?: boolean;
}) {
  const label = hero ? mooCta.demoBot.heroLabel : short ? mooCta.demoBot.short : mooCta.demoBot.label;

  return (
    <a
      className={`moo-btn-secondary moo-btn-demo-bot${className ? ` ${className}` : ""}`}
      href={mooCta.demoBot.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <TelegramPlane />
      {label}
    </a>
  );
}

function SiteDemoButton({
  className,
  pulse = false,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <a
      className={`moo-btn-primary${pulse ? " moo-cta-pulse" : ""}${className ? ` ${className}` : ""}`}
      href={mooCta.demoSite.href}
    >
      {mooCta.demoSite.label}
    </a>
  );
}

function AskButton({ className }: { className?: string }) {
  return (
    <a
      className={`moo-btn-secondary${className ? ` ${className}` : ""}`}
      href={mooCta.ask.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {mooCta.ask.label}
    </a>
  );
}

function Wrap({
  children,
  className,
  revealClass,
  revealDelay,
}: {
  children: ReactNode;
  className?: string;
  revealClass?: string;
  revealDelay?: string;
}) {
  return (
    <div
      className={`moo-cta-group${className ? ` ${className}` : ""}${revealClass ? ` ${revealClass}` : ""}`}
      style={revealDelay ? ({ "--reveal-d": revealDelay } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function MooCtaGroup({ variant, className, revealClass, revealDelay }: Props) {
  if (variant === "hero") {
    return (
      <Wrap className={className} revealClass={revealClass} revealDelay={revealDelay}>
        <div className="moo-cta-row">
          <SiteDemoButton className="moo-hero-site-demo" pulse />
          <DemoBotButton className="moo-hero-demo-bot" hero />
        </div>
      </Wrap>
    );
  }

  if (variant === "offer") {
    return (
      <Wrap className={`moo-cta-group--offer${className ? ` ${className}` : ""}`}>
        <div className="moo-cta-row moo-cta-row--offer">
          <StartButton className="moo-offer-primary-btn" pulse />
          <DemoBotButton className="moo-offer-demo-btn" />
        </div>
        <a className="moo-cta-ghost moo-cta-ghost--center" href={mooCta.demoSite.href}>
          {mooCta.demoSite.label}
          <span aria-hidden="true">→</span>
        </a>
      </Wrap>
    );
  }

  return (
    <Wrap
      className={`moo-cta-group--faq${className ? ` ${className}` : ""}`}
      revealClass={revealClass}
      revealDelay={revealDelay}
    >
      <p className="moo-cta-faq-title">Попробуйте демо или задайте вопрос</p>
      <div className="moo-cta-row moo-cta-row--faq">
        <DemoBotButton className="moo-faq-demo-btn" />
        <AskButton className="moo-faq-ask-btn" />
      </div>
    </Wrap>
  );
}
