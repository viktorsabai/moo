"use client";

import gsap from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  demoBeats,
  PUSH_DELAY_S,
  SCENE_GAP_S,
  SCENE_STEPS,
  STEP_DURATIONS,
  type DemoStepId,
} from "../data/demo-beats";

export type DemoPhase = "intro" | "action" | "result";

export { SCENE_DURATION_MS } from "../data/demo-beats";

const LOADER_MS = 900;

function stepPhase(step: DemoStepId): DemoPhase {
  if (step === "profit") return "result";
  const actionSteps = new Set<DemoStepId>([
    "toggle-merch",
    "toggle-pass",
    "order",
    "scan",
    "vitrine",
    "edit",
    "push",
    "synced",
    "tap",
    "flip",
    "revenue",
  ]);
  if (actionSteps.has(step)) return "action";
  return "intro";
}

function buildSceneTimeline(
  sceneIndex: number,
  onStep: (step: DemoStepId) => void,
): gsap.core.Timeline {
  const beat = demoBeats[sceneIndex];
  const steps = SCENE_STEPS[beat.id];
  const tl = gsap.timeline();

  steps.forEach((step, index) => {
    const prevStep = index > 0 ? steps[index - 1]! : null;
    const prevDuration = prevStep ? STEP_DURATIONS[prevStep] : 0;
    const delay = step === "profit" ? PUSH_DELAY_S : 0;

    if (index === 0) {
      tl.add(() => onStep(step));
    } else {
      tl.add(() => onStep(step), `+=${prevDuration + delay}`);
    }
  });

  tl.to({}, { duration: STEP_DURATIONS[steps[steps.length - 1]!] + SCENE_GAP_S });
  return tl;
}

export function useDemoPlayback() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [step, setStep] = useState<DemoStepId>(SCENE_STEPS.order[0]!);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const masterRef = useRef<gsap.core.Timeline | null>(null);
  const sceneIndexRef = useRef(0);

  const beat = demoBeats[sceneIndex];
  const phase = stepPhase(step);
  const showPush = step === "profit";

  const storyHint = useMemo(() => {
    if (phase === "intro") return beat.intro;
    if (phase === "result") return beat.explain;
    return beat.label;
  }, [phase, beat]);

  const playMaster = useCallback((master: gsap.core.Timeline, autoplay: boolean) => {
    masterRef.current?.kill();
    masterRef.current = master;
    if (autoplay) {
      master.play(0);
      setIsPlaying(true);
    } else {
      master.pause(0);
      setIsPlaying(false);
    }
  }, []);

  const buildLoopMaster = useCallback(() => {
    const master = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        sceneIndexRef.current = 0;
        setSceneIndex(0);
        setStep(SCENE_STEPS.order[0]!);
      },
    });

    demoBeats.forEach((_, index) => {
      master.add(
        buildSceneTimeline(index, (nextStep) => {
          sceneIndexRef.current = index;
          setSceneIndex(index);
          setStep(nextStep);
        }),
      );
    });

    return master;
  }, []);

  const buildSingleSceneMaster = useCallback((index: number) => {
    const master = gsap.timeline({ onComplete: () => setIsPlaying(false) });
    master.add(
      buildSceneTimeline(index, (nextStep) => {
        sceneIndexRef.current = index;
        setSceneIndex(index);
        setStep(nextStep);
      }),
    );
    return master;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), LOADER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const master = buildLoopMaster();
    playMaster(master, true);
    setSceneIndex(0);
    setStep(SCENE_STEPS.order[0]!);

    return () => {
      master.kill();
    };
  }, [isReady, buildLoopMaster, playMaster]);

  const goToScene = useCallback(
    (next: number) => {
      if (!isReady) return;
      const firstStep = SCENE_STEPS[demoBeats[next]!.id][0]!;
      sceneIndexRef.current = next;
      setSceneIndex(next);
      setStep(firstStep);
      playMaster(buildSingleSceneMaster(next), true);
    },
    [isReady, buildSingleSceneMaster, playMaster],
  );

  const resumeAuto = useCallback(() => {
    if (!isReady) return;
    playMaster(buildLoopMaster(), true);
  }, [isReady, buildLoopMaster, playMaster]);

  return {
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
  };
}
