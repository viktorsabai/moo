import type { MobileSceneData } from "./types";

export function MobileOverlay({
  activeIndex,
  scene,
}: {
  activeIndex: number;
  scene: MobileSceneData;
}) {
  return (
    <aside className="mobile-overlay" data-tone={scene.tone}>
      <div className="mobile-overlay-head">
        <span>{scene.kicker}</span>
        <b>{String(activeIndex + 1).padStart(2, "0")}</b>
      </div>

      <div className="mobile-editorial-copy">
        <h2>{scene.title}</h2>
        <p>{scene.body}</p>
      </div>
    </aside>
  );
}
