export function PixelSky() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(
          to bottom,
          #1B1240 0%, #1B1240 8%,
          #2B1B5E 8%, #2B1B5E 18%,
          #4B2E83 18%, #4B2E83 30%,
          #B83A8A 30%, #B83A8A 42%,
          #E94B8B 42%, #E94B8B 55%,
          #F4A26B 55%, #F4A26B 68%,
          #FBCA88 68%, #FBCA88 78%,
          #2B1B5E 78%, #2B1B5E 88%,
          #0E0A1F 88%
        )`,
      }}
    />
  );
}
