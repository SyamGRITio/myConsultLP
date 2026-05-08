type Props = {
  className?: string;
};

export function PixelCloud({ className }: Props) {
  return (
    <svg
      viewBox="0 0 80 24"
      width="80"
      height="24"
      shapeRendering="crispEdges"
      className={className}
    >
      <g fill="#F4F0E0">
        <rect x="8" y="8" width="8" height="8" />
        <rect x="16" y="0" width="8" height="8" />
        <rect x="24" y="0" width="8" height="8" />
        <rect x="32" y="8" width="8" height="8" />
        <rect x="0" y="16" width="56" height="8" />
        <rect x="40" y="0" width="8" height="8" />
        <rect x="48" y="8" width="24" height="8" />
        <rect x="56" y="16" width="16" height="8" />
      </g>
    </svg>
  );
}
