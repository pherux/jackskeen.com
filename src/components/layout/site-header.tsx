"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["The Roadmap", "/roadmap"],
  ["Client Stories", "/success-stories"],
  ["Inside the Circle", "/inside-the-circle"],
  ["Meet Jack", "/about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }
  return (
    <header className="brand-header">
      <a className="rm-skip" href="#main-content">
        Skip to content
      </a>
      <div className="rm-container brand-header__inner">
        <Link
          href="/"
          className="brand-header__logo"
          aria-label="Jack Skeen home"
        >
          <Image
            src="/brand/jack-skeen-original.png"
            alt="Jack Skeen Executive Coaching"
            width={1200}
            height={199}
            priority
          />
        </Link>
        <nav className="brand-header__nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="rm-button brand-header__cta" href="/start">
          Start Your Roadmap
        </Link>
        <details
          ref={menu}
          className="brand-menu"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMenu();
              menu.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>
            <Menu className="menu-open" size={22} aria-hidden="true" />
            <X className="menu-close" size={22} aria-hidden="true" />
            <span>Menu</span>
          </summary>
          <nav aria-label="Mobile navigation" onClick={closeMenu}>
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <Link href="/insights">Insights</Link>
            <Link className="rm-button" href="/start">
              Start Your Roadmap
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
