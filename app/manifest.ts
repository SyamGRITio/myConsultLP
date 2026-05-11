import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "syam",
    short_name: "syam",
    description:
      "月給14万から始めて、毎年100万ずつ年収を上げてきた。たぶん、再現できます。",
    start_url: "/",
    display: "standalone",
    background_color: "#5DD3D7",
    theme_color: "#0E0A1F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
