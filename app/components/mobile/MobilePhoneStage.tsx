import type { ReactNode } from "react";
import type { MobileSceneData } from "./types";

function MobileBusinessEffect({ tone }: { tone: MobileSceneData["tone"] }) {
  if (tone === "launch") {
    return (
      <div className="mobile-business-effect launch-effect" aria-hidden="true">
        <div>
          <span>Launch</span>
          <strong>48h</strong>
        </div>
        <div>
          <span>Mini App</span>
          <strong>Ready</strong>
        </div>
      </div>
    );
  }

  if (tone !== "roi") return null;

  return (
    <div className="mobile-business-effect roi-effect" aria-hidden="true">
      <div>
        <span>Saved commission</span>
        <strong>+246 500 ฿</strong>
      </div>
      <div className="mobile-roi-bars">
        {[32, 48, 72].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

export function MobilePhoneStage({
  activeIndex,
  phoneScreenKeys,
  phoneScreens,
  scene,
}: {
  activeIndex: number;
  phoneScreenKeys: string[];
  phoneScreens: ReactNode[];
  scene: MobileSceneData;
}) {
  const isBusinessScene = scene.tone === "roi" || scene.tone === "launch";
  const shouldTiltPhone = scene.tone === "crm" || scene.tone === "commerce" || scene.tone === "campaigns";

  return (
    <section className="mobile-phone-stage" data-tone={scene.tone}>
      <div className="mobile-phone-stage-inner">
        <div className="mobile-phone-glow" />

        <div className={`mobile-phone-frame ${shouldTiltPhone ? "is-cinematic" : ""}`}>
          <div
            className={`iphone-shell mobile-living-phone ${isBusinessScene ? "is-receded" : ""}`}
            aria-label="MOO product preview"
          >
            <div className="iphone-island" />

            <div className="iphone-screen">
              {phoneScreens.map((screen, screenIndex) => (
                <div
                  className={`phone-layer ${screenIndex === activeIndex ? "initial-visible" : ""}`}
                  key={`mobile-phone-${phoneScreenKeys[screenIndex]}`}
                >
                  {screen}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mobile-business-overlay">
          <MobileBusinessEffect tone={scene.tone} />
        </div>
      </div>
    </section>
  );
}
