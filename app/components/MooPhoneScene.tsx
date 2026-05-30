"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { DemoStepId, MooSceneId } from "../data/demo-beats";

type Props = {
  phase: string;
  pushProfit: string;
  sceneId: MooSceneId;
  showPush: boolean;
  step: DemoStepId;
};

export function MooPhoneScene({ phase, pushProfit, sceneId, showPush, step }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (activeRef.current) {
      gsap.to(activeRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
    }

    const next = root.querySelector<HTMLElement>("[data-active='true']");
    activeRef.current = next;

    if (next) {
      gsap.fromTo(next, { scale: 1 }, { scale: 1.03, duration: 0.45, ease: "power3.out" });
    }
  }, [step, sceneId]);

  return (
    <div
      className={`moo-ds-screen is-scene-${sceneId} is-step-${step} is-phase-${phase}`}
      data-phase={phase}
      ref={rootRef}
    >
      <header className="moo-ds-header">
        <span className="moo-ds-brand">MOO</span>
        <span className="moo-ds-venue">USSR · открыто</span>
      </header>

      <div className="moo-ds-body">
        {sceneId === "order" ? <OrderScene step={step} /> : null}
        {sceneId === "import" ? <ImportScene step={step} /> : null}
        {sceneId === "crm" ? <CrmScene step={step} /> : null}
        {sceneId === "pass" ? <PassScene step={step} /> : null}
      </div>

      <nav aria-label="Навигация" className="moo-ds-tabbar">
        <span className="is-active">меню</span>
        <span>заказы</span>
        <span>pass</span>
        <span>профиль</span>
      </nav>

      <div className={`moo-ds-push${showPush ? " is-visible" : ""}`} key={`${sceneId}-push`} role="status">
        <span className="moo-ds-push-mark">M</span>
        <p>{pushProfit}</p>
      </div>
    </div>
  );
}

function MiniRow({
  active,
  emoji,
  name,
  price,
  tag,
}: {
  active?: boolean;
  emoji: string;
  name: string;
  price: string;
  tag?: string;
}) {
  return (
    <div className={`moo-ds-row${active ? " is-active" : ""}`} data-active={active ? "true" : "false"}>
      <span className="moo-ds-row-emoji">{emoji}</span>
      <div className="moo-ds-row-meta">
        <strong>{name}</strong>
        <em>{price}</em>
      </div>
      {tag ? <b className="moo-ds-row-tag">{tag}</b> : null}
    </div>
  );
}

function ModulePill({ active, label, on }: { active?: boolean; label: string; on: boolean }) {
  return (
    <span className={`moo-ds-pill${on ? " is-on" : ""}${active ? " is-active" : ""}`} data-active={active ? "true" : "false"}>
      {label}
    </span>
  );
}

function OrderScene({ step }: { step: DemoStepId }) {
  const merchOn = step !== "menu";
  const passOn = step === "toggle-pass" || step === "order" || step === "profit";
  const ordered = step === "order" || step === "profit";

  return (
    <>
      <div className="moo-ds-split-head">
        <span className="moo-ds-kicker">Mini App</span>
        <div className="moo-ds-module-strip">
          <ModulePill active={step === "toggle-merch"} label="мерч" on={merchOn} />
          <ModulePill active={step === "toggle-pass"} label="pass" on={passOn} />
          <ModulePill label="CRM" on />
        </div>
      </div>

      <div className="moo-ds-stack">
        <MiniRow emoji="🍔" name="Бургер BBQ" price="300 THB" />
        <MiniRow active={ordered} emoji="🥣" name="Поке-боул" price="320 THB" tag={ordered ? "в корзине" : undefined} />
        <MiniRow emoji="🥗" name="Цезарь" price="280 THB" />
      </div>

      <div className="moo-ds-admin-strip">
        <span>Модули OS</span>
        <em className={merchOn && passOn ? "is-live" : undefined}>
          {merchOn && passOn ? "3 активны" : "1 активен"}
        </em>
      </div>

      <div className={`moo-ds-cart${ordered ? " is-visible" : ""}`}>
        <span>320 THB · 0% комиссия</span>
        <strong>{step === "profit" ? "Оплачено" : "Оплатить"}</strong>
      </div>
    </>
  );
}

