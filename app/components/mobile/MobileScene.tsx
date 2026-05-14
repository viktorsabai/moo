import type { MobileSceneData } from "./types";

export function MobileScene({
  index,
  scene,
}: {
  index: number;
  scene: MobileSceneData;
}) {
  return (
    <section
      aria-label={scene.title}
      className="mobile-scene"
      data-mobile-scene
      data-scene-index={index}
      id={`mobile-${scene.id}`}
    >
      <div className="mobile-scene-anchor">
        <span>{scene.kicker}</span>
        <strong>{scene.title}</strong>
      </div>
    </section>
  );
}
