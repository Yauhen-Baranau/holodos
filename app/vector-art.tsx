type ServiceVectorIconProps = {
  variant: number;
};

export function HeroFridgeIllustration() {
  return (
    <svg
      className="hero-vector"
      viewBox="0 0 320 300"
      role="img"
      aria-labelledby="hero-vector-title"
    >
      <title id="hero-vector-title">Мастер ремонтирует холодильник</title>
      <defs>
        <linearGradient id="hero-fridge" x1="92" x2="214" y1="30" y2="246">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#dffbff" />
        </linearGradient>
        <linearGradient id="hero-tool" x1="202" x2="274" y1="186" y2="258">
          <stop stopColor="#0f766e" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <path
        className="hero-vector__halo"
        d="M282 92c22 57-13 137-77 163-64 27-155 0-181-58C-2 140 37 53 101 25c64-29 159 10 181 67Z"
      />
      <rect
        className="hero-vector__fridge"
        x="92"
        y="36"
        width="132"
        height="216"
        rx="28"
      />
      <path className="hero-vector__line" d="M112 122h92" />
      <path className="hero-vector__handle" d="M192 146v56" />
      <path
        className="hero-vector__snow"
        d="M142 66v46M119 89h46M126 73l32 32M158 73l-32 32"
      />
      <circle className="hero-vector__tool-bg" cx="236" cy="220" r="42" />
      <path
        className="hero-vector__tool"
        d="m219 216 13 13 27-31M104 262h108"
      />
      <circle className="hero-vector__dot hero-vector__dot--left" cx="66" cy="76" r="9" />
      <circle className="hero-vector__dot hero-vector__dot--right" cx="255" cy="58" r="7" />
    </svg>
  );
}

export function ServiceVectorIcon({ variant }: ServiceVectorIconProps) {
  const icon = variant % 4;

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="38" height="38" rx="14" />
      {icon === 0 ? (
        <path d="M18 15v18M30 15v18M15 24h18M18 18l12 12M30 18 18 30" />
      ) : null}
      {icon === 1 ? (
        <path d="M15 17h18v14H15zM19 31v4M29 31v4M19 22h10" />
      ) : null}
      {icon === 2 ? (
        <path d="M16 28c5-10 11-10 16 0M17 32h14M20 18h8l4 5H16l4-5Z" />
      ) : null}
      {icon === 3 ? (
        <path d="M16 17h16M18 17l2 18h8l2-18M21 22h6M22 27h4" />
      ) : null}
    </svg>
  );
}
