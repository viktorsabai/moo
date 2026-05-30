"use client";

import { useEffect, useRef, useState } from "react";

import type { StoryPhaseId } from "../data/scroll-story";
import { STORY_TIMING } from "../data/story-timing";
import { MooMark } from "./MooLogo";
import { MooIcon } from "./MooIcon";

type Props = {
  phase: StoryPhaseId;
  runKey?: string;
  storyStep?: number;
  storyTotal?: number;
  storyLabel?: string;
  storyText?: string;
  storyDetail?: string;
  storyAct?: string;
  onAdvance?: () => void;
};

type Dish = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  thumb: string;
};

const DISHES: Dish[] = [
  {
    id: "burger",
    name: "Бургер BBQ",
    price: 380,
    emoji: "🍔",
    thumb: "linear-gradient(135deg,#d98b4a 0%,#7a3812 100%)",
  },
  {
    id: "tom",
    name: "Том Ям",
    price: 349,
    emoji: "🍜",
    thumb: "linear-gradient(135deg,#e76b3c 0%,#a02a18 100%)",
  },
  {
    id: "caesar",
    name: "Цезарь",
    price: 320,
    emoji: "🥗",
    thumb: "linear-gradient(135deg,#88b66b 0%,#3f6b2a 100%)",
  },
  {
    id: "pad",
    name: "Pad Thai",
    price: 299,
    emoji: "🍤",
    thumb: "linear-gradient(135deg,#f0b04a 0%,#a8651a 100%)",
  },
  {
    id: "rolls",
    name: "Спринг-роллы",
    price: 220,
    emoji: "🌯",
    thumb: "linear-gradient(135deg,#c9a14a 0%,#7a5713 100%)",
  },
  {
    id: "mango",
    name: "Mango Sticky Rice",
    price: 180,
    emoji: "🥭",
    thumb: "linear-gradient(135deg,#f1c14a 0%,#c47e16 100%)",
  },
];

const SHOP_ITEMS: Dish[] = [
  {
    id: "pelmeni",
    name: "Пельмени ручной лепки",
    price: 280,
    emoji: "🥟",
    thumb: "linear-gradient(135deg,#9fb0c4 0%,#566173 100%)",
  },
  {
    id: "tompaste",
    name: "Паста Том Ям",
    price: 190,
    emoji: "🫙",
    thumb: "linear-gradient(135deg,#e07a4a 0%,#9a3a1c 100%)",
  },
  {
    id: "dimsum",
    name: "Дим-самы, 6 шт",
    price: 240,
    emoji: "🥠",
    thumb: "linear-gradient(135deg,#d8b56a 0%,#8a6420 100%)",
  },
  {
    id: "coconut",
    name: "Кокосовый соус",
    price: 120,
    emoji: "🥥",
    thumb: "linear-gradient(135deg,#cdd6dc 0%,#7e8a92 100%)",
  },
];

const ALL_ITEMS_MAP: Record<string, Dish> = Object.fromEntries(
  [...DISHES, ...SHOP_ITEMS].map((d) => [d.id, d]),
);

/** Demo selection — guest adds 2 dishes + 1 shop item (not everything). */
const CART_PLAN = ["burger", "caesar", "pelmeni"] as const;

const CHECKOUT_DELIVERY_FEE = 80;
const CHECKOUT_DISCOUNT_PCT = 10;
const CHECKOUT_PROMO = "MOO10";
const CHECKOUT_ETA = "~25 мин";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

type PassDay = {
  day: number;
  weekday: number;
  state: "weekend" | "free";
  bookedIndex: number;
};

function buildPassMonth(): PassDay[] {
  const days: PassDay[] = [];
  let weekdayIdx = 0;
  for (let i = 1; i <= 28; i++) {
    const weekday = (i - 1) % 7;
    const isWeekend = weekday >= 5;
    days.push({
      day: i,
      weekday,
      state: isWeekend ? "weekend" : "free",
      bookedIndex: isWeekend ? -1 : weekdayIdx++,
    });
  }
  return days;
}

const PASS_MONTH = buildPassMonth();
const PASS_BOOKED_COUNT = PASS_MONTH.filter((d) => d.bookedIndex >= 0).length; // 20 weekdays / month
const PASS_MONTHS = 3;
const PASS_TOTAL_MEALS = PASS_BOOKED_COUNT * PASS_MONTHS;
const PASS_BASE_3M = 30000;
const PASS_DISCOUNT_3M = 4500;
const PASS_UPFRONT = PASS_BASE_3M - PASS_DISCOUNT_3M;
const PASS_MONTHLY = Math.round(PASS_UPFRONT / PASS_MONTHS);

const PASS_RATION_PICKS = ["burger", "tom"]; // dish ids the virtual finger taps
const PASS_RATION_TARGET = 4;

const TAP_AFTER_MOVE = STORY_TIMING.moveDuration + 220;

const PASS_TIMELINE = {
  dishOneTo: 520,
  dishOneTap: 520 + TAP_AFTER_MOVE,
  dishTwoTo: 520 + TAP_AFTER_MOVE + STORY_TIMING.tapHold + STORY_TIMING.betweenActions,
  dishTwoTap: 520 + TAP_AFTER_MOVE + STORY_TIMING.tapHold + STORY_TIMING.betweenActions + TAP_AFTER_MOVE,
  presetTo:
    520 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions,
  presetTap:
    520 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE,
} as const;

const ORDER_TIMELINE = {
  cartBarTo: 320,
  cartBarTap: 320 + TAP_AFTER_MOVE,
  checkoutTo: 320 + TAP_AFTER_MOVE + STORY_TIMING.tapHold + STORY_TIMING.betweenActions + 480,
  checkoutTap:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE,
  pickupTo:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    280,
  pickupTap:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    280 +
    TAP_AFTER_MOVE,
  deliveryTo:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    280 +
    TAP_AFTER_MOVE +
    STORY_TIMING.betweenActions +
    240,
  deliveryTap:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    280 +
    TAP_AFTER_MOVE +
    STORY_TIMING.betweenActions +
    240 +
    TAP_AFTER_MOVE,
  starsTo:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    280 +
    TAP_AFTER_MOVE +
    STORY_TIMING.betweenActions +
    240 +
    TAP_AFTER_MOVE +
    STORY_TIMING.betweenActions +
    360,
  starsTap:
    320 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    480 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    280 +
    TAP_AFTER_MOVE +
    STORY_TIMING.betweenActions +
    240 +
    TAP_AFTER_MOVE +
    STORY_TIMING.betweenActions +
    360 +
    TAP_AFTER_MOVE,
} as const;

