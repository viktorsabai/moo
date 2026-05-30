"use client";

import { AnimatePresence, motion } from "framer-motion";
import { mobileStoryIntro, type MobileStoryBeat } from "../../data/mobile-story";
import { ProductPhoneMockup } from "../ProductPhoneMockup";
import { MobilePhoneStage } from "./MobilePhoneStage";

type Props = {
  activeBeat: number;
  activeCallout: number;
  beat: MobileStoryBeat;
  showIntro: boolean;
  totalBeats: number;
};

const copyTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function MobileStoryStage({
  activeBeat,
  activeCallout,
  beat,
  showIntro,
  totalBeats,
}: Props) {
  const tone = beat.tone === "analytics" ? "success" : "default";

  return (
    <div className="mobile-story-stage" data-tone={beat.tone}>
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mobile-story-copy"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 14 }}
          key={`copy-${beat.id}`}
          transition={copyTransition}
        >
          {showIntro ? (
            <div className="mobile-story-intro">
              <strong>{mobileStoryIntro.mark}</strong>
              <span>{mobileStoryIntro.subtitle}</span>
            </div>
          ) : null}

          <span className="mobile-story-step">{beat.step}</span>
          <h2>{beat.title}</h2>
          <p>{beat.body}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mobile-story-visual">
        <div aria-hidden="true" className="mobile-story-callouts">
          {beat.callouts.map((callout, index) => (
            <motion.div
              animate={{
                opacity: index <= activeCallout ? 1 : 0.35,
                x: 0,
                scale: index === activeCallout ? 1.02 : 1,
              }}
              className={`mobile-story-callout${index === activeCallout ? " is-active" : ""}`}
              data-slot={index}
              initial={{ opacity: 0, x: -12 }}
              key={`${beat.id}-${callout.id}`}
              transition={{ duration: 0.38, delay: index * 0.06 }}
            >
              <i aria-hidden="true" />
              <div>
                <span>{callout.label}</span>
                <strong>{callout.value}</strong>
                {callout.detail ? <em>{callout.detail}</em> : null}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: "-50%", scale: 1 }}
            className="mobile-story-phone-wrap"
            exit={{ opacity: 0, y: "calc(-50% + 12px)", scale: 0.97 }}
            initial={{ opacity: 0, y: "calc(-50% + 18px)", scale: 0.96 }}
            key={`phone-${beat.id}`}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden="true" className="mobile-phone-aura" />
            <div aria-hidden="true" className="mobile-phone-ground" />
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
          </motion.div>
        </AnimatePresence>
      </div>

      <div aria-label="Story progress" className="mobile-story-progress" role="tablist">
        {Array.from({ length: totalBeats }).map((_, index) => (
          <span
            aria-current={index === activeBeat ? "step" : undefined}
            className={index === activeBeat ? "is-active" : undefined}
            key={index}
          />
        ))}
      </div>

      <p className="mobile-story-scroll-hint" aria-hidden="true">
        {activeBeat === totalBeats - 1 ? "листай — возможности продукта ↓" : "листай — следующий шаг ↓"}
      </p>
    </div>
  );
}
