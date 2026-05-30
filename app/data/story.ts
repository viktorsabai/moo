export type PhoneMode = "direct" | "owner" | "crm" | "growth" | "analytics";

export type EcosystemCard = {
  label: string;
  value?: string;
  status?: "live" | "active" | "idle";
};

export type StorySection = {
  id: string;
  kicker: string;
  title: string;
  mobileTitle: string;
  body: string;
  hints: string[];
  ecosystem: EcosystemCard[];
  mode: PhoneMode;
  layout: "right-low" | "left-split" | "center-focus" | "edge-commerce" | "roi-focus";
  tone: "direct" | "owner" | "crm" | "growth" | "analytics";
  phone: {
    eyebrow: string;
    title: string;
    caption: string;
    metric: string;
  };
};

export const storySections: StorySection[] = [
  {
    id: "direct",
    kicker: "01 / DIRECT ORDERS",
    title: "Прямые заказы внутри Telegram",
    mobileTitle: "Прямые заказы внутри Telegram",
    body: "Гость заказывает в Mini App — ресторан получает заказ, данные и маржу без посредников.",
    hints: [
      "0% комиссии агрегатора",
      "Запуск за 48 часов",
      "Гости остаются вашими",
    ],
    ecosystem: [
      { label: "Order live", value: "3 заказа", status: "live" },
      { label: "Kitchen sync", value: "ON", status: "active" },
      { label: "Mini App", value: "активен", status: "live" },
    ],
    mode: "direct",
    layout: "right-low",
    tone: "direct",
    phone: {
      eyebrow: "Guest ordering",
      title: "Заказ в процессе",
      caption: "Меню, корзина и live-статус в Telegram.",
      metric: "Live",
    },
  },
  {
    id: "owner",
    kicker: "02 / OWNER PANEL",
    title: "Управляйте рестораном из одного интерфейса",
    mobileTitle: "Owner panel — один интерфейс",
    body: "Меню, акции, стоп-лист и push — всё из единой операционной панели MOO.",
    hints: [
      "Меню и цены в реальном времени",
      "Кампании без разработчиков",
      "Операции под контролем",
    ],
    ecosystem: [
      { label: "Banner builder", status: "active" },
      { label: "Stop-list", value: "2 поз.", status: "idle" },
      { label: "Campaign launch", status: "live" },
      { label: "Push setup", status: "active" },
      { label: "Working hours", value: "09–23", status: "active" },
      { label: "Promo toggle", value: "ON", status: "live" },
    ],
    mode: "owner",
    layout: "left-split",
    tone: "owner",
    phone: {
      eyebrow: "Owner panel",
      title: "Панель управления",
      caption: "Редактор меню, акции и доступность.",
      metric: "6 tools",
    },
  },
  {
    id: "crm",
    kicker: "03 / GUEST CRM",
    title: "Каждый заказ становится профилем гостя",
    mobileTitle: "Каждый заказ — профиль гостя",
    body: "MOO помнит вкусы, частоту визитов и момент, когда гость готов вернуться.",
    hints: [
      "Система помнит гостей",
      "Знает предпочтения",
      "Автоматически возвращает клиентов",
    ],
    ecosystem: [
      { label: "Segmentation", value: "VIP", status: "active" },
      { label: "Repeat guest", value: "×4", status: "live" },
      { label: "Loyalty trigger", status: "active" },
      { label: "Retention flow", value: "+24%", status: "live" },
    ],
    mode: "crm",
    layout: "center-focus",
    tone: "crm",
    phone: {
      eyebrow: "Guest CRM",
      title: "Профиль гостя",
      caption: "История, LTV и шанс возврата.",
      metric: "+24%",
    },
  },
  {
    id: "growth",
    kicker: "04 / GROWTH",
    title: "Система сама помогает возвращать гостей",
    mobileTitle: "Рост и подписки на автopilot",
    body: "Подписки, персональные офферы и loyalty loops — без ручного маркетинга.",
    hints: [
      "Recurring revenue",
      "Персональные офферы",
      "Loyalty без таблиц",
    ],
    ecosystem: [
      { label: "Meal plans", value: "3 плана", status: "active" },
      { label: "Personal offers", status: "live" },
      { label: "Recurring revenue", value: "₽84K", status: "live" },
      { label: "Loyalty loops", status: "active" },
    ],
    mode: "growth",
    layout: "edge-commerce",
    tone: "growth",
    phone: {
      eyebrow: "Growth engine",
      title: "Подписки и офферы",
      caption: "Recurring orders и персональные предложения.",
      metric: "+18% LTV",
    },
  },
  {
    id: "analytics",
    kicker: "05 / ANALYTICS",
    title: "Владелец видит реальную экономику",
    mobileTitle: "Аналитика и ROI владельца",
    body: "Кампании, удержание, средний чек и повторная выручка — в одном growth view.",
    hints: [
      "Campaign ROI виден",
      "Retention в цифрах",
      "Экономика прозрачна",
    ],
    ecosystem: [
      { label: "Campaign ROI", value: "×3.2", status: "live" },
      { label: "Retention", value: "68%", status: "active" },
      { label: "Average чек", value: "₽1 840", status: "active" },
      { label: "Repeat revenue", value: "+292%", status: "live" },
    ],
    mode: "analytics",
    layout: "roi-focus",
    tone: "analytics",
    phone: {
      eyebrow: "Owner analytics",
      title: "Growth dashboard",
      caption: "ROI, repeat orders и unit-экономика.",
      metric: "48ч payback",
    },
  },
];

export const finalCta = {
  kicker: "06 / ЗАПУСК",
  title: "Запустите ресторан в Telegram",
  body: "Operating system для роста — заказы, CRM, подписки и аналитика в одном Mini App. Не бот и не витрина, а инфраструктура.",
  primary: "Забронировать демо",
  secondary: "Запуск за 48 часов",
};
