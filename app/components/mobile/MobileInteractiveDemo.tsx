"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  mobileStoryBeats,
  mobileStoryIntro,
} from "../../data/mobile-story";
import { ProductPhoneMockup } from "../ProductPhoneMockup";
import { MobilePhoneStage } from "./MobilePhoneStage";

const NAV_LABELS = ["Заказ", "Панель", "CRM", "Рост", "ROI"];

export function MobileInteractiveDemo() {
  const [activeBeat, setActiveBeat] = useState(0);
  const [activeCallout, setActiveCallout] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef(0);
  const scrollyRef = useRef<HTMLDivElement>(null);

  const beat = mobileStoryBeats[activeBeat];
  const tone = beat.tone === "analytics" ? "success" : "default";

  const goToBeat = useCallback((index: number) => {
    const next = Math.max(0, Math.min(mobileStoryBeats.length - 1, index));
    setActiveBeat(next);
    setActiveCallout(0);
    stepRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) {
            setActiveBeat(index);
            setActiveCallout(0);
          }
        });
      },
      { threshold: 0.52, rootMargin: "-12% 0px -12% 0px" },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) < 42) return;
    goToBeat(activeBeat + (delta < 0 ? 1 : -1));
  };

  return (
    <div className="mobile-scrolly" id="mobile-story" ref={scrollyRef}>
      <div
        className="mobile-scrolly-pin"
        data-tone={beat.tone}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <div className="mobile-scrolly-mesh" aria-hidden="true" />

        <div className="mobile-scrolly-intro">
          <strong>{mobileStoryIntro.mark}</strong>
          <span>{mobileStoryIntro.hook}</span>
        </div>

        <div className="mobile-scrolly-copy" key={`copy-${beat.id}`}>
          <span className="mobile-scrolly-step">{beat.step}</span>
          <h2>{beat.title}</h2>
          <p>{beat.body}</p>
        </div>

        <div className="mobile-scrolly-callouts" role="tablist" aria-label="Story highlights">
          {beat.callouts.map((callout, index) => (
            <button
              aria-selected={index === activeCallout}
              className={`mobile-scrolly-callout${index === activeCallout ? " is-active" : ""}`}
              key={callout.id}
              onClick={() => setActiveCallout(index)}
              role="tab"
              type="button"
            >
              <i aria-hidden="true" />
              <span>{callout.label}</span>
              <strong>{callout.value}</strong>
            </button>
          ))}
        </div>

        <div className="mobile-scrolly-phone-stage">
          <div aria-hidden="true" className="mobile-scrolly-phone-glow" />
          <div className="mobile-scrolly-phone-shell" key={`phone-${beat.id}`}>
            <MobilePhoneStage>
              <ProductPhoneMockup
                caption={beat.phone.caption}
                eyebrow={beat.phone.eyebrow}
                highlight={beat.callouts[activeCallout]?.target}
                metric={beat.phone.metric}
                mode={beat.mode}
                title={beat.phone.title}
                tone={tone}
              />
            </MobilePhoneStage>
          </div>
          <span aria-hidden="true" className="mobile-scrolly-live-badge">
            Live demo
          </span>
        </div>

        <nav aria-label="Demo scenes" className="mobile-scrolly-nav">
          {NAV_LABELS.map((label, index) => (
            <button
              aria-current={index === activeBeat ? "step" : undefined}
              className={index === activeBeat ? "is-active" : undefined}
              key={label}
              onClick={() => goToBeat(index)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        <p className="mobile-scrolly-hint">
          {activeBeat === mobileStoryBeats.length - 1
            ? "листай вниз ↓"
            : "листай · свайп · тап на сцену"}
        </p>
      </div>

      <div aria-hidden="true" className="mobile-scrolly-steps">
        {mobileStoryBeats.map((storyBeat, index) => (
          <div
            className="mobile-scrolly-step"
            data-index={index}
            key={storyBeat.id}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
          />
        ))}
      </div>
    </div>
  );
}
