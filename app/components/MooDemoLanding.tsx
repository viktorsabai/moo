"use client";

import { mooContacts } from "../data/contacts";
import { BusinessCalculator } from "./BusinessCalculator";
import { DemoSection } from "./DemoSection";
import { LandingHeader } from "./LandingHeader";

export function MooDemoLanding() {
  return (
    <>
      <LandingHeader />

      <div className="moo-landing">
        <DemoSection />

        <BusinessCalculator />

        <footer className="moo-footer moo-offer-box" id="contact">
          <p className="moo-section-label">MOO в коробке</p>
          <h2 className="moo-footer-title">Growth Platform под ключ</h2>

          <div className="moo-offer-meta">
            <div className="moo-offer-price">
              <strong>30 000 THB</strong>
              <span>~ ₽90 000 · единоразово</span>
            </div>
            <div className="moo-offer-time">
              <strong>48 часов</strong>
              <span>до запуска ресторана</span>
            </div>
          </div>

          <p className="moo-footer-copy">
            Direct Revenue · Owner Panel · CRM Flow · ROI Dashboard — всё включено
          </p>

          <div className="moo-cta-grid moo-cta-final">
            <a
              className="moo-btn-primary"
              href={mooContacts.founder}
              rel="noopener noreferrer"
              target="_blank"
            >
              Подключить ресторан
            </a>
            <a
              className="moo-btn-secondary"
              href={mooContacts.demoBot}
              rel="noopener noreferrer"
              target="_blank"
            >
              Открыть Live Demo в Telegram
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
