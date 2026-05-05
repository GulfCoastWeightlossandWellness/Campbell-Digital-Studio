import type { Testimonial } from "@/lib/data/testimonials";
import { formatAttribution } from "@/lib/data/testimonials";

type Props = {
  testimonial: Testimonial;
  /** Render in a smaller scale for case-study sidebars */
  compact?: boolean;
};

/**
 * Single-quote display block. Use only with testimonials that have a non-empty
 * `quote` (i.e. results from getDisplayableTestimonials/getFeaturedTestimonials).
 *
 * Visually: large Fraunces italic quote, gold opening mark, mono attribution
 * underneath. Mirrors the existing .pullquote design language.
 */
export default function TestimonialBlock({ testimonial, compact }: Props) {
  if (!testimonial.quote.trim()) return null;
  const attribution = formatAttribution(testimonial);

  return (
    <figure style={{ margin: 0 }}>
      <blockquote
        className="pullquote"
        style={{
          fontSize: compact ? "clamp(20px, 2.4vw, 26px)" : "clamp(24px, 3vw, 32px)",
        }}
      >
        {testimonial.quote}
        <span className="attr">{attribution}</span>
      </blockquote>
    </figure>
  );
}
