const BUILDINGS: Array<{ x: number; y: number; w: number; h: number }> = [
  { x: 0, y: 100, w: 60, h: 100 },
  { x: 60, y: 80, w: 50, h: 120 },
  { x: 110, y: 120, w: 80, h: 80 },
  { x: 190, y: 60, w: 60, h: 140 },
  { x: 250, y: 100, w: 70, h: 100 },
  { x: 320, y: 80, w: 50, h: 120 },
  { x: 370, y: 120, w: 60, h: 80 },
  { x: 430, y: 40, w: 80, h: 160 },
  { x: 510, y: 80, w: 60, h: 120 },
  { x: 570, y: 100, w: 70, h: 100 },
  { x: 640, y: 60, w: 50, h: 140 },
  { x: 690, y: 120, w: 80, h: 80 },
  { x: 770, y: 80, w: 60, h: 120 },
  { x: 830, y: 100, w: 70, h: 100 },
  { x: 900, y: 40, w: 60, h: 160 },
  { x: 960, y: 120, w: 80, h: 80 },
  { x: 1040, y: 80, w: 50, h: 120 },
  { x: 1090, y: 100, w: 70, h: 100 },
  { x: 1160, y: 60, w: 60, h: 140 },
  { x: 1220, y: 80, w: 80, h: 120 },
  { x: 1300, y: 100, w: 60, h: 100 },
  { x: 1360, y: 120, w: 70, h: 80 },
  { x: 1430, y: 40, w: 50, h: 160 },
  { x: 1480, y: 80, w: 80, h: 120 },
  { x: 1560, y: 100, w: 60, h: 100 },
  { x: 1620, y: 120, w: 70, h: 80 },
  { x: 1690, y: 80, w: 50, h: 120 },
  { x: 1740, y: 100, w: 80, h: 100 },
  { x: 1820, y: 60, w: 100, h: 140 },
];

export function PixelCity() {
  return (
    <div className="absolute left-0 right-0 top-[45%] h-[15%]">
      <svg
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="h-full w-full"
      >
        <g fill="#3D2D5F">
          {BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} />
          ))}
        </g>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 32) % 1920;
          const y = 80 + ((i * 17) % 80);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="4"
              height="4"
              fill="#FFD27D"
              style={{
                animation: `window-blink ${2 + (i % 3)}s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
