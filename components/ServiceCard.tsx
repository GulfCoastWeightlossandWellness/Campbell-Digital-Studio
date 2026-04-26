export default function ServiceCard({ title, description, items }: { title: string; description: string; items?: string[] }) {
  return (
    <div className="service-card-hover" style={{ background: "#161f2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", transition: "border-color 0.2s" }}>
      <div style={{ width: "36px", height: "2px", background: "#d4a853", marginBottom: "0.25rem" }} />
      <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.2rem", fontWeight: 500, color: "#f8f5f0", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>{description}</p>
      {items && items.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {items.map(item => (
            <li key={item} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#64748b", paddingLeft: "1rem", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "#d4a853" }}>&mdash;</span>{item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
