type Props = {
  hints: string[];
  variant?: "desktop" | "mobile";
};

export function OperationalHints({ hints, variant = "desktop" }: Props) {
  return (
    <ul
      className={`operational-hints operational-hints--${variant}`}
      aria-label="Operational value"
    >
      {hints.map((hint) => (
        <li key={hint}>{hint}</li>
      ))}
    </ul>
  );
}
