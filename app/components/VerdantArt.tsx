// Verdant's art, ported from verdant-design.org (scripts/art.mjs, ISC,
// https://github.com/ivanoats/verdant-wsg-demo): a lush, geometric green
// valley. Everything is inline SVG built from a few shapes — a lens leaf (two
// arcs), circles for hills and canopies, rounded-rect stems — and every fill
// is a color token class, so the scene recolors with the theme (day valley /
// night valley) and costs no requests.
import { css } from '@/styled-system/css';

// ---- tone classes (token-bound fills) ----------------------------------------
const tone = {
  far: css({ fill: 'foliage.far' }),
  mid: css({ fill: 'foliage.mid' }),
  leaf: css({ fill: 'foliage' }),
  deep: css({ fill: 'foliage.deep' }),
  bright: css({ fill: 'foliage.bright' }),
  sun: css({ fill: 'sunlight' }),
  halo: css({ fill: 'sunlight', opacity: '0.25' }),
  sky: css({ fill: 'surface.200' }),
  poppy: css({ fill: 'critical' }),
};
const veinCss = css({
  fill: 'none',
  stroke: 'surface.200',
  strokeWidth: '1.5px',
  strokeLinecap: 'round',
  opacity: '0.55',
});

// ---- one-time grow-in, only when motion is allowed (no loops, WSG 2.10).
// One class per motion; `stagger()` offsets them with an inline animation-delay,
// which overrides the shorthand's 0s delay.
const hillRise = css({
  _motionSafe: { animation: 'hillRise 700ms cubic-bezier(.2,.8,.2,1) both' },
});
const sprout = css({
  transformBox: 'fill-box',
  transformOrigin: '50% 100%',
  _motionSafe: { animation: 'sprout 720ms cubic-bezier(.2,.8,.2,1) both' },
});
const leafGrow = css({
  transformBox: 'fill-box',
  transformOrigin: '0% 50%',
  _motionSafe: { animation: 'leafGrow 560ms cubic-bezier(.2,.8,.2,1) both' },
});
const stagger = (cls: string, delayMs: number) =>
  `class="${cls}" style="animation-delay:${delayMs}ms"`;
const stemGrow = css({
  transformBox: 'fill-box',
  transformOrigin: '50% 100%',
  _motionSafe: {
    animation: 'stemGrow 600ms cubic-bezier(.2,.8,.2,1) 380ms both',
  },
});
const sunRise = css({
  _motionSafe: { animation: 'sunRise 900ms cubic-bezier(.2,.8,.2,1) 0ms both' },
});

// ---- geometry helpers -------------------------------------------------------------
type Point = [number, number];
type Segment = [Point, Point, Point, Point];

// Seeded PRNG so the "random" grass is identical on every render.
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const r1 = (n: number) => +n.toFixed(1);

// A lens leaf of length L, base at the origin, pointing along +x.
const leafD = (L: number) => {
  const r = r1(L * 0.72);
  return `M0 0A${r} ${r} 0 0 1 ${L} 0A${r} ${r} 0 0 1 0 0Z`;
};

interface LeafOptions {
  x: number;
  y: number;
  len: number;
  angle: number;
  fill: string;
  /** Extra attributes for the grow-in wrapper, from `stagger()`. */
  grow?: string;
  vein?: boolean;
}

// Shared leaf: one unit path in <defs>, reused by <use> — keeps a scene with
// a couple hundred leaves to a few KB. `s` scales the 100-unit leaf.
const uleaf = (
  id: string,
  { x, y, len, angle, fill, grow = '', vein = false }: LeafOptions
) => {
  const s = r1(len) / 100;
  const t = `translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)}) scale(${+s.toFixed(3)})`;
  const body =
    `<use href="#${id}" class="${fill}"/>` +
    (vein ? `<use href="#${id}v" class="${veinCss}"/>` : '');
  return grow
    ? `<g transform="${t}"><g ${grow}>${body}</g></g>`
    : `<g transform="${t}">${body}</g>`;
};
const leafDefs = (id: string) =>
  `<defs><path id="${id}" d="${leafD(100)}"/><path id="${id}v" d="M14 0H74" vector-effect="non-scaling-stroke"/></defs>`;

