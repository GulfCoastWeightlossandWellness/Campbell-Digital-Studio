"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { track, EVENT } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

/**
 * The studio's inquiry form. Replaces the prior mailto-only flow so leads
 * can't be lost to misconfigured mail handlers (no default mail client,
 * webmail-only browsers, etc.).
 *
 * Submits to /api/lead with `source: "inquire"`. The route emails Peyton
 * via Resend when configured, falls back to server-console logging
 * otherwise — either way the form returns a success state to the user.
 *
 * Form fields are declared once below; the JSX is generated from that
 * config so adding a field is a one-line change.
 */

type State = "idle" | "submitting" | "success" | "error";

const businessTypeOptions = [
  { value: "", label: "Select one (optional)" },
  { value: "Medical practice", label: "Medical practice" },
  { value: "Home services / trade", label: "Home services / trade" },
  { value: "Local service business", label: "Other local service business" },
  { value: "Digital health / SaaS", label: "Digital health / SaaS" },
  { value: "Other", label: "Other" },
] as const;

export default function InquireForm() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [currentSite, setCurrentSite] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [goals, setGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please enter a valid email address.");
      setState("error");
      return;
    }
    if (!business.trim()) {
      setErrorMsg("Business name is required.");
      setState("error");
      return;
    }
    if (!goals.trim()) {
      setErrorMsg("Please describe what you're trying to accomplish.");
      setState("error");
      return;
    }

    setState("submitting");
    setErrorMsg(null);

    // Stuff every field into a structured `note` string so the existing
    // /api/lead route doesn't need a wider contract. Resend renders this
    // multi-line string in the email body verbatim.
    const note = [
      name && `From: ${name}`,
      `Business: ${business}`,
      currentSite && `Current site: ${currentSite}`,
      businessType && `Type: ${businessType}`,
      `Goals: ${goals}`,
      budget && `Budget: ${budget}`,
      timeline && `Timeline: ${timeline}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, note, source: "inquire" }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      track(EVENT.inquiryFormSubmit, { source: "inquire-page" });
      setState("success");
    } catch (err) {
      console.error("Inquiry submit failed", err);
      setErrorMsg(
        "Something went wrong sending the inquiry. Please email the studio directly.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="inquire-success">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--aurora-violet)",
            marginBottom: "16px",
          }}
        >
          § Sent
        </p>
        <h2
          className="editorial-h2"
          style={{ marginBottom: "20px" }}
        >
          Thanks{name ? `, ${name}` : ""} —<br />
          <em>I&apos;ll be in touch within a week.</em>
        </h2>
        <div className="editorial-body" style={{ maxWidth: "62ch" }}>
          <p>
            I read every inquiry personally. If the project is a fit, you&apos;ll hear back with a few
            clarifying questions and a suggested next step. If it isn&apos;t, I&apos;ll tell you that
            too, and where possible point you toward someone better suited.
          </p>
          <p>
            In the meantime, you can check recent work in the case studies or book a 20-minute
            call directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="inquire-form">
      <div className="inquire-grid">
        <Field label="Your name" id="iq-name" optional>
          <input
            id="iq-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inquire-input"
          />
        </Field>

        <Field label="Email" id="iq-email" required>
          <input
            id="iq-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inquire-input"
            aria-describedby={errorMsg ? "inquire-error" : undefined}
          />
        </Field>

        <Field label="Business name" id="iq-business" required>
          <input
            id="iq-business"
            type="text"
            autoComplete="organization"
            required
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className="inquire-input"
          />
        </Field>

        <Field label="Current website" id="iq-site" optional>
          <input
            id="iq-site"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://..."
            value={currentSite}
            onChange={(e) => setCurrentSite(e.target.value)}
            className="inquire-input"
          />
        </Field>

        <Field label="Type of business" id="iq-type" optional fullWidth>
          <select
            id="iq-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="inquire-input"
          >
            {businessTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="What you're trying to accomplish"
          id="iq-goals"
          required
          fullWidth
        >
          <textarea
            id="iq-goals"
            required
            rows={5}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="inquire-input"
            placeholder="A few sentences on what you have, what you need, and any context that would help."
          />
        </Field>

        <Field label="Approximate budget" id="iq-budget" optional>
          <input
            id="iq-budget"
            type="text"
            placeholder="$25K–$50K, or 'TBD'"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="inquire-input"
          />
        </Field>

        <Field label="Timeline" id="iq-timeline" optional>
          <input
            id="iq-timeline"
            type="text"
            placeholder="Q3 2026, ASAP, flexible..."
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="inquire-input"
          />
        </Field>
      </div>

      {state === "error" && errorMsg ? (
        <p
          id="inquire-error"
          role="alert"
          className="inquire-error-message"
        >
          {errorMsg}
        </p>
      ) : null}

      <div className="inquire-submit-row">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-fill"
          style={{
            fontSize: "12px",
            padding: "16px 32px",
            opacity: state === "submitting" ? 0.6 : 1,
            cursor: state === "submitting" ? "wait" : "pointer",
          }}
        >
          {state === "submitting" ? "Sending…" : "Send Inquiry"}
        </button>
        <p className="inquire-fallback">
          Or write directly to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="editorial-link violet"
            style={{ color: "var(--aurora-violet)" }}
          >
            {siteConfig.email}
          </a>
        </p>
      </div>

      <style>{`
        .inquire-form {
          margin-top: 16px;
        }
        .inquire-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px 28px;
        }
        @media (max-width: 720px) {
          .inquire-grid { grid-template-columns: 1fr; gap: 18px; }
        }

        .inquire-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .inquire-field-fullwidth {
          grid-column: 1 / -1;
        }

        .inquire-label {
          font-family: var(--font-geist-mono), var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--aurora-violet);
        }
        .inquire-label-optional {
          color: var(--ink-3);
          font-weight: 400;
          letter-spacing: 0.16em;
          margin-left: 0.6em;
        }

        .inquire-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-default);
          color: var(--ink-1);
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          border-radius: 6px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          min-height: 44px;
        }
        textarea.inquire-input {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          resize: vertical;
        }
        select.inquire-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23C77B43' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }
        .inquire-input:focus {
          outline: none;
          border-color: var(--aurora-violet);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 3px rgba(199, 123, 67, 0.18);
        }
        .inquire-input::placeholder {
          color: var(--ink-4);
        }

        .inquire-error-message {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(248, 113, 113, 0.08);
          border-left: 2px solid var(--error);
          border-radius: 0 6px 6px 0;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 14px;
          color: var(--ink-1);
        }

        .inquire-submit-row {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }
        .inquire-fallback {
          font-family: var(--font-geist-mono), var(--font-jetbrains), monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
      `}</style>
    </form>
  );
}

/** Tiny presentational wrapper for label + input pairs. */
function Field({
  label,
  id,
  required,
  optional,
  fullWidth,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  optional?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`inquire-field${fullWidth ? " inquire-field-fullwidth" : ""}`}>
      <label htmlFor={id} className="inquire-label">
        {label}
        {required ? (
          <span aria-hidden style={{ color: "var(--aurora-violet)", marginLeft: "0.4em" }}>*</span>
        ) : optional ? (
          <span className="inquire-label-optional">(optional)</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
