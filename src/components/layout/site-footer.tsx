import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="brand-footer">
      <div className="rm-container">
        <div className="brand-footer__main">
          <Link href="/" aria-label="Jack Skeen home">
            <Image
              src="/brand/jack-skeen-original.png"
              alt="Jack Skeen Executive Coaching"
              width={1200}
              height={199}
            />
          </Link>
          <nav aria-label="Footer navigation">
            <Link href="/roadmap">The Roadmap</Link>
            <Link href="/success-stories">Client Stories</Link>
            <Link href="/inside-the-circle">Inside the Circle</Link>
            <Link href="/about">Meet Jack</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="brand-footer__bottom">
          <span>© {new Date().getFullYear()} Jack Skeen</span>
          <span>A more meaningful next chapter.</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
