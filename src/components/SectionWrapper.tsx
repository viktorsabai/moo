import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  dark = true,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-spacing container-section",
        dark ? "bg-black" : "bg-graphite-950",
        className
      )}
    >
      <div className="container-max">{children}</div>
    </section>
  );
}
