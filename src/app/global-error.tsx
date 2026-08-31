"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>
            Something interrupted this page. Try again, or return to the home
            page and continue from there.
          </p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
