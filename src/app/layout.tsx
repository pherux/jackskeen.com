import type { Metadata } from "next";
import { Inter, Libre_Caslon_Display } from "next/font/google";

import { SanityPreviewRuntime } from "@/components/sanity/preview-runtime";
import "./globals.css";

const display = Libre_Caslon_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jackskeen.com"),
  title: {
    default: "Jack Skeen | Executive Coaching",
    template: "%s | Jack Skeen",
  },
  description:
    "Jack helps accomplished leaders understand their unique strengths, purpose, and next chapter.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <SanityPreviewRuntime />
      </body>
    </html>
  );
}