const MKT_TIMELINE = {
  createTo: 680,
  createTap: 680 + TAP_AFTER_MOVE,
  modalOpen: 680 + TAP_AFTER_MOVE + 120,
  publishTo: 680 + TAP_AFTER_MOVE + STORY_TIMING.betweenActions + 520,
  publishTap: 680 + TAP_AFTER_MOVE + STORY_TIMING.betweenActions + 520 + TAP_AFTER_MOVE,
  modalClose: 680 + TAP_AFTER_MOVE + STORY_TIMING.betweenActions + 520 + TAP_AFTER_MOVE + 120,
  campaignIn: 680 + TAP_AFTER_MOVE + STORY_TIMING.betweenActions + 520 + TAP_AFTER_MOVE + 520,
  pushIn: 680 + TAP_AFTER_MOVE + STORY_TIMING.betweenActions + 520 + TAP_AFTER_MOVE + 920,
} as const;

const MKT_CAMPAIGNS_BASE = [
  { id: "lp-3mo", title: "Lunch Pass · 15% на 3 мес", channel: "Push · LunchPass", reach: "892 гостя" },
  { id: "thu", title: "Pad Thai 1+1 до 22:00", channel: "Push · Магазин", reach: "1 408 гостей" },
] as const;

const MKT_NEW_CAMPAIGN = {
  id: "new-rolls",
  title: "Скидка 25% на роллы",
  channel: "Push · только что",
  reach: "1 240 гостей",
} as const;

type CrmFilter = "all" | "new" | "returning";

type CrmGuest = {
  id: string;
  initials: string;
  name: string;
  time: string;
  status: "new" | "returning";
  statusLabel: string;
  visits: number;
  note: string;
};

const CRM_GUESTS: CrmGuest[] = [
  {
    id: "alex",
    initials: "АМ",
    name: "Алексей Морозов",
    time: "Сегодня в 19:42",
    status: "returning",
    statusLabel: "Пост.",
    visits: 8,
    note: "Lunch Pass · любит Бургер BBQ",
  },
  {
    id: "anna",
    initials: "АК",
    name: "Анна Ковалёва",
    time: "Сегодня в 18:10",
    status: "new",
    statusLabel: "Новый",
    visits: 3,
    note: "Первый заказ · Pad Thai",
  },
  {
    id: "maria",
    initials: "МП",
    name: "Мария Петрова",
    time: "Сегодня в 17:05",
    status: "new",
    statusLabel: "Новый",
    visits: 1,
    note: "Пришла по Push · Том Ям",
  },
  {
    id: "igor",
    initials: "ИЗ",
    name: "Игорь Зайцев",
    time: "Сегодня в 16:20",
    status: "new",
    statusLabel: "Новый",
    visits: 2,
    note: "Реферал · Цезарь",
  },
  {
    id: "dmitry",
    initials: "ДС",
    name: "Дмитрий Соколов",
    time: "Вчера в 20:35",
    status: "returning",
    statusLabel: "Пост.",
    visits: 12,
    note: "VIP · 12 визитов · Stars",
  },
  {
    id: "olga",
    initials: "ОС",
    name: "Ольга Сорокина",
    time: "Вчера в 19:12",
    status: "returning",
    statusLabel: "Пост.",
    visits: 6,
    note: "Lunch Pass · Pad Thai",
  },
  {
    id: "sofia",
    initials: "СН",
    name: "Софья Новикова",
    time: "Вчера в 13:40",
    status: "new",
    statusLabel: "Новый",
    visits: 1,
    note: "Первый заказ · Бургер BBQ",
  },
  {
    id: "pavel",
    initials: "ПВ",
    name: "Павел Волков",
    time: "Вчера в 12:05",
    status: "returning",
    statusLabel: "Пост.",
    visits: 9,
    note: "Постоянный · обеды по будням",
  },
  {
    id: "kirill",
    initials: "КГ",
    name: "Кирилл Громов",
    time: "Вчера в 11:30",
    status: "new",
    statusLabel: "Новый",
    visits: 1,
    note: "Первый заказ · Цезарь",
  },
];

const CRM_STATS = { today: 47, newGuests: 12, returning: 35 } as const;

const CRM_TIMELINE = {
  filterTo: 680,
  filterTap: 680 + TAP_AFTER_MOVE,
  guestTo: 680 + TAP_AFTER_MOVE + STORY_TIMING.tapHold + STORY_TIMING.betweenActions,
  guestTap:
    680 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE,
  settingsIn:
    680 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    680,
  settingsTo:
    680 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    680 +
    420,
} as const;

const LK_TIMELINE = {
  deliveryTo: 620,
  deliveryTap: 620 + TAP_AFTER_MOVE,
  paymentTo: 620 + TAP_AFTER_MOVE + STORY_TIMING.tapHold + STORY_TIMING.betweenActions,
  paymentTap:
    620 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE,
  saveTo:
    620 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions,
  saveTap:
    620 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE,
  saved:
    620 +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold +
    STORY_TIMING.betweenActions +
    TAP_AFTER_MOVE +
    STORY_TIMING.tapHold,
} as const;

