export function PixelWater() {
  return (
    <div className="absolute left-0 right-0 top-[60%] h-[12%]">
      <svg
        viewBox="0 0 1920 100"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="h-full w-full"
        style={{ animation: "water-wave 5s ease-in-out infinite" }}
      >
        <rect x="0" y="0" width="1920" height="100" fill="#2B1B5E" opacity="0.5" />
        <rect x="100" y="20" width="200" height="2" fill="#F4F0E0" opacity="0.4" />
        <rect x="350" y="35" width="150" height="2" fill="#F4F0E0" opacity="0.3" />
        <rect x="550" y="50" width="280" height="2" fill="#F4F0E0" opacity="0.5" />
        <rect x="900" y="25" width="180" height="2" fill="#F4F0E0" opacity="0.4" />
        <rect x="1100" y="60" width="220" height="2" fill="#F4F0E0" opacity="0.3" />
        <rect x="1380" y="40" width="160" height="2" fill="#F4F0E0" opacity="0.5" />
        <rect x="1600" y="55" width="240" height="2" fill="#F4F0E0" opacity="0.4" />
        <rect x="200" y="75" width="100" height="2" fill="#F4F0E0" opacity="0.3" />
        <rect x="700" y="80" width="180" height="2" fill="#F4F0E0" opacity="0.4" />
        <rect x="1300" y="85" width="200" height="2" fill="#F4F0E0" opacity="0.3" />
      </svg>
    </div>
  );
}
