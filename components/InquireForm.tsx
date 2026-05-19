"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { track, EVENT } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

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
        <p className="mono-caption inquire-success__eyebrow">§ Sent</p>
        <h2 className="editorial-h2" style={{ marginBottom: "20px" }}>
          Thanks{name ? `, ${name}` : ""} —<br />
          <em>I&apos;ll be in touch within a week.</em>
        </h2>
        <div className="editorial-body" style={{ maxWidth: "62ch" }}>
          <p>
            I read every inquiry personally. If the project is a fit, you&apos;ll hear back with a
            few clarifying questions and a suggested next step. If it isn&apos;t, I&apos;ll tell you
            that too, and where possible point you toward someone better suited.
          </p>
          <p>
            In the meantime, you can check recent work in the case studies or book a 20-minute call
            directly.
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
            className="studio-input"
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
            className="studio-input"
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
            className="studio-input"
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
            className="studio-input"
          />
        </Field>

        <Field label="Type of business" id="iq-type" optional fullWidth>
          <select
            id="iq-type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="studio-input"
          >
            {businessTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="What you're trying to accomplish" id="iq-goals" required fullWidth>
          <textarea
            id="iq-goals"
            required
            rows={5}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="studio-input"
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
            className="studio-input"
          />
        </Field>

        <Field label="Timeline" id="iq-timeline" optional>
          <input
            id="iq-timeline"
            type="text"
            placeholder="Q3 2026, ASAP, flexible..."
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="studio-input"
          />
        </Field>
      </div>

      {state === "error" && errorMsg ? (
        <p id="inquire-error" role="alert" className="inquire-error-message">
          {errorMsg}
        </p>
      ) : null}

      <div className="inquire-submit-row">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-fill"
          style={{
            opacity: state === "submitting" ? 0.6 : 1,
            cursor: state === "submitting" ? "wait" : "pointer",
          }}
        >
          {state === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
        <p className="inquire-fallback">
          Or write directly to{" "}
          <a href={`mailto:${siteConfig.email}`} className="editorial-link copper">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </form>
  );
}

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
          <span className="inquire-label-required" aria-hidden>
            *
          </span>
        ) : optional ? (
          <span className="inquire-label-optional">(optional)</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