// Cubic bezier helpers for placing grass along a hill's crest.
const bez = (p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] +
      3 * u * u * t * p1[0] +
      3 * u * t * t * p2[0] +
      t * t * t * p3[0],
    u * u * u * p0[1] +
      3 * u * u * t * p1[1] +
      3 * u * t * t * p2[1] +
      t * t * t * p3[1],
  ];
};
const crestY = (segs: Segment[], x: number) => {
  let best: Point = [0, 1e9];
  for (const s of segs)
    for (let i = 0; i <= 60; i++) {
      const p = bez(...s, i / 60);
      if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
    }
  return best[1];
};

interface BurstOptions {
  x: number;
  y: number;
  n: number;
  spread?: [number, number];
  len: [number, number];
  seed: number;
  vein?: boolean;
  tones: string[];
}

// A leafy burst: leaves fanning up from one base point (bushes, ferns).
const burst = (
  id: string,
  {
    x,
    y,
    n,
    spread = [-168, -12],
    len: [lo, hi],
    seed,
    vein = false,
    tones,
  }: BurstOptions
) => {
  const rand = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const a =
      spread[0] + ((spread[1] - spread[0]) * i) / (n - 1) + (rand() - 0.5) * 10;
    const centerBias = 1 - Math.abs(a + 90) / 90; // taller in the middle
    out += uleaf(id, {
      x,
      y,
      len: lo + (hi - lo) * (0.4 * rand() + 0.6 * centerBias),
      angle: a,
      fill: tones[i % tones.length],
      vein,
    });
  }
  return out;
};

// A canopy tree: trunk + overlapping circles, deep underneath, bright on top.
const tree = ({
  x,
  y,
  s = 1,
  grow = '',
}: {
  x: number;
  y: number;
  s?: number;
  grow?: string;
}) => {
  const c = (dx: number, dy: number, r: number, t: string) =>
    `<circle class="${t}" cx="${r1(x + dx * s)}" cy="${r1(y + dy * s)}" r="${r1(r * s)}"/>`;
  return (
    `<g ${grow}>` +
    `<rect class="${tone.deep}" x="${r1(x - 7 * s)}" y="${r1(y - 110 * s)}" width="${r1(14 * s)}" height="${r1(112 * s)}" rx="${r1(7 * s)}"/>` +
    c(0, -150, 50, tone.deep) +
    c(-42, -118, 40, tone.deep) +
    c(42, -116, 42, tone.deep) +
    c(-30, -150, 36, tone.leaf) +
    c(34, -156, 38, tone.leaf) +
    c(0, -110, 34, tone.leaf) +
    c(0, -188, 34, tone.leaf) +
    c(-14, -176, 22, tone.bright) +
    c(28, -138, 20, tone.bright) +
    c(-40, -128, 16, tone.bright) +
    c(12, -206, 14, tone.bright) +
    `</g>`
  );
};

