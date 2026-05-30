import type { StoryPhaseId } from "./scroll-story";

/** Unified story beat — same rhythm on every phase */
export const STORY_TIMING = {
  /** Scene settles before intro card */
  settle: 250,
  /** Intro overlay: blur + step explanation */
  introFocus: 1500,
  /** Pause after intro before cursor appears */
  leadBeforeCursor: 280,
  /** CSS transform duration on cursor (keep in sync) */
  moveDuration: 520,
  /** Hold on tap */
  tapHold: 300,
  /** Gap between multi-tap targets */
  betweenActions: 650,
  /** Pause after last action before next phase */
  beforeAdvance: 700,
} as const;

/**
 * Total autoplay length per phase (intro + actions + advance tail).
 */
export const PHASE_DURATION: Record<StoryPhaseId, number> = {
  menu: 7000,
  order: 10500,
  pass: 9800,
  promo: 8700,
  crm: 8900,
  owner: 9200,
};

export const STORY_CURSOR_BASE =
  STORY_TIMING.introFocus + STORY_TIMING.leadBeforeCursor;
