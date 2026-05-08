function CloudSVG() {
  return (
    <svg
      viewBox="0 0 80 24"
      width="120"
      height="36"
      shapeRendering="crispEdges"
    >
      <rect x="8" y="8" width="8" height="8" fill="#C9B8E8" />
      <rect x="16" y="0" width="8" height="8" fill="#C9B8E8" />
      <rect x="24" y="0" width="8" height="8" fill="#C9B8E8" />
      <rect x="32" y="8" width="8" height="8" fill="#C9B8E8" />
      <rect x="0" y="16" width="56" height="8" fill="#C9B8E8" />
      <rect x="40" y="0" width="8" height="8" fill="#C9B8E8" />
      <rect x="48" y="8" width="24" height="8" fill="#C9B8E8" />
      <rect x="56" y="16" width="16" height="8" fill="#C9B8E8" />
    </svg>
  );
}

export function PixelClouds() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-[5%]"
        style={{ animation: "cloud-drift 90s linear infinite" }}
      >
        <CloudSVG />
      </div>
      <div
        className="absolute top-[9%]"
        style={{
          animation: "cloud-drift 120s linear infinite",
          animationDelay: "-30s",
        }}
      >
        <CloudSVG />
      </div>
      <div
        className="absolute top-[6%]"
        style={{
          animation: "cloud-drift 150s linear infinite",
          animationDelay: "-60s",
        }}
      >
        <CloudSVG />
      </div>
      <div
        className="absolute top-[12%]"
        style={{
          animation: "cloud-drift 110s linear infinite",
          animationDelay: "-90s",
        }}
      >
        <CloudSVG />
      </div>
    </div>
  );
}
