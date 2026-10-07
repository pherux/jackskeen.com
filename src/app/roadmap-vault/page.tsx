import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/site/roadmap-pages";

export const metadata: Metadata = {
  title: "Roadmap Vault — Private Access",
  description: "Contact Jack for access to your private Roadmap resources.",
  alternates: { canonical: "/roadmap-vault" },
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <Frame>
      <section className="rm-container rm-page-intro">
        <p className="rm-eyebrow">Private resources</p>
        <h1>Roadmap Vault</h1>
        <p>
          This area is private. Please contact Jack for access to your
          resources.
        </p>
        <Link className="rm-button" href="/contact">
          Contact Jack
        </Link>
      </section>
    </Frame>
  );
}
