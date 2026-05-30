export type MooSceneId = "order" | "import" | "crm" | "pass";

export type DemoStepId =
  | "menu"
  | "toggle-merch"
  | "toggle-pass"
  | "order"
  | "upload"
  | "scan"
  | "vitrine"
  | "guest"
  | "edit"
  | "push"
  | "synced"
  | "catalog"
  | "tap"
  | "flip"
  | "revenue"
  | "profit";

export type DemoBeat = {
  id: MooSceneId;
  label: string;
  intro: string;
  explain: string;
  pushProfit: string;
};

export const demoSceneLabels = [
  "\u0417\u0430\u043a\u0430\u0437",
  "\u0418\u043c\u043f\u043e\u0440\u0442",
  "CRM",
  "Pass",
];

export const demoBeats: DemoBeat[] = [
  {
    id: "order",
    label: "\u0413\u043e\u0441\u0442\u044c \u0437\u0430\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442 \u2014 \u0432\u044b \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442\u0435 \u043c\u043e\u0434\u0443\u043b\u044f\u043c\u0438",
    intro: "\u041c\u0435\u043d\u044e, \u0437\u0430\u043a\u0430\u0437 \u0438 \u043c\u043e\u0434\u0443\u043b\u0438 \u2014 \u0432 \u043e\u0434\u043d\u043e\u043c Mini App",
    explain:
      "0% \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0438. \u041c\u0435\u0440\u0447 \u0438 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0438 \u0432\u043a\u043b\u044e\u0447\u0430\u044e\u0442\u0441\u044f \u0432 \u043e\u0434\u0438\u043d \u0442\u0430\u043f.",
    pushProfit:
      "\u2699\ufe0f \u041c\u041e\u0414\u0423\u041b\u042c\u041d\u041e\u0421\u0422\u042c. \u0417\u0430\u043a\u0430\u0437 \u0432 Telegram + \u043c\u0435\u0440\u0447 \u0438 Pass \u0432 \u043e\u0434\u043d\u043e\u043c \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438.",
  },
  {
    id: "import",
    label: "AI \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u0442 \u043c\u0435\u043d\u044e \u0437\u0430 60 \u0441\u0435\u043a",
    intro: "PDF \u2192 \u0441\u043a\u0430\u043d \u2192 \u0433\u043e\u0442\u043e\u0432\u0430\u044f \u0432\u0438\u0442\u0440\u0438\u043d\u0430 \u0441 \u043a\u043d\u043e\u043f\u043a\u0430\u043c\u0438 \u0437\u0430\u043a\u0430\u0437\u0430",
    explain:
      "\u0411\u0435\u0437 \u0432\u0451\u0440\u0441\u0442\u043a\u0438. \u0413\u043e\u0441\u0442\u044c \u0441\u0440\u0430\u0437\u0443 \u0437\u0430\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442 \u0432 \u043e\u0431\u043d\u043e\u0432\u043b\u0451\u043d\u043d\u043e\u043c \u043c\u0435\u043d\u044e.",
    pushProfit:
      "\u26a1\ufe0f \u0411\u042b\u0421\u0422\u0420\u042b\u0419 \u0421\u0422\u0410\u0420\u0422. \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0430\u0440\u043e\u0435 \u043c\u0435\u043d\u044e \u2014 \u0418\u0418 \u0441\u043e\u0437\u0434\u0430\u0441\u0442 \u0432\u0438\u0442\u0440\u0438\u043d\u0443 \u0437\u0430 60 \u0441\u0435\u043a\u0443\u043d\u0434.",
  },
  {
    id: "crm",
    label: "CRM \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0433\u043e\u0441\u0442\u044f + live-\u0446\u0435\u043d\u0430",
    intro: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c, push \u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u2014 \u043d\u0430 \u043e\u0434\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435",
    explain:
      "\u0412\u0438\u043a\u0442\u043e\u0440 \u0432\u0435\u0440\u043d\u0443\u043b\u0441\u044f. \u0426\u0435\u043d\u0430 350\u2192300 \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d\u0430 \u0432\u043e \u0432\u0441\u0435\u0445 \u043a\u0430\u043d\u0430\u043b\u0430\u0445.",
    pushProfit:
      "\u270f\ufe0f LIVE-\u0420\u0415\u0414\u0410\u041a\u0422\u041e\u0420 + CRM. \u0412\u043e\u0437\u0432\u0440\u0430\u0442 \u0433\u043e\u0441\u0442\u044f \u0438 \u0446\u0435\u043d\u044b \u0431\u0435\u0437 \u043c\u043e\u0434\u0435\u0440\u0430\u0446\u0438\u0438 App Store.",
  },
  {
    id: "pass",
    label: "Lunch Pass \u2014 \u0434\u0435\u043d\u044c\u0433\u0438 \u0432\u043f\u0435\u0440\u0451\u0434",
    intro: "\u0413\u043e\u0441\u0442\u044c \u043f\u043e\u043a\u0443\u043f\u0430\u0435\u0442 \u0430\u0431\u043e\u043d\u0435\u043c\u0435\u043d\u0442 \u2014 \u0432\u044b \u0432\u0438\u0434\u0438\u0442\u0435 \u0432\u044b\u0440\u0443\u0447\u043a\u0443",
    explain: "250,000 THB \u0441\u043e\u0431\u0440\u0430\u043d\u043e \u0432\u043f\u0435\u0440\u0451\u0434 \u0434\u043e \u043d\u0430\u0447\u0430\u043b\u0430 \u043c\u0435\u0441\u044f\u0446\u0430.",
    pushProfit:
      "\ud83d\udcb0 \u0414\u0415\u041d\u042c\u0413\u0418 \u0412\u041f\u0415\u0420\u0401\u0414. \u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0438 \u043d\u0430 \u043e\u0431\u0435\u0434\u044b \u2192 \u043a\u044d\u0448 \u043d\u0430 \u043e\u0431\u043e\u0440\u043e\u0442 \u0434\u043e \u043c\u0435\u0441\u044f\u0446\u0430.",
  },
];

export const SCENE_STEPS: Record<MooSceneId, DemoStepId[]> = {
  order: ["menu", "toggle-merch", "toggle-pass", "order", "profit"],
  import: ["upload", "scan", "vitrine", "profit"],
  crm: ["guest", "edit", "push", "synced", "profit"],
  pass: ["catalog", "tap", "flip", "revenue", "profit"],
};

export const STEP_DURATIONS: Record<DemoStepId, number> = {
  menu: 0.75,
  "toggle-merch": 0.65,
  "toggle-pass": 0.65,
  order: 0.85,
  upload: 0.75,
  scan: 0.95,
  vitrine: 0.85,
  guest: 0.75,
  edit: 0.85,
  push: 0.75,
  synced: 0.75,
  catalog: 0.75,
  tap: 0.65,
  flip: 0.85,
  revenue: 0.85,
  profit: 1.4,
};

export const SCENE_GAP_S = 0.3;
export const PUSH_DELAY_S = 0.2;

export function sceneDurationS(sceneId: MooSceneId): number {
  const steps = SCENE_STEPS[sceneId];
  const actionDuration = steps.reduce((sum, step) => sum + STEP_DURATIONS[step], 0);
  const profitDelays = steps.filter((step) => step === "profit").length * PUSH_DELAY_S;
  return actionDuration + profitDelays + SCENE_GAP_S;
}

export const SCENE_DURATION_MS = Math.round(
  demoBeats.reduce((max, beat) => Math.max(max, sceneDurationS(beat.id) * 1000), 0),
);