function useCountUp(value: number, duration = 700) {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef<number | null>(null);
  const previousRef = useRef(value);

  useEffect(() => {
    const from = previousRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      else previousRef.current = to;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return display;
}

type StoryCursor = {
  x: number;
  y: number;
  visible: boolean;
  tapping: boolean;
};

const INITIAL_CURSOR: StoryCursor = {
  x: 0,
  y: 0,
  visible: false,
  tapping: false,
};

type StoryFocus = "intro" | null;

export function StoryPhoneScreen({
  phase,
  runKey,
  storyStep = 1,
  storyTotal = 6,
  storyLabel = "",
  storyText = "",
  storyDetail = "",
  storyAct = "",
  onAdvance,
}: Props) {
  const menuView = phase === "menu";
  const orderPhaseView = phase === "order";
  const passView = phase === "pass";
  const marketingView = phase === "promo";
  const crmView = phase === "crm";
  const ownerLkView = phase === "owner";
  const adminView = marketingView || crmView || ownerLkView;
  const crmTodayAnimated = useCountUp(crmView ? CRM_STATS.today : 0, 680);
  const crmNewAnimated = useCountUp(crmView ? CRM_STATS.newGuests : 0, 720);
  const crmReturnAnimated = useCountUp(crmView ? CRM_STATS.returning : 0, 760);

  const appRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const startDemoRef = useRef<(() => void) | null>(null);
  const onAdvanceRef = useRef(onAdvance);
  onAdvanceRef.current = onAdvance;
  const dishRefs = useRef<Record<string, HTMLElement | null>>({});
  const dishAddRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cartBarRef = useRef<HTMLDivElement | null>(null);
  const shopTabRef = useRef<HTMLButtonElement | null>(null);
  const cartCheckoutRef = useRef<HTMLButtonElement | null>(null);
  const payPickupRef = useRef<HTMLButtonElement | null>(null);
  const payDeliveryRef = useRef<HTMLButtonElement | null>(null);
  const starsPayRef = useRef<HTMLButtonElement | null>(null);
  const presetWeekdaysRef = useRef<HTMLButtonElement | null>(null);
  const mktCreateRef = useRef<HTMLButtonElement | null>(null);
  const mktPublishRef = useRef<HTMLButtonElement | null>(null);
  const crmFilterNewRef = useRef<HTMLButtonElement | null>(null);
  const crmGuestAnnaRef = useRef<HTMLElement | null>(null);
  const crmSettingsRef = useRef<HTMLDivElement | null>(null);
  const lkDeliveryToggleRef = useRef<HTMLButtonElement | null>(null);
  const lkPaymentQuickRef = useRef<HTMLButtonElement | null>(null);
  const lkSaveRef = useRef<HTMLButtonElement | null>(null);
  const [addedDishes, setAddedDishes] = useState<Set<string>>(new Set());
  const [usePreset, setUsePreset] = useState(false);
  const [shopTab, setShopTab] = useState<"menu" | "shop">("menu");
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);
  const [orderCheckoutOpen, setOrderCheckoutOpen] = useState(false);
  const [checkoutDelivery, setCheckoutDelivery] = useState(true);
  const [storyCursor, setStoryCursor] = useState<StoryCursor>(INITIAL_CURSOR);
  const [storyFocus, setStoryFocus] = useState<StoryFocus>("intro");
  const [mktModalOpen, setMktModalOpen] = useState(false);
  const [mktPublished, setMktPublished] = useState(false);
  const [mktPushVisible, setMktPushVisible] = useState(false);
  const [crmFilter, setCrmFilter] = useState<CrmFilter>("all");
  const [crmSelectedGuest, setCrmSelectedGuest] = useState<string | null>(null);
  const [crmSettingsVisible, setCrmSettingsVisible] = useState(false);
  const [lkDeliveryOn, setLkDeliveryOn] = useState(true);
  const [lkPaymentActive, setLkPaymentActive] = useState(false);
  const [lkSaved, setLkSaved] = useState(false);

  const crmVisibleGuests = CRM_GUESTS.filter((guest) => {
    if (crmFilter === "new") return guest.status === "new";
    if (crmFilter === "returning") return guest.status === "returning";
    return true;
  });

  const cartCount = cartItems.size;
  const cartTotal = [...cartItems].reduce(
    (sum, id) => sum + (ALL_ITEMS_MAP[id]?.price ?? 0),
    0,
  );
  const totalAnimated = useCountUp(cartTotal, 360);
  const catalog = shopTab === "shop" ? SHOP_ITEMS : DISHES;
  const cartPlanItems = CART_PLAN.map((id) => ALL_ITEMS_MAP[id]!).filter(Boolean);
  const checkoutSubtotal = cartTotal;
  const checkoutDiscount = Math.round(
    (checkoutSubtotal * CHECKOUT_DISCOUNT_PCT) / 100,
  );
  const checkoutDeliveryFee = checkoutDelivery ? CHECKOUT_DELIVERY_FEE : 0;
  const checkoutTotal =
    checkoutSubtotal - checkoutDiscount + checkoutDeliveryFee;
  const checkoutTotalAnimated = useCountUp(checkoutTotal, 360);
  const sheetOpen =
    orderPhaseView && orderSheetOpen;
  const cartBarVisible =
    (menuView && cartCount > 0) ||
    (orderPhaseView && !orderSheetOpen && cartCount > 0);
  const checkoutSheet = orderPhaseView && orderCheckoutOpen;

  useEffect(() => {
    if (menuView) {
      setShopTab("menu");
      setCartItems(new Set());
      setOrderSheetOpen(false);
    } else if (orderPhaseView) {
      setShopTab("menu");
      setCartItems(new Set(CART_PLAN));
      setOrderSheetOpen(false);
      setOrderCheckoutOpen(false);
      setCheckoutDelivery(true);
    } else {
      setShopTab("menu");
      setOrderSheetOpen(false);
    }
    if (!passView) {
      setAddedDishes(new Set());
      setUsePreset(false);
    }
    if (!marketingView) {
      setMktModalOpen(false);
      setMktPublished(false);
      setMktPushVisible(false);
    }
    if (!crmView) {
      setCrmFilter("all");
      setCrmSelectedGuest(null);
      setCrmSettingsVisible(false);
    }
    if (!ownerLkView) {
      setLkDeliveryOn(true);
      setLkPaymentActive(false);
      setLkSaved(false);
    }

    setStoryCursor(INITIAL_CURSOR);
    setStoryFocus("intro");

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let started = false;

    const moveTo = (el: HTMLElement | null) => {
      const app = appRef.current;
      if (!app || !el) return;
      const ar = app.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const x = er.left - ar.left + er.width / 2;
      const y = er.top - ar.top + er.height / 2;
      setStoryCursor({
        x,
        y,
        visible: true,
        tapping: false,
      });
    };
    const press = () =>
      setStoryCursor((prev) => ({ ...prev, tapping: true }));
    const release = () =>
      setStoryCursor((prev) => ({ ...prev, tapping: false }));

    // Demo plays itself after the intro card, but a tap on the intro
    // starts it immediately — every wait is short-circuitable.
    const startDemo = () => {
      if (started) return;
      started = true;
      setStoryFocus(null);

      const cursorSched = (ms: number, fn: () => void) =>
        timeouts.push(setTimeout(fn, STORY_TIMING.leadBeforeCursor + ms));
      const tapAt = (tapMs: number) => {
        cursorSched(tapMs, press);
        cursorSched(tapMs + STORY_TIMING.tapHold, release);
      };
      const scheduleAdvance = (lastActionMs: number) => {
        timeouts.push(
          setTimeout(() => {
            setStoryCursor((prev) => ({ ...prev, visible: false, tapping: false }));
            onAdvanceRef.current?.();
          }, STORY_TIMING.leadBeforeCursor + lastActionMs + STORY_TIMING.beforeAdvance),
        );
      };

      runPhase(cursorSched, tapAt, scheduleAdvance);
    };

    const runPhase = (
      cursorSched: (ms: number, fn: () => void) => void,
      tapAt: (tapMs: number) => void,
      scheduleAdvance: (lastActionMs: number) => void,
    ) => {
    if (phase === "menu") {
      const addToCart = (id: string) =>
        setCartItems((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });

      let t = 300;
      // First two dishes from the restaurant menu
      cursorSched(t, () => moveTo(dishAddRefs.current.burger ?? null));
      t += TAP_AFTER_MOVE;
      cursorSched(t, () => {
        press();
        addToCart("burger");
      });
      cursorSched(t + STORY_TIMING.tapHold, release);
      t += STORY_TIMING.tapHold + STORY_TIMING.betweenActions;

      cursorSched(t, () => moveTo(dishAddRefs.current.caesar ?? null));
      t += TAP_AFTER_MOVE;
      cursorSched(t, () => {
        press();
        addToCart("caesar");
      });
      cursorSched(t + STORY_TIMING.tapHold, release);
      t += STORY_TIMING.tapHold + STORY_TIMING.betweenActions;

      // Switch to the shop tab
      cursorSched(t, () => moveTo(shopTabRef.current));
      t += TAP_AFTER_MOVE;
      cursorSched(t, () => {
        press();
        setShopTab("shop");
      });
      cursorSched(t + STORY_TIMING.tapHold, release);
      t += STORY_TIMING.tapHold + STORY_TIMING.betweenActions;

      // Add a semi-finished product from the shop
      cursorSched(t, () => moveTo(dishAddRefs.current.pelmeni ?? null));
      t += TAP_AFTER_MOVE;
      cursorSched(t, () => {
        press();
        addToCart("pelmeni");
      });
      cursorSched(t + STORY_TIMING.tapHold, release);
      t += STORY_TIMING.tapHold;

      scheduleAdvance(t);
    } else if (phase === "order") {
      setOrderSheetOpen(false);
      setOrderCheckoutOpen(false);
      setCheckoutDelivery(true);

      cursorSched(ORDER_TIMELINE.cartBarTo, () => moveTo(cartBarRef.current));
      cursorSched(ORDER_TIMELINE.cartBarTap, () => {
        press();
        setOrderSheetOpen(true);
      });
      cursorSched(ORDER_TIMELINE.cartBarTap + STORY_TIMING.tapHold, release);

      cursorSched(ORDER_TIMELINE.checkoutTo, () => moveTo(cartCheckoutRef.current));
      cursorSched(ORDER_TIMELINE.checkoutTap, () => {
        press();
        setOrderCheckoutOpen(true);
      });
      cursorSched(ORDER_TIMELINE.checkoutTap + STORY_TIMING.tapHold, release);

      cursorSched(ORDER_TIMELINE.pickupTo, () => moveTo(payPickupRef.current));
      cursorSched(ORDER_TIMELINE.pickupTap, () => {
        press();
        setCheckoutDelivery(false);
      });
      cursorSched(ORDER_TIMELINE.pickupTap + STORY_TIMING.tapHold, release);

      cursorSched(ORDER_TIMELINE.deliveryTo, () => moveTo(payDeliveryRef.current));
      cursorSched(ORDER_TIMELINE.deliveryTap, () => {
        press();
        setCheckoutDelivery(true);
      });
      cursorSched(ORDER_TIMELINE.deliveryTap + STORY_TIMING.tapHold, release);

      cursorSched(ORDER_TIMELINE.starsTo, () => moveTo(starsPayRef.current));
      tapAt(ORDER_TIMELINE.starsTap);
      scheduleAdvance(ORDER_TIMELINE.starsTap + STORY_TIMING.tapHold);
    } else if (phase === "pass") {
      setAddedDishes(new Set());
      setUsePreset(false);

      cursorSched(PASS_TIMELINE.dishOneTo, () =>
        moveTo(dishRefs.current[PASS_RATION_PICKS[0]!] ?? null),
      );
      cursorSched(PASS_TIMELINE.dishOneTap, () => {
        press();
        setAddedDishes((prev) => {
          const next = new Set(prev);
          next.add(PASS_RATION_PICKS[0]!);
          return next;
        });
      });
      cursorSched(PASS_TIMELINE.dishOneTap + STORY_TIMING.tapHold, release);

      cursorSched(PASS_TIMELINE.dishTwoTo, () =>
        moveTo(dishRefs.current[PASS_RATION_PICKS[1]!] ?? null),
      );
      cursorSched(PASS_TIMELINE.dishTwoTap, () => {
        press();
        setAddedDishes((prev) => {
          const next = new Set(prev);
          next.add(PASS_RATION_PICKS[1]!);
          return next;
        });
      });
      cursorSched(PASS_TIMELINE.dishTwoTap + STORY_TIMING.tapHold, release);

      cursorSched(PASS_TIMELINE.presetTo, () => moveTo(presetWeekdaysRef.current));
      cursorSched(PASS_TIMELINE.presetTap, () => {
        press();
        setUsePreset(true);
      });
      cursorSched(PASS_TIMELINE.presetTap + STORY_TIMING.tapHold, release);

      scheduleAdvance(
        PASS_TIMELINE.presetTap + STORY_TIMING.tapHold + 1100,
      );
    } else if (phase === "promo") {
      setMktModalOpen(false);
      setMktPublished(false);
      setMktPushVisible(false);

      cursorSched(MKT_TIMELINE.createTo, () => moveTo(mktCreateRef.current));
      cursorSched(MKT_TIMELINE.createTap, press);
      cursorSched(MKT_TIMELINE.modalOpen, () => {
        setMktModalOpen(true);
        release();
      });
      cursorSched(MKT_TIMELINE.publishTo, () => moveTo(mktPublishRef.current));
      cursorSched(MKT_TIMELINE.publishTap, press);
      cursorSched(MKT_TIMELINE.modalClose, () => {
        setMktModalOpen(false);
        release();
      });
      cursorSched(MKT_TIMELINE.campaignIn, () => setMktPublished(true));
      cursorSched(MKT_TIMELINE.pushIn, () => {
        setMktPushVisible(true);
        moveTo(mktCreateRef.current);
      });
      scheduleAdvance(MKT_TIMELINE.pushIn + 700);
    } else if (phase === "crm") {
      setCrmFilter("all");
      setCrmSelectedGuest(null);
      setCrmSettingsVisible(false);

      cursorSched(CRM_TIMELINE.filterTo, () => moveTo(crmFilterNewRef.current));
      cursorSched(CRM_TIMELINE.filterTap, () => {
        press();
        setCrmFilter("new");
      });
      cursorSched(CRM_TIMELINE.filterTap + STORY_TIMING.tapHold, release);
      cursorSched(CRM_TIMELINE.guestTo, () => moveTo(crmGuestAnnaRef.current));
      cursorSched(CRM_TIMELINE.guestTap, () => {
        press();
        setCrmSelectedGuest("anna");
      });
      cursorSched(CRM_TIMELINE.guestTap + STORY_TIMING.tapHold, release);
      cursorSched(CRM_TIMELINE.settingsIn, () => setCrmSettingsVisible(true));
      cursorSched(CRM_TIMELINE.settingsTo, () => moveTo(crmSettingsRef.current));
      scheduleAdvance(CRM_TIMELINE.settingsTo + 600);
    } else if (phase === "owner") {
      setLkDeliveryOn(true);
      setLkPaymentActive(false);
      setLkSaved(false);

      cursorSched(LK_TIMELINE.deliveryTo, () => moveTo(lkDeliveryToggleRef.current));
      cursorSched(LK_TIMELINE.deliveryTap, () => {
        press();
        setLkDeliveryOn(false);
      });
      cursorSched(LK_TIMELINE.deliveryTap + STORY_TIMING.tapHold, release);
      cursorSched(LK_TIMELINE.paymentTo, () => moveTo(lkPaymentQuickRef.current));
      cursorSched(LK_TIMELINE.paymentTap, () => {
        press();
        setLkPaymentActive(true);
      });
      cursorSched(LK_TIMELINE.paymentTap + STORY_TIMING.tapHold, release);
      cursorSched(LK_TIMELINE.saveTo, () => moveTo(lkSaveRef.current));
      cursorSched(LK_TIMELINE.saveTap, press);
      cursorSched(LK_TIMELINE.saved, () => {
        setLkSaved(true);
        release();
      });
      scheduleAdvance(LK_TIMELINE.saved + 400);
    }
    };

    startDemoRef.current = startDemo;

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      startDemoRef.current = null;
    };
  }, [phase, runKey, passView, orderPhaseView, marketingView, crmView, ownerLkView]);

  const passBookedCount = usePreset ? PASS_BOOKED_COUNT : 0;
  const passUpfrontTarget = usePreset ? PASS_UPFRONT : 0;
  const passUpfrontAnimated = useCountUp(passUpfrontTarget, 540);

  const handleFocusAction = () => {
    if (storyFocus === "intro") {
      startDemoRef.current?.();
    }
  };

  return (
    <div className={`moo-app${menuView ? "" : " is-no-tabs"}`} ref={appRef}>
      <div className="moo-app-header">
        <MooMark animated={false} className="moo-app-mark" size={34} />
        <div>
          <p className="moo-app-name">MOO</p>
          <p className="moo-app-place">USSR Restaurant · Phuket</p>
        </div>
        <span className="moo-app-status" aria-hidden="true">
          <i />
          live
        </span>
      </div>

      {menuView ? (
        <div className="moo-app-tabs">
          <button
            className={shopTab === "menu" ? "is-active" : ""}
            onClick={() => setShopTab("menu")}
            type="button"
          >
            <span>Ресторан</span>
          </button>
          <button
            className={shopTab === "shop" ? "is-active" : ""}
            onClick={() => setShopTab("shop")}
            ref={shopTabRef}
            type="button"
          >
            <span>Магазин</span>
          </button>
        </div>
      ) : null}

      <div
        className={`moo-push${mktPushVisible ? " is-on" : ""}`}
        aria-hidden={!mktPushVisible}
      >
        <MooMark animated={false} className="moo-push-mark" size={22} />
        <div className="moo-push-body">
          <span>MOO Marketing · только что</span>
          <strong>Промо отправлено в Telegram</strong>
          <small>{MKT_NEW_CAMPAIGN.reach} получили push</small>
        </div>
      </div>

      <div
        className={`moo-stage${passView ? " is-pass" : ""}${
          orderPhaseView && orderSheetOpen && !orderCheckoutOpen ? " is-cart" : ""
        }${orderPhaseView && orderCheckoutOpen ? " is-pay" : ""}${
          marketingView ? " is-marketing" : ""
        }${crmView ? " is-crm" : ""}${ownerLkView ? " is-owner" : ""}`}
        ref={stageRef}
      >
        <div className="moo-menu" aria-hidden={passView || adminView || (orderPhaseView && orderSheetOpen)}>
          {shopTab === "shop" ? (
            <p className="moo-menu-hint" aria-hidden="true">
              <span>Магазин</span> полуфабрикаты и соусы навынос
            </p>
          ) : null}
          {catalog.map((dish, i) => {
            const added = cartItems.has(dish.id);
            return (
              <article
                className={`moo-dish${added ? " is-added" : ""}`}
                key={dish.id}
                style={
                  {
                    "--moo-emoji-delay": `${i * 0.3}s`,
                  } as React.CSSProperties
                }
              >
                <div
                  aria-hidden="true"
                  className="moo-dish-thumb"
                  style={{ backgroundImage: dish.thumb }}
                >
                  <span className="moo-dish-emoji">{dish.emoji}</span>
                  <b aria-hidden="true">✓</b>
                </div>
                <div className="moo-dish-meta">
                  <p className="moo-dish-name">{dish.name}</p>
                  <p className="moo-dish-price">
                    {dish.price}
                    <em>THB</em>
                  </p>
                </div>
                <button
                  aria-label={`Добавить ${dish.name}`}
                  className="moo-dish-add moo-tap"
                  ref={(el) => {
                    dishAddRefs.current[dish.id] = el;
                  }}
                  type="button"
                >
                  <span>
                    {added ? (
                      <MooIcon name="check" size={13} />
                    ) : (
                      <MooIcon name="plus" size={14} />
                    )}
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        <div className="moo-pass" aria-hidden={!passView}>
          <div className="moo-pass-scroll">
            <section
              className="moo-pass-dishes"
              aria-label="Выберите блюда в рацион"
            >
              <header className="moo-pass-dishes-head">
                <span>Рацион</span>
                <strong>
                  {addedDishes.size}
                  <em> / {PASS_RATION_TARGET}</em>
                </strong>
              </header>
              <div className="moo-pass-dishes-row">
                {DISHES.map((d, di) => {
                  const added = addedDishes.has(d.id);
                  return (
                    <article
                      className={`moo-pass-dish-card${added ? " is-added" : ""}`}
                      key={d.id}
                      ref={(el) => {
                        dishRefs.current[d.id] = el;
                      }}
                      style={
                        { "--moo-emoji-delay": `${di * 0.28}s` } as React.CSSProperties
                      }
                    >
                      <div
                        aria-hidden="true"
                        className="moo-pass-dish-card-thumb"
                        style={{ backgroundImage: d.thumb }}
                      >
                        <span className="moo-dish-emoji is-pass">{d.emoji}</span>
                        <i aria-hidden="true">✓</i>
                      </div>
                      <p className="moo-pass-dish-card-name">{d.name}</p>
                    </article>
                  );
                })}
              </div>
            </section>

            <div
              className="moo-pass-presets"
              role="tablist"
              aria-label="Быстрая раскладка"
            >
              <button
                className={`moo-tap${usePreset ? " is-active" : ""}`}
                ref={presetWeekdaysRef}
                type="button"
              >
                <span>Будни</span>
                <i aria-hidden="true">Пн–Пт</i>
              </button>
              <button type="button">
                <span>7 дней</span>
                <i aria-hidden="true">ежедневно</i>
              </button>
            </div>

            <div className="moo-pass-cal">
              <div className="moo-pass-cal-head">
                <div>
                  <span>Сентябрь · будни</span>
                  <strong>Phuket Lunch Plan</strong>
                </div>
                <b>
                  <em>{passBookedCount}</em>
                  <i>/ {PASS_BOOKED_COUNT}</i>
                </b>
              </div>
              <div aria-hidden="true" className="moo-pass-cal-week">
                {WEEKDAYS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="moo-pass-cal-grid">
                {PASS_MONTH.map((d, i) => {
                  const isBooked = usePreset && d.bookedIndex >= 0;
                  return (
                    <div
                      className={`moo-pass-cal-day is-${d.state}${
                        isBooked ? " is-booked" : ""
                      }`}
                      key={d.day}
                      style={
                        {
                          "--moo-cal-delay": `${i * 8}ms`,
                          "--moo-book-delay":
                            d.bookedIndex >= 0
                              ? `${d.bookedIndex * 18}ms`
                              : "0ms",
                        } as React.CSSProperties
                      }
                    >
                      <span>{d.day}</span>
                      {isBooked ? <i aria-hidden="true">✓</i> : null}
                    </div>
                  );
                })}
              </div>

              <div
                className="moo-pass-periods"
                role="tablist"
                aria-label="Период подписки"
              >
                <button type="button">
                  <span>1 мес</span>
                </button>
                <button className="is-active" type="button">
                  <span>3 мес</span>
                  <em>−15%</em>
                </button>
                <button type="button">
                  <span>6 мес</span>
                </button>
              </div>
            </div>
          </div>

          {usePreset ? (
            <div className="moo-pass-footer is-live">
              <button className="moo-pass-pay moo-tap" type="button">
                <span aria-hidden="true" className="moo-pass-pay-icon">
                  <MooIcon name="lock" size={14} />
                </span>
                <span className="moo-pass-pay-label">
                  <em>Гость оплачивает вперёд</em>
                  <b>
                    {passUpfrontAnimated.toLocaleString("ru-RU").replace(/,/g, " ")}
                    <i>THB · {PASS_MONTHS} мес · {PASS_TOTAL_MEALS} обедов · −15%</i>
                  </b>
                </span>
              </button>
            </div>
          ) : null}
        </div>

        <div className="moo-marketing" aria-hidden={!marketingView}>
          <header className="moo-mkt-head">
            <span aria-hidden="true" className="moo-mkt-head-back moo-ui-head-back">
              <MooIcon name="back" size={14} />
            </span>
            <div className="moo-scene-lead">
              <strong>Маркетинг</strong>
              <span>
                {mktPublished ? 3 : 2} камп · 2,3K охват
              </span>
            </div>
            <span aria-hidden="true" className="moo-ui-head-action">
              <MooIcon name="plus" size={14} />
            </span>
          </header>

          <div className="moo-mkt-actions">
            <button className="moo-mkt-action moo-tap" type="button">
              <span aria-hidden="true" className="moo-mkt-action-icon is-banner">
                <MooIcon name="image" size={13} />
              </span>
              <span>Баннер</span>
            </button>
            <button
              className="moo-mkt-action moo-tap"
              ref={mktCreateRef}
              type="button"
            >
              <span aria-hidden="true" className="moo-mkt-action-icon is-promo">
                <MooIcon name="tag" size={13} />
              </span>
              <span>Акция</span>
            </button>
            <button className="moo-mkt-action moo-tap" type="button">
              <span aria-hidden="true" className="moo-mkt-action-icon is-mail">
                <MooIcon name="send" size={13} />
              </span>
              <span>Рассылка</span>
            </button>
            <button className="moo-mkt-action moo-tap" type="button">
              <span aria-hidden="true" className="moo-mkt-action-icon is-push">
                <MooIcon name="radio" size={13} />
              </span>
              <span>Push</span>
            </button>
          </div>

          <div className="moo-mkt-workspace">
            <div className="moo-mkt-banner">
              <div aria-hidden="true" className="moo-mkt-banner-art" />
              <div className="moo-mkt-banner-copy">
                <strong>{MKT_NEW_CAMPAIGN.title}</strong>
                <span>до вс 23:59</span>
              </div>
              <div aria-label="Площадки" className="moo-mkt-banner-placements">
                <i className="is-on">TG</i>
                <i className="is-on">Меню</i>
                <i>Push</i>
              </div>
            </div>
          </div>

          <div className="moo-mkt-section-head">
            <span>Кампании</span>
            <i>{mktPublished ? 3 : 2}</i>
          </div>

          <div className="moo-mkt-list">
            {mktPublished ? (
              <article className="moo-mkt-item is-new" key="new">
                <div className="moo-mkt-item-icon is-promo">
                  <MooIcon name="tag" size={14} />
                </div>
                <div className="moo-mkt-item-body">
                  <strong>{MKT_NEW_CAMPAIGN.title}</strong>
                </div>
                <span className="moo-mkt-item-badge is-live">
                  <i aria-hidden="true" />
                  Live
                </span>
              </article>
            ) : null}
            {MKT_CAMPAIGNS_BASE.map((c) => (
              <article className="moo-mkt-item" key={c.id}>
                <div className="moo-mkt-item-icon">
                  <MooIcon name="radio" size={14} />
                </div>
                <div className="moo-mkt-item-body">
                  <strong>{c.title}</strong>
                </div>
                <span className="moo-mkt-item-badge">{c.reach}</span>
              </article>
            ))}
          </div>

          <div
            aria-hidden={!mktModalOpen}
            className={`moo-mkt-modal${mktModalOpen ? " is-open" : ""}`}
          >
            <div className="moo-mkt-modal-card">
              <header className="moo-mkt-modal-head">
                <p>
                  <span>Новая акция</span>
                </p>
                <button
                  aria-label="Закрыть"
                  className="moo-mkt-modal-close moo-tap"
                  type="button"
                >
                  <MooIcon name="close" size={14} />
                </button>
              </header>
              <div className="moo-mkt-modal-preview">
                <div aria-hidden="true" className="moo-mkt-modal-preview-art" />
                <strong>{MKT_NEW_CAMPAIGN.title}</strong>
              </div>
              <div className="moo-mkt-modal-field">
                <label>Аудитория</label>
                <div className="moo-mkt-modal-audience">
                  <span className="is-on">Все</span>
                  <span>Pass</span>
                  <span>Новые</span>
                  <span>VIP</span>
                </div>
              </div>
              <div
                aria-label="Каналы"
                className="moo-mkt-modal-channels"
                role="group"
              >
                <span className="is-on">Push</span>
                <span>SMS</span>
                <span>Email</span>
              </div>
              <button
                className="moo-mkt-modal-publish moo-tap"
                ref={mktPublishRef}
                type="button"
              >
                <span aria-hidden="true" className="moo-mkt-modal-publish-icon">
                  <MooIcon name="send" size={14} />
                </span>
                <span className="moo-mkt-modal-publish-label">Опубликовать</span>
              </button>
            </div>
          </div>
        </div>

        <div className="moo-crm" aria-hidden={!crmView}>
          <header className="moo-crm-head">
            <div className="moo-crm-head-main">
              <span aria-hidden="true" className="moo-crm-head-back moo-ui-head-back">
                <MooIcon name="back" size={14} />
              </span>
              <p className="moo-crm-head-title">
                {crmTodayAnimated} гостей сегодня
              </p>
            </div>
            <div aria-hidden="true" className="moo-crm-head-actions">
              <span className="moo-ui-head-action">
                <MooIcon name="search" size={13} />
              </span>
            </div>
          </header>

          <div
            className="moo-crm-filters"
            role="tablist"
            aria-label="Сегменты посещаемости"
          >
            <button
              className={`moo-tap${crmFilter === "all" ? " is-active" : ""}`}
              type="button"
            >
              <span>Все</span>
              <em>{crmTodayAnimated}</em>
            </button>
            <button
              className={`moo-tap${crmFilter === "new" ? " is-active" : ""}`}
              ref={crmFilterNewRef}
              type="button"
            >
              <span>Новые</span>
              <em>{crmNewAnimated}</em>
            </button>
            <button
              className={`moo-tap${crmFilter === "returning" ? " is-active" : ""}`}
              type="button"
            >
              <span>Постоянные</span>
              <em>{crmReturnAnimated}</em>
            </button>
          </div>

          <div className="moo-crm-list">
            {crmVisibleGuests.map((guest, i) => {
              const selected = crmSelectedGuest === guest.id;
              return (
                <article
                  className={`moo-crm-guest${selected ? " is-selected" : ""}${
                    guest.status === "new" ? " is-new" : ""
                  }`}
                  key={guest.id}
                  ref={guest.id === "anna" ? crmGuestAnnaRef : undefined}
                  style={{ "--moo-crm-delay": `${i * 80}ms` } as React.CSSProperties}
                >
                  <span aria-hidden="true" className="moo-crm-guest-avatar">
                    {guest.initials}
                  </span>
                  <div className="moo-crm-guest-body">
                    <strong>{guest.name}</strong>
                    <small>{guest.time}</small>
                    <p className="moo-crm-guest-note">{guest.note}</p>
                  </div>
                  <div className="moo-crm-guest-meta">
                    <span
                      className={`moo-crm-guest-badge${
                        guest.status === "new" ? " is-new" : ""
                      }`}
                    >
                      {guest.statusLabel}
                    </span>
                    <em>{guest.visits} визитов</em>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            className={`moo-crm-settings${crmSettingsVisible ? " is-visible" : ""}`}
            ref={crmSettingsRef}
          >
            <header className="moo-crm-settings-head">
              <span>Авто-настройки</span>
            </header>
            <div className="moo-crm-settings-row">
              <div>
                <strong>Check-in из заказа</strong>
                <small>Заказ = визит</small>
              </div>
              <span aria-hidden="true" className="moo-crm-toggle is-on">
                <i />
              </span>
            </div>
            <div className="moo-crm-settings-row">
              <div>
                <strong>Push новым</strong>
                <small>Welcome после 1-го визита</small>
              </div>
              <span aria-hidden="true" className="moo-crm-toggle is-on">
                <i />
              </span>
            </div>
            <div className="moo-crm-settings-row">
              <div>
                <strong>Win-back 30 дней</strong>
                <small>Авто-сегмент</small>
              </div>
              <span aria-hidden="true" className="moo-crm-toggle">
                <i />
              </span>
            </div>
          </div>
        </div>

        <div className="moo-owner" aria-hidden={!ownerLkView}>
          <header className="moo-owner-head">
            <span aria-hidden="true" className="moo-owner-head-back moo-ui-head-back">
              <MooIcon name="back" size={14} />
            </span>
            <div className="moo-scene-lead is-owner">
              <strong>USSR Restaurant</strong>
              <span>· Mai Khao · Phuket</span>
            </div>
          </header>

          <div className="moo-owner-scroll">
            <div className="moo-owner-card">
              <div className="moo-owner-row">
                <span aria-hidden="true" className="moo-owner-row-icon">
                  <MooIcon name="store" size={14} />
                </span>
                <div>
                  <small>Название</small>
                  <strong>USSR Restaurant</strong>
                </div>
              </div>
              <div className="moo-owner-desc">
                <small>Описание</small>
                <p>
                  Тайская кухня на Пхукете. Свежие морепродукты и аутентичные
                  вкусы.
                </p>
              </div>
              <div className="moo-owner-row">
                <span aria-hidden="true" className="moo-owner-row-icon">
                  <MooIcon name="pin" size={14} />
                </span>
                <div>
                  <small>Адрес</small>
                  <strong>Mai Khao Beach, Phuket</strong>
                </div>
              </div>
            </div>

            <div className="moo-owner-card">
              <span className="moo-owner-card-label">Режим работы</span>
              <div className="moo-owner-hours">
                <div>
                  <span>Пн — Пт</span>
                  <em>11:00 — 23:00</em>
                </div>
                <div>
                  <span>Сб — Вс</span>
                  <em>10:00 — 00:00</em>
                </div>
              </div>
            </div>

            <div className="moo-owner-card">
              <div className="moo-owner-toggle-row">
                <div className="moo-owner-toggle-meta">
                  <span aria-hidden="true" className="moo-ui-icon is-sm">
                    <MooIcon name="truck" size={13} />
                  </span>
                  <strong>Доставка</strong>
                </div>
                <button
                  aria-label="Доставка"
                  aria-pressed={lkDeliveryOn}
                  className={`moo-owner-toggle moo-tap${lkDeliveryOn ? " is-on" : ""}`}
                  ref={lkDeliveryToggleRef}
                  type="button"
                >
                  <i aria-hidden="true" />
                </button>
              </div>
              <div className="moo-owner-toggle-row">
                <div className="moo-owner-toggle-meta">
                  <span aria-hidden="true" className="moo-ui-icon is-sm">
                    <MooIcon name="bag" size={13} />
                  </span>
                  <strong>Самовывоз</strong>
                </div>
                <span aria-hidden="true" className="moo-owner-toggle is-on">
                  <i />
                </span>
              </div>
            </div>

            <div className="moo-owner-quick">
              <button
                className={`moo-owner-quick-card moo-tap${
                  lkPaymentActive ? " is-active" : ""
                }`}
                ref={lkPaymentQuickRef}
                type="button"
              >
                <span aria-hidden="true" className="moo-ui-icon is-accent">
                  <MooIcon name="card" size={14} />
                </span>
                <strong>Оплата</strong>
                <em>Stars · QR · Omise</em>
              </button>
              <button className="moo-owner-quick-card moo-tap" type="button">
                <span aria-hidden="true" className="moo-ui-icon is-accent">
                  <MooIcon name="phone" size={14} />
                </span>
                <strong>Контакты</strong>
                <em>Telegram · телефон</em>
              </button>
            </div>
          </div>

          <button
            className={`moo-owner-save moo-tap${lkSaved ? " is-saved" : ""}`}
            ref={lkSaveRef}
            type="button"
          >
            <span>
              {lkSaved ? (
                <>
                  <MooIcon name="check" size={14} />
                  {" "}
                  Изменения сохранены
                </>
              ) : (
                "Сохранить изменения"
              )}
            </span>
          </button>
        </div>

      </div>

      <div
        className={`moo-cartbar${cartCount > 0 ? " is-live" : ""}${
          cartBarVisible ? "" : " is-hidden"
        }`}
        aria-hidden={!cartBarVisible}
        ref={cartBarRef}
      >
        <div className="moo-cartbar-left">
          <span className="moo-cartbar-icon" aria-hidden="true">
            <MooIcon name="cart" size={15} />
          </span>
          <div className="moo-cartbar-meta">
            <span>Корзина</span>
            <strong>
              {cartCount} · {totalAnimated.toLocaleString("ru-RU").replace(/,/g, " ")} THB
            </strong>
          </div>
        </div>
        <span className="moo-cartbar-cta">Оформить →</span>
      </div>

      <div
        className={`moo-sheet${sheetOpen ? " is-open" : ""}${
          checkoutSheet ? " is-pay-mode" : ""
        }`}
        aria-hidden={!sheetOpen}
      >
        <span className="moo-sheet-grabber" aria-hidden="true" />

        {checkoutSheet ? (
          <>
            <p className="moo-sheet-title">
              Оформление
              <em>
                {cartPlanItems.length} поз · {CHECKOUT_ETA}
              </em>
            </p>

            <div
              aria-label="Способ получения"
              className="moo-checkout-fulfill"
              role="tablist"
            >
              <button
                className={`moo-tap${checkoutDelivery ? " is-active" : ""}`}
                ref={payDeliveryRef}
                type="button"
              >
                <MooIcon name="truck" size={12} />
                <span>Доставка</span>
              </button>
              <button
                className={`moo-tap${!checkoutDelivery ? " is-active" : ""}`}
                ref={payPickupRef}
                type="button"
              >
                <MooIcon name="bag" size={12} />
                <span>Самовывоз</span>
              </button>
            </div>

            <div
              className={`moo-checkout-address${
                checkoutDelivery ? "" : " is-pickup"
              }`}
            >
              <span aria-hidden="true" className="moo-checkout-address-icon">
                <MooIcon name={checkoutDelivery ? "pin" : "store"} size={13} />
              </span>
              <div>
                <strong>
                  {checkoutDelivery ? "Kata Beach · вилла 12" : "USSR Restaurant"}
                </strong>
                <small>
                  {checkoutDelivery ? "Сегодня · 19:30" : "Сегодня · 19:15 · готово"}
                </small>
              </div>
            </div>

            <div className="moo-checkout-items">
              {cartPlanItems.map((dish) => (
                <div className="moo-checkout-item" key={dish.id}>
                  <span aria-hidden="true">{dish.emoji}</span>
                  <p>{dish.name}</p>
                  <b>{dish.price}</b>
                </div>
              ))}
            </div>

            <div className="moo-checkout-promo">
              <span className="moo-checkout-promo-code">{CHECKOUT_PROMO}</span>
              <span className="moo-checkout-promo-off">
                −{CHECKOUT_DISCOUNT_PCT}%
              </span>
            </div>

            <div className="moo-checkout-breakdown">
              <div>
                <span>Сумма</span>
                <b>{checkoutSubtotal.toLocaleString("ru-RU")} THB</b>
              </div>
              {checkoutDelivery ? (
                <div>
                  <span>Доставка</span>
                  <b>{CHECKOUT_DELIVERY_FEE} THB</b>
                </div>
              ) : null}
              <div className="is-discount">
                <span>Скидка</span>
                <b>−{checkoutDiscount.toLocaleString("ru-RU")} THB</b>
              </div>
              <div className="is-total">
                <span>К оплате</span>
                <strong>
                  {checkoutTotalAnimated.toLocaleString("ru-RU").replace(/,/g, " ")}
                  <em>THB</em>
                </strong>
              </div>
            </div>

            <div aria-label="Способы оплаты" className="moo-sheet-pay-methods" role="group">
              <span className="is-active">Stars</span>
              <span>QR</span>
              <span>Карта</span>
            </div>

            <button
              className="moo-stars moo-tap is-pulse"
              ref={starsPayRef}
              type="button"
            >
              <span aria-hidden="true" className="moo-stars-icon">
                <MooIcon name="star" size={13} />
              </span>
              <span className="moo-stars-label">
                Оплатить{" "}
                {checkoutTotalAnimated.toLocaleString("ru-RU").replace(/,/g, " ")}{" "}
                THB
              </span>
            </button>
          </>
        ) : (
          <>
            <p className="moo-sheet-title">
              Корзина
              <em>
                {cartPlanItems.length} позиции · меню + магазин
              </em>
            </p>

            <div className="moo-sheet-list">
              {cartPlanItems.map((dish, i) => (
                <div className="moo-sheet-row" key={dish.id}>
                  <span
                    aria-hidden="true"
                    className="moo-sheet-emoji"
                    style={{ "--moo-emoji-delay": `${i * 0.18}s` } as React.CSSProperties}
                  >
                    {dish.emoji}
                  </span>
                  <p>{dish.name}</p>
                  <b>{dish.price} THB</b>
                </div>
              ))}
            </div>

            <div className="moo-sheet-total">
              <span>Итого</span>
              <strong>
                {totalAnimated.toLocaleString("ru-RU").replace(/,/g, " ")}
                <em>THB</em>
              </strong>
            </div>

            <button className="moo-stars moo-tap is-checkout" ref={cartCheckoutRef} type="button">
              <span className="moo-stars-label">Оформить заказ →</span>
            </button>
          </>
        )}
      </div>

      <div
        aria-hidden={!storyFocus}
        className={`moo-story-focus${storyFocus ? " is-on" : ""}`}
      >
        <div className="moo-story-focus-card">
          {storyAct ? (
            <span className="moo-story-focus-act">{storyAct}</span>
          ) : null}
          <span className="moo-story-focus-step">
            {String(storyStep).padStart(2, "0")}
            <i> / {String(storyTotal).padStart(2, "0")}</i>
          </span>
          {storyLabel ? (
            <span className="moo-story-focus-label">{storyLabel}</span>
          ) : null}
          <p className="moo-story-focus-title">{storyText}</p>
          {storyDetail ? (
            <p className="moo-story-focus-detail">{storyDetail}</p>
          ) : null}
          <button
            className="moo-story-focus-cta"
            onClick={handleFocusAction}
            type="button"
          >
            Смотреть демо
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`moo-story-cursor${
          !storyFocus && storyCursor.visible ? " is-on" : ""
        }${storyCursor.tapping ? " is-tap" : ""}`}
        style={{
          transform: `translate(${storyCursor.x}px, ${storyCursor.y}px)`,
        }}
      >
        <span className="moo-story-touch" />
        <span className="moo-story-touch-ring" />
        <span className="moo-story-touch-ripple" />
      </div>
    </div>
  );
}
