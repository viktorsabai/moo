"use client";

import { SectionWrapper } from "../SectionWrapper";
import { AnimatedReveal } from "../AnimatedReveal";
import { revealVariants } from "../../lib/motion";

/**
 * Hero section: Cinematic headline with atmospheric background
 */
export function Hero() {
  return (
    <SectionWrapper
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-900 via-black to-black" />
      </div>

      <div className="w-full max-w-5xl px-6 md:px-12 text-center">
        {/* Main headline */}
        <AnimatedReveal variants={revealVariants}>
          <h1 className="text-display mb-6 md:mb-8">
            Own your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyan-200">
              customer relationships
            </span>
          </h1>
        </AnimatedReveal>

        {/* Subheading */}
        <AnimatedReveal variants={revealVariants} delay={0.2}>
          <p className="text-body text-graphite-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 md:mb-16">
            MOO is an AI growth platform for restaurants inside Telegram Mini
            Apps. Track behavior, predict intent, launch automations, and
            increase repeat revenue.
          </p>
        </AnimatedReveal>

        {/* CTA placeholder */}
        <AnimatedReveal variants={revealVariants} delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 rounded-lg border border-cyan-500/50 text-white cursor-pointer hover:bg-cyan-600/10 transition-colors">
              <span className="text-sm uppercase tracking-wider font-light">
                Start free
              </span>
            </button>
            <button className="px-8 py-3 rounded-lg border border-graphite-700 text-graphite-300 cursor-pointer hover:bg-graphite-800/30 transition-colors">
              <span className="text-sm uppercase tracking-wider font-light">
                See demo
              </span>
            </button>
          </div>
        </AnimatedReveal>
      </div>
    </SectionWrapper>
  );
}
