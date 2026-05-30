import type { PhoneMode } from "./story";

/** Привязка callout к зоне в мокапе телефона — для подсветки UI */
export type PhoneHighlight =
  | "header"
  | "menu"
  | "cart"
  | "order"
  | "controls"
  | "profile"
  | "offers"
  | "analytics";

export type StoryCallout = {
  id: string;
  label: string;
  value: string;
  detail?: string;
  target: PhoneHighlight;
};

export type MobileStoryBeat = {
  id: string;
  step: string;
  role: "pain" | "solution" | "value" | "growth" | "proof";
  title: string;
  body: string;
  callouts: StoryCallout[];
  mode: PhoneMode;
  tone: "direct" | "owner" | "crm" | "growth" | "analytics";
  phone: {
    eyebrow: string;
    title: string;
    caption: string;
    metric: string;
  };
};

export type ProductCapability = {
  id: string;
  tag: string;
  title: string;
  description: string;
};

export const mobileStoryIntro = {
  mark: "MOO",
  subtitle: "Платформа для ресторанов в Telegram",
  hook: "Прямые заказы, CRM гостей, акции и рост повторных продаж — без агрегаторов.",
};

export const mobileStoryBeats: MobileStoryBeat[] = [
  {
    id: "direct",
    step: "01 / ПРЯМОЙ КАНАЛ",
    role: "pain",
    title: "Гости — ваши. Маржа — тоже.",
    body: "Агрегатор забирает комиссию, а клиент остаётся не вашим. MOO — прямой канал в Telegram: доставка, самовывоз, зал и preorder в одном Mini App.",
    callouts: [
      {
        id: "direct-ownership",
        label: "Главная боль",
        value: "Гости принадлежат вам",
        detail: "Контакт в Telegram — не в CRM доставки",
        target: "header",
      },
      {
        id: "direct-scenarios",
        label: "Сценарии",
        value: "Доставка · самовывоз · зал",
        detail: "Preorder и подписки — в roadmap",
        target: "menu",
      },
      {
        id: "direct-status",
        label: "Статус заказа",
        value: "Live-трекинг для гостя",
        detail: "Принят → готовится → в пути → готов",
        target: "order",
      },
    ],
    mode: "direct",
    tone: "direct",
    phone: {
      eyebrow: "Заказ гостя",
      title: "Заказ в процессе",
      caption: "Меню, корзина и live-статус — без отдельного приложения.",
      metric: "Live",
    },
  },
  {
    id: "owner",
    step: "02 / УПРАВЛЕНИЕ",
    role: "solution",
    title: "Весь ресторан — под вашим контролем",
    body: "Меню, цены, фото, стоп-лист, баннеры, акции и часы работы — без разработчиков. Push массовые, сегментированные и триггерные.",
    callouts: [
      {
        id: "owner-menu",
        label: "Self-serve",
        value: "Меню и цены сами",
        detail: "Категории, фото, upsell, availability",
        target: "controls",
      },
      {
        id: "owner-push",
        label: "Push",
        value: "Триггерные рассылки",
        detail: "«14 дней без заказа», lunch offers",
        target: "header",
      },
      {
        id: "owner-kitchen",
        label: "Операции",
        value: "Очередь заказов",
        detail: "Kitchen flow: статусы и preparation",
        target: "controls",
      },
    ],
    mode: "owner",
    tone: "owner",
    phone: {
      eyebrow: "Панель владельца",
      title: "Управление рестораном",
      caption: "Акции, стоп-лист и push — из одного интерфейса.",
      metric: "Self-serve",
    },
  },
  {
    id: "crm",
    step: "03 / CRM ГОСТЕЙ",
    role: "value",
    title: "CRM строится с каждым заказом",
    body: "История, любимые блюда, средний чек, частота и реакция на кампании — автоматически. Сегменты VIP, новые, «уснувшие», regulars и high-чек.",
    callouts: [
      {
        id: "crm-data",
        label: "Данные",
        value: "Профиль без ручного ввода",
        detail: "Заказы, чек, активность, retention",
        target: "profile",
      },
      {
        id: "crm-segments",
        label: "Сегменты",
        value: "VIP · новые · sleeping",
        detail: "Active regulars, high-чек, подписчики",
        target: "profile",
      },
      {
        id: "crm-triggers",
        label: "Возврат",
        value: "Триггеры retention",
        detail: "Favorite dishes back, персональный оффер",
        target: "offers",
      },
    ],
    mode: "crm",
    tone: "crm",
    phone: {
      eyebrow: "CRM гостей",
      title: "Профиль гостя",
      caption: "История, предпочтения и сегмент — из коробки.",
      metric: "Auto CRM",
    },
  },
  {
    id: "growth",
    step: "04 / РОСТ",
    role: "growth",
    title: "Повторные продажи — на автopilot",
    body: "Персональные офферы, скидки, retention mechanics и repeat-order incentives. Recurring ordering уже работает — subscription engine в активном roadmap.",
    callouts: [
      {
        id: "growth-offers",
        label: "Loyalty",
        value: "Персональные офферы",
        detail: "Скидки на любимое блюдо каждому гостю",
        target: "offers",
      },
      {
        id: "growth-recurring",
        label: "Recurring",
        value: "Meal plans и подписки",
        detail: "Recurring ordering — уже в продукте",
        target: "offers",
      },
      {
        id: "growth-retention",
        label: "Retention",
        value: "Без Excel и таблиц",
        detail: "Loyalty logic внутри Telegram",
        target: "header",
      },
    ],
    mode: "growth",
    tone: "growth",
    phone: {
      eyebrow: "Growth engine",
      title: "Подписки и офферы",
      caption: "Recurring orders и персональные предложения.",
      metric: "Retention",
    },
  },
  {
    id: "analytics",
    step: "05 / ЭКОНОМИКА",
    role: "proof",
    title: "Видите, что работает — без догадок",
    body: "Repeat orders, retention, средний чек, direct order share, частота гостей и ROI кампаний — в одном view. Решения на операционных данных, не на ощущениях.",
    callouts: [
      {
        id: "analytics-direct",
        label: "Direct share",
        value: "Доля прямых заказов",
        detail: "Сколько уходит мимо агрегаторов",
        target: "analytics",
      },
      {
        id: "analytics-repeat",
        label: "Повторы",
        value: "Repeat & retention",
        detail: "Частота, средний чек, кампании",
        target: "analytics",
      },
      {
        id: "analytics-roi",
        label: "Кампании",
        value: "Performance в цифрах",
        detail: "Что приносит выручку — видно сразу",
        target: "analytics",
      },
    ],
    mode: "analytics",
    tone: "analytics",
    phone: {
      eyebrow: "Аналитика",
      title: "Dashboard владельца",
      caption: "Direct share, repeat orders, ROI кампаний.",
      metric: "Direct %",
    },
  },
];

