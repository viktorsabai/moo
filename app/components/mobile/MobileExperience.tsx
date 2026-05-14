"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import type { MobileExperienceProps } from "./types";

function MobileTopbar({
  landingTheme,
  onThemeToggle,
}: {
  landingTheme: "light" | "dark";
  onThemeToggle: () => void;
}) {
  return (
    <header className="mobile-topbar" aria-label="Mobile navigation">
      <a className="mobile-topbar-logo" href="#mobile-direct" aria-label="MOO home">
        MOO
      </a>

      <nav className="mobile-topbar-actions" aria-label="Quick actions">
        <a href="#mobile-commerce">FEATURES</a>
        <a href="#mobile-roi">DEMO</a>
        <button
          className="mobile-theme-toggle"
          onClick={onThemeToggle}
          type="button"
          aria-label={`Switch to ${landingTheme === "light" ? "dark" : "light"} landing theme`}
        >
          {landingTheme === "light" ? "DARK" : "LIGHT"}
        </button>
        <button type="button" aria-label="Open menu">
          <Menu size={15} />
        </button>
      </nav>
    </header>
  );
}

function getSceneProofs(sceneId: string) {
  const proofsByScene: Record<string, { value: string; label: string }[]> = {
    direct: [
      { value: "0%", label: "комиссии" },
      { value: "100%", label: "ваши гости" },
      { value: "48h", label: "запуск" },
    ],
    pain: [
      { value: "-30%", label: "маржи" },
      { value: "0%", label: "данных о гостях" },
      { value: "0", label: "повторных заказов" },
    ],
    crm: [
      { value: "12 650 ฿", label: "LTV" },
      { value: "+24%", label: "возврат" },
      { value: "5", label: "заказов" },
    ],
    commerce: [
      { value: "+18%", label: "средний чек" },
      { value: "3", label: "upsell" },
      { value: "LIVE", label: "наличие" },
    ],
    roi: [
      { value: "18 000 ฿", label: "экономия в месяц" },
      { value: "3 дня", label: "окупаемость" },
      { value: "48h", label: "запуск" },
    ],
  };

  return proofsByScene[sceneId] ?? [];
}

function getSceneInsight(sceneId: string) {
  const insightsByScene: Record<string, { title: string; body: string }> = {
    direct: {
      title: "Чек-лист запуска",
      body: "Пошаговый план с подсказками и готовыми шаблонами. Ничего лишнего — только то, что нужно для старта.",
    },
    pain: {
      title: "Потери наглядно",
      body: "Сколько денег уходит агрегаторам и что вместе с маржой теряет ресторан: данные, гостей и повторные заказы.",
    },
    crm: {
      title: "Профиль гостя",
      body: "Вся история в одном месте: предпочтения, частота заказов, любимые блюда и вероятность возврата.",
    },
    commerce: {
      title: "Витрина и продажи",
      body: "Меню как инструмент продаж: апселлы, модификаторы, стоп-лист и актуальное наличие в реальном времени.",
    },
    roi: {
      title: "Понятный ROI",
      body: "Введите количество заказов — увидите экономию, окупаемость и время запуска. Простые цифры для решения.",
    },
  };

  return insightsByScene[sceneId];
}

function getSceneDisplayTitle(sceneId: string, fallback: string) {
  const titlesByScene: Record<string, string> = {
    direct: "Канал в Telegram",
    pain: "Утечка маржи",
    crm: "Гость ваш",
    commerce: "Меню продаёт",
    roi: "ROI без комиссий",
  };

  return titlesByScene[sceneId] ?? fallback;
}

export function MobileExperience({
  phoneScreenKeys,
  phoneScreens,
  scenes,
}: MobileExperienceProps) {
  const [landingTheme, setLandingTheme] = useState<"light" | "dark">("dark");

  return (
    <section className="mobile-experience mobile-landing-v2" data-app-theme={landingTheme}>
      <MobileTopbar
        landingTheme={landingTheme}
        onThemeToggle={() => setLandingTheme((theme) => theme === "light" ? "dark" : "light")}
      />
      <div className="mobile-ambient-field" aria-hidden="true" />

      <div className="mobile-landing-stack">
        {scenes.map((scene, index) => {
          const insight = getSceneInsight(scene.id);

          return (
            <article
              className="mobile-product-section"
              data-tone={scene.tone}
              id={`mobile-${scene.id}`}
              key={scene.id}
            >
              <div className="mobile-section-copy">
                <div className="mobile-section-kicker">
                  <span>{scene.kicker}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </div>

                <h2 aria-label={scene.title}>
                  <span>{getSceneDisplayTitle(scene.id, scene.title)}</span>
                </h2>
              </div>

              <div className="mobile-product-frame">
                <div className="mobile-section-phone" aria-label={`${scene.title} product preview`}>
                  <div className="iphone-shell mobile-landing-phone">
                    <div className="iphone-island" />
                    <div className="iphone-screen">
                      <div className="phone-layer initial-visible" key={phoneScreenKeys[index]}>
                        {phoneScreens[index]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mobile-smart-brief">
                  <span>{insight?.title ?? "MOO insight"}</span>
                  <p>{scene.body}</p>
                </div>
              </div>

              <div className="mobile-section-proofs" aria-label="Business proof">
                {getSceneProofs(scene.id).map((proof) => (
                  <div key={`${scene.id}-${proof.value}-${proof.label}`}>
                    <strong>{proof.value}</strong>
                    <span>{proof.label}</span>
                  </div>
                ))}
              </div>

              <div className="mobile-section-signals">
                {scene.signals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>

              {insight ? <p className="mobile-section-note">{insight.body}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export {};
