"use client";

import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { demoSceneLabels } from "../data/demo-beats";
import type { PhoneHighlight } from "../data/mobile-story";
import type { PhoneMode } from "../data/story";

type DemoHotspot = {
  id: string;
  target: string;
  value: string;
  emoji: string;
  label: string;
  cue: string;
  explain: string;
  highlight: PhoneHighlight;
};

type DemoPhase = "intro" | "spotlight" | "result" | "scene-intro" | "cue" | "toast" | "scene-gap";

type PhoneStory = {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  heroAction: string;
  metric: string;
  statLabel: string;
  statValue: string;
};

type Props = {
  beatId?: string;
  beatLabel?: string;
  beatStep?: string;
  caption?: string;
  cinematic?: boolean;
  eyebrow?: string;
  focusedHotspotId?: string;
  highlight?: PhoneHighlight;
  hideDemoRail?: boolean;
  hotspots?: DemoHotspot[];
  metric: string;
  mode: PhoneMode;
  onHotspotClick?: (hotspot: DemoHotspot) => void;
  onSceneSelect?: (index: number) => void;
  phase?: DemoPhase;
  phoneStory?: PhoneStory;
  presentation?: "full" | "focus";
  sceneDirection?: "forward" | "back" | "none";
  sceneIndex?: number;
  sceneProgress?: number;
  showTapGlow?: boolean;
  storyHint?: { emoji: string; text: string; title?: string };
  storyLabel?: string;
  title?: string;
  toastHotspot?: DemoHotspot | null;
  tone?: "default" | "success";
  visited?: Record<string, boolean>;
};

type TapProps = {
  beatId?: string;
  className?: string;
  focusedHotspotId?: string;
  highlight?: PhoneHighlight;
  highlightZone?: PhoneHighlight;
  hotspot?: DemoHotspot;
  onHotspotClick?: (hotspot: DemoHotspot) => void;
  showTapGlow?: boolean;
  visited?: Record<string, boolean>;
  children: ReactNode;
};

function PhoneTap({
  beatId,
  children,
  className = "",
  focusedHotspotId,
  highlight,
  highlightZone,
  hotspot,
  onHotspotClick,
  showTapGlow = true,
  visited,
}: TapProps) {
  const isFocused = hotspot?.id === focusedHotspotId;
  const isVisited = hotspot ? visited?.[`${beatId}:${hotspot.id}`] : false;
  const isHighlighted = highlightZone !== undefined && highlight === highlightZone;
  const showGlow = Boolean(hotspot && isFocused && !isVisited && showTapGlow);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showGlow || !wrapRef.current) {
      return;
    }

    wrapRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [showGlow]);

  const classes = [
    className,
    "tg-zone",
    isHighlighted ? "is-highlighted" : "",
    hotspot ? "tg-tap" : "",
    isFocused ? "is-tap-active" : "",
    isVisited ? "is-tap-visited" : "",
    showGlow ? "is-tap-glow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const activate = () => {
    if (hotspot && onHotspotClick) {
      onHotspotClick(hotspot);
    }
  };

  if (!hotspot || !onHotspotClick) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <div
      className={`tg-tap-wrap${showGlow ? " is-spotlight" : ""}${isVisited ? " is-done" : ""}`}
      ref={wrapRef}
    >
      <div
        aria-label={hotspot.label}
        className={classes}
        onClick={() => activate()}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate();
          }
        }}
        onPointerUp={(event: PointerEvent) => {
          event.stopPropagation();
          activate();
        }}
        role="button"
        tabIndex={0}
      >
        {children}
        {showGlow ? (
          <>
            <span aria-hidden="true" className="tg-tap-ring tg-tap-ring-a" />
            <span aria-hidden="true" className="tg-tap-ring tg-tap-ring-b" />
          </>
        ) : null}
      </div>
    </div>
  );
}

function findHotspot(hotspots: DemoHotspot[] | undefined, target: string) {
  return hotspots?.find((hotspot) => hotspot.target === target);
}

const TAB_LABELS = ["главная", "доставка", "подписка", "профиль"] as const;

