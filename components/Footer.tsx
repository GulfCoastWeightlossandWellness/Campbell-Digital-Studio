import Link from "next/link";
import StudioMark from "@/components/marks/StudioMark";
import FooterEmailCapture from "@/components/FooterEmailCapture";
import OperatorLedger from "@/components/OperatorLedger";
import { siteConfig } from "@/lib/site-config";
import { primaryNavLinks } from "@/lib/nav";

export default function Footer() {
  const year = new Date().getUTCFullYear();
  const showBooking = !!siteConfig.calUsername;
  const navLinks = primaryNavLinks.filter((link) => link.href !== "/inquire");

  return (
    <>
      {/* Operator's Ledger — site-wide signature element */}
      <OperatorLedger />
      <footer className="cover-surface site-footer">
      <div className="section-wrap site-footer__inner">
        <div className="footer-grid">
          <div>
            <div className="mono-caption mono-caption--accent footer-grid__label">§ Studio</div>
            <div style={{ marginBottom: "20px", marginLeft: "-16px" }}>
              <StudioMark onDark size="xl" />
            </div>
            <p className="footer-grid__location">{siteConfig.founder.location}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="editorial-link copper"
              style={{ fontSize: "12px", letterSpacing: "0.08em" }}
            >
              {siteConfig.email}
            </a>
            {siteConfig.social.github ? (
              <div style={{ marginTop: "10px" }}>
                <a
                  href={`https://github.com/${siteConfig.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link mono on-dark"
                >
                  GitHub ↗
                </a>
              </div>
            ) : null}
          </div>

          <div>
            <div className="mono-caption mono-caption--accent footer-grid__label">§ Index</div>
            <ul className="footer-grid__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="editorial-link on-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
              {showBooking ? (
                <li>
                  <Link href="/call" className="editorial-link on-dark">
                    Book a call
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/inquire" className="editorial-link copper">
                  Inquire →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mono-caption mono-caption--accent footer-grid__label">§ Contact</div>
            <p className="footer-grid__blurb">
              Currently building digital infrastructure for clinical practices and multi-location
              service businesses on the Gulf Coast.
            </p>
            <FooterEmailCapture />
          </div>
        </div>

        <div className="footer-bar">
          <span className="footer-bar__copy">
            © {year} {siteConfig.name} · {siteConfig.founder.location}
          </span>
          <div className="footer-bar__legal">
            <Link href="/privacy" className="editorial-link on-dark">
              Privacy
            </Link>
            <Link href="/terms" className="editorial-link on-dark">
              Terms
            </Link>
            <span>Made by hand, deliberately small.</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