export const productCapabilitiesIntro = {
  kicker: "Что входит в MOO",
  title: "Полный функционал — одна платформа",
  body: "Не delivery app и не конструктор бота. Telegram-native restaurant growth platform для ресторанов, dark kitchen и delivery-first проектов.",
};

export const productCapabilities: ProductCapability[] = [
  {
    id: "ordering",
    tag: "Mini App",
    title: "Заказы в Telegram",
    description:
      "Доставка, самовывоз, зал, preorder. Оплата: Telegram Payments, локальный эквайринг, наличные. Live-статус: принят → готовится → в пути → готов.",
  },
  {
    id: "owner-panel",
    tag: "Owner panel",
    title: "Управление без разработчиков",
    description:
      "Меню, цены, фото, стоп-лист, баннеры, акции, категории, часы работы, upsell-блоки. Push: массовые, сегментированные, триггерные.",
  },
  {
    id: "kitchen",
    tag: "Kitchen",
    title: "Lightweight kitchen flow",
    description:
      "Очередь заказов, статусы, preparation flow. Фокус — owner и growth tools, но операционка кухни закрыта.",
  },
  {
    id: "crm",
    tag: "CRM",
    title: "Профили и сегменты",
    description:
      "История заказов, любимые блюда, средний чек, частота, retention. Сегменты: VIP, new, sleeping, regulars, high-чек, подписчики.",
  },
  {
    id: "growth",
    tag: "Growth",
    title: "Loyalty и recurring",
    description:
      "Персональные офферы, скидки, retention mechanics. Recurring ordering работает, subscription engine — в roadmap.",
  },
  {
    id: "analytics",
    tag: "Аналитика",
    title: "Dashboard владельца",
    description:
      "Repeat orders, retention, средний чек, direct order share, ROI кампаний, subscription performance.",
  },
  {
    id: "integrations",
    tag: "Integrations",
    title: "Integration-ready",
    description:
      "Telegram Bot API, iiko, кассы, эквайринг, delivery workflows. Архитектура под локальный рынок.",
  },
  {
    id: "pricing",
    tag: "Модель",
    title: "Не агрегатор — подписка",
    description:
      "Setup fee + subscription + optional growth modules. Ресторан владеет гостями и маржой напрямую. Без % с заказа как у delivery apps.",
  },
];

export const mobileFinalCta = {
  kicker: "06 / ЗАПУСК",
  title: "Direct orders за 48 часов",
  body: "Mini App, меню, бот, брендинг, оплата и operational setup — в fast onboarding. Guest ownership и repeat revenue infrastructure с первого дня.",
  primary: "Написать @bayshev",
  secondary: "Live demo · @topka_demo_bot",
};
