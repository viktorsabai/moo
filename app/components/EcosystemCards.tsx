import type { EcosystemCard } from "../data/story";

type Props = {
  cards: EcosystemCard[];
  variant?: "desktop" | "mobile";
};

export function EcosystemCards({ cards, variant = "desktop" }: Props) {
  return (
    <div
      className={`ecosystem-cards ecosystem-cards--${variant}`}
      aria-label="Product ecosystem"
    >
      {cards.map((card) => (
        <article
          className="ecosystem-card"
          data-status={card.status ?? "idle"}
          key={card.label}
        >
          <span className="ecosystem-card-label">{card.label}</span>
          {card.value ? (
            <strong className="ecosystem-card-value">{card.value}</strong>
          ) : null}
          {card.status === "live" ? (
            <i className="ecosystem-card-dot" aria-hidden="true" />
          ) : null}
        </article>
      ))}
    </div>
  );
}
