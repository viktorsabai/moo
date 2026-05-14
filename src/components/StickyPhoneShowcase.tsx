"use client";

import { ReactNode, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Clock3,
  MessageCircle,
  Radio,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "../lib/utils";

type SceneId =
  | "commerce"
  | "analytics"
  | "guest"
  | "ai"
  | "automation"
  | "revenue"
  | "system";

interface Scene {
  id: SceneId;
  step: string;
  label: string;
  title: string;
  body: string;
  cards: OverlayCardData[];
  metrics?: MetricData[];
}

interface OverlayCardData {
  title: string;
  body: string;
  meta: string;
  icon: ReactNode;
  position: string;
}

interface MetricData {
  value: string;
  label: string;
}

const scenes: Scene[] = [
  {
    id: "commerce",
    step: "01",
    label: "Telegram commerce",
    title: "Own the order before you optimize the guest.",
    body: "A real Telegram Mini App storefront, not a delivery marketplace clone. Menu, cart and guest identity stay inside the restaurant channel.",
    cards: [
      {
        title: "Сигнал гостя",
        body: "6 просмотров меню · 0 заказов",
        meta: "intent detected",
        icon: <Radio className="h-4 w-4" />,
        position: "left-[7%] top-[27%]",
      },
      {
        title: "Mini App живой",
        body: "USSR · Telegram · корзина активна",
        meta: "owned commerce",
        icon: <MessageCircle className="h-4 w-4" />,
        position: "right-[7%] bottom-[28%]",
      },
    ],
  },
  {
    id: "analytics",
    step: "02",
    label: "Guest intelligence",
    title: "MOO sees what restaurants usually miss.",
    body: "Views, carts, favorites, inactivity and high-value guests become usable retention signals.",
    cards: [
      {
        title: "23 гостя",
        body: "готовы к действию сегодня",
        meta: "conversion window",
        icon: <Users className="h-4 w-4" />,
        position: "left-[8%] bottom-[28%]",
      },
      {
        title: "₽42 800",
        body: "в брошенных корзинах",
        meta: "recoverable demand",
        icon: <Clock3 className="h-4 w-4" />,
        position: "right-[8%] top-[26%]",
      },
    ],
  },
  {
    id: "guest",
    step: "03",
    label: "Guest behavior",
    title: "Every guest becomes an operating file.",
    body: "The team sees what the guest wanted, where they stopped and what action is most likely to bring them back.",
    cards: [
      {
        title: "Смотрит, не покупает",
        body: "том ям · пад тай · 4 визита",
        meta: "behavior state",
        icon: <Sparkles className="h-4 w-4" />,
        position: "left-[7%] top-[28%]",
      },
      {
        title: "Не общий сегмент",
        body: "конкретный человек и контекст",
        meta: "guest CRM",
        icon: <Users className="h-4 w-4" />,
        position: "right-[8%] bottom-[28%]",
      },
    ],
  },
  {
    id: "ai",
    step: "04",
    label: "Practical AI",
    title: "AI recommends the next commercial move.",
    body: "No abstract assistant. MOO turns behavior into a launchable offer, message or retention action.",
    cards: [
      {
        title: "15% на первый заказ",
        body: "лучшее действие для Анны",
        meta: "+18% probability",
        icon: <Bot className="h-4 w-4" />,
        position: "right-[7%] top-[27%]",
      },
      {
        title: "Основано на блюдах",
        body: "оффер связан с тем, что гость смотрел",
        meta: "not spam",
        icon: <Zap className="h-4 w-4" />,
        position: "left-[8%] bottom-[28%]",
      },
    ],
  },
  {
    id: "automation",
    step: "05",
    label: "Telegram loops",
    title: "Retention runs inside Telegram.",
    body: "MOO detects the moment, sends the message and tracks the repeat order back to the loop.",
    cards: [
      {
        title: "AI detects",
        body: "гость неактивен 7 дней",
        meta: "loop trigger",
        icon: <Radio className="h-4 w-4" />,
        position: "left-[7%] top-[28%]",
      },
      {
        title: "847 сообщений",
        body: "персональные Telegram офферы",
        meta: "campaign live",
        icon: <MessageCircle className="h-4 w-4" />,
        position: "right-[7%] bottom-[27%]",
      },
    ],
    metrics: [
      { value: "12", label: "active loops" },
      { value: "847", label: "messages sent" },
      { value: "+32%", label: "return lift" },
    ],
  },
  {
    id: "revenue",
    step: "06",
    label: "Repeat revenue",
    title: "Recover demand you already paid to acquire.",
    body: "The point is not prettier analytics. The point is returning guests, recovered carts and higher lifetime value.",
    cards: [],
    metrics: [
      { value: "+292%", label: "repeat revenue" },
      { value: "₽850K", label: "recovered monthly" },
      { value: "₽0", label: "returning guest CAC" },
    ],
  },
  {
    id: "system",
    step: "07",
    label: "Growth system",
    title: "This is the restaurant growth operating system.",
    body: "Telegram Mini App commerce, Guest CRM, AI recommendations and retention loops working as one channel.",
    cards: [
      {
        title: "MOO OS",
        body: "commerce · CRM · AI · loops",
        meta: "one system",
        icon: <TrendingUp className="h-4 w-4" />,
        position: "left-[8%] top-[28%]",
      },
      {
        title: "100% relationship",
        body: "audience stays with the restaurant",
        meta: "owned channel",
        icon: <Check className="h-4 w-4" />,
        position: "right-[8%] bottom-[28%]",
      },
    ],
  },
];

export function StickyPhoneShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.9,
  });
  const phoneY = useTransform(smoothProgress, [0, 1], [12, -12]);
  const activeScene = scenes[activeIndex];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(
      Math.min(scenes.length - 1, Math.max(0, Math.floor(latest * scenes.length)))
    );
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020404] text-white">
      <section
        ref={containerRef}
        style={{ position: "relative" }}
        className="relative min-h-[760vh] bg-[radial-gradient(circle_at_50%_20%,rgba(42,171,238,0.14),transparent_30%),linear-gradient(180deg,#020404_0%,#06100f_44%,#020404_100%)]"
      >
        <div className="sticky top-0 min-h-screen overflow-hidden">
          <Texture />
          <div className="mx-auto grid min-h-screen w-full max-w-[1500px] grid-cols-1 items-center gap-8 px-5 py-6 md:px-10 lg:grid-cols-[minmax(330px,0.9fr)_360px_minmax(280px,0.8fr)] lg:px-16">
            <Brand />

            <div className="relative z-20 order-2 flex min-h-[360px] items-center lg:order-1">
              <AnimatePresence mode="wait">
                <SceneCopy key={activeScene.id} scene={activeScene} />
              </AnimatePresence>
            </div>

            <motion.div
              className="relative z-30 order-1 mx-auto lg:order-2"
              style={{ y: phoneY }}
            >
              <PhoneGlow />
              <PhoneFrame>
                <PhoneScreen state={activeScene.id} />
              </PhoneFrame>
            </motion.div>

            <div className="relative z-20 order-3 hidden min-h-[420px] items-center justify-end lg:flex">
              <SceneRail activeIndex={activeIndex} />
            </div>

            <AnimatePresence mode="popLayout">
              {activeScene.cards.map((card) => (
                <OverlayCard key={`${activeScene.id}-${card.title}`} card={card} />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {activeScene.metrics ? (
                <motion.div
                  key={`${activeScene.id}-metrics`}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-6 left-1/2 z-40 hidden w-[min(720px,76vw)] -translate-x-1/2 grid-cols-3 gap-3 lg:grid"
                >
                  {activeScene.metrics.map((metric) => (
                    <MetricCard key={metric.label} value={metric.value} label={metric.label} />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div aria-hidden="true">
          {scenes.map((scene) => (
            <section key={scene.id} className="h-screen" />
          ))}
        </div>
      </section>
    </main>
  );
}

function Texture() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-[size:96px_96px] opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent" />
    </>
  );
}

function Brand() {
  return (
    <div className="absolute left-5 top-5 z-50 flex items-center gap-4 md:left-10 lg:left-16">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-sm font-semibold text-cyan-100 shadow-[0_0_40px_rgba(42,171,238,0.18)]">
        M
      </div>
      <div>
        <div className="text-sm font-semibold tracking-[0.34em] text-white">MOO</div>
        <div className="mt-1 text-xs text-white/42">Telegram restaurant growth OS</div>
      </div>
    </div>
  );
}

function SceneCopy({ scene }: { scene: Scene }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[520px] pt-20 lg:pt-0"
    >
      <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-cyan-100/72">
        <span className="text-white/32">{scene.step}</span>
        <span className="h-px w-10 bg-cyan-100/32" />
        <span>{scene.label}</span>
      </div>
      <h1 className="text-[clamp(48px,6vw,84px)] font-light leading-[0.98] tracking-[-0.02em] text-white">
        {scene.title}
      </h1>
      <p className="mt-7 max-w-[460px] text-[17px] font-light leading-8 text-white/56">
        {scene.body}
      </p>
      {scene.id === "system" ? (
        <div className="mt-9 flex flex-wrap gap-3">
          <button className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#2aabee] px-6 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-black">
            Book demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
          <button className="inline-flex h-12 items-center rounded-full border border-white/14 px-6 text-sm font-medium text-white/76 transition hover:border-white/32 hover:text-white">
            View system
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}

function PhoneGlow() {
  return (
    <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[64px] bg-[#2aabee]/12 blur-3xl" />
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[590px] w-[292px] rounded-[42px] border border-white/20 bg-[#060708] p-2 shadow-[0_42px_130px_rgba(0,0,0,0.82)] md:h-[640px] md:w-[316px]">
      <div className="absolute left-1/2 top-3 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full overflow-hidden rounded-[34px] border border-white/10 bg-[#f4f7fb]">
        {children}
      </div>
    </div>
  );
}

function PhoneScreen({ state }: { state: SceneId }) {
  return (
    <div className="relative h-full bg-[#f4f7fb] text-slate-950">
      <div className="flex h-10 items-end justify-between px-6 pb-2 text-[11px] font-semibold">
        <span>9:41</span>
        <span className="text-[#2aabee]">Telegram Mini App</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 top-10"
        >
          {state === "commerce" ? <CommerceScreen /> : null}
          {state === "analytics" ? <AnalyticsScreen /> : null}
          {state === "guest" ? <GuestScreen /> : null}
          {state === "ai" ? <AiScreen /> : null}
          {state === "automation" ? <AutomationScreen /> : null}
          {state === "revenue" ? <RevenueScreen /> : null}
          {state === "system" ? <SystemScreen /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CommerceScreen() {
  return (
    <PhoneShell>
      <div className="rounded-[28px] bg-[#070b1a] p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/42">Ресторан</div>
            <div className="text-3xl font-semibold">USSR</div>
          </div>
          <div className="rounded-full bg-[#2aabee] px-3 py-1 text-xs font-semibold">
            Telegram
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-cyan-100/70">
            Комбо дня
          </div>
          <div className="mt-2 text-xl font-semibold leading-tight">
            Том ям + пад тай · доставка 35 мин
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2 overflow-hidden">
        {["Популярное", "Тайская", "Русская"].map((chip, index) => (
          <Chip key={chip} active={index === 0}>
            {chip}
          </Chip>
        ))}
      </div>
      <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
        {[
          ["Том ям", "฿260", "bg-orange-100", "острый"],
          ["Пад тай", "฿220", "bg-amber-100", "хит"],
          ["Пельмени", "₽510", "bg-sky-100", "USSR"],
          ["Медовик", "₽390", "bg-lime-100", "десерт"],
        ].map(([name, price, color, tag]) => (
          <ProductCard key={name} name={name} price={price} color={color} tag={tag} />
        ))}
      </div>
      <CartBar title="Корзина" value="2 блюда · ฿480" />
    </PhoneShell>
  );
}

function AnalyticsScreen() {
  return (
    <PhoneShell>
      <PhoneHeader title="Гости" subtitle="Сигналы из Mini App" />
      <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-slate-400">Готовы к возврату</div>
            <div className="text-3xl font-semibold">23</div>
          </div>
          <Badge>3 действия</Badge>
        </div>
        <div className="mt-5 flex h-20 items-end gap-2">
          {[36, 54, 42, 76, 62, 88, 69].map((height, index) => (
            <div key={index} className="flex-1 rounded-t-xl bg-[#2aabee]/70" style={{ height }} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {["Все", "Интент", "Корзина"].map((filter, index) => (
          <Chip key={filter} active={index === 1}>
            {filter}
          </Chip>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <GuestRow name="Анна" state="смотрит, не покупает" meta="6 визитов" color="bg-cyan-100" />
        <GuestRow name="Дима" state="брошенная корзина" meta="₽1 240" color="bg-amber-100" />
        <GuestRow name="Майя" state="неактивна 7 дней" meta="VIP" color="bg-slate-200" />
        <GuestRow name="Олег" state="добавил в избранное" meta="3 блюда" color="bg-lime-100" />
      </div>
    </PhoneShell>
  );
}

function GuestScreen() {
  return (
    <PhoneShell>
      <PhoneHeader title="Анна Петрова" subtitle="Карточка гостя" />
      <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Badge>смотрит, не покупает</Badge>
          <span className="text-xs text-slate-400">LTV ₽0</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <MiniStat value="6" label="просмотров" />
          <MiniStat value="4" label="блюда" />
          <MiniStat value="1" label="корзина" />
          <MiniStat value="0" label="заказов" />
        </div>
      </div>
      <div className="mt-4 rounded-[28px] bg-[#070b1a] p-4 text-white">
        <div className="text-xs text-white/42">Интерес</div>
        <div className="mt-3 space-y-2">
          {["Том ям с креветкой", "Пад тай с курицей", "Манго sticky rice"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl bg-white/8 p-3">
              <span className="text-sm">{item}</span>
              <span className="text-xs text-cyan-100">view</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

function AiScreen() {
  return (
    <PhoneShell>
      <PhoneHeader title="MOO AI" subtitle="Следующий лучший шаг" />
      <div className="mt-4 rounded-[30px] bg-[#070b1a] p-4 text-white shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-cyan-100">
          <Bot className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.2em]">рекомендация</span>
        </div>
        <div className="text-2xl font-semibold leading-tight">Дать 15% на первый заказ</div>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Гость 6 раз смотрел тайское меню. Лучшее окно: сегодня 18:00-20:00.
        </p>
        <div className="mt-4 rounded-2xl bg-white/10 p-3">
          <div className="text-xs text-white/45">Вероятность возврата</div>
          <div className="mt-1 text-3xl font-semibold text-cyan-100">+18%</div>
        </div>
        <button className="mt-4 w-full rounded-2xl bg-cyan-100 py-3 text-sm font-semibold text-slate-950">
          Создать действие
        </button>
      </div>
    </PhoneShell>
  );
}

function AutomationScreen() {
  return (
    <PhoneShell>
      <PhoneHeader title="Retention loop" subtitle="Автоматизация в Telegram" />
      <div className="mt-4 rounded-[28px] bg-[#070b1a] p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/42">Реактивация</div>
            <div className="text-xl font-semibold">Вернуть гостей 7+ дней</div>
          </div>
          <Badge dark>идёт</Badge>
        </div>
        <div className="mt-5 space-y-3">
          <LoopStep index="1" title="Гость пропал" body="7 дней без заказа" />
          <LoopStep index="2" title="AI обнаружил" body="высокий шанс возврата" />
          <LoopStep index="3" title="Telegram оффер" body="личное блюдо + бонус" />
          <LoopStep index="4" title="Повторный заказ" body="цикл засчитан" />
        </div>
      </div>
      <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
        <div className="text-xs text-slate-400">Сообщение</div>
        <div className="mt-3 rounded-3xl bg-[#eef7ff] p-4 text-sm leading-6">
          Анна, ваш Том ям ждёт. Сегодня -15% на первый заказ в USSR.
        </div>
      </div>
    </PhoneShell>
  );
}

function RevenueScreen() {
  return (
    <PhoneShell className="justify-center">
      <div className="rounded-[32px] bg-[#070b1a] p-5 text-white">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-100/75">
          Повторная выручка
        </div>
        <div className="mt-4 text-4xl font-light">Revenue loop</div>
        <div className="mt-6 space-y-3">
          <ImpactRow value="+292%" label="повторная выручка" />
          <ImpactRow value="₽850K" label="вернули за месяц" />
          <ImpactRow value="₽0" label="CAC на возврат" />
        </div>
      </div>
    </PhoneShell>
  );
}

function SystemScreen() {
  return (
    <PhoneShell>
      <div className="rounded-[28px] bg-[#070b1a] p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/42">MOO</div>
            <div className="text-2xl font-semibold">Growth OS</div>
          </div>
          <Badge dark>live</Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <SystemTile title="Mini App" body="заказы" />
          <SystemTile title="Guest CRM" body="сигналы" />
          <SystemTile title="MOO AI" body="решения" />
          <SystemTile title="Loops" body="возврат" />
        </div>
      </div>
      <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
        <div className="text-xs text-slate-400">Сегодня</div>
        <SystemRow label="Новые сигналы" value="128" />
        <SystemRow label="AI действий" value="34" />
        <SystemRow label="Повторные заказы" value="19" />
      </div>
      <CartBar title="Канал" value="Telegram · 100% relationship" />
    </PhoneShell>
  );
}

function PhoneShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex h-full flex-col px-4 pb-4", className)}>{children}</div>;
}

function PhoneHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-[26px] bg-white p-4 shadow-sm">
      <div className="text-xs text-slate-400">{subtitle}</div>
      <div className="mt-1 text-2xl font-semibold">{title}</div>
    </div>
  );
}

function ProductCard({ name, price, color, tag }: { name: string; price: string; color: string; tag: string }) {
  return (
    <div className="rounded-3xl bg-white p-3 shadow-sm">
      <div className={cn("mb-3 flex h-16 items-end rounded-2xl p-2", color)}>
        <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] font-medium text-slate-600">
          {tag}
        </span>
      </div>
      <div className="text-sm font-semibold">{name}</div>
      <div className="text-xs text-slate-500">{price}</div>
    </div>
  );
}

function Chip({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <div className={cn("rounded-full px-3 py-2 text-xs font-medium", active ? "bg-[#070b1a] text-white" : "bg-white text-slate-500")}>
      {children}
    </div>
  );
}

function CartBar({ title, value }: { title: string; value: string }) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#070b1a] px-4 py-3 text-white">
      <div>
        <div className="text-xs text-white/45">{title}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-cyan-100" />
    </div>
  );
}

function GuestRow({ name, state, meta, color }: { name: string; state: string; meta: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={cn("h-9 w-9 rounded-full", color)} />
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-slate-500">{state}</div>
        </div>
      </div>
      <div className="text-xs font-medium text-slate-400">{meta}</div>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <div className="text-xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function LoopStep({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-slate-950">
        {index}
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-white/45">{body}</div>
      </div>
    </div>
  );
}

function Badge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold", dark ? "bg-cyan-100 text-slate-950" : "bg-cyan-100 text-cyan-900")}>
      {children}
    </span>
  );
}

function ImpactRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/8 p-4">
      <div className="max-w-[128px] text-sm text-white/55">{label}</div>
      <div className="text-2xl font-semibold text-cyan-100">{value}</div>
    </div>
  );
}

function SystemTile({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-xs text-white/45">{body}</div>
    </div>
  );
}

function SystemRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function OverlayCard({ card }: { card: OverlayCardData }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22, scale: 0.96, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: [0, -7, 0], scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -14, scale: 0.96, filter: "blur(10px)" }}
      transition={{
        opacity: { duration: 0.55 },
        scale: { duration: 0.55 },
        filter: { duration: 0.55 },
        y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
      }}
      className={cn("pointer-events-none absolute z-40 hidden w-[248px] rounded-3xl border border-white/12 bg-[#121b1e]/86 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:block", card.position)}
    >
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100/12 text-cyan-100">
        {card.icon}
      </div>
      <div className="text-sm font-medium text-white">{card.title}</div>
      <div className="mt-1 text-sm text-white/55">{card.body}</div>
      <div className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-100/70">
        {card.meta}
      </div>
    </motion.div>
  );
}

function MetricCard({ value, label }: MetricData) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#121b1e]/72 p-5 text-center backdrop-blur-xl">
      <div className="text-3xl font-light text-white">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
    </div>
  );
}

function SceneRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="w-full max-w-[280px]">
      <div className="mb-5 text-xs uppercase tracking-[0.24em] text-white/35">Product states</div>
      <div className="space-y-3">
        {scenes.map((scene, index) => (
          <div key={scene.id} className="grid grid-cols-[1fr_112px] items-center gap-4">
            <div className={cn("h-px transition-colors", index <= activeIndex ? "bg-cyan-100/76" : "bg-white/10")} />
            <div className={cn("text-right text-xs transition-colors", index === activeIndex ? "text-white" : "text-white/35")}>
              {scene.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
