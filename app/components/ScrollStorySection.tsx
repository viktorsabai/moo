"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { STORY_PHASES, type StoryPhaseId } from "../data/scroll-story";
import { StoryPhoneScreen } from "./StoryPhoneScreen";

export function ScrollStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleToken, setCycleToken] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const track = rail.querySelector(".story-rail-track");
    if (!track) return;
    const active = track.children[activeIndex] as HTMLElement | undefined;
    if (!active) return;
    const target = active.offsetLeft - track.clientWidth / 2 + active.offsetWidth / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  }, [activeIndex]);

  const activePhase: StoryPhaseId = STORY_PHASES[activeIndex]!.id;
  const activeStory = STORY_PHASES[activeIndex]!;

  const advancePhase = useCallback(() => {
    setCycleToken((token) => token + 1);
    setActiveIndex((current) => (current + 1) % STORY_PHASES.length);
  }, []);

  const selectPhase = useCallback((index: number) => {
    setCycleToken((token) => token + 1);
    setActiveIndex(index);
  }, []);

  return (
    <section
      aria-label="Как это работает"
      className="story-section"
      id="demo"
      ref={sectionRef}
    >
      <div className="story-viewport">
        <div className="story-stage-grid">
          <header className="story-copy">
            <p className="story-kicker">Пользовательский опыт</p>
            <h2 className="story-section-label">
              Один Telegram Mini App.
              <br />
              <em>Весь ресторан внутри.</em>
            </h2>
          </header>

          <div className="story-phone-column">
            <nav
              aria-label="Этапы демо"
              className="story-rail story-rail--phone"
              ref={railRef}
              role="tablist"
            >
              <div className="story-rail-track">
                {STORY_PHASES.map((phase, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      aria-label={phase.label}
                      aria-selected={isActive}
                      className={`story-rail-dot${isActive ? " is-active" : ""}`}
                      key={phase.id}
                      onClick={() => selectPhase(i)}
                      role="tab"
                      type="button"
                    >
                      {isActive ? (
                        <i aria-hidden="true" className="story-rail-dot-fill" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
              <p className="story-rail-caption" key={activePhase}>
                {activeStory.label}
              </p>
            </nav>

            <div className="story-phone-shell">
              <div aria-hidden="true" className="story-phone-island" />
              <div className="story-phone-screen">
                <StoryPhoneScreen
                  onAdvance={advancePhase}
                  phase={activePhase}
                  runKey={`${activeIndex}-${cycleToken}`}
                  storyAct={activeStory.actLabel}
                  storyDetail={activeStory.detail}
                  storyLabel={activeStory.label}
                  storyStep={activeStory.step}
                  storyText={activeStory.story}
                  storyTotal={STORY_PHASES.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
