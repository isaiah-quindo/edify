import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edify Endurance | Where Coaching Creates Momentum",
  description:
    "Personalized coaching for road running, trail running, and general fitness by Don Santillan, UTMB finisher and Philippine representative at the World Skyrunning Championships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
