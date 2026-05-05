# TODOs in code (mirror of `// TODO(peyton)` markers)

Generated from a fresh grep on iteration 001. Re-run the grep at the start of each iteration to keep this file current:

```bash
grep -rn "TODO(peyton)" --include="*.ts" --include="*.tsx" .
```

## Active

| File                            | Line | Description |
|---------------------------------|-----:|-------------|
| `lib/data/results.ts`           | 31   | Paste post-launch numbers from Local Falcon and GSC. |
| `lib/data/results.ts`           | 36   | Once Local Falcon SoLV + ARP + grid snapshots are taken, populate the `air-solutions` array. |
| `lib/data/results.ts`           | 43   | Post-launch GSC + GA4 metrics for Revitalize. |
| `lib/data/testimonials.ts`      | 41   | Paste Reaves Nelson's verbatim quote, confirm written permission, flip `publicConsent` to true. |
| `lib/data/testimonials.ts`      | 54   | If Revitalize provides a public testimonial, add it here. |

## Resolution policy

A TODO is resolved by:
1. The data being filled in / the decision being made, or
2. The owner deciding it's deferred indefinitely → the TODO is removed and the choice is captured in the relevant data file's header comment.

When a TODO is resolved, also remove the row from this file in the same commit.
