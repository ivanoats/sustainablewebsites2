// Verdant's art, ported from verdant-design.org (scripts/art.mjs, ISC,
// https://github.com/ivanoats/verdant-wsg-demo): a lush, geometric green
// valley. Everything is inline SVG built from a few shapes — a lens leaf (two
// arcs), circles for hills and canopies, rounded-rect stems — and every fill
// is a color token class, so the scene recolors with the theme (day valley /
// night valley) and costs no requests.
import type { CSSProperties, ReactElement } from 'react';
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

// ---- layout wrappers ------------------------------------------------------
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

interface Grow {
  className: string;
  style: CSSProperties;
}
const stagger = (className: string, delayMs: number): Grow => ({
  className,
  style: { animationDelay: `${delayMs}ms` },
});

// ---- geometry helpers -------------------------------------------------------------
type Point = [number, number];
type Segment = [Point, Point, Point, Point];

// Seeded PRNG so the "random" grass is identical on every render.
const rng = (initialSeed: number) => {
  let seed = initialSeed;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let mixed = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
};
const round = (value: number, digits = 1) => Number(value.toFixed(digits));

// A lens leaf of the given length, base at the origin, pointing along +x.
const leafPath = (length: number) => {
  const radius = round(length * 0.72);
  return `M0 0A${radius} ${radius} 0 0 1 ${length} 0A${radius} ${radius} 0 0 1 0 0Z`;
};

interface LeafOptions {
  x: number;
  y: number;
  len: number;
  angle: number;
  fill: string;
  grow?: Grow;
  vein?: boolean;
}

// Shared leaf: one unit path in <defs>, reused by <use> — keeps a scene with
// a couple hundred leaves small. The 100-unit leaf is scaled to `len`.
const Leaf = ({
  defsId,
  x,
  y,
  len,
  angle,
  fill,
  grow,
  vein = false,
}: LeafOptions & { defsId: string }) => {
  const scale = round(round(len) / 100, 3);
  const body = (
    <>
      <use href={`#${defsId}`} className={fill} />
      {vein && <use href={`#${defsId}v`} className={veinCss} />}
    </>
  );
  return (
    <g
      transform={`translate(${round(x)} ${round(y)}) rotate(${round(angle)}) scale(${scale})`}
    >
      {grow ? <g {...grow}>{body}</g> : body}
    </g>
  );
};
const LeafDefs = ({ id }: { id: string }) => (
  <defs>
    <path id={id} d={leafPath(100)} />
    <path id={`${id}v`} d="M14 0H74" vectorEffect="non-scaling-stroke" />
  </defs>
);

// Cubic bezier helpers for placing grass along a hill's crest.
const bezier = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  progress: number
): Point => {
  const rest = 1 - progress;
  return [
    rest * rest * rest * p0[0] +
      3 * rest * rest * progress * p1[0] +
      3 * rest * progress * progress * p2[0] +
      progress * progress * progress * p3[0],
    rest * rest * rest * p0[1] +
      3 * rest * rest * progress * p1[1] +
      3 * rest * progress * progress * p2[1] +
      progress * progress * progress * p3[1],
  ];
};
const crestY = (segments: Segment[], x: number) => {
  let best: Point = [0, 1e9];
  for (const segment of segments)
    for (let step = 0; step <= 60; step++) {
      const point = bezier(...segment, step / 60);
      if (Math.abs(point[0] - x) < Math.abs(best[0] - x)) best = point;
    }
  return best[1];
};

interface BurstOptions {
  defsId: string;
  x: number;
  y: number;
  count: number;
  spread?: [number, number];
  len: [number, number];
  seed: number;
  vein?: boolean;
  tones: string[];
}

// A leafy burst: leaves fanning up from one base point (bushes, ferns).
const Burst = ({
  defsId,
  x,
  y,
  count,
  spread = [-168, -12],
  len: [shortest, longest],
  seed,
  vein = false,
  tones,
}: BurstOptions) => {
  const rand = rng(seed);
  const leaves: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const angle =
      spread[0] +
      ((spread[1] - spread[0]) * i) / (count - 1) +
      (rand() - 0.5) * 10;
    const centerBias = 1 - Math.abs(angle + 90) / 90; // taller in the middle
    leaves.push(
      <Leaf
        key={angle}
        defsId={defsId}
        x={x}
        y={y}
        len={
          shortest + (longest - shortest) * (0.4 * rand() + 0.6 * centerBias)
        }
        angle={angle}
        fill={tones[i % tones.length]}
        vein={vein}
      />
    );
  }
  return leaves;
};

