import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="roadmap-site">
        <section className="rm-container rm-page-intro">
          <p className="rm-eyebrow">404 · A different direction</p>
          <h1>Page not found</h1>
          <p className="rm-lead">
            The page you were looking for may have moved, changed, or no longer
            be available.
          </p>
          <div className="rm-actions">
            <Link href="/" className="rm-button">
              Back to The Roadmap
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
