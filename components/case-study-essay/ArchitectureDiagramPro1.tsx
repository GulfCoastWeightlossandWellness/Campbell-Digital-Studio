import EssayReveal from "./EssayReveal";
import styles from "./ArchitectureDiagram.module.css";

/**
 * Pro 1 Painters architecture diagram.
 *
 * The shared ArchitectureDiagram is hardcoded to the Air Solutions HVAC build
 * (210 pages, 21 Baldwin County cities × 10 HVAC services, the four HVAC tools,
 * the HVAC schema labels). None of that is true for Pro 1, so this is a NEW
 * variant — the shared component is left untouched for the other agents.
 *
 * Verified facts only (agent brief 2026-06-09):
 *   - 424 live pages (live sitemap.xml count)
 *   - Two metros: Mobile + Baldwin County, AL (Spanish Fort)
 *   - Service lines: interior, exterior, cabinet painting, FLOOR PAINTING
 *     (HARD RULE: floor painting, never "concrete/floor coatings")
 *   - AI Color Visualizer — on-device, in-browser, $0
 *   - 521-post native blog engine on a 2-year Mon–Fri drip
 * No matrix dimensions, schema-type count, or city count are invented here.
 *
 * Reuses ArchitectureDiagram.module.css so the visual language matches the
 * rest of the essay system.
 */

// Two metros, painted as two stacked grids of city × service-line pages.
// These row/column counts are illustrative density for the diagram only —
// the headline number that is asserted as fact is the 424 live-page total.
const COLS = 12; // page columns per metro band
const MOBILE_ROWS = 8;
const BALDWIN_ROWS = 7;