// A canopy tree: trunk + overlapping circles, deep underneath, bright on top.
const canopy: [number, number, number, string][] = [
  [0, -150, 50, tone.deep],
  [-42, -118, 40, tone.deep],
  [42, -116, 42, tone.deep],
  [-30, -150, 36, tone.leaf],
  [34, -156, 38, tone.leaf],
  [0, -110, 34, tone.leaf],
  [0, -188, 34, tone.leaf],
  [-14, -176, 22, tone.bright],
  [28, -138, 20, tone.bright],
  [-40, -128, 16, tone.bright],
  [12, -206, 14, tone.bright],
];
const Tree = ({
  x,
  y,
  size = 1,
  grow,
}: {
  x: number;
  y: number;
  size?: number;
  grow?: Grow;
}) => (
  <g {...grow}>
    <rect
      className={tone.deep}
      x={round(x - 7 * size)}
      y={round(y - 110 * size)}
      width={round(14 * size)}
      height={round(112 * size)}
      rx={round(7 * size)}
    />
    {canopy.map(([dx, dy, radius, fill]) => (
      <circle
        key={`${dx},${dy}`}
        className={fill}
        cx={round(x + dx * size)}
        cy={round(y + dy * size)}
        r={round(radius * size)}
      />
    ))}
  </g>
);

// ---- hero: a verdant valley ----------------------------------------------------------
const VALLEY_LEAF = 'vl';

