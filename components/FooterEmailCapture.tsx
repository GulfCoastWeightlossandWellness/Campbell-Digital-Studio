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
    return <p className="form-success-message">Thanks — I&apos;ll be in touch within a week.</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="footer-capture">
      <label htmlFor="footer-email" className="footer-capture__label">
        Have a project? Send me your site.
      </label>
      <div className="footer-capture__row">
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
          className="studio-input footer-capture__email"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-fill btn-nav"
          style={{
            opacity: state === "submitting" ? 0.6 : 1,
            cursor: state === "submitting" ? "wait" : "pointer",
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
        className="studio-input"
        style={{ fontSize: "14px", background: "rgba(255, 245, 235, 0.02)" }}
      />
      {state === "error" && errorMsg ? (
        <p className="footer-capture__error">{errorMsg}</p>
      ) : null}
    </form>
  );
}
