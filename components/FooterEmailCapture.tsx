"use client";

import { useState, type FormEvent } from "react";
import { track, EVENT } from "@/lib/analytics";

type State = "idle" | "submitting" | "success" | "error";

export default function FooterEmailCapture() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setState("error");
      return;
    }
    setState("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, note, source: "footer" }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      track(EVENT.footerEmailCaptured, { source: "footer" });
      setState("success");
      setEmail("");
      setNote("");
    } catch (err) {
      console.error("Lead capture failed", err);
      setErrorMsg("Something went wrong. Email the studio directly instead.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "15px",
          fontStyle: "italic",
          fontWeight: 300,
          color: "var(--ink-1)",
          lineHeight: 1.55,
          fontVariationSettings: '"opsz" 24',
        }}
      >
        Thanks — I&apos;ll be in touch within a week.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <label
        htmlFor="footer-email"
        style={{
          fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}
      >
        Have a project? Send me your site.
      </label>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input
          id="footer-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: "1 1 200px",
            minWidth: 0,
            padding: "12px 14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-default)",
            color: "var(--ink-1)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "16px",
            borderRadius: "6px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          style={{
            padding: "12px 18px",
            background: "var(--violet-base)",
            color: "#FFFFFF",
            border: "1px solid var(--violet-base)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            cursor: state === "submitting" ? "wait" : "pointer",
            borderRadius: "6px",
            opacity: state === "submitting" ? 0.6 : 1,
            minHeight: "44px",
          }}
        >
          {state === "submitting" ? "Sending…" : "Send"}
        </button>
      </div>
      <input
        name="note"
        type="text"
        placeholder="Current site URL (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{
          padding: "10px 14px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid var(--border-subtle)",
          color: "var(--ink-2)",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "14px",
          borderRadius: "6px",
          outline: "none",
        }}
      />
      {state === "error" && errorMsg ? (
        <p style={{ color: "var(--error)", fontSize: "12px", margin: 0 }}>{errorMsg}</p>
      ) : null}
    </form>
  );
}
