const VERIFICATION_LINE = "google-site-verification: google6217edd756051041.html";

export default function HomePage() {
  return (
    <pre
      style={{
        margin: 0,
        padding: "1.5rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        maxWidth: "min(100vw - 2rem, 42rem)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {VERIFICATION_LINE}
    </pre>
  );
}
