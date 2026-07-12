import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edify Endurance | Begin Strong. Finish Stronger.",
  description:
    "Personalized running coaching for beginners and improving runners by Don Santillan. From your very first 5K to your next PR, guided every step and pushed every limit.",
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
        {/* Clash Display, logo lockup only — just the semibold weight */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
