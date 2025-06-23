function Gear({
  color,
  className,
  style,
  teeth = 8,
  r = 32,
  cx = 50,
  cy = 50,
  hole = 12,
}: {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  teeth?: number;
  r?: number;
  cx?: number;
  cy?: number;
  hole?: number;
}) {
  // Generate gear path
  const angle = (2 * Math.PI) / teeth;
  const toothWidth = angle * 0.3;
  const outerR = r + 6;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * angle;
    const a1 = a + toothWidth / 2;
    const a2 = a + angle - toothWidth / 2;
    // Outer tip
    d +=
      (i === 0 ? "M" : "L") +
      (cx + outerR * Math.cos(a1)) +
      " " +
      (cy + outerR * Math.sin(a1));
    // Inner valley
    d +=
      "L" +
      (cx + r * Math.cos(a2)) +
      " " +
      (cy + r * Math.sin(a2));
  }
  d += "Z";
  // Center hole
  d += ` M${cx} ${cy} m-${hole},0 a${hole},${hole} 0 1,0 ${hole * 2},0 a${hole},${hole} 0 1,0 -${hole * 2},0`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
    >
      <path d={d} fill={color} stroke="#222" strokeWidth={2} />
    </svg>
  );
}

export default function PageLoader() {
  return (
    <div className="inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity" style={{ zIndex: 6000 }}>
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Gear 1 (left) */}
          <Gear
            color="#60a5fa"
            className="absolute left-0 top-8 w-20 h-20 animate-spin"
            style={{ animationDuration: "2s" }}
          />
          {/* Gear 2 (right, reverse spin) */}
          <Gear
            color="#f472b6"
            className="absolute right-0 top-8 w-20 h-20 animate-spin-reverse"
            style={{ animationDuration: "1.5s" }}
          />
          {/* Gear 3 (bottom, smaller, normal spin) */}
          <Gear
            color="#fde68a"
            r={22}
            hole={8}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-16 h-16 animate-spin"
            style={{ animationDuration: "2.5s" }}
          />
        </div>
        <div className="mt-3 text-gray-200 font-mono text-sm sm:text-xs">Loading...</div>
      </div>
    </div>
  );
}