import Image from "next/image";
import Link from "next/link";

const socialProfiles = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jackskeen/",
    path: "M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.99 0 3.54 1.97 3.54 4.53v5.24Z",
  },
  {
    name: "X",
    href: "https://x.com/JackSkeen",
    path: "M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-7.4L5.6 22H2.48l7.98-9.13L2.8 2h6.4l4.42 6.73L18.9 2ZM17.8 20h1.73L8.26 3.88H6.4L17.8 20Z",
  },
  { name: "Instagram", href: "https://www.instagram.com/drjackskeen/" },
];

export function SiteFooter() {
  return (
    <footer className="brand-footer">
      <div className="rm-container">
        <div className="brand-footer__main">
          <div className="brand-footer__brand">
            <Link href="/" aria-label="Jack Skeen home">
              <Image
                src="/brand/jack-skeen-original.png"
                alt="Jack Skeen Executive Coaching"
                width={1200}
                height={199}
                sizes="(max-width: 760px) 230px, 235px"
              />
            </Link>
            <p>A more meaningful next chapter.</p>
          </div>
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
          <div className="brand-footer__social">
            <span id="footer-social-label">Follow Jack</span>
            <ul aria-labelledby="footer-social-label">
              {socialProfiles.map((profile) => (
                <li key={profile.name}>
                  <a href={profile.href} rel="me">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {profile.path ? (
                        <path fill="currentColor" d={profile.path} />
                      ) : (
                        <>
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <circle
                            cx="17.5"
                            cy="6.5"
                            r="1.1"
                            fill="currentColor"
                          />
                        </>
                      )}
                    </svg>
                    <span>{profile.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
