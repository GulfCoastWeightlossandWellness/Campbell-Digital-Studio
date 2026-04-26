"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Website Review", href: "/website-review" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(5,12,26,0.96)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.65rem",
          }}
        >
          <Image
            src="/images/brand/campbell-digital-studio-icon-transparent.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            sizes="(max-width: 768px) 34px, 40px"
            style={{
              width: "clamp(34px, 4.5vw, 40px)",
              height: "clamp(34px, 4.5vw, 40px)",
              objectFit: "contain",
              borderRadius: "10px",
              background: "rgba(79,142,247,0.06)",
              border: "1px solid rgba(79,142,247,0.15)",
              padding: "2px",
              flexShrink: 0,
            }}
          />
          <span
            className="brand-wordmark"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#f0f4fc",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Campbell Digital{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7db0ff, #4f8ef7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Studio
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="desktop-nav"
        >
          {navLinks.slice(0, -2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "#94a3b8",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f4fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/website-review"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 400,
              color: "#7db0ff",
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a8c8ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7db0ff")}
          >
            Website Review
          </Link>

          <Link
            href="/contact"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#ffffff",
              background: "linear-gradient(135deg, #4f8ef7 0%, #3b7de8 100%)",
              padding: "0.45rem 1.15rem",
              borderRadius: "7px",
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "opacity 0.2s, box-shadow 0.2s",
              boxShadow: "0 2px 10px rgba(79,142,247,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(79,142,247,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(79,142,247,0.25)";
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            color: "#f0f4fc",
          }}
          className="mobile-menu-btn"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: "#0d1728",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1rem",
                color: link.label === "Website Review" ? "#7db0ff" : "#f0f4fc",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

    </header>
  );
}
