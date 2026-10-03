import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Sayan Deb | Creative Developer & UI Engineer",
  description: "Luxury 3D interactive portfolio of Sayan Deb, featuring high-performance web engineering, WebGL, systems architecture, and custom creative development.",
  keywords: [
    "Sayan Deb",
    "Creative Developer",
    "UI Engineer",
    "Next.js Portfolio",
    "GSAP 3D Scroll",
    "Brushed Metal UI",
    "WebGL",
    "Frontend Architect"
  ],
  authors: [{ name: "Sayan Deb" }],
  creator: "Sayan Deb",
  openGraph: {
    title: "Sayan Deb | Creative Developer & UI Engineer",
    description: "Explore 15 state-of-the-art software systems with 3D perspective scrolling and tactile brushed-metal aesthetics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Deb | Creative Developer & UI Engineer",
    description: "Explore 15 state-of-the-art software systems with 3D perspective scrolling and tactile brushed-metal aesthetics.",
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
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
