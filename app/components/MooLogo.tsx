type MarkProps = {
  /** Tile size in px */
  size?: number;
  className?: string;
  /** Gentle float + glow on the mark */
  animated?: boolean;
};

type LogoProps = MarkProps & {
  /** Wordmark next to the mark */
  withWordmark?: boolean;
};

export function MooMark({ size = 30, className, animated = true }: MarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`moo-tg-mark${animated ? " is-animated" : ""}${className ? ` ${className}` : ""}`}
      style={{ width: size, height: size }}
    >
      <img
        alt=""
        draggable={false}
        height={size}
        src="/moo-telegram-icon.png"
        width={size}
      />
    </span>
  );
}

export function MooLogo({
  size = 30,
  withWordmark = false,
  className,
  animated = true,
}: LogoProps) {
  return (
    <span className={`moo-logo${className ? ` ${className}` : ""}`}>
      <MooMark animated={animated} size={size} />
      {withWordmark ? <span className="moo-logo-text">MOO</span> : null}
    </span>
  );
}
