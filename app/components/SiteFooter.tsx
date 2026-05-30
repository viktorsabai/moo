import { mooContacts } from "../data/contacts";
import { MooLogo } from "./MooLogo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="moo-site-footer">
      <div className="moo-site-footer-card">
        <div className="moo-site-footer-glow" aria-hidden="true" />

        <div className="moo-site-footer-top">
          <div className="moo-site-footer-brand">
            <MooLogo size={48} withWordmark />
            <p className="moo-site-footer-tagline">
              Ресторан в Telegram — заказы, CRM и подписки
            </p>
          </div>
        </div>

        <div className="moo-site-footer-cols">
          <nav aria-label="Продукт" className="moo-site-footer-col">
            <h4>Продукт</h4>
            <a href="#demo">Как работает</a>
            <a href="#calc">Калькулятор</a>
            <a href="#faq">Вопросы</a>
            <a href="#contact">Цена и запуск</a>
          </nav>

          <nav aria-label="Возможности" className="moo-site-footer-col">
            <h4>Внутри</h4>
            <a href="#demo">Меню и корзина</a>
            <a href="#demo">Оплата и статусы</a>
            <a href="#demo">CRM и push</a>
            <a href="#demo">Lunch Pass</a>
          </nav>
        </div>

        <div className="moo-site-footer-bottom">
          <span>© {year} MOO · Phuket, Thailand</span>
          <span className="moo-site-footer-made">
            <a href={mooContacts.demoBot} rel="noopener noreferrer" target="_blank">
              {mooContacts.demoBotHandle}
            </a>
            {" · "}
            <a href={mooContacts.founder} rel="noopener noreferrer" target="_blank">
              {mooContacts.founderHandle}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
