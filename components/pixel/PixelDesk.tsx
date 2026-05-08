export function PixelDesk() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-[25%] items-end justify-center">
      <svg
        viewBox="0 0 600 200"
        preserveAspectRatio="xMidYMax meet"
        shapeRendering="crispEdges"
        className="h-full w-full max-w-[800px]"
      >
        <rect x="0" y="160" width="600" height="40" fill="#3D2417" />
        <rect x="0" y="155" width="600" height="5" fill="#5C3623" />

        <rect x="60" y="80" width="180" height="80" fill="#7A7580" />
        <rect x="70" y="90" width="160" height="60" fill="#0A0A0A" />
        <text
          x="80"
          y="115"
          fill="#5BFF5B"
          fontSize="14"
          fontFamily='"VT323", monospace'
        >
          C:\&gt;
        </text>
        <rect
          x="118"
          y="105"
          width="8"
          height="12"
          fill="#5BFF5B"
          style={{ animation: "blink 1s steps(1) infinite" }}
        />
        <rect x="140" y="160" width="20" height="10" fill="#5C5560" />

        <rect x="280" y="130" width="40" height="30" fill="#9C9398" />
        <rect x="320" y="138" width="6" height="14" fill="#9C9398" />
        <g style={{ animation: "steam 4s ease-out infinite" }}>
          <path
            d="M295 125 Q290 115 295 105 Q300 95 295 85"
            stroke="#F4F0E0"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M305 125 Q310 115 305 105 Q300 95 305 85"
            stroke="#F4F0E0"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />
        </g>

        <rect x="360" y="140" width="60" height="20" fill="#3D5A47" />
        <rect x="365" y="120" width="55" height="20" fill="#5C7A6A" />

        <rect x="475" y="115" width="20" height="40" fill="#4A7C59" />
        <rect x="465" y="125" width="10" height="15" fill="#4A7C59" />
        <rect x="495" y="130" width="10" height="12" fill="#4A7C59" />
        <rect x="465" y="150" width="40" height="15" fill="#A0593E" />
      </svg>
    </div>
  );
}
