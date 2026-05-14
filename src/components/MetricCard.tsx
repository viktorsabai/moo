import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface MetricCardProps {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

export function MetricCard({ value, label, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md",
        className
      )}
    >
      <div className="text-3xl font-light text-white md:text-4xl">{value}</div>
      <div className="mt-3 text-sm font-light text-graphite-300">{label}</div>
    </div>
  );
}