// ---- hero: a verdant valley ----------------------------------------------------------
const heroSvg = (() => {
  const L = 'vl';
  // Foreground hill crest (two cubic segments; the second is the S reflection).
  const segs: Segment[] = [
    [
      [0, 396],
      [90, 362],
      [180, 372],
      [280, 394],
    ],
    [
      [280, 394],
      [380, 416],
      [470, 366],
      [560, 382],
    ],
  ];
  const front = 'M0 396C90 362 180 372 280 394S470 366 560 382V440H0Z';

  // Dense grass along the crest.
  const rand = rng(7);
  let grass = '';
  for (let x = 2; x <= 558; x += 6.6) {
    const len = 14 + rand() * 22;
    const angle = -90 + (rand() - 0.5) * 56;
    const t = [tone.leaf, tone.bright, tone.deep, tone.bright][
      Math.floor(rand() * 4)
    ];
    grass += uleaf(L, {
      x: x + rand() * 4,
      y: crestY(segs, x) + 3,
      len,
      angle,
      fill: t,
    });
  }
  // Flowers scattered in the grass.
  const frand = rng(21);
  let flowers = '';
  for (const fx of [36, 118, 196, 268, 420, 468, 538]) {
    const fy = crestY(segs, fx) - 4 - frand() * 10;
    flowers += `<circle class="${fx % 3 ? tone.sun : tone.poppy}" cx="${fx}" cy="${r1(fy)}" r="${r1(3 + frand() * 1.5)}"/>`;
  }

  // Round shrubs dotted along the middle hills' crest.
  const onCircle = (cx: number, cy: number, r: number, x: number) =>
    Math.abs(x - cx) < r ? cy - Math.sqrt(r * r - (x - cx) ** 2) : Infinity;
  const midCrest = (x: number) =>
    Math.min(onCircle(40, 646, 300, x), onCircle(440, 700, 372, x));
  let shrubs = '';
  for (const [sx, r] of [
    [196, 15],
    [222, 11],
    [292, 13],
    [418, 12],
    [446, 16],
    [540, 13],
  ]) {
    const y = midCrest(sx) + 4;
    shrubs +=
      `<circle class="${tone.deep}" cx="${sx - r * 0.7}" cy="${r1(y - r * 0.5)}" r="${r1(r * 0.8)}"/>` +
      `<circle class="${tone.leaf}" cx="${sx + r * 0.5}" cy="${r1(y - r * 0.6)}" r="${r1(r * 0.85)}"/>` +
      `<circle class="${tone.bright}" cx="${sx}" cy="${r1(y - r)}" r="${r}"/>`;
  }

  // The hero plant: a tall stem crowded with leaves.
  const px = 352;
  const base = 400;
  const top = 120;
  let plant = `<rect class="${tone.deep} ${stemGrow}" x="${px - 5}" y="${top}" width="10" height="${base - top}" rx="5"/>`;
  const n = 12;
  for (let i = 0; i < n; i++) {
    const y = base - 26 - i * ((base - top - 40) / n);
    const len = 100 - i * 4.6;
    const left = i % 2 === 0;
    const angle = left ? 196 + i * 1.6 : -16 - i * 1.6;
    plant += uleaf(L, {
      x: px,
      y,
      len,
      angle,
      fill: [tone.leaf, tone.bright, tone.deep][i % 3],
      grow: stagger(leafGrow, 500 + 100 * Math.min(7, Math.floor(i * 0.7))),
      vein: len > 60,
    });
  }
  plant += uleaf(L, {
    x: px,
    y: top + 6,
    len: 50,
    angle: -90,
    fill: tone.bright,
    grow: stagger(leafGrow, 1200),
    vein: true,
  });
  plant += uleaf(L, {
    x: px,
    y: top + 14,
    len: 40,
    angle: -62,
    fill: tone.leaf,
    grow: stagger(leafGrow, 1200),
  });
  plant += uleaf(L, {
    x: px,
    y: top + 14,
    len: 40,
    angle: -118,
    fill: tone.leaf,
    grow: stagger(leafGrow, 1200),
  });

  return `<svg viewBox="0 0 560 440" width="560" height="440" aria-hidden="true" focusable="false">
  ${leafDefs(L)}
  <clipPath id="vframe"><rect width="560" height="440" rx="28"/></clipPath>
  <rect class="${tone.sky}" width="560" height="440" rx="28"/>
  <g clip-path="url(#vframe)">
  <g class="${sunRise}"><circle class="${tone.halo}" cx="456" cy="84" r="66"/><circle class="${tone.sun}" cx="456" cy="84" r="44"/></g>
  <g ${stagger(hillRise, 0)}>
    <circle class="${tone.far}" cx="150" cy="560" r="310"/>
    <circle class="${tone.far}" cx="480" cy="600" r="330"/>
    ${tree({ x: 490, y: 274, s: 0.42 })}
    ${tree({ x: 530, y: 282, s: 0.3 })}
  </g>
  <g ${stagger(hillRise, 120)}>
    <circle class="${tone.mid}" cx="440" cy="700" r="372"/>
    <circle class="${tone.mid}" cx="40" cy="646" r="300"/>
    ${shrubs}
  </g>
  ${tree({ x: 122, y: 356, s: 1, grow: stagger(sprout, 300) })}
  <g ${stagger(sprout, 420)}>${burst(L, { x: 250, y: 360, n: 9, len: [30, 58], seed: 3, tones: [tone.deep, tone.leaf, tone.bright] })}</g>
  ${plant}
  <g ${stagger(hillRise, 240)}>
    <path class="${tone.leaf}" d="${front}"/>
    ${grass}
    ${flowers}
  </g>
  <g ${stagger(sprout, 540)}>${burst(L, { x: 58, y: 410, n: 11, len: [36, 70], seed: 11, vein: true, tones: [tone.deep, tone.bright, tone.leaf] })}</g>
  <g ${stagger(sprout, 660)}>${burst(L, { x: 506, y: 404, n: 10, len: [32, 62], seed: 5, vein: true, tones: [tone.leaf, tone.deep, tone.bright] })}</g>
  </g>
</svg>`;
})();

