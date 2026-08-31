import Image from "next/image";
import Link from "next/link";

const groups = [
  {
    title: "Explore",
    links: [
      ["The Roadmap", "/roadmap"],
      ["Work With Jack", "/work-with-jack"],
      ["Success Stories", "/success-stories"],
      ["About Jack", "/about"],
    ],
  },
  {
    title: "Ideas",
    links: [
      ["Articles", "/insights/articles"],
      ["Inside the Circle", "/insights/podcast"],
      ["Videos", "/insights/videos"],
      ["Circle Blueprint", "/books/circle-blueprint"],
    ],
  },
  {
    title: "Connect",
    links: [
      ["Contact", "/contact"],
      ["Start Your Roadmap", "/start"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="full-footer">
      <div className="full-footer__inner section-shell">
        <div className="full-footer__brand">
          <Link className="brand" href="/" aria-label="Jack Skeen home">
            <Image
              className="brand__logo"
              src="/brand/jack-skeen-wordmark-light.png"
              alt=""
              width={903}
              height={148}
            />
          </Link>
          <p>Clarity for the life and work you are choosing next.</p>
        </div>
        {groups.map((group) => (
          <nav aria-label={`${group.title} links`} key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="full-footer__legal section-shell">
        <span>© {new Date().getFullYear()} Jack Skeen</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
}
