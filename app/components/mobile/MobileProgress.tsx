type Props = {
  activeIndex: number;
  total: number;
};

export function MobileProgress({ activeIndex, total }: Props) {
  const pct = total > 0 ? ((activeIndex + 1) / total) * 100 : 0;
  return (
    <div
      className="mobile-progress"
      style={{
        position: "fixed",
        top: 12,
        left: 18,
        right: 18,
        height: 3,
        borderRadius: 999,
        background: "rgba(255,255,255,0.12)",
        zIndex: 30,
      }}
      aria-hidden
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: "inherit",
          background: "linear-gradient(90deg, #978eff, #895eff)",
        }}
      />
    </div>
  );
}
