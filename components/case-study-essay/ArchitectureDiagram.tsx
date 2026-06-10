import EssayReveal from "./EssayReveal";
import styles from "./ArchitectureDiagram.module.css";

/**
 * Architecture Diagram — custom SVG + grid showing the programmatic
 * SEO matrix, 4 interactive tools, 4 seasonal pages, and 9 schema types.
 * Each "type" rendered as a distinct dot size/treatment.
 */

const CITIES = 21;
const SERVICES = 10;

// Colors and sizes per dot type
type DotType =
  | "city-service"   // programmatic matrix page — small filled square
  | "tool"           // 4 interactive tools — larger circle with ring
  | "seasonal"       // 4 seasonal pages — medium circle
  | "schema";        // 9 schema types — diamond shape

export default function ArchitectureDiagram() {
  // Build 21×10 grid of city×service dots
  const matrixDots: { x: number; y: number; type: DotType }[] = [];
  const dotSize = 8;
  const dotGap = 14;

  for (let c = 0; c < CITIES; c++) {
    for (let s = 0; s < SERVICES; s++) {
      matrixDots.push({
        x: s * dotGap,
        y: c * dotGap,
        type: "city-service",
      });
    }
  }

  const matrixW = (SERVICES - 1) * dotGap + dotSize;
  const matrixH = (CITIES - 1) * dotGap + dotSize;

  // Tool clusters — offset right with spacing
  const toolsX = matrixW + 48;
  const toolDots = [0, 1, 2, 3].map((i) => ({
    x: toolsX + (i % 2) * 28,
    y: i < 2 ? 0 : 28,
    type: "tool" as DotType,
  }));

  // Seasonal — below tools
  const seasonalY = 80;
  const seasonalDots = [0, 1, 2, 3].map((i) => ({
    x: toolsX + i * 20,
    y: seasonalY,
    type: "seasonal" as DotType,
  }));

  // Schema — arranged in a 3×3 grid
  const schemaX = toolsX;
  const schemaY = seasonalY + 48;
  const schemaDots = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    x: schemaX + (i % 3) * 24,
    y: schemaY + Math.floor(i / 3) * 24,
    type: "schema" as DotType,
  }));

  const svgW = toolsX + 100;
  const svgH = matrixH + 20;

  return (
    <section id="essay-architecture" className={styles.root}>
      <div className="section-wrap">
        <EssayReveal>
          <div className="section-tag" aria-label="Section 03 — Architecture">
            <span className="num">03</span>
            <span className="label">Architecture</span>
          </div>

          <h2 className={`editorial-h2 ${styles.heading}`}>
            345 pages.<br />
            <em>One source of truth.</em>
          </h2>

          <p className={styles.intro}>
            The diagram below maps the complete platform. Each square is an
            indexed, crawlable page. The matrix covers every city the trucks
            operate in, times every service they offer. The cluster to the right
            represents the four interactive tools, four seasonal campaigns, and
            nine Schema.org entity types — the infrastructure beneath the matrix.
          </p>
        </EssayReveal>

        <EssayReveal delay={100} className={styles.diagramWrap}>
          <div className={styles.diagramScroll}>
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              width={svgW}
              height={svgH}
              aria-label="Architecture diagram: a 21-city × service programmatic matrix plus tools, seasonal pages, and schema types"
              className={styles.svg}
            >
              {/* ── City × Service matrix ── */}
              {matrixDots.map((d, i) => (
                <rect
                  key={`cs-${i}`}
                  x={d.x}
                  y={d.y}
                  width={5}
                  height={5}
                  rx={1}
                  fill="var(--copper)"
                  opacity={0.75}
                />
              ))}

              {/* ── Tool dots ── */}
              {toolDots.map((d, i) => (
                <g key={`tool-${i}`}>
                  <circle
                    cx={d.x + 6}
                    cy={d.y + 6}
                    r={8}
                    fill="none"
                    stroke="var(--copper)"
                    strokeWidth={1.5}
                  />
                  <circle
                    cx={d.x + 6}
                    cy={d.y + 6}
                    r={4}
                    fill="var(--copper)"
                  />
                </g>
              ))}

              {/* ── Seasonal dots ── */}
              {seasonalDots.map((d, i) => (
                <circle
                  key={`sea-${i}`}
                  cx={d.x + 7}
                  cy={d.y + 7}
                  r={7}
                  fill="var(--amber)"
                  opacity={0.65}
                />
              ))}

              {/* ── Schema diamonds ── */}
              {schemaDots.map((d, i) => {
                const cx = d.x + 8;
                const cy = d.y + 8;
                const half = 7;
                const points = `${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`;
                return (
                  <polygon
                    key={`sch-${i}`}
                    points={points}
                    fill="none"
                    stroke="var(--ink-3)"
                    strokeWidth={1.2}
                  />
                );
              })}

              {/* ── Connector line from matrix to cluster ── */}
              <line
                x1={matrixW + 8}
                y1={matrixH * 0.3}
                x2={toolsX - 8}
                y2={toolDots[0].y + 6}
                stroke="var(--border-default)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={matrixW + 8}
                y1={matrixH * 0.45}
                x2={toolsX - 8}
                y2={seasonalY + 7}
                stroke="var(--border-default)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={matrixW + 8}
                y1={matrixH * 0.65}
                x2={toolsX - 8}
                y2={schemaY + 24}
                stroke="var(--border-default)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            </svg>

            {/* ── Labels alongside the diagram ── */}
            <div className={styles.labels}>
              <div className={styles.labelGroup} style={{ marginTop: 0 }}>
                <span className={styles.legendDot} data-kind="page" aria-hidden />
                <div>
                  <div className={styles.labelHead}>21 cities × services</div>
                  <div className={styles.labelSub}>Programmatic matrix — part of 345 live pages</div>
                </div>
              </div>

              <div className={styles.labelGroup} style={{ marginTop: 32 }}>
                <span className={styles.legendDot} data-kind="tool" aria-hidden />
                <div>
                  <div className={styles.labelHead}>4 interactive tools</div>
                  <div className={styles.labelSub}>3D explorer · Quiz · ROI calc · Financing</div>
                </div>
              </div>

              <div className={styles.labelGroup} style={{ marginTop: 32 }}>
                <span className={styles.legendDot} data-kind="seasonal" aria-hidden />
                <div>
                  <div className={styles.labelHead}>4 seasonal campaigns</div>
                  <div className={styles.labelSub}>Spring · Summer · Fall · Winter</div>
                </div>
              </div>

              <div className={styles.labelGroup} style={{ marginTop: 32 }}>
                <span className={styles.legendDot} data-kind="schema" aria-hidden />
                <div>
                  <div className={styles.labelHead}>9 Schema.org entity types</div>
                  <div className={styles.labelSub}>HVACBusiness · OfferCatalog · PostalCode arrays…</div>
                </div>
              </div>

              <div className={styles.totalTag}>
                <span className={styles.totalNum}>226</span>
                <span className={styles.totalLabel}>total indexed entities</span>
              </div>
            </div>
          </div>

          {/* ── Services axis label ── */}
          <div className={styles.axisLabels}>
            <span className={styles.axisLabel} style={{ marginLeft: 0 }}>
              ← 10 HVAC services →
            </span>
          </div>
        </EssayReveal>

        {/* ── City list ── */}
        <EssayReveal delay={200} className={styles.cityList}>
          <span className={styles.cityListLabel}>21 cities covered</span>
          {[
            "Daphne", "Fairhope", "Foley", "Gulf Shores", "Orange Beach",
            "Robertsdale", "Spanish Fort", "Loxley", "Summerdale", "Bay Minette",
            "Silverhill", "Bon Secour", "Elberta", "Lillian", "Magnolia Springs",
            "Perdido", "Stapleton", "Stockton", "Tensaw", "Little River",
            "Axis",
          ].map((city) => (
            <span key={city} className={styles.cityChip}>{city}</span>
          ))}
        </EssayReveal>
      </div>
    </section>
  );
}
