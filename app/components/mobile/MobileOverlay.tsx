type Props = {
  label: string;
};

export function MobileOverlay({ label }: Props) {
  return (
    <div className="mobile-overlay-root" aria-hidden>
      <div className="mobile-overlay-chip">{label}</div>
    </div>
  );
}