function activeTabForMode(mode: PhoneMode): (typeof TAB_LABELS)[number] {
  if (mode === "direct") return "доставка";
  if (mode === "owner") return "профиль";
  if (mode === "crm") return "профиль";
  if (mode === "growth") return "главная";
  return "профиль";
}

function EmojiTile({ emoji, className = "" }: { emoji: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`tg-emoji-tile ${className}`.trim()}>
      {emoji}
    </div>
  );
}

const HERO_TARGET: Record<PhoneMode, string> = {
  direct: "menu",
  owner: "owner-actions",
  crm: "retention-cta",
  growth: "offer",
  analytics: "roi-action",
};

const MODE_EMOJI: Record<PhoneMode, string> = {
  direct: "🦐",
  owner: "📣",
  crm: "💎",
  growth: "🎉",
  analytics: "📈",
};

export function ProductPhoneMockup({
  beatId = "",
  cinematic = false,
  focusedHotspotId,
  hideDemoRail = false,
  highlight,
  hotspots = [],
  metric,
  mode,
  onHotspotClick,
  onSceneSelect,
  phase = "intro",
  phoneStory,
  presentation = "full",
  sceneDirection = "none",
  sceneIndex = 0,
  sceneProgress = 0,
  showTapGlow = true,
  toastHotspot,
  visited = {},
}: Props) {
  const isFocus = presentation === "focus";
  const coachDim = isFocus && phase === "spotlight";
  const coachOpen =
    !isFocus && Boolean(focusedHotspotId || toastHotspot || phase === "spotlight");

  const isVisited = (target: string) => {
    const hotspot = findHotspot(hotspots, target);
    return hotspot ? Boolean(visited[`${beatId}:${hotspot.id}`]) : false;
  };

  const tap = (target: string, highlightZone?: PhoneHighlight) => ({
    beatId,
    focusedHotspotId,
    highlight,
    highlightZone,
    hotspot: findHotspot(hotspots, target),
    onHotspotClick,
    showTapGlow,
    visited,
  });

  const activeTab = activeTabForMode(mode);

  const sceneBody = (
    <div className={`tg-content${coachOpen ? " is-coach-open" : ""}${coachDim ? " is-coach-dim" : ""}`}>
      <div className={`tg-scene is-scene-${sceneDirection}`} key={beatId}>
        {cinematic && phoneStory
          ? renderCinematicScene(mode, phase, phoneStory, tap, HERO_TARGET[mode])
          : renderScene(mode, metric, tap, isVisited)}
      </div>
    </div>
  );

  if (isFocus) {
    return (
      <div
        className={`tg-app tg-app-focus${coachOpen ? " is-coach-open" : ""}`}
        data-mode={mode}
        data-phase={phase}
      >
        <div className="tg-scroll tg-scroll-focus">{sceneBody}</div>
      </div>
    );
  }

  return (
    <div
      className={`tg-app${coachOpen ? " is-coach-open" : ""}`}
      data-mode={mode}
      data-phase={phase}
    >
      {!cinematic ? (
      <PhoneTap {...tap("miniapp", "header")} className="tg-chrome">
        <span className="tg-chrome-close" aria-hidden="true">
          ✕
        </span>
        <span className="tg-chrome-pill">
          <EmojiTile className="tg-emoji-tile-xs" emoji="🐮" />
          MOO
        </span>
        <span className="tg-chrome-menu" aria-hidden="true">
          ···
        </span>
      </PhoneTap>
      ) : (
      <div aria-hidden="true" className="tg-cine-chrome">
        <span>MOO</span>
        <i>Онлайн</i>
      </div>
      )}

      {!hideDemoRail ? (
      <nav aria-label="Прогресс демо" className="tg-demo-rail">
        {demoSceneLabels.map((label, navIndex) => {
          const progress =
            navIndex < sceneIndex ? 1 : navIndex === sceneIndex ? sceneProgress : 0;

          return (
            <button
              aria-current={navIndex === sceneIndex ? "step" : undefined}
              aria-label={label}
              className="tg-demo-seg"
              key={label}
              onClick={() => onSceneSelect?.(navIndex)}
              type="button"
            >
              <span style={{ transform: `scaleX(${progress})` }} />
            </button>
          );
        })}
      </nav>
      ) : null}

      <div className={`tg-scroll${cinematic ? " tg-scroll-cine" : ""}`}>
        {!cinematic ? (
          <div className="tg-venue">
            <div className="tg-venue-main">
              <strong>🇷🇺 USSR</strong>
              <span className="tg-venue-status">
                <i aria-hidden="true" />
                открыто
              </span>
            </div>
            <div className="tg-venue-actions">
              <span aria-hidden="true">☾</span>
              <span aria-hidden="true">♛</span>
              <span className="tg-cart-btn" aria-hidden="true">
                🛒
              </span>
              <EmojiTile className="tg-emoji-tile-xs tg-emoji-tile-round" emoji="👨‍🍳" />
            </div>
          </div>
        ) : null}

        {sceneBody}

        {toastHotspot ? (
          <div className="tg-coach-toast" key={toastHotspot.id} role="status">
            <span aria-hidden="true" className="tg-coach-toast-emoji">
              {toastHotspot.emoji}
            </span>
            <div>
              <strong>{toastHotspot.label}</strong>
              <span>{toastHotspot.explain}</span>
            </div>
          </div>
        ) : null}
      </div>

      {!cinematic ? (
      <nav aria-label="Навигация приложения" className="tg-tabbar">
        {TAB_LABELS.map((label) => (
          <span className={label === activeTab ? "is-active" : undefined} key={label}>
            {label === "доставка" ? "🛵 " : label === "главная" ? "🏠 " : label === "профиль" ? "👤 " : "⭐ "}
            {label}
          </span>
        ))}
      </nav>
      ) : null}
    </div>
  );
}

