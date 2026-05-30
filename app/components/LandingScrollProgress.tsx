"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["top", "demo", "calc", "faq", "contact"] as const;

const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  top: "Старт",
  demo: "Демо",
  calc: "Экономия",
  faq: "FAQ",
  contact: "Запуск",
};

export function LandingScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [markers, setMarkers] = useState<number[]>([]);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));

      const positions = SECTION_IDS.map((id) => {
        const node = document.getElementById(id);
        if (!node || max <= 0) return 0;
        return node.offsetTop / max;
      });
      setMarkers(positions);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="moo-landing-progress">
      <div className="moo-landing-progress-inner">
        <div className="moo-landing-progress-track">
          <div
            className="moo-landing-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
          {markers.map((left, i) => (
            <span
              className="moo-landing-progress-stop"
              key={SECTION_IDS[i]}
              style={{ left: `${Math.min(100, left * 100)}%` }}
              title={SECTION_LABELS[SECTION_IDS[i]!]}
            />
          ))}
          <span
            className="moo-landing-progress-thumb"
            style={{ left: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
