import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Notes route shell.
 *
 * No notes are authored yet:
 *   - `generateStaticParams` returns an empty array (no pre-rendered slugs).
 *   - `dynamicParams = false` makes any unknown slug 404 instead of
 *     attempting an on-demand render.
 *
 * When the first note lands, swap the empty array for a lookup against
 * the notes data source and render the note body below the `notFound()`
 * guard. The `params` Promise pattern is the Next 16 convention — keep it.
 */
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Note · ${slug}`,
    description:
      "A field-log entry from Campbell Digital Studio — short notes on GBP API quirks, programmatic SEO traps, and clinic intake patterns.",
    alternates: { canonical: `/notes/${slug}` },
  };
}

export default async function NotePage({ params }: Props) {
  // Await params to satisfy the Next 16 Promise contract even though we
  // immediately 404 — keeps the call site honest for the future render path.
  await params;
  notFound();
}
