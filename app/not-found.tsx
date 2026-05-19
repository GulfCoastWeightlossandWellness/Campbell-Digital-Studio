import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Inquire", href: "/inquire" },
];

export default function NotFound() {
  return (
    <section className="section-wrap not-found-page">
      <PageIntro eyebrow="404 / Page not found" className="page-intro--legal">
        That page has<br />
        <em>moved or never existed.</em>
      </PageIntro>

      <p className="legal-page__subtitle reading-col">
        The site was recently rebuilt and a few pages were renamed. Most of the old links should
        forward; the rest are below.
      </p>

      <nav className="not-found-links reading-col" aria-label="Helpful links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="editorial-link mono">
            {link.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
