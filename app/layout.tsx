import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexlaguardia.dev"),
  title: "Alex LaGuardia | AI / Backend Engineer",
  description:
    "AI and backend engineer building AI-powered systems, game engines, and production platforms. Python, Rust, TypeScript.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "AI engineer",
    "Rust",
    "Python",
    "TypeScript",
    "Next.js",
    "FastAPI",
  ],
  openGraph: {
    title: "Alex LaGuardia | AI / Backend Engineer",
    description:
      "AI and backend engineer building AI-powered systems, game engines, and production platforms.",
    url: "https://alexlaguardia.dev",
    siteName: "Alex LaGuardia",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Alex LaGuardia — AI / Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex LaGuardia | AI / Backend Engineer",
    description:
      "AI and backend engineer building AI-powered systems, game engines, and production platforms.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
