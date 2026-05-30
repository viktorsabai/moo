import { platformModules } from "../data/platform-insights";

type Props = {
  activeIndex?: number;
};

export function EcosystemStrip({ activeIndex = 0 }: Props) {
  return (
    <div aria-label="Модули платформы" className="moo-eco">
      {platformModules.map((module, index) => (
        <span
          className={index === activeIndex % platformModules.length ? "is-active" : ""}
          key={module.id}
        >
          <em>{module.label}</em>
          <small>{module.hint}</small>
        </span>
      ))}
    </div>
  );
}
