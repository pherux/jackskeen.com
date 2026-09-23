"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="roadmap-site" id="main-content">
      <section className="rm-container rm-page-intro">
        <p className="rm-eyebrow">Something went wrong</p>
        <h1>Let’s try that again.</h1>
        <p className="rm-lead">
          This page could not load. Please try again, or return to the homepage.
        </p>
        <div className="rm-actions">
          <button className="rm-button" onClick={reset}>
            Try again
          </button>
          <Link className="rm-button rm-button--outline" href="/">
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
