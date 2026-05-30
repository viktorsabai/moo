"use client";

import { motion } from "framer-motion";
import { EcosystemCards } from "../EcosystemCards";
import { OperationalHints } from "../OperationalHints";
import { ProductPhoneMockup } from "../ProductPhoneMockup";
import type { MobileSection } from "./types";
import { MobilePhoneStage } from "./MobilePhoneStage";

const viewport = { amount: 0.28, once: false };

const sceneVariants = {
  rest: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const copyVariants = {
  rest: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const phoneVariants = {
  rest: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.92, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Props = {
  index: number;
  section: MobileSection;
};

export function MobileScene({ index, section }: Props) {
  const tone = section.tone === "analytics" ? "success" : "default";

  return (
    <motion.article
      className="mobile-product-section"
      data-layout={section.layout}
      data-tone={section.tone}
      id={`mobile-${section.id}`}
      initial="rest"
      whileInView="show"
      viewport={viewport}
      variants={sceneVariants}
    >
      <motion.div className="mobile-section-copy" variants={copyVariants}>
        <div className="mobile-section-kicker">{section.kicker}</div>

        {index === 0 ? (
          <div className="mobile-moo-mark">
            <strong>MOO</strong>
            <span>Restaurant Growth OS</span>
          </div>
        ) : null}

        <h2>{section.mobileTitle}</h2>
        <p>{section.body}</p>
        <OperationalHints hints={section.hints} variant="mobile" />
      </motion.div>

      <motion.div
        className="mobile-section-phone"
        aria-label={`${section.mobileTitle} preview`}
        variants={phoneVariants}
      >
        <div className="mobile-phone-stage-label" aria-hidden="true">
          <b>{String(index + 1).padStart(2, "0")}</b>
          <span>{section.kicker.split("/").pop()?.trim()}</span>
        </div>
        <div className="mobile-phone-aura" aria-hidden="true" />
        <div className="mobile-phone-ground" aria-hidden="true" />

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
      </motion.div>

      <motion.div className="mobile-ecosystem-strip" variants={copyVariants}>
        <span>Возможности</span>
        <EcosystemCards cards={section.ecosystem.slice(0, 4)} variant="mobile" />
      </motion.div>

      <div className="mobile-section-footer" aria-hidden="true">
        <i />
        <span>{index === 4 ? "launch ↓" : "scroll ↓"}</span>
      </div>
    </motion.article>
  );
}