function renderCinematicScene(
  mode: PhoneMode,
  phase: DemoPhase,
  story: PhoneStory,
  tap: (
    target: string,
    highlightZone?: PhoneHighlight,
  ) => Omit<TapProps, "children" | "className">,
  heroTarget: string,
) {
  if (mode === "crm") {
    return (
      <>
        <p className="tg-cine-eyebrow">{story.eyebrow}</p>
        <PhoneTap {...tap(heroTarget)} className={`tg-cine-guest-card is-phase-${phase}`}>
          <div className="tg-cine-guest-head">
            <EmojiTile className="tg-cine-guest-avatar" emoji="👩" />
            <div className="tg-cine-guest-meta">
              <strong>Алина К.</strong>
              <span>8 заказов · ценность {story.statValue}</span>
            </div>
          </div>
          <p className="tg-cine-guest-note">Не заказывала 14 дней · сегмент «возврат»</p>
          <span className="tg-cine-push-btn">Отправить рассылку →</span>
        </PhoneTap>
        {phase === "result" ? (
          <div className="tg-cine-automation">Повторное предложение · автоматизация включена</div>
        ) : null}
      </>
    );
  }

  const isMarginLeak = mode === "analytics";

  return (
    <>
      <p className="tg-cine-eyebrow">{story.eyebrow}</p>
      <PhoneTap {...tap(heroTarget)} className={`tg-cine-hero is-phase-${phase}`}>
        <span className={`tg-cine-badge${isMarginLeak ? " is-leak" : ""}`}>
          {isMarginLeak ? "−30%" : story.metric}
        </span>
        <EmojiTile className="tg-cine-icon" emoji={MODE_EMOJI[mode]} />
        <strong>{story.heroTitle}</strong>
        <p className="tg-cine-sub">{story.heroSub}</p>
        <em>{story.heroAction}</em>
      </PhoneTap>
      <div className={`tg-cine-stat${isMarginLeak ? " is-leak" : ""}`}>
        <small>{story.statLabel}</small>
        <strong>{story.statValue}</strong>
      </div>
      {phase === "result" ? (
        <div className="tg-cine-automation">Кампания активна · автоматизация включена</div>
      ) : null}
    </>
  );
}

