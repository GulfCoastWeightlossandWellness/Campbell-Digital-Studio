/**
 * JsonLd — tiny reusable server component that renders one typed JSON-LD
 * <script> tag. Server-only (no "use client"): the schema is serialized at
 * render time and shipped as static HTML, which is exactly what crawlers read.
 *
 * Why this exists:
 *   Keeps structured-data emission in one audited place so every page injects
 *   schema the same way (same escaping, same shape) instead of hand-rolling a
 *   <script dangerouslySetInnerHTML> per page.
 *
 * Usage — render anywhere in a server component's tree (layout, page, or a
 * section). It returns a single <script>, so it is safe to place in <head>
 * via the App Router or inline in the body.
 *
 *   import { JsonLd } from "@/components/seo/JsonLd";
 *
 *   // A case-study page can describe itself as a CreativeWork:
 *   <JsonLd
 *     schema={{
 *       "@context": "https://schema.org",
 *       "@type": "CreativeWork",
 *       name: "Air Solutions Heating & Cooling — Case Study",
 *       url: "https://www.campbelldigitalstudio.com/work/air-solutions",
 *       creator: { "@type": "Organization", name: "Campbell Digital Studio" },
 *     }}
 *   />
 *
 *   // Or a Service offered by the studio:
 *   <JsonLd schema={serviceSchema} />
 *
 * Pass a single object or an array of objects. Arrays render one <script> each
 * (Google reads multiple JSON-LD blocks fine; keeping them separate makes each
 * independently testable in the Rich Results Test).
 *
 * Security: the JSON is escaped so a "</script>" inside any string value can't
 * break out of the tag. Only pass trusted, build-time data — never raw user input.
 */

/**
 * A JSON-LD node. We keep this dependency-free (no schema-dts) on purpose —
 * one less package to maintain and it never blocks a build. The `@context` /
 * `@type` keys are encouraged on the top-level node passed in; callers supply
 * the full schema object verbatim.
 */
export type JsonLdSchema = Record<string, unknown>;

type JsonLdProps = {
  schema: JsonLdSchema | JsonLdSchema[];
};

/** Neutralize the only sequence that can terminate a <script> block early. */
function serialize(schema: JsonLdSchema): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function JsonLd({ schema }: JsonLdProps) {
  const blocks = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escaped above; data is trusted build-time content, never user input.
          dangerouslySetInnerHTML={{ __html: serialize(block) }}
        />
      ))}
    </>
  );
}

export default JsonLd;
