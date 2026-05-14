import type { MobileSceneData } from "./types";

export function MobileProgress({
  activeIndex,
  onSelect,
  scenes,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  scenes: MobileSceneData[];
}) {
  return (
    <nav className="mobile-progress" aria-label="MOO walkthrough progress">
      <div className="mobile-progress-track">
        {scenes.map((scene, index) => (
          <button
            aria-current={index === activeIndex ? "step" : undefined}
            aria-label={scene.title}
            className={index === activeIndex ? "is-active" : ""}
            key={scene.id}
            onClick={() => onSelect(index)}
            type="button"
          >
            <span className="mobile-progress-index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="mobile-progress-bar" />
          </button>
        ))}
      </div>
    </nav>
  );
}
