"use client";

import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { currencySymbol, formatAmount, formatMoney } from "../lib/currency";
import { AnimatedNumber } from "./AnimatedNumber";

function usePulseOnChange(value: number) {
  const [pulse, setPulse] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    setPulse(true);
    const id = setTimeout(() => setPulse(false), 480);
    return () => clearTimeout(id);
  }, [value]);

  return pulse;
}

function plural(n: number, forms: [string, string, string]) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1];
  return forms[2];
}

type SpendItem = {
  id: string;
  emoji: string;
  unitThb: number;
  forms: [string, string, string];
};

const SPEND_ITEMS: SpendItem[] = [
  {
    id: "rent",
    emoji: "🏠",
    unitThb: 35000,
    forms: ["месяц аренды кухни", "месяца аренды кухни", "месяцев аренды кухни"],
  },
  {
    id: "cook",
    emoji: "👨‍🍳",
    unitThb: 18000,
    forms: [
      "месяц зарплаты повара",
      "месяца зарплаты повара",
      "месяцев зарплаты повара",
    ],
  },
  {
    id: "scooter",
    emoji: "🛵",
    unitThb: 55000,
    forms: ["байк для доставки", "байка для доставки", "байков для доставки"],
  },
  {
    id: "ads",
    emoji: "📣",
    unitThb: 10000,
    forms: ["месяц рекламы", "месяца рекламы", "месяцев рекламы"],
  },
];

function CalcSlider({
  label,
  max,
  min,
  onChange,
  step,
  value,
  valueLabel,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
  valueLabel: string;
}) {
  const fillPercent = ((value - min) / (max - min)) * 100;
  const rangeStyle = { "--fill": `${fillPercent}%` } as CSSProperties;

  return (
    <label className="moo-calc-field">
      <div className="moo-calc-field-head">
        <span>{label}</span>
        <strong>{valueLabel}</strong>
      </div>
      <input
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        className="moo-calc-range"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        step={step}
        style={rangeStyle}
        type="range"
        value={value}
      />
    </label>
  );
}

function SpendValue({ count }: { count: number }) {
  const pulse = usePulseOnChange(count);
  return (
    <strong className={pulse ? "is-pulse" : ""}>
      <AnimatedNumber format={formatAmount} value={count} />
    </strong>
  );
}

export const BusinessCalculator = memo(function BusinessCalculator() {
  const [orders, setOrders] = useState(320);
  const [avgCheckThb, setAvgCheckThb] = useState(600);
  const [commission, setCommission] = useState(25);
  const [inView, setInView] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const model = useMemo(() => {
    const monthlyRevenue = orders * avgCheckThb;
    const aggregatorLoss = monthlyRevenue * (commission / 100);
    const yearlySave = aggregatorLoss * 12;

    return { monthlyRevenue, aggregatorLoss, yearlySave };
  }, [orders, avgCheckThb, commission]);

  const formatValue = (value: number) => formatAmount(value);
  const yearlyPulse = usePulseOnChange(Math.round(model.yearlySave));

  const spend = useMemo(
    () =>
      SPEND_ITEMS.map((item) => ({
        ...item,
        count: Math.floor(model.yearlySave / item.unitThb),
      })).filter((item) => item.count >= 1),
    [model.yearlySave],
  );

  return (
    <section aria-labelledby="calc-title" className="moo-calc" id="calc">
      <div className="moo-calc-head">
        <div className="moo-calc-head-row">
          <div>
            <p className="moo-section-label">Экономия</p>
            <h2 id="calc-title">Сколько вы отдаёте агрегаторам</h2>
          </div>
        </div>
        <p className="moo-calc-lead">
          Передвиньте слайдеры — увидите, сколько остаётся у&nbsp;вас, когда гости
          заказывают напрямую.
        </p>
      </div>

      <div className={`moo-calc-panel${inView ? " is-in" : ""}`} ref={panelRef}>
        <div className="moo-calc-grid">
          <CalcSlider
            label="Заказов в месяц"
            max={3000}
            min={30}
            onChange={setOrders}
            step={10}
            value={orders}
            valueLabel={String(orders)}
          />
          <CalcSlider
            label={`Средний чек, ${currencySymbol()}`}
            max={2700}
            min={200}
            onChange={setAvgCheckThb}
            step={50}
            value={avgCheckThb}
            valueLabel={formatMoney(avgCheckThb)}
          />
          <CalcSlider
            label="Комиссия агрегатора, %"
            max={35}
            min={10}
            onChange={setCommission}
            step={1}
            value={commission}
            valueLabel={`${commission}%`}
          />
        </div>

        <div className="moo-calc-results">
          <div className="moo-calc-rows">
            <div className="moo-calc-row is-loss">
              <span>Уходит агрегаторам в месяц</span>
              <strong>
                −<AnimatedNumber format={formatValue} value={model.aggregatorLoss} />{" "}
                {currencySymbol()}
              </strong>
            </div>
            <div className="moo-calc-row">
              <span>Ваша выручка в месяц</span>
              <strong>
                <AnimatedNumber format={formatValue} value={model.monthlyRevenue} />{" "}
                {currencySymbol()}
              </strong>
            </div>
          </div>

          <div className="moo-calc-hero">
            <span aria-hidden="true" className="moo-calc-hero-glow" />
            <small>Останется у вас за год с MOO</small>
            <strong className={yearlyPulse ? "is-pulse" : ""}>
              +<AnimatedNumber format={formatValue} value={model.yearlySave} />{" "}
              <em>{currencySymbol()}</em>
            </strong>
            <p>Это деньги, которые сейчас забирают агрегаторы. С прямыми заказами они ваши.</p>
          </div>

          <div className="moo-calc-spend">
            <p className="moo-calc-spend-title">
              <span aria-hidden="true">💡</span> На эти деньги за год можно:
            </p>
            <div className="moo-calc-spend-grid">
              {spend.map((item, i) => (
                <article
                  className="moo-calc-spend-tile"
                  key={item.id}
                  style={{ "--i": i } as CSSProperties}
                >
                  <span aria-hidden="true" className="moo-calc-spend-emoji">
                    {item.emoji}
                  </span>
                  <div className="moo-calc-spend-copy">
                    <SpendValue count={item.count} />
                    <small>{plural(item.count, item.forms)}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
