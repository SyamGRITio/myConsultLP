import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://lp.syam-gritio.com"),
  title: "付加価値、一緒に上げませんか。 | syam",
  description:
    "月給14万から始めて、毎年100万ずつ年収を上げてきた。借金300万を返して、資格を30個取った。たぶん、再現できます。",
  openGraph: {
    title: "付加価値、一緒に上げませんか。 | syam",
    description:
      "月給14万から始めて、毎年100万ずつ年収を上げてきた。たぶん、再現できます。",
    type: "website",
    locale: "ja_JP",
    url: "https://lp.syam-gritio.com",
    siteName: "syam",
  },
  twitter: {
    card: "summary_large_image",
    title: "付加価値、一緒に上げませんか。 | syam",
    description:
      "月給14万から始めて、毎年100万ずつ年収を上げてきた。たぶん、再現できます。",
    creator: "@syam_nihick",
  },
  icons: {
    icon: "/favicon.ico",
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
      <body>{children}</body>
    </html>
  );
}