function renderScene(
  mode: PhoneMode,
  metric: string,
  tap: (
    target: string,
    highlightZone?: PhoneHighlight,
  ) => Omit<TapProps, "children" | "className">,
  isVisited: (target: string) => boolean,
) {
  if (mode === "direct") {
    return (
      <>
        <div className="tg-segment">
          <span className="is-active">🍽 ресторан</span>
          <span>🛍 магазин</span>
        </div>
        <div className="tg-search">🔍 поиск</div>
        <div className="tg-chips">
          <span className="is-active">все</span>
          <span>♡ избранное</span>
          <span>🥗 Салаты</span>
        </div>
        <p className="tg-section-label">САЛАТЫ</p>
        <PhoneTap {...tap("menu", "menu")} className="tg-menu-grid">
          <article className={`tg-dish${isVisited("menu") ? " is-picked" : ""}`}>
            <EmojiTile emoji="🦐" />
            <strong>Салат с креветками</strong>
            <em>290 ₽</em>
            <span className="tg-dish-add">{isVisited("menu") ? "✓" : "+"}</span>
          </article>
          <article className="tg-dish">
            <EmojiTile emoji="🥗" />
            <strong>Цезарь</strong>
            <em>320 ₽</em>
            <span className="tg-dish-add">+</span>
          </article>
        </PhoneTap>
        <PhoneTap {...tap("cart", "cart")} className={`tg-cart-bar${isVisited("cart") ? " is-live" : ""}`}>
          <span>🛒 Корзина · {isVisited("menu") ? "1 блюдо" : "0 блюд"}</span>
          <strong>
            {isVisited("menu") ? "290 ₽" : "0 ₽"} · {isVisited("cart") ? "0% комиссия" : metric}
          </strong>
        </PhoneTap>
        <SceneFiller mode="direct" />
      </>
    );
  }

  if (mode === "owner") {
    return (
      <>
        <div className="tg-segment">
          <span className="is-active">🍱 Готовые блюда</span>
          <span>🛍 Магазин</span>
        </div>
        <PhoneTap {...tap("owner-list", "controls")} className="tg-admin-list">
          <div>
            <span>📋 меню (таблица)</span>
            <em>показать</em>
          </div>
          <div>
            <span>⚙️ опции блюд</span>
            <em>⌄</em>
          </div>
          <div>
            <span>➕ добавить категорию</span>
            <em>показать</em>
          </div>
        </PhoneTap>
        <PhoneTap {...tap("owner-actions", "controls")} className={`tg-admin-card${isVisited("owner-actions") ? " is-sent" : ""}`}>
          <EmojiTile className="tg-emoji-tile-sm" emoji="📣" />
          <strong>рассылка: обеденное предложение</strong>
          <p>{isVisited("owner-actions") ? "✓ Рассылка отправлена гостям" : "Настройте триггер и отправьте"}</p>
          <span>{metric}</span>
        </PhoneTap>
        <SceneFiller mode="owner" />
      </>
    );
  }

  if (mode === "crm") {
    return (
      <>
        <PhoneTap {...tap("guest", "profile")} className="tg-profile-card">
          <div className="tg-profile-head">
            <EmojiTile className="tg-emoji-tile-round" emoji="👤" />
            <div>
              <strong>bayshev msk</strong>
              <em>админ</em>
            </div>
          </div>
          <div className="tg-profile-stats">
            <span>
              <b>8</b> 🛒 заказов
            </span>
            <span>
              <b>0</b> ⭐ подписок
            </span>
            <span>
              <b>1</b> ♡ любимых
            </span>
          </div>
        </PhoneTap>
        <PhoneTap {...tap("guest-ltv", "profile")} className="tg-guest-card">
          <EmojiTile className="tg-emoji-tile-round" emoji="💎" />
          <div>
            <strong>
              bayshev msk <i>новый</i>
            </strong>
            <p>🛒 Бросил корзину · {metric}</p>
            <small>10 открытий меню · 1 блюдо</small>
          </div>
          <em>открыть</em>
        </PhoneTap>
        <PhoneTap {...tap("retention-cta", "offers")} className={`tg-push-btn${isVisited("retention-cta") ? " is-sent" : ""}`}>
          {isVisited("retention-cta") ? "✓ 🔁 Сценарий возврата отправлен" : "🔁 Сценарий возврата →"}
        </PhoneTap>
        <SceneFiller mode="crm" />
      </>
    );
  }

  if (mode === "growth") {
    return (
      <>
        <p className="tg-section-label">ЛУЧШИЕ ПРЕДЛОЖЕНИЯ</p>
        <PhoneTap {...tap("plans", "offers")} className="tg-offer-hero">
          <EmojiTile emoji="🍲" />
          <strong>Суп дня</strong>
          <p>База на каждый день</p>
          <span>Открыть →</span>
        </PhoneTap>
        <PhoneTap {...tap("offer", "offers")} className="tg-event-card">
          <EmojiTile emoji="🎉" />
          <strong>Еда для событий</strong>
          <p>Кейтеринг, банкеты и корпоративы</p>
          <div className="tg-chips tg-chips-inline">
            <span>🍽 кейтеринг</span>
            <span>🥂 банкет</span>
          </div>
          <em>−15% · {metric}</em>
        </PhoneTap>
        <PhoneTap {...tap("loyalty", "header")} className="tg-loyalty-card">
          <EmojiTile emoji="⭐" />
          <strong>Программа лояльности в Telegram</strong>
          <p>Без пластиковых карт</p>
        </PhoneTap>
        <SceneFiller mode="growth" />
      </>
    );
  }

  return (
    <>
      <PhoneTap {...tap("chart", "analytics")} className="tg-chart-card">
        <div className="tg-chart-head">
          <span>📈 ДИНАМИКА</span>
          <em>обновить</em>
        </div>
        <div className="tg-chart-line">
          {[28, 42, 36, 58, 48, 72, 64].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </PhoneTap>
      <PhoneTap {...tap("kpis", "analytics")} className="tg-kpi-row">
        <span>
          <small>🔥 Удержание</small>
          <b>68%</b>
        </span>
        <span>
          <small>🔁 Повторы</small>
          <b>+292%</b>
        </span>
      </PhoneTap>
      <PhoneTap {...tap("roi-action", "analytics")} className={`tg-roi-card${isVisited("roi-action") ? " is-live" : ""}`}>
        <EmojiTile className="tg-emoji-tile-sm" emoji="💰" />
        <div>
          <span>Окупаемость кампании</span>
          <strong>{isVisited("roi-action") ? "×3.2" : metric}</strong>
        </div>
      </PhoneTap>
      <SceneFiller mode="analytics" />
    </>
  );
}

function SceneFiller({ mode }: { mode: PhoneMode }) {
  if (mode === "owner") {
    return (
      <div aria-hidden="true" className="tg-filler">
        <div className="tg-filler-row">
          <span>🍽 блюда по категориям</span>
          <em>выбрать</em>
        </div>
        <div className="tg-filler-chips">
          <span>все</span>
          <span>🥗 Салаты (7)</span>
          <span>🌮 Закуски (8)</span>
        </div>
        <div className="tg-filler-list">
          <div>
            <span>🥗 Цезарь</span>
            <em>320 ₽</em>
          </div>
          <div>
            <span>🍜 Том ям</span>
            <em>680 ₽</em>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "direct") {
    return (
      <div aria-hidden="true" className="tg-filler">
        <p className="tg-section-label">ГОРЯЧЕЕ</p>
        <div className="tg-filler-list">
          <div>
            <span>🍜 Том ям</span>
            <em>680 ₽</em>
          </div>
          <div>
            <span>🍛 Пад тай</span>
            <em>620 ₽</em>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "crm") {
    return (
      <div aria-hidden="true" className="tg-filler">
        <div className="tg-filler-row">
          <span>👥 ГОСТИ</span>
          <em>сортировка</em>
        </div>
        <div className="tg-filler-list">
          <div>
            <span>👤 tg 2112276927</span>
            <em>гость</em>
          </div>
          <div>
            <span>👩 Алина К.</span>
            <em>×4</em>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "growth") {
    return (
      <div aria-hidden="true" className="tg-filler">
        <p className="tg-section-label">ПОЛЕЗНОЕ</p>
        <div className="tg-filler-row">
          <span>🥗 Недельный обеденный план</span>
          <em>₽2 490</em>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="tg-filler">
      <div className="tg-filler-row">
        <span>📊 Доля прямых заказов</span>
        <em>онлайн</em>
      </div>
      <div className="tg-filler-list">
        <div>
          <span>📣 Рассылки</span>
          <em>окупаемость</em>
        </div>
        <div>
          <span>🔁 Повторные заказы</span>
          <em>68%</em>
        </div>
      </div>
    </div>
  );
}
