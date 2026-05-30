export type StoryPhaseId =
  | "menu"
  | "order"
  | "pass"
  | "promo"
  | "crm"
  | "owner";

export type StoryAct = "guest" | "restaurant";

export type StoryPhase = {
  id: StoryPhaseId;
  /** Linear step number — always 01…06 in playback order */
  step: number;
  act: StoryAct;
  actLabel: string;
  label: string;
  /** First take — what happens */
  story: string;
  /** Second take — why it matters */
  detail: string;
};

/** Guest journey first (01–03), then restaurant tools (04–06) */
export const STORY_PHASES: StoryPhase[] = [
  {
    id: "menu",
    step: 1,
    act: "guest",
    actLabel: "Гость",
    label: "Гость",
    story:
      "Автологин через Telegram — гость заходит и открывает Mini App через бота.",
    detail: "Через QR, без дополнительных скачиваний.",
  },
  {
    id: "order",
    step: 2,
    act: "guest",
    actLabel: "Гость",
    label: "Заказ",
    story: "Можно собрать заказ так, как удобно гостю.",
    detail:
      "Добавки, гарниры, соусы, комбо. Рекомендации и популярные позиции помогают продавать больше без навязчивости.",
  },
  {
    id: "pass",
    step: 3,
    act: "guest",
    actLabel: "Гость",
    label: "Подписки",
    story: "Гость оплачивает питание на неделю или месяц вперёд.",
    detail: "Ресторан получает понятную загрузку кухни и деньги заранее.",
  },
  {
    id: "promo",
    step: 4,
    act: "restaurant",
    actLabel: "Ресторан",
    label: "Акции и промокоды",
    story:
      "Скидка, промокод, подарок к заказу или баннер на главной странице.",
    detail: "Появляются без разработчиков и долгих согласований.",
  },
  {
    id: "crm",
    step: 5,
    act: "restaurant",
    actLabel: "Ресторан",
    label: "Гости",
    story:
      "Видно, что люди смотрят, что заказывают и что покупают чаще всего.",
    detail: "Рекомендации по персонализированному привлечению.",
  },
  {
    id: "owner",
    step: 6,
    act: "restaurant",
    actLabel: "Ресторан",
    label: "Личный кабинет",
    story: "Гибкость настроек и управления заведением.",
    detail: "Уведомления через чат в Telegram, управление ролями персонала.",
  },
];
