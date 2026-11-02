import type { Metadata, Viewport } from "next";
import { Bangers, Anton, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oc-display",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oc-numeral",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oc-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oc-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Sayan Deb // Portfolio Issue #01 — ECE Engineer & Creative Developer",
  description:
    "Overclock manga edition portfolio of Sayan Deb: B.Tech ECE at Heritage Institute of Technology (2025–2029). Featuring Lemmata LaTeX Editor, NISL Web Portal, NIARS Research Institute, IoT EDA Canvas, and live GitHub active push radar.",
  keywords: [
    "Sayan Deb",
    "ECE Engineer",
    "Heritage Institute of Technology",
    "Lemmata LaTeX Editor",
    "Full Stack Developer",
    "Kolkata",
    "Next.js",
    "Manga Portfolio",
    "Overclock",
    "IoT EDA",
    "Gesture Bulb",
    "BIPSS",
  ],
  authors: [{ name: "Sayan Deb", url: "https://github.com/helloSayanDeb" }],
  creator: "Sayan Deb",
  openGraph: {
    title: "Sayan Deb // Portfolio Issue #01 — ECE Engineer & Creative Developer",
    description:
      "Overclock manga edition portfolio: Lemmata LaTeX Editor, NISL Web Portal, NIARS, IoT EDA Canvas & live GitHub radar.",
    type: "website",
    locale: "en_US",
    url: "https://github.com/helloSayanDeb",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Deb // Portfolio Issue #01",
    description: "Overclock manga edition portfolio of Sayan Deb.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${anton.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <svg
          id="oc-defs"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
          aria-hidden="true"
        >
          <defs>
            <filter id="oc-sketchy" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.035 0.042"
                numOctaves={4}
                result="noise"
                seed={42}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={4.5}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="oc-sketchy-sm" x="-18%" y="-18%" width="136%" height="136%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.06"
                numOctaves={3}
                result="noise"
                seed={7}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={2.5}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
        {modal}
      </body>
    </html>
  );
}
