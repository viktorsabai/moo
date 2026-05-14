import type { ReactNode } from "react";

export type MobileSceneData = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  tone: string;
  signals: string[];
};

export type MobileExperienceProps = {
  phoneScreenKeys: string[];
  phoneScreens: ReactNode[];
  scenes: MobileSceneData[];
};
