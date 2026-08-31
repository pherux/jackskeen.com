import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "The Roadmap", href: "/roadmap" },
  { label: "Work With Jack", href: "/work-with-jack" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Jack Skeen home">
          <Image
            className="brand__logo"
            src="/brand/jack-skeen-wordmark-light.png"
            alt=""
            width={903}
            height={148}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/start">
          Start Your Roadmap
        </Link>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="mobile-nav__cta" href="/start">
              Start Your Roadmap
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