function ImportScene({ step }: { step: DemoStepId }) {
  const scanning = step === "scan";
  const ready = step === "vitrine" || step === "profit";

  return (
    <>
      <div className="moo-ds-split-head">
        <span className="moo-ds-kicker">Импорт + витрина</span>
        <em className={ready ? "is-live" : undefined}>{ready ? "готово" : "AI scan"}</em>
      </div>

      <div className="moo-ds-dual">
        <div className={`moo-ds-pdf-mini${ready ? " is-done" : ""}`}>
          <span>menu.pdf</span>
          <div className="moo-ds-pdf-lines">
            <i /><i /><i />
          </div>
          {scanning ? <div aria-hidden="true" className="moo-ds-scan-line" /> : null}
        </div>

        <div className={`moo-ds-stack moo-ds-stack-compact${ready ? " is-live" : ""}`}>
          <MiniRow active={ready} emoji="🍔" name="Бургер BBQ" price="300" tag={ready ? "заказ" : undefined} />
          <MiniRow emoji="🥣" name="Поке" price="320" />
          <MiniRow emoji="🥗" name="Цезарь" price="280" />
        </div>
      </div>
    </>
  );
}

function CrmScene({ step }: { step: DemoStepId }) {
  const editing = step === "edit" || step === "push" || step === "synced" || step === "profit";
  const pushOn = step === "push" || step === "synced" || step === "profit";
  const synced = step === "synced" || step === "profit";

  return (
    <>
      <div className="moo-ds-split-head">
        <span className="moo-ds-kicker">CRM + Live</span>
        <em className={synced ? "is-live" : undefined}>{synced ? "sync" : "guest"}</em>
      </div>

      <div className="moo-ds-guest-mini">
        <span>🧑</span>
        <div>
          <strong>Виктор · 10 дн. offline</strong>
          <small>4 заказа · 1,200 THB</small>
        </div>
        <b className={pushOn ? "is-live" : undefined}>{pushOn ? "push" : "—"}</b>
      </div>

      <div className="moo-ds-dual moo-ds-dual-tight">
        <div className={`moo-ds-price-edit${editing ? " is-editing" : ""}`} data-active={step === "edit" ? "true" : "false"}>
          <span>Том ям</span>
          <em>{editing ? "300" : "350"} THB</em>
        </div>
        <div className={`moo-ds-inapp-push${pushOn ? " is-visible" : ""}`}>
          <strong>Держи ролл в подарок</strong>
        </div>
      </div>

      <div className={`moo-ds-sync-mini${synced ? " is-visible" : ""}`}>
        Обновлено во всех TG-каналах
      </div>
    </>
  );
}

function PassScene({ step }: { step: DemoStepId }) {
  const flipped = step === "flip" || step === "revenue" || step === "profit";
  const tapping = step === "tap";
  const showRevenue = step === "revenue" || step === "profit";

  return (
    <>
      <div className="moo-ds-split-head">
        <span className="moo-ds-kicker">Pass + выручка</span>
        <em className={showRevenue ? "is-live" : undefined}>Lunch Pass</em>
      </div>

      <div className="moo-ds-dual moo-ds-dual-tight">
        <div className={`moo-ds-pass-mini${flipped ? " is-flipped" : ""}${tapping ? " is-tapping" : ""}`}>
          <div className="moo-ds-pass-front" data-active={tapping ? "true" : "false"}>
            <strong>10 обедов</strong>
            <span>2,500 THB</span>
          </div>
          <div className="moo-ds-pass-back">
            <strong>Активен</strong>
            <span>9/10</span>
          </div>
        </div>

        <div className={`moo-ds-revenue-mini${showRevenue ? " is-visible" : ""}`}>
          <div className="moo-ds-bars">
            <i style={{ height: "45%" }} />
            <i style={{ height: "70%" }} />
            <i style={{ height: "100%" }} />
          </div>
          <strong>250k THB</strong>
          <small>вперёд</small>
        </div>
      </div>

      <div className="moo-ds-stack moo-ds-stack-compact">
        <MiniRow emoji="🎫" name="Weekend Brunch" price="1,800 THB" tag="скоро" />
      </div>
    </>
  );
}
