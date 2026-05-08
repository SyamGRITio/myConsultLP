type Variant = 1 | 2 | 3 | 4 | 5;

type Props = {
  className?: string;
  variant?: Variant;
};

type Shape = {
  viewBox: string;
  width: number;
  height: number;
  rects: Array<{ x: number; y: number; w: number; h: number }>;
};

const SHAPES: Record<Variant, Shape> = {
  1: {
    viewBox: "0 0 80 24",
    width: 80,
    height: 24,
    rects: [
      { x: 8, y: 8, w: 8, h: 8 },
      { x: 16, y: 0, w: 8, h: 8 },
      { x: 24, y: 0, w: 8, h: 8 },
      { x: 32, y: 8, w: 8, h: 8 },
      { x: 0, y: 16, w: 56, h: 8 },
      { x: 40, y: 0, w: 8, h: 8 },
      { x: 48, y: 8, w: 24, h: 8 },
      { x: 56, y: 16, w: 16, h: 8 },
    ],
  },
  2: {
    viewBox: "0 0 96 20",
    width: 96,
    height: 20,
    rects: [
      { x: 0, y: 12, w: 80, h: 8 },
      { x: 16, y: 4, w: 16, h: 8 },
      { x: 40, y: 4, w: 8, h: 8 },
      { x: 56, y: 4, w: 24, h: 8 },
      { x: 80, y: 12, w: 16, h: 8 },
    ],
  },
  3: {
    viewBox: "0 0 56 20",
    width: 56,
    height: 20,
    rects: [
      { x: 4, y: 12, w: 40, h: 8 },
      { x: 12, y: 4, w: 16, h: 8 },
      { x: 28, y: 4, w: 12, h: 8 },
      { x: 44, y: 12, w: 8, h: 8 },
    ],
  },
  4: {
    viewBox: "0 0 72 28",
    width: 72,
    height: 28,
    rects: [
      { x: 0, y: 20, w: 72, h: 8 },
      { x: 8, y: 12, w: 56, h: 8 },
      { x: 16, y: 4, w: 32, h: 8 },
      { x: 24, y: 0, w: 16, h: 4 },
    ],
  },
  5: {
    viewBox: "0 0 88 22",
    width: 88,
    height: 22,
    rects: [
      { x: 0, y: 14, w: 28, h: 8 },
      { x: 8, y: 6, w: 16, h: 8 },
      { x: 40, y: 14, w: 32, h: 8 },
      { x: 48, y: 6, w: 20, h: 8 },
      { x: 80, y: 16, w: 8, h: 4 },
    ],
  },
};

export function PixelCloud({ className, variant = 1 }: Props) {
  const shape = SHAPES[variant];
  return (
    <svg
      viewBox={shape.viewBox}
      width={shape.width}
      height={shape.height}
      shapeRendering="crispEdges"
      className={className}
    >
      <g fill="#F4F0E0">
        {shape.rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} />
        ))}
      </g>
    </svg>
  );
}
