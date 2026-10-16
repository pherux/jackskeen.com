type ConversionEvent =
  "start_roadmap_click" | "calendly_booking_completed" | "newsletter_signup";

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    name: ConversionEvent,
    parameters: Record<string, string>,
  ) => void;
};

/** Only explicit, non-personal parameters are passed to Analytics. */
export function trackConversion(name: ConversionEvent) {
  if (typeof window === "undefined") return;
  (window as AnalyticsWindow).gtag?.("event", name, {
    page_path: window.location.pathname,
  });
}
