import type { ReactNode } from "react";

export function MobilePhoneStage({ children }: { children: ReactNode }) {
  return (
    <div className="iphone-shell tg-phone-shell">
      <div className="iphone-island" aria-hidden="true" />
      <div className="iphone-screen">
        <div className="tg-statusbar" aria-hidden="true">
          <span>9:41</span>
          <span>●●●○ 📶 🔋</span>
        </div>
        <div className="phone-layer">{children}</div>
      </div>
    </div>
  );
}
