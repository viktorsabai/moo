"use client";

import type { StorySection } from "../../data/story";
import { ProductPhoneMockup } from "../ProductPhoneMockup";
import { MobilePhoneStage } from "./MobilePhoneStage";

type Props = {
  activeIndex: number;
  section: StorySection;
  totalScenes: number;
};

export function MobileDemoStage({ activeIndex, section, totalScenes }: Props) {
  const tone = section.tone === "analytics" ? "success" : "default";
  const callouts = section.ecosystem.slice(0, 3);

  return (
    <div className="mobile-demo-stage" data-tone={section.tone}>
      <div className="mobile-demo-copy">
        <span className="mobile-demo-kicker">{section.kicker}</span>
        <h2>{section.mobileTitle}</h2>
        <p>{section.body}</p>
      </div>

      <div className="mobile-demo-visual" key={section.id}>
        <div aria-hidden="true" className="mobile-demo-callouts">
          {callouts.map((callout, index) => (
            <div
              className="mobile-demo-callout mobile-demo-callout-enter"
              data-slot={index}
              key={callout.label}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <i aria-hidden="true" />
              <div>
                <span>{callout.label}</span>
                {callout.value ? <strong>{callout.value}</strong> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-demo-phone-wrap mobile-demo-phone-enter">
          <div aria-hidden="true" className="mobile-phone-aura" />
          <div aria-hidden="true" className="mobile-phone-ground" />
          <MobilePhoneStage>
            <ProductPhoneMockup
              caption={section.phone.caption}
              eyebrow={section.phone.eyebrow}
              metric={section.phone.metric}
              mode={section.mode}
              title={section.phone.title}
              tone={tone}
            />
          </MobilePhoneStage>
        </div>
      </div>

      <div aria-label="Scene progress" className="mobile-demo-progress" role="tablist">
        {Array.from({ length: totalScenes }).map((_, index) => (
          <span
            aria-current={index === activeIndex ? "step" : undefined}
            className={index === activeIndex ? "is-active" : undefined}
            key={index}
          />
        ))}
      </div>

      <ul aria-label="Operational hints" className="mobile-demo-hints">
        {section.hints.map((hint) => (
          <li className="mobile-demo-hint-enter" key={hint}>
            {hint}
          </li>
        ))}
      </ul>
    </div>
  );
}
