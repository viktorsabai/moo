"use client";

import type { ReactNode } from "react";

type MobileExperienceScene = {
  id: string;
  kicker: string;
  title: string;
  titleLines?: string[];
  body: string;
  layout?: string;
  tone: string;
  signals?: string[];
};

type MobileExperienceProps = {
  phoneScreenKeys?: string[];
  phoneScreens?: ReactNode[];
  scenes?: MobileExperienceScene[];
};


export function MobileExperience({
  phoneScreenKeys = [],
  phoneScreens = [],
  scenes = [],
}: MobileExperienceProps) {
  return (
    <section
      className="mobile-experience"
      aria-label="MOO mobile product story"
    >
      {scenes.map((scene, index) => {
        const phoneScreen = phoneScreens[index] ?? null;
        const phoneScreenKey = String(phoneScreenKeys[index] ?? scene.id);

        const titleLines =
          scene.titleLines?.length ? scene.titleLines : [scene.title];
        const layout = scene.layout ?? "right-low";
        const signal = scene.signals?.[0] ?? "MOO";

        return (
          <article
            key={scene.id}
            id={`mobile-${scene.id}`}
            className="mobile-product-section"
            data-layout={layout}
            data-tone={scene.tone}
          >
            <div className="mobile-section-copy">
              <div className="mobile-section-kicker">
                <span>{scene.kicker}</span>
              </div>

              <h2 aria-label={scene.title}>
                {titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p>{scene.body}</p>
            </div>

            <div
              className="mobile-section-phone"
              aria-label={`${scene.title} preview`}
            >
              <div className="mobile-phone-aura" aria-hidden="true" />
              <div className="mobile-phone-ground" aria-hidden="true" />

              <div className="iphone-shell mobile-landing-phone">
                <div className="iphone-island" />

                <div className="iphone-screen">
                  <div
                    key={phoneScreenKey}
                    className="phone-layer initial-visible"
                  >
                    {phoneScreen}
                  </div>
                </div>
              </div>
              <span className="mobile-phone-signal" aria-hidden="true">
                {signal}
              </span>
            </div>

            <div className="mobile-section-footer" aria-hidden="true">
              <i />
              <span>
                {index === scenes.length - 1 ? "next ↓" : "scroll ↓"}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