export default function ArchitectureDiagramPro1() {
  const dotGap = 14;
  const dotSize = 5;

  type Dot = { x: number; y: number };

  const mobileDots: Dot[] = [];
  for (let r = 0; r < MOBILE_ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      mobileDots.push({ x: c * dotGap, y: r * dotGap });
    }
  }

  const baldwinOffsetY = MOBILE_ROWS * dotGap + 24;
  const baldwinDots: Dot[] = [];
  for (let r = 0; r < BALDWIN_ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      baldwinDots.push({ x: c * dotGap, y: baldwinOffsetY + r * dotGap });
    }
  }

  const matrixW = (COLS - 1) * dotGap + dotSize;
  const matrixH = baldwinOffsetY + (BALDWIN_ROWS - 1) * dotGap + dotSize;

  // Cluster to the right: 1 flagship tool (color visualizer) + blog engine + service lines.
  const clusterX = matrixW + 48;

  // Color visualizer — a single ringed "tool" dot (flagship differentiator).
  const toolDot = { x: clusterX, y: 0 };

  // Service lines — four medium circles (interior / exterior / cabinet / floor).
  const serviceY = 44;
  const serviceDots = [0, 1, 2, 3].map((i) => ({
    x: clusterX + i * 20,
    y: serviceY,
  }));

  // Blog engine — a dense little 3×4 block of small squares (521-post library).
  const blogX = clusterX;
  const blogY = serviceY + 44;
  const blogDots: Dot[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      blogDots.push({ x: blogX + c * 10, y: blogY + r * 10 });
    }
  }

  const svgW = clusterX + 110;
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
            424 pages.<br />
            <em>Two metros, one system.</em>
          </h2>

          <p className={styles.intro}>
            The diagram below maps the platform. Each square is an indexed,
            crawlable page. The two stacked bands are the Mobile and Baldwin
            County footprints — every city the crews paint in, across the four
            service lines they offer. The cluster to the right is the on-device
            AI Color Visualizer, the four painting service lines, and the native
            blog engine that publishes without a CMS or plugin.
          </p>
        </EssayReveal>

        <EssayReveal delay={100} className={styles.diagramWrap}>
          <div className={styles.diagramScroll}>
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              width={svgW}
              height={svgH}
              aria-label="Architecture diagram: Mobile and Baldwin County page matrices plus the color visualizer, four service lines, and the blog engine"
              className={styles.svg}
            >
              {/* ── Mobile metro band ── */}
              {mobileDots.map((d, i) => (
                <rect
                  key={`mob-${i}`}
                  x={d.x}
                  y={d.y}
                  width={5}
                  height={5}
                  rx={1}
                  fill="var(--copper)"
                  opacity={0.78}
                />
              ))}

              {/* ── Baldwin metro band ── */}
              {baldwinDots.map((d, i) => (
                <rect
                  key={`bal-${i}`}
                  x={d.x}
                  y={d.y}
                  width={5}
                  height={5}
                  rx={1}
                  fill="var(--copper)"
                  opacity={0.55}
                />
              ))}

              {/* ── Color visualizer — flagship tool dot ── */}
              <g>
                <circle
                  cx={toolDot.x + 6}
                  cy={toolDot.y + 6}
                  r={9}
                  fill="none"
                  stroke="var(--copper)"
                  strokeWidth={1.5}
                />
                <circle
                  cx={toolDot.x + 6}
                  cy={toolDot.y + 6}
                  r={4.5}
                  fill="var(--copper)"
                />
              </g>

              {/* ── Service-line dots ── */}
              {serviceDots.map((d, i) => (
                <circle
                  key={`svc-${i}`}
                  cx={d.x + 7}
                  cy={d.y + 7}
                  r={7}
                  fill="var(--amber)"
                  opacity={0.65}
                />
              ))}

              {/* ── Blog engine block ── */}
              {blogDots.map((d, i) => (
                <rect
                  key={`blog-${i}`}
                  x={d.x}
                  y={d.y}
                  width={5}
                  height={5}
                  rx={1}
                  fill="none"
                  stroke="var(--ink-3)"
                  strokeWidth={1}
                />
              ))}

              {/* ── Connector lines from matrix to cluster ── */}
              <line
                x1={matrixW + 8}
                y1={matrixH * 0.25}
                x2={clusterX - 8}
                y2={toolDot.y + 6}
                stroke="var(--border-default)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={matrixW + 8}
                y1={matrixH * 0.5}
                x2={clusterX - 8}
                y2={serviceY + 7}
                stroke="var(--border-default)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <line
                x1={matrixW + 8}
                y1={matrixH * 0.72}
                x2={clusterX - 8}
                y2={blogY + 20}
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
                  <div className={styles.labelHead}>424 live pages</div>
                  <div className={styles.labelSub}>Mobile + Baldwin County footprints</div>
                </div>
              </div>

              <div className={styles.labelGroup} style={{ marginTop: 32 }}>
                <span className={styles.legendDot} data-kind="tool" aria-hidden />
                <div>
                  <div className={styles.labelHead}>AI Color Visualizer</div>
                  <div className={styles.labelSub}>On-device · in-browser · private</div>
                </div>
              </div>

              <div className={styles.labelGroup} style={{ marginTop: 32 }}>
                <span className={styles.legendDot} data-kind="seasonal" aria-hidden />
                <div>
                  <div className={styles.labelHead}>4 painting service lines</div>
                  <div className={styles.labelSub}>Interior · Exterior · Cabinets · Floor painting</div>
                </div>
              </div>

              <div className={styles.labelGroup} style={{ marginTop: 32 }}>
                <span className={styles.legendDot} data-kind="schema" aria-hidden />
                <div>
                  <div className={styles.labelHead}>521-post blog engine</div>
                  <div className={styles.labelSub}>Native · no CMS · 2-year weekday drip</div>
                </div>
              </div>

              <div className={styles.totalTag}>
                <span className={styles.totalNum}>424</span>
                <span className={styles.totalLabel}>live indexed pages</span>
              </div>
            </div>
          </div>

          {/* ── Metro band labels ── */}
          <div className={styles.axisLabels}>
            <span className={styles.axisLabel} style={{ marginLeft: 0 }}>
              ↑ Mobile metro · Baldwin County (Spanish Fort) ↓
            </span>
          </div>
        </EssayReveal>
      </div>
    </section>
  );
}
