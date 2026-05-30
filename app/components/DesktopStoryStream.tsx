"use client";

import { motion } from "framer-motion";
import { mooContacts } from "../data/contacts";
import { finalCta, storySections } from "../data/story";
import { EcosystemCards } from "./EcosystemCards";
import { OperationalHints } from "./OperationalHints";
import { ProductPhoneMockup } from "./ProductPhoneMockup";

const viewport = { amount: 0.32, once: false };

const panelVariants = {
  rest: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const fadeUp = {
  rest: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const phoneReveal = {
  rest: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StoryTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span className="title-word" key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </>
  );
}

export function DesktopStoryStream() {
  return (
    <div className="desktop-story-stream">
      <header className="desktop-landing-header" aria-label="MOO">
        <strong>MOO</strong>
        <span>Restaurant Growth OS</span>
        <a href={mooContacts.demoBot} rel="noopener noreferrer" target="_blank">
          Live demo
        </a>
      </header>

      {storySections.map((section, index) => (
        <motion.article
          className="story-panel"
          data-section-index={index}
          data-tone={section.tone}
          id={section.id}
          initial="rest"
          key={section.id}
          variants={panelVariants}
          whileInView="show"
          viewport={viewport}
        >
          <motion.div className="story-copy" variants={fadeUp}>
            <span>{section.kicker}</span>
            <h1>
              <StoryTitle text={section.title} />
            </h1>
            <p>{section.body}</p>
            <OperationalHints hints={section.hints} variant="desktop" />
          </motion.div>

          <motion.section
            aria-label={`${section.title} preview`}
            className="phone-column"
            variants={phoneReveal}
          >
            <div aria-hidden="true" className="ambient-orb ambient-orb-a" />
            <div aria-hidden="true" className="ambient-orb ambient-orb-b" />
            <div className="iphone-shell desktop-phone-shell">
              <div className="iphone-island" />
              <div className="iphone-screen">
                <div className="phone-layer initial-visible">
                  <ProductPhoneMockup
                    caption={section.phone.caption}
                    eyebrow={section.phone.eyebrow}
                    metric={section.phone.metric}
                    mode={section.mode}
                    title={section.phone.title}
                    tone={section.tone === "analytics" ? "success" : "default"}
                  />
                </div>
              </div>
            </div>
          </motion.section>

          <motion.aside
            aria-label="Ecosystem modules"
            className="ecosystem-column"
            variants={fadeUp}
          >
            <span className="ecosystem-column-kicker">Ecosystem</span>
            <EcosystemCards cards={section.ecosystem} variant="desktop" />
          </motion.aside>
        </motion.article>
      ))}

      <motion.section
        aria-label="Final call to action"
        className="story-panel story-panel-cta"
        id="cta"
        initial={{ opacity: 0.88, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="story-cta-scene">
          <span>{finalCta.kicker}</span>
          <h1>
            <StoryTitle text={finalCta.title} />
          </h1>
          <p>{finalCta.body}</p>
          <div className="story-cta-actions">
            <a
              className="final-cta final-cta-primary"
              href={mooContacts.founder}
              rel="noopener noreferrer"
              target="_blank"
            >
              {finalCta.primary}
            </a>
            <a
              className="final-cta final-cta-secondary"
              href={mooContacts.demoBot}
              rel="noopener noreferrer"
              target="_blank"
            >
              Live demo · @topka_demo_bot
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="story-cta-glow" />
      </motion.section>
    </div>
  );
}