// Foreground hill crest (two cubic segments; the second is the S reflection).
const frontSegments: Segment[] = [
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
const frontHill = 'M0 396C90 362 180 372 280 394S470 366 560 382V440H0Z';

// Dense grass along the crest.
const grass = (() => {
  const rand = rng(7);
  const blades: ReactElement[] = [];
  for (let x = 2; x <= 558; x += 6.6) {
    const len = 14 + rand() * 22;
    const angle = -90 + (rand() - 0.5) * 56;
    const fill = [tone.leaf, tone.bright, tone.deep, tone.bright][
      Math.floor(rand() * 4)
    ];
    blades.push(
      <Leaf
        key={x}
        defsId={VALLEY_LEAF}
        x={x + rand() * 4}
        y={crestY(frontSegments, x) + 3}
        len={len}
        angle={angle}
        fill={fill}
      />
    );
  }
  return blades;
})();

// Flowers scattered in the grass.
const flowers = (() => {
  const rand = rng(21);
  return [36, 118, 196, 268, 420, 468, 538].map((fx) => {
    const fy = crestY(frontSegments, fx) - 4 - rand() * 10;
    return (
      <circle
        key={fx}
        className={fx % 3 ? tone.sun : tone.poppy}
        cx={fx}
        cy={round(fy)}
        r={round(3 + rand() * 1.5)}
      />
    );
  });
})();

// Round shrubs dotted along the middle hills' crest.
const onCircle = (cx: number, cy: number, radius: number, x: number) =>
  Math.abs(x - cx) < radius
    ? cy - Math.sqrt(radius * radius - (x - cx) ** 2)
    : Infinity;
const midCrest = (x: number) =>
  Math.min(onCircle(40, 646, 300, x), onCircle(440, 700, 372, x));
const shrubs = [
  [196, 15],
  [222, 11],
  [292, 13],
  [418, 12],
  [446, 16],
  [540, 13],
].map(([sx, radius]) => {
  const y = midCrest(sx) + 4;
  return (
    <g key={sx}>
      <circle
        className={tone.deep}
        cx={sx - radius * 0.7}
        cy={round(y - radius * 0.5)}
        r={round(radius * 0.8)}
      />
      <circle
        className={tone.leaf}
        cx={sx + radius * 0.5}
        cy={round(y - radius * 0.6)}
        r={round(radius * 0.85)}
      />
      <circle
        className={tone.bright}
        cx={sx}
        cy={round(y - radius)}
        r={radius}
      />
    </g>
  );
});

// The hero plant: a tall stem crowded with leaves.
const PLANT_X = 352;
const PLANT_BASE = 400;
const PLANT_TOP = 120;
const PLANT_LEAVES = 12;
const plantLeaves = Array.from({ length: PLANT_LEAVES }, (_, i) => {
  const len = 100 - i * 4.6;
  const y =
    PLANT_BASE - 26 - i * ((PLANT_BASE - PLANT_TOP - 40) / PLANT_LEAVES);
  return (
    <Leaf
      key={y}
      defsId={VALLEY_LEAF}
      x={PLANT_X}
      y={y}
      len={len}
      angle={i % 2 === 0 ? 196 + i * 1.6 : -16 - i * 1.6}
      fill={[tone.leaf, tone.bright, tone.deep][i % 3]}
      grow={stagger(leafGrow, 500 + 100 * Math.min(7, Math.floor(i * 0.7)))}
      vein={len > 60}
    />
  );
});
const crownGrow = stagger(leafGrow, 1200);

/**
 * Decorative valley scene that grows in once on load (skipped entirely under
 * prefers-reduced-motion). Hidden from assistive technology.
 */
export function VerdantValley() {
  return (
    <div className={heroArtCss} data-testid="verdant-valley">
      <svg
        viewBox="0 0 560 440"
        width="560"
        height="440"
        aria-hidden="true"
        focusable="false"
      >
        <LeafDefs id={VALLEY_LEAF} />
        <clipPath id="vframe">
          <rect width="560" height="440" rx="28" />
        </clipPath>
        <rect className={tone.sky} width="560" height="440" rx="28" />
        <g clipPath="url(#vframe)">
          <g className={sunRise}>
            <circle className={tone.halo} cx="456" cy="84" r="66" />
            <circle className={tone.sun} cx="456" cy="84" r="44" />
          </g>
          <g {...stagger(hillRise, 0)}>
            <circle className={tone.far} cx="150" cy="560" r="310" />
            <circle className={tone.far} cx="480" cy="600" r="330" />
            <Tree x={490} y={274} size={0.42} />
            <Tree x={530} y={282} size={0.3} />
          </g>
          <g {...stagger(hillRise, 120)}>
            <circle className={tone.mid} cx="440" cy="700" r="372" />
            <circle className={tone.mid} cx="40" cy="646" r="300" />
            {shrubs}
          </g>
          <Tree x={122} y={356} grow={stagger(sprout, 300)} />
          <g {...stagger(sprout, 420)}>
            <Burst
              defsId={VALLEY_LEAF}
              x={250}
              y={360}
              count={9}
              len={[30, 58]}
              seed={3}
              tones={[tone.deep, tone.leaf, tone.bright]}
            />
          </g>
          <rect
            className={`${tone.deep} ${stemGrow}`}
            x={PLANT_X - 5}
            y={PLANT_TOP}
            width="10"
            height={PLANT_BASE - PLANT_TOP}
            rx="5"
          />
          {plantLeaves}
          <Leaf
            defsId={VALLEY_LEAF}
            x={PLANT_X}
            y={PLANT_TOP + 6}
            len={50}
            angle={-90}
            fill={tone.bright}
            grow={crownGrow}
            vein
          />
          <Leaf
            defsId={VALLEY_LEAF}
            x={PLANT_X}
            y={PLANT_TOP + 14}
            len={40}
            angle={-62}
            fill={tone.leaf}
            grow={crownGrow}
          />
          <Leaf
            defsId={VALLEY_LEAF}
            x={PLANT_X}
            y={PLANT_TOP + 14}
            len={40}
            angle={-118}
            fill={tone.leaf}
            grow={crownGrow}
          />
          <g {...stagger(hillRise, 240)}>
            <path className={tone.leaf} d={frontHill} />
            {grass}
            {flowers}
          </g>
          <g {...stagger(sprout, 540)}>
            <Burst
              defsId={VALLEY_LEAF}
              x={58}
              y={410}
              count={11}
              len={[36, 70]}
              seed={11}
              vein
              tones={[tone.deep, tone.bright, tone.leaf]}
            />
          </g>
          <g {...stagger(sprout, 660)}>
            <Burst
              defsId={VALLEY_LEAF}
              x={506}
              y={404}
              count={10}
              len={[32, 62]}
              seed={5}
              vein
              tones={[tone.leaf, tone.deep, tone.bright]}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

// ---- a meadow along the bottom of a CTA band ---------------------------------
const MEADOW_LEAF = 'mw';
const meadowA = css({ fill: 'foliage.bright', opacity: '0.35' });
const meadowB = css({ fill: 'foliage.mid', opacity: '0.3' });
const meadowLeaves = (() => {
  const leaves: ReactElement[] = [];
  const rand = rng(42);
  for (let x = 4; x < 600; x += 8.5) {
    leaves.push(
      <Leaf
        key={`g${x}`}
        defsId={MEADOW_LEAF}
        x={x + rand() * 3}
        y={118}
        len={20 + rand() * 30}
        angle={-90 + (rand() - 0.5) * 60}
        fill={rand() > 0.5 ? meadowA : meadowB}
      />
    );
  }
  for (const [bx, seed] of [
    [120, 1],
    [330, 2],
    [520, 3],
  ]) {
    const tuftRand = rng(seed);
    for (let i = 0; i < 9; i++) {
      const len = 40 + tuftRand() * 34;
      const angle = -165 + i * 18.75 + (tuftRand() - 0.5) * 8;
      leaves.push(
        <Leaf
          key={`t${bx}:${angle}`}
          defsId={MEADOW_LEAF}
          x={bx}
          y={118}
          len={len}
          angle={angle}
          fill={i % 2 ? meadowA : meadowB}
        />
      );
    }
  }
  return leaves;
})();

/** Decorative meadow for the bottom edge of a `position: relative` band. */
export function VerdantMeadow() {
  return (
    <div className={meadowCss} data-testid="verdant-meadow">
      <svg
        viewBox="0 0 600 120"
        width="600"
        height="120"
        aria-hidden="true"
        focusable="false"
      >
        <LeafDefs id={MEADOW_LEAF} />
        {meadowLeaves}
      </svg>
    </div>
  );
}