// ---- a meadow along the bottom of a CTA band ---------------------------------
const meadowA = css({ fill: 'foliage.bright', opacity: '0.35' });
const meadowB = css({ fill: 'foliage.mid', opacity: '0.3' });
const meadowSvg = (() => {
  const id = 'mw';
  const rand = rng(42);
  let out = leafDefs(id);
  for (let x = 4; x < 600; x += 8.5) {
    out += uleaf(id, {
      x: x + rand() * 3,
      y: 118,
      len: 20 + rand() * 30,
      angle: -90 + (rand() - 0.5) * 60,
      fill: rand() > 0.5 ? meadowA : meadowB,
    });
  }
  for (const [bx, sd] of [
    [120, 1],
    [330, 2],
    [520, 3],
  ]) {
    const r = rng(sd);
    for (let i = 0; i < 9; i++) {
      out += uleaf(id, {
        x: bx,
        y: 118,
        len: 40 + r() * 34,
        angle: -165 + i * 18.75 + (r() - 0.5) * 8,
        fill: i % 2 ? meadowA : meadowB,
      });
    }
  }
  return `<svg viewBox="0 0 600 120" width="600" height="120" aria-hidden="true" focusable="false">${out}</svg>`;
})();

const heroArtCss = css({
  '& svg': {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxWidth: '560px',
    marginInline: 'auto',
  },
});
const meadowCss = css({
  position: 'absolute',
  right: '0',
  bottom: '0',
  width: '600px',
  maxWidth: '100%',
  pointerEvents: 'none',
  '& svg': { display: 'block', width: '100%', height: 'auto' },
});

/**
 * Decorative valley scene that grows in once on load (skipped entirely under
 * prefers-reduced-motion). Hidden from assistive technology.
 * The markup is a constant built from this module's own geometry — no input.
 */
export function VerdantValley() {
  return (
    <div
      className={heroArtCss}
      data-testid="verdant-valley"
      dangerouslySetInnerHTML={{ __html: heroSvg }}
    />
  );
}

/** Decorative meadow for the bottom edge of a `position: relative` band. */
export function VerdantMeadow() {
  return (
    <div
      className={meadowCss}
      data-testid="verdant-meadow"
      dangerouslySetInnerHTML={{ __html: meadowSvg }}
    />
  );
}
