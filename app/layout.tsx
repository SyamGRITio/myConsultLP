import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "月給14万から始めて、毎年100万ずつ年収を上げてきた。今では月単価101万＋α。たぶん、再現できます。";

export const metadata: Metadata = {
  metadataBase: new URL("https://lp.syam-gritio.com"),
  title: "付加価値、一緒に上げませんか。 | syam",
  description,
  openGraph: {
    title: "付加価値、一緒に上げませんか。 | syam",
    description,
    type: "website",
    locale: "ja_JP",
    url: "https://lp.syam-gritio.com",
    siteName: "syam",
  },
  twitter: {
    card: "summary_large_image",
    title: "付加価値、一緒に上げませんか。 | syam",
    description,
    creator: "@syam_nihick",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0A1F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${jetBrainsMono.variable}`}>
      <body>
        <ParallaxBackground />
        {children}
      </body>
    </html>
  );
}
