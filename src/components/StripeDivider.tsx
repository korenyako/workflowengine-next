/**
 * Diagonal-stripe decorative divider. Used as a section break above
 * Related articles on post pages and at the top of the footer.
 *
 * Implementation: inline 8x8 SVG tile with one 45° diagonal stroke,
 * tiled as a background-image. The browser copies the rendered tile
 * as a bitmap, so every stripe is pixel-identical. `repeating-linear-
 * gradient` rounds each color stop independently at subpixel
 * boundaries and produces visibly uneven stripes — this does not.
 *
 * Customize via className for height + margins (default h-3 = 12px,
 * roughly 1.5 tiles tall, no margins).
 */

interface Props {
  className?: string
}

const STRIPE_TILE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='5' height='5'><path d='M0 5L5 0' stroke='%234286F4' stroke-opacity='0.55' stroke-width='1' fill='none'/></svg>\")"

export default function StripeDivider({ className = 'h-3' }: Props) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ backgroundImage: STRIPE_TILE, backgroundRepeat: 'repeat' }}
    />
  )
}
