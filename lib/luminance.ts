/**
 * WCAG relative-luminance helpers used by iOS chrome (status bar + home
 * indicator) to pick a black or white foreground that stays readable on
 * top of any background color.
 *
 * Luminance ≥ 0.5 → prefer black foreground
 * Luminance < 0.5 → prefer white foreground
 *
 * These helpers are deliberately dependency-free and tolerant of common
 * CSS color syntaxes used in this project (#rgb, #rrggbb, rgb(...),
 * rgba(...), plus a small set of CSS named colors).
 */

export type RGB = { r: number; g: number; b: number; a: number };

const NAMED: Record<string, string> = {
  transparent: "rgba(0,0,0,0)",
  white: "#ffffff",
  black: "#000000",
  red: "#ff0000",
  green: "#00ff00",
  lime: "#00ff00",
  blue: "#0000ff",
  yellow: "#ffff00",
  purple: "#800080",
  magenta: "#ff00ff",
  cyan: "#00ffff",
  gray: "#808080",
  grey: "#808080",
};

/**
 * Parse a CSS color string into an RGBA tuple. Returns null for any
 * format we don't understand (e.g. hsl(), lab(), unknown names) so the
 * caller can fall back to a sensible default.
 */
export function parseColor(input: string): RGB | null {
  if (!input) return null;
  const raw = input.trim().toLowerCase();

  const named = NAMED[raw];
  const color = named ?? raw;

  // #rgb / #rgba / #rrggbb / #rrggbbaa
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
      return { r, g, b, a };
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }
    return null;
  }

  // rgb(...) / rgba(...) — supports legacy-comma and modern-space syntax.
  const m = color.match(
    /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/,
  );
  if (m) {
    const r = Math.round(parseFloat(m[1]));
    const g = Math.round(parseFloat(m[2]));
    const b = Math.round(parseFloat(m[3]));
    let a = 1;
    if (m[4] != null) {
      a = m[4].endsWith("%")
        ? parseFloat(m[4]) / 100
        : parseFloat(m[4]);
    }
    return { r, g, b, a };
  }

  return null;
}

/**
 * WCAG relative luminance of an sRGB triplet. Alpha is ignored — if a
 * color is partially transparent, composite it against a known surface
 * (e.g. `compositeOver`) before calling this.
 */
export function getLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** Alpha-composite `fg` over `bg`, returning a fully-opaque RGB. */
export function compositeOver(fg: RGB, bg: RGB): RGB {
  const a = fg.a;
  return {
    r: Math.round(fg.r * a + bg.r * (1 - a)),
    g: Math.round(fg.g * a + bg.g * (1 - a)),
    b: Math.round(fg.b * a + bg.b * (1 - a)),
    a: 1,
  };
}

/**
 * Decide whether a black or white foreground should sit on top of a
 * given background color. Uses a 0.5 luminance threshold with optional
 * hysteresis so a value hovering right at the boundary doesn't flicker.
 *
 * `prev` is the previous decision ("black" | "white" | undefined); if
 * provided, we only flip if the new luminance crosses the threshold by
 * at least `hysteresis` (default 0.05).
 */
export function pickForeground(
  luminance: number,
  prev?: "black" | "white",
  hysteresis = 0.05,
): "black" | "white" {
  const threshold = 0.5;
  if (prev === "black") {
    return luminance < threshold - hysteresis ? "white" : "black";
  }
  if (prev === "white") {
    return luminance >= threshold + hysteresis ? "black" : "white";
  }
  return luminance >= threshold ? "black" : "white";
}

/**
 * Convenience: parse a CSS color, composite it against white (a safe
 * default for our simulator), and return `"black" | "white"`. Returns
 * `null` for a fully transparent input so the caller can opt into the
 * frosted-glass fallback instead.
 */
export function foregroundForBackground(
  cssColor: string,
  prev?: "black" | "white",
): { choice: "black" | "white"; luminance: number } | null {
  const parsed = parseColor(cssColor);
  if (!parsed) return null;
  if (parsed.a === 0) return null;
  const solid =
    parsed.a === 1
      ? parsed
      : compositeOver(parsed, { r: 255, g: 255, b: 255, a: 1 });
  const luminance = getLuminance(solid.r, solid.g, solid.b);
  return { choice: pickForeground(luminance, prev), luminance };
}
