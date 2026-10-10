import { code39 } from "@/lib/barcode";

const QUIET = 10; // blank modules each side, so scanners find the edges

// A Code 39 barcode drawn as SVG bars, one unit per module.
export const Barcode = ({ text, className }: { text: string; className?: string }) => {
  const modules = code39(text);
  const bars: [number, number][] = [];
  for (let i = 0; i < modules.length; i++) {
    if (modules[i] !== "1") continue;
    let end = i;
    while (modules[end] === "1") end++;
    bars.push([i, end - i]);
    i = end;
  }

  return (
    <svg
      viewBox={`0 0 ${modules.length + QUIET * 2} 40`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {bars.map(([x, width]) => (
        <rect key={x} x={x + QUIET} y={0} width={width} height={40} fill="currentColor" />
      ))}
    </svg>
  );
};
