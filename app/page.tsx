export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            Own your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyan-200">
              customer relationships
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            MOO is an AI growth platform for restaurants inside Telegram Mini Apps.
            Track behavior, predict intent, launch automations, and increase repeat revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg border border-cyan-500/50 text-white hover:bg-cyan-600/10 transition-colors">
              Start free
            </button>
            <button className="px-8 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/30 transition-colors">
              See demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";
import { MobileExperience } from "./components/mobile/MobileExperience";
import type { MobileSceneData } from "./components/mobile/types";

type AnimationTimeline = {
  to: (...args: any[]) => AnimationTimeline;
};

const sections = [
  {
    id: "hero",
    kicker: "SECTION 01 / OPENING",
    title: "Свой канал продаж. Больше выручки. Меньше комиссии.",
    body: "Прямые заказы, подписки и CRM внутри Telegram.",
    signals: ["без посредников", "ваши гости", "запуск 48ч"],
  },
  {
    id: "pain",
    kicker: "SECTION 02 / PAIN",
    title: "Агрегатор забирает маржу.",
    body: "Комиссия уходит наружу. Гость и данные остаются не у вас.",
    signals: ["-30% маржи", "данные потеряны", "гость не ваш"],
  },
  {
    id: "crm",
    kicker: "SECTION 03 / CRM",
    title: "Гость больше не исчезает.",
    body: "История заказов, вкусы и возврат гостя в одном профиле.",
    signals: ["история заказов", "любимые блюда", "+24% возврат"],
  },
  {
    id: "features",
    kicker: "SECTION 04 / FEATURES",
    title: "Меню, магазин, подписки и CRM.",
    body: "Меню, магазин, подписки и нотификации работают как одна витрина.",
    signals: ["меню", "магазин", "апселл", "стоп-лист"],
  },
  {
    id: "setup",
    kicker: "SECTION 05 / SETUP",
    title: "Маркетинг без маркетолога.",
    body: "Выбираете цель. MOO собирает сегмент, оффер и пуш.",
    signals: ["сегмент", "оффер", "пуш"],
  },
  {
    id: "subs",
    kicker: "SECTION 06 / SUBS",
    title: "Кэш вперёд через подписки.",
    body: "Lunch pass превращает будущие визиты в предоплату.",
    signals: ["prepaid", "renewal", "cashflow"],
  },
  {
    id: "economy",
    kicker: "SECTION 07 / ECONOMY",
    title: "Окупаемость считается сразу.",
    body: "MOO сразу показывает выручку, комиссию и срок окупаемости.",
    signals: ["direct revenue", "saved fees", "roi"],
  },
  {
    id: "offer",
    kicker: "SECTION 08 / OFFER",
    title: "MOO в коробке.",
    body: "Mini App, owner panel, CRM, loyalty и запуск за 48 часов.",
    signals: ["mini app", "owner panel", "ready"],
  },
];

const mobileScenes: MobileSceneData[] = [
  {
    id: "direct",
    kicker: "01 / ЗАПУСК",
    title: "Ваш канал продаж в Telegram запущен",
    body: "Принимайте заказы напрямую. Без комиссии агрегатора. Гости остаются вашими.",
    signals: ["direct orders", "0% aggregator fee"],
    tone: "direct",
  },
  {
    id: "pain",
    kicker: "02 / ПРОБЛЕМА",
    title: "Видите, где теряете маржу",
    body: "Агрегаторы забирают комиссию и отношения с гостем. MOO показывает, где именно вы теряете прибыль.",
    signals: ["margin leak", "guest data lost"],
    tone: "pain",
  },
  {
    id: "crm",
    kicker: "03 / РЕШЕНИЕ",
    title: "Гость становится вашим активом",
    body: "CRM собирает историю заказов, предпочтения и возвращает гостей автоматически.",
    signals: ["guest profile", "auto win-back"],
    tone: "crm",
  },
  {
    id: "commerce",
    kicker: "04 / ПРОДАЖИ",
    title: "Меню продаёт само",
    body: "Блюда, модификаторы, стоп-лист и апселл работают как одна витрина.",
    signals: ["menu", "upsell", "live availability"],
    tone: "commerce",
  },
  {
    id: "roi",
    kicker: "05 / РЕЗУЛЬТАТ",
    title: "Считаете прибыль, а не комиссии",
    body: "Калькулятор показывает ROI от перехода на прямой канал в Telegram.",
    signals: ["roi calculator", "48h launch"],
    tone: "roi",
  },
];

function SplashScreen() {
  return (
    <div className="phone-screen-ui platform-phone-screen launch-dashboard-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>MOO Restaurant OS</span>
        <b className="platform-live-dot">LIVE</b>
      </div>

      <div className="platform-hero-status">
        <span>Канал активен</span>
        <strong>Ваш ресторан в Telegram</strong>
      </div>

      <div className="launch-checklist">
        {["Menu connected", "CRM ready", "Direct orders live"].map((item) => (
          <div key={item}>
            <span>{item}</span>
            <Check size={15} />
          </div>
        ))}
      </div>

      <div className="launch-result-grid">
        <section>
          <span>Новый заказ</span>
          <strong>1 450 ฿</strong>
          <p>#1024 • 2 мин назад</p>
        </section>
        <section>
          <span>Новый гость</span>
          <strong>Анна К.</strong>
          <p>1-й заказ</p>
        </section>
      </div>

      <div className="platform-fee-row">
        <span>Aggregator fee</span>
        <strong>0%</strong>
      </div>
    </div>
  );
}

function PainScreen() {
  return (
    <div className="phone-screen-ui platform-phone-screen leak-dashboard-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>Leak Monitor</span>
        <TrendingDown size={16} />
      </div>

      <div className="leak-commission-card">
        <span>Aggregator commission</span>
        <strong>-30%</strong>
        <p>с каждого заказа уходит наружу</p>
      </div>

      <div className="leak-split-chart">
        <div>
          <span>Вы получаете</span>
          <strong>70%</strong>
          <i />
        </div>
        <div>
          <span>Агрегатор забирает</span>
          <strong>30%</strong>
          <i />
        </div>
      </div>

      <div className="leak-status-list">
        {["Guest ownership: 0%", "Repeat order: lost", "Guest contact: hidden"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="cinema-line-chart danger-line" aria-hidden="true">
        {[76, 66, 58, 49, 42, 36, 29].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

function CrmScreen() {
  return (
    <div className="phone-screen-ui platform-phone-screen crm-dashboard-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>Guest profile</span>
        <ScanFace size={16} />
      </div>

      <div className="crm-profile-card">
        <div className="cinema-avatar">A</div>
        <section>
          <strong>Анна К.</strong>
          <span>5 заказов • 12 650 ฿</span>
          <b>VIP</b>
        </section>
      </div>

      <div className="crm-detail-grid">
        <section>
          <span>Любимые блюда</span>
          <strong>Паста, лосось, латте</strong>
        </section>
        <section>
          <span>Последний визит</span>
          <strong>2 дня назад</strong>
        </section>
        <section>
          <span>Return rate</span>
          <strong>+24%</strong>
        </section>
      </div>

      <div className="crm-suggestion-card">
        <span>Win-back suggestion</span>
        <strong>Отправить персональное предложение</strong>
        <Zap size={16} />
      </div>
    </div>
  );
}

function FeaturesScreen() {
  return (
    <div className="phone-screen-ui platform-phone-screen menu-dashboard-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>Menu</span>
        <Menu size={16} />
      </div>

      <div className="menu-category-row">
        <span>Популярное</span>
        <span>Пицца</span>
        <span>Сеты</span>
      </div>

      <div className="menu-product-list">
        {[
          ["Стейк Рибай", "1 890 ฿", "Medium • соус"],
          ["Паста с креветками", "980 ฿", "Сливочный соус • пармезан"],
          ["Трюфельное масло", "+120 ฿", "часто добавляют"],
        ].map(([name, price, meta]) => (
          <section key={name}>
            <div />
            <span>
              <strong>{name}</strong>
              <em>{meta}</em>
            </span>
            <b>{price}</b>
          </section>
        ))}
      </div>

      <div className="menu-availability-row">
        <span>Stop-list synced</span>
        <strong>LIVE</strong>
      </div>

      <div className="menu-cart-row">
        <span>Корзина • 2 товара</span>
        <strong>2 870 ฿</strong>
      </div>
    </div>
  );
}

function SetupScreen() {
  return (
    <div className="phone-screen-ui cinema-phone-screen campaign-cinema-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>Кампания</span>
        <Rocket size={16} />
      </div>

      <div className="cinema-campaign-core">
        <span>Goal</span>
        <strong>Вернуть гостей</strong>
        <p>Segment selected: not visited 14+ days</p>
      </div>

      <div className="cinema-step-line">
        <span><Goal size={13} />goal</span>
        <span><Flame size={13} />offer</span>
        <span><Zap size={13} />push</span>
      </div>

      <button className="phone-primary cinema-primary-button">Launch campaign</button>
    </div>
  );
}

function SubsScreen() {
  return (
    <div className="phone-screen-ui cinema-phone-screen subs-cinema-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>Subscriptions</span>
        <Sparkles size={16} />
      </div>

      <div className="cinema-pass-core">
        <span>Lunch Pass</span>
        <strong>12 900 ฿</strong>
        <p>20 обедов • prepaid • 30 days</p>
      </div>

      <div className="cinema-prepaid-receipt">
        <span>Cash collected</span>
        <strong>+86 400 ฿</strong>
      </div>

      <div className="cinema-line-chart success-line" aria-hidden="true">
        {[26, 34, 42, 51, 58, 66, 78].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

function EconomyScreen() {
  return (
    <div className="phone-screen-ui platform-phone-screen roi-dashboard-screen">
      <div className="phone-topline cinema-phone-topline">
        <span>Экономика</span>
        <Sparkles size={16} />
      </div>

      <div className="roi-slider-card">
        <span>Прямые заказы в месяц</span>
        <strong>120</strong>
        <i><b /></i>
      </div>

      <div className="roi-result-grid">
        <section>
          <span>Сэкономлено на комиссии</span>
          <strong>18 000 ฿</strong>
          <p>в месяц</p>
        </section>
        <section>
          <span>Окупаемость</span>
          <strong>3 дня</strong>
          <p>средняя</p>
        </section>
      </div>

      <div className="launch-checklist roi-checklist">
        {["Mini App ready", "CRM connected", "Launch in 48h"].map((item) => (
          <div key={item}>
            <span>{item}</span>
            <Check size={15} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferScreen() {
  return (
    <div className="phone-screen-ui cinema-phone-screen launch-cinema-screen">
      <div className="success-mark cinema-success-mark"><Check size={34} /></div>
      <span>System live</span>
      <strong>Ваш ресторан в Telegram</strong>
      <p>Mini App, CRM, loyalty and owner panel are ready.</p>
      <button className="phone-primary cinema-primary-button">Open dashboard</button>
    </div>
  );
}

function MobileLaunchScreen() {
  return (
    <div className="phone-screen-ui moo-product-phone launch-product-screen">
      <div className="moo-product-topbar">
        <span>MOO</span>
        <b>LIVE</b>
      </div>

      <section className="launch-product-hero">
        <span>Restaurant OS</span>
        <strong>Канал активен</strong>
        <p>Ваш ресторан принимает заказы в Telegram</p>
      </section>

      <section className="launch-progress-card">
        <div>
          <span>Прогресс запуска</span>
          <strong>5 из 5</strong>
        </div>
        <i><b /></i>
      </section>

      <div className="moo-checklist">
        {["Telegram-бот подключён", "Меню загружено", "CRM готова", "Прямые заказы включены"].map((item) => (
          <div key={item}>
            <span>{item}</span>
            <Check size={14} />
          </div>
        ))}
      </div>

      <div className="launch-result-grid">
        <section>
          <span>Новый заказ</span>
          <strong>1 450 ฿</strong>
        </section>
        <section>
          <span>Новый гость</span>
          <strong>Анна К.</strong>
        </section>
      </div>

      <nav className="moo-mini-nav" aria-label="Mini app navigation">
        <span>Menu</span>
        <span>Guests</span>
        <span>Orders</span>
      </nav>
    </div>
  );
}

function MobileLeakScreen() {
  return (
    <div className="phone-screen-ui moo-product-phone leak-product-screen">
      <div className="moo-product-topbar">
        <span>Утечка маржи</span>
        <TrendingDown size={15} />
      </div>

      <section className="leak-product-card">
        <span>Комиссия агрегатора</span>
        <strong>-30%</strong>
        <p>с каждого заказа уходит наружу</p>
      </section>

      <section className="leak-profit-compare">
        <div>
          <span>Ваша прибыль</span>
          <strong>70%</strong>
          <i />
        </div>
        <div>
          <span>Агрегатор</span>
          <strong>30%</strong>
          <i />
        </div>
      </section>

      <div className="leak-loss-list">
        {["Данные о гостях", "Прямой контакт", "Повторные заказы"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="leak-mini-bars" aria-hidden="true">
        {[72, 63, 55, 45, 38, 31].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

function MobileCrmScreen() {
  return (
    <div className="phone-screen-ui moo-product-phone crm-product-screen">
      <div className="moo-product-topbar">
        <span>Гость</span>
        <ScanFace size={15} />
      </div>

      <section className="crm-product-profile">
        <div className="crm-product-avatar">A</div>
        <div>
          <strong>Анна К.</strong>
          <span>5 заказов • 12 650 ฿</span>
          <b>VIP</b>
        </div>
      </section>

      <section className="crm-food-strip" aria-label="Любимые блюда">
        {["Паста", "Лосось", "Латте"].map((item) => (
          <div key={item}>
            <i />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <div className="crm-info-grid">
        <section>
          <span>Последний заказ</span>
          <strong>2 дня назад</strong>
        </section>
        <section>
          <span>Вероятность возврата</span>
          <strong>Высокая</strong>
          <b>+24%</b>
        </section>
      </div>

      <button className="crm-send-offer" type="button">
        <span>Отправить персональное предложение</span>
        <Zap size={15} />
      </button>
    </div>
  );
}

function MobileMenuScreen() {
  return (
    <div className="phone-screen-ui moo-product-phone menu-product-screen">
      <div className="moo-menu-topbar">
        <strong>MOO</strong>
        <Menu size={17} />
      </div>

      <div className="moo-menu-tabs">
        <span className="is-active">Популярное</span>
        <span>Пицца</span>
        <span>Сеты</span>
        <span>Напитки</span>
      </div>

      <div className="moo-menu-list">
        {[
          ["Стейк Рибай", "Medium • с овощами гриль", "1 890 ฿"],
          ["Паста с креветками", "Сливочный соус • пармезан", "980 ฿"],
          ["Трюфельное масло", "Часто добавляют", "+120 ฿"],
        ].map(([name, meta, price]) => (
          <section key={name}>
            <i />
            <div>
              <strong>{name}</strong>
              <span>{meta}</span>
            </div>
            <b>{price}</b>
            <button type="button" aria-label={`Добавить ${name}`}>+</button>
          </section>
        ))}
      </div>

      <div className="moo-menu-sync">
        <span>Stop-list synced</span>
        <strong>LIVE</strong>
      </div>

      <div className="moo-cart-bar">
        <span>Корзина • 2 товара</span>
        <strong>2 870 ฿</strong>
      </div>
    </div>
  );
}

function MobileRoiScreen() {
  return (
    <div className="phone-screen-ui moo-product-phone roi-product-screen">
      <div className="moo-product-topbar">
        <span>ROI калькулятор</span>
        <Sparkles size={15} />
      </div>

      <section className="roi-product-slider">
        <span>Прямые заказы в месяц</span>
        <strong>120</strong>
        <i><b /></i>
      </section>

      <div className="roi-product-grid">
        <section>
          <span>Экономия на комиссии</span>
          <strong>18 000 ฿</strong>
        </section>
        <section>
          <span>Окупаемость</span>
          <strong>3 дня</strong>
        </section>
      </div>

      <section className="roi-launch-card">
        <span>Запуск под ключ</span>
        <strong>48 часов</strong>
      </section>

      <button className="roi-product-cta" type="button">Рассчитать запуск</button>
    </div>
  );
}

const phoneScreens = [
  <SplashScreen key="splash" />,
  <PainScreen key="pain" />,
  <CrmScreen key="crm" />,
  <FeaturesScreen key="features" />,
  <SetupScreen key="setup" />,
  <SubsScreen key="subs" />,
  <EconomyScreen key="economy" />,
  <OfferScreen key="offer" />,
];

const phoneScreenKeys = [
  "splash",
  "pain",
  "crm",
  "features",
  "setup",
  "subs",
  "economy",
  "offer",
];

const mobilePhoneScreens = [
  <MobileLaunchScreen key="mobile-splash" />,
  <MobileLeakScreen key="mobile-pain" />,
  <MobileCrmScreen key="mobile-crm" />,
  <MobileMenuScreen key="mobile-features" />,
  <MobileRoiScreen key="mobile-economy" />,
];

const mobilePhoneScreenKeys = [
  "mobile-splash",
  "mobile-pain",
  "mobile-crm",
  "mobile-features",
  "mobile-economy",
];

function StoryTitle({ text }: { text: string }) {
  const dimmedWords = new Set(["система", "прямых", "продаж", "кармане?", "профиль", "тап.", "кэш", "20", "коробке."]);

  return (
    <>
      {text.split(" ").map((word, index) => (
        <span className={`title-word ${dimmedWords.has(word) ? "is-dim" : ""}`} key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </>
  );
}

function MobileSignals({ signals }: { signals: string[] }) {
  return (
    <div className="mobile-signal-row" aria-label="Section signals">
      {signals.map((signal) => (
        <span key={signal}>{signal}</span>
      ))}
    </div>
  );
}

function QRMockup() {
  const on = new Set([0, 1, 2, 4, 5, 6, 7, 14, 16, 18, 20, 21, 23, 24, 28, 30, 32, 34, 35, 40, 42, 43, 44, 46, 48]);

  return (
    <div className="qr-mock" aria-label="QR code mockup">
      {Array.from({ length: 49 }).map((_, index) => (
        <i className={on.has(index) ? "on" : ""} key={index} />
      ))}
    </div>
  );
}

function SectionBento({ index }: { index: number }) {
  if (index === 0) {
    return null;
  }

  if (index === 1) {
    return (
      <div className="bento-grid pain-bento compact-proof-bento">
        <div className="bento-card loss-counter" data-counter="2500">
          <span>margin leak</span>
          <strong>0</strong>
          <em>THB/day</em>
        </div>

        <div className="bento-card quiet-proof-card">
          <span>missed guests</span>
          <strong>350/mo</strong>
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="bento-grid crm-bento">
        <div className="bento-card"><strong>+18%</strong><span>Guest Retention</span></div>
        <div className="bento-card"><strong>+25%</strong><span>Win-back success</span></div>
        <div className="bento-card wide id-cloud"><span>ID 4812</span><span>ID 9041</span><span>ID 1170</span><span>ID 3508</span></div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="bento-grid features-bento">
        <div className="bento-card">
          <strong>MENU</strong>
          <span>restaurant editor</span>
        </div>

        <div className="bento-card">
          <strong>CRM</strong>
          <span>guest profiles</span>
        </div>

        <div className="bento-card wide">
          <strong>SUBSCRIPTIONS + NOTIFY</strong>
          <span>direct retention engine</span>
        </div>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="bento-grid setup-bento">
        <div className="bento-card"><strong>50k THB</strong><span>Saved Marketer Cost</span></div>
        <div className="bento-card"><strong>1hr</strong><span>Campaign Launch</span></div>
        <div className="bento-card wide"><strong>100%</strong><span>Customer Data Ownership</span></div>
      </div>
    );
  }

  if (index === 5) {
    return (
      <div className="bento-grid subs-bento">
        <div className="bento-card massive counter" data-counter="86400"><strong>+0</strong><span>THB Upfront Cash</span></div>
        <div className="bento-card wide progress-card"><span>Collected today vs goal</span><i><b /></i></div>
      </div>
    );
  }

  if (index === 6) {
    return (
      <div className="bento-grid economy-bento">
        <div className="tilt-scale">
          <div><span>Grab</span><strong>-30%</strong></div>
          <i />
          <div><span>MOO</span><strong>0%</strong></div>
        </div>
        <div className="bento-card wide"><strong>20 orders</strong><span>Break-even</span></div>
      </div>
    );
  }

  return (
    <div className="bento-grid offer-bento">
      <div className="bento-card massive"><strong>30,000 THB</strong><span>Launch in 48h</span></div>
      <div className="bento-card qr-card"><QRMockup /><span>Telegram demo</span></div>
      <button className="final-cta" type="button">GET STARTED NOW</button>
    </div>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!pageRef.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) return;

    const initDesktopTimeline = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !pageRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        const bento = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".bento-card, .tilt-scale, .final-cta"));
        const kicker = section.querySelector(".story-copy > span");
        const body = section.querySelector(".story-copy p");
        const copyMeta = [kicker, body].filter(Boolean) as Element[];
        const titleWords = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".title-word"));
        const phoneLayers = section.querySelectorAll<HTMLElement>(".phone-layer");
        const previousLayer = phoneLayers[0];
        const nextLayer = phoneLayers[1];
        const nextScreenItems = nextLayer
          ? gsap.utils.toArray<HTMLElement>(nextLayer.querySelectorAll(".phone-screen-ui > *"))
          : [];
        const snoutDots = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".snout-dot"));
        const signalPills = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".signal-pill"));
        const bootLines = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".boot-line"));
        const openingCore = section.querySelector(".opening-core");
        const heroStatic = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".hero-brandline, .hero-utility-panel, .hero-primary-cta-row"));

        if (!previousLayer) return;

        gsap.set(copyMeta, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 28,
        });

        gsap.set(titleWords, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : () => gsap.utils.random(18, 46),
          x: index === 0 ? 0 : () => gsap.utils.random(-10, 10),
          filter: index === 0 ? "blur(0px)" : "blur(10px)",
        });

        gsap.set(phoneLayers, {
          autoAlpha: 0,
          y: 18,
          scale: 0.985,
        });

        gsap.set(previousLayer, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });

        gsap.set(bento, {
          autoAlpha: 0,
          y: () => gsap.utils.random(18, 44),
          scale: 0.9,
          x: () => gsap.utils.random(28, 64),
        });

        gsap.set(nextScreenItems, {
          autoAlpha: 0,
          y: () => gsap.utils.random(12, 30),
          filter: "blur(8px)",
        });

        gsap.set(signalPills, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 24,
          scale: index === 0 ? 1 : 0.92,
        });

        gsap.set(bootLines, {
          autoAlpha: index === 0 ? 1 : 0,
          x: index === 0 ? 0 : -16,
        });

        if (index === 0 && openingCore) {
          gsap.set(openingCore, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          });
        }

        if (index === 0) {
          gsap.set(heroStatic, {
            autoAlpha: 1,
            y: 0,
          });
        }

        const addCounterTweens = (timeline: AnimationTimeline) => {
          section.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
            const target = Number(el.dataset.counter || 0);
            const strong = el.querySelector("strong");
            if (!strong) return;

            const counter = { value: 0 };
            timeline.to(counter, {
              value: target,
              duration: index === 1 ? 0.9 : 0.7,
              ease: "power2.out",
              onUpdate: () => {
                const value = Math.round(counter.value).toLocaleString("en-US");
                strong.textContent = index === 1 ? value : strong.textContent?.includes("%") ? `-${value}%` : `+${value}`;
              },
            }, "<");
          });
        };

        const sectionTimeline = gsap.timeline({
          defaults: {
            duration: 0.55,
            ease: "power3.out",
          },
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=200%",
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (index === 0) {
          sectionTimeline.to(snoutDots, {
            scale: 1.35,
            opacity: 1,
            yoyo: true,
            repeat: 1,
            transformOrigin: "center",
            stagger: 0.08,
            duration: 0.28,
          });

          sectionTimeline
            .to(bootLines, {
              autoAlpha: 1,
              x: 0,
              stagger: 0.08,
              duration: 0.28,
            }, "<")
            .to(signalPills, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              stagger: 0.12,
              duration: 0.45,
            }, ">-0.1");

          sectionTimeline.to(heroStatic, {
            autoAlpha: 0,
            y: -16,
            stagger: 0.04,
            duration: 0.35,
          }, ">+=0.25");
        }

        sectionTimeline
          .to(kicker, {
            autoAlpha: 1,
            y: 0,
          })
          .to(titleWords, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            stagger: {
              each: 0.08,
              from: "random",
            },
          }, "+=0.08")
          .to(body, {
            autoAlpha: 1,
            y: 0,
          }, "+=0.12");

        if (nextLayer) {
          sectionTimeline
            .to(previousLayer, {
              autoAlpha: 0,
              y: -18,
              scale: 1.012,
              duration: 0.65,
            }, "+=0.2")
            .to(nextLayer, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
            }, "<+=0.1")
            .to(nextScreenItems, {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: {
                each: 0.08,
                from: "random",
              },
              duration: 0.55,
            }, "<+=0.18");
        }

        sectionTimeline
          .to(bento, {
            autoAlpha: 0.8,
            y: 0,
            x: 0,
            scale: 1,
            stagger: 0.2,
          }, "+=0.5");

        addCounterTweens(sectionTimeline);

        sectionTimeline
          .to({}, { duration: 0.4 })
          .to(bento, {
            autoAlpha: 0,
            y: -18,
            scale: 0.9,
            stagger: 0.08,
          })
          .to([...copyMeta, ...titleWords], {
            autoAlpha: 0,
            y: -22,
            stagger: 0.08,
          }, "<");
      });
      }, pageRef);
    };

    initDesktopTimeline();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <main className="moo-page" ref={pageRef}>
      <MobileExperience
        phoneScreenKeys={mobilePhoneScreenKeys}
        phoneScreens={mobilePhoneScreens}
        scenes={mobileScenes}
      />

      <div className="desktop-story-stream">
        {sections.map((section, index) => (
          <article
            className="story-panel"
            data-section-index={index}
            id={section.id}
            key={section.id}
            ref={(node) => {
              if (node) sectionRefs.current[index] = node;
            }}
          >
              {index === 0 && (
                <>
                  <div className="hero-brandline">
                    <strong>MOO</strong>
                    <span>FOODTECH GROWTH PLATFORM</span>
                  </div>

                  <div className="hero-utility-panel">
                    <button type="button">RU</button>
                    <button type="button">DARK</button>
                    <button type="button">DEMO</button>
                  </div>
                </>
              )}

              <div className="story-copy">
                <span>{section.kicker}</span>
                <h1><StoryTitle text={section.title} /></h1>
                <p>{section.body}</p>
                <MobileSignals signals={section.signals} />

                {index === 0 && (
                  <div className="hero-primary-cta-row">
                    <button type="button">BOOK DEMO</button>
                    <span>launch in 48h</span>
                  </div>
                )}
              </div>

              <section className="phone-column" aria-label="MOO app preview">
                <div className="ambient-orb ambient-orb-a" />
                <div className="ambient-orb ambient-orb-b" />

                <div className="iphone-shell">
                  <div className="iphone-island" />
                  <div className="iphone-screen">
                    {[index, index + 1]
                      .filter((screenIndex) => screenIndex < phoneScreens.length)
                      .map((screenIndex, layerIndex) => (
                      <div className={`phone-layer ${layerIndex === 0 ? "initial-visible" : ""}`} key={phoneScreenKeys[screenIndex]}>
                        {phoneScreens[screenIndex]}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <SectionBento index={index} />
          </article>
        ))}
      </div>
    </main>
  );
}
