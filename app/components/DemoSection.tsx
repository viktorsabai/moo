"use client";

import { demoSceneLabels } from "../data/demo-beats";
import { SCENE_DURATION_MS, useDemoPlayback } from "../hooks/useDemoPlayback";
import { EcosystemStrip } from "./EcosystemStrip";
import { MooPhoneLoader } from "./MooPhoneLoader";
import { MooPhoneScene } from "./MooPhoneScene";
import { PhoneDevice } from "./PhoneDevice";

export function DemoSection() {
  const {
    beat,
    goToScene,
    isPlaying,
    isReady,
    phase,
    resumeAuto,
    sceneIndex,
    showPush,
    step,
    storyHint,
  } = useDemoPlayback();

  return (
    <section aria-label="Демо продукта" className="moo-hero" id="demo">
      <nav
        aria-label="Сцены"
        className="moo-stories"
        style={{ ["--scene-ms" as string]: `${SCENE_DURATION_MS}ms` }}
      >
        {demoSceneLabels.map((label, index) => (
          <button
            aria-current={index === sceneIndex ? "step" : undefined}
            aria-label={label}
            className="moo-story"
            key={label}
            onClick={() => goToScene(index)}
            type="button"
          >
            <span
              className={`moo-story-bar${
                index < sceneIndex
                  ? " is-done"
                  : index === sceneIndex && isPlaying
                    ? " is-active"
                    : ""
              }`}
              key={index === sceneIndex ? `run-${sceneIndex}-${isPlaying}` : label}
            />
          </button>
        ))}
      </nav>

      <div className="moo-hero-stage">
        <div className="moo-hero-headline">
          <p className="moo-kicker">Платформа роста</p>
          <h1>
            Рост ресторана.
            <span>Не агрегатор.</span>
          </h1>
        </div>

        <div className="phone-container">
          <div aria-hidden="true" className="moo-hero-glow" />
          <PhoneDevice isPlaying={isPlaying && isReady} phase={phase}>
            {!isReady ? (
              <MooPhoneLoader />
            ) : (
              <MooPhoneScene
                phase={phase}
                pushProfit={beat.pushProfit}
                sceneId={beat.id}
                showPush={showPush}
                step={step}
              />
            )}
          </PhoneDevice>
        </div>

        {!isPlaying && isReady ? (
          <button className="moo-resume" onClick={resumeAuto} type="button">
            Продолжить
          </button>
        ) : null}
      </div>

      <div className="moo-demo-copy-col">
        <div className="moo-desk-headline">
          <p className="moo-kicker">Платформа роста</p>
          <h1>
            Рост ресторана.
            <span>Не агрегатор.</span>
          </h1>
        </div>
        <p className="moo-scene-kicker">{demoSceneLabels[sceneIndex]}</p>
        <h2 className="moo-scene-title">{beat.label}</h2>
        <p className="moo-scene-body" key={`desk-${sceneIndex}-${step}`}>
          {storyHint}
        </p>
        <EcosystemStrip activeIndex={sceneIndex} />
      </div>
    </section>
  );
}
