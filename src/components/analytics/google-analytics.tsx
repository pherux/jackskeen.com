"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

/** GA enhanced measurement handles page loads and App Router history changes. */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null;

  return (
    <>
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
