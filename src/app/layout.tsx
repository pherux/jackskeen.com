import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jack Skeen — Project foundation",
  description: "Placeholder metadata for the JackSkeen.com rebuild.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
