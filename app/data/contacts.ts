export const mooContacts = {
  /** Live demo — ресторан на проде */
  demoBot: "https://t.me/topka_demo_bot",
  demoBotHandle: "@topka_demo_bot",
  /** Founder / onboarding */
  founder: "https://t.me/bayshev",
  founderHandle: "@bayshev",
} as const;

/** Единые подписи для CTA по всему лендингу */
export const mooCta = {
  start: {
    href: mooContacts.founder,
    label: "Начать работу",
    short: "Начать",
  },
  demoBot: {
    href: mooContacts.demoBot,
    label: "Демо-ресторан в Telegram",
    short: "Демо-бот",
  },
  demoSite: {
    href: "#demo",
    label: "Смотреть на сайте",
    short: "На сайте",
  },
  ask: {
    href: mooContacts.founder,
    label: "Написать нам",
    short: "Спросить",
  },
} as const;
