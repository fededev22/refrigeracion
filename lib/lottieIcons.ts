type Vec = [number, number, number, number];

const cyan: Vec = [0.02, 0.62, 0.74, 1];
const ice: Vec = [0.75, 0.94, 1, 1];
const ink: Vec = [0.08, 0.18, 0.28, 1];

function transform(extra: Record<string, unknown> = {}) {
  return {
    ty: "tr",
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: 0 },
    o: { a: 0, k: 100 },
    ...extra,
  };
}

function group(items: unknown[], rotate = 0) {
  return {
    ty: "gr",
    nm: "g",
    it: [...items, transform(rotate ? { r: { a: 0, k: rotate } } : {})],
  };
}

function ellipse(w: number, h: number, color: Vec) {
  return group([
    { ty: "el", nm: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [w, h] } },
    { ty: "fl", nm: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 } },
  ]);
}

function rect(w: number, h: number, color: Vec, radius = 4) {
  return group([
    {
      ty: "rc",
      nm: "rc",
      p: { a: 0, k: [0, 0] },
      s: { a: 0, k: [w, h] },
      r: { a: 0, k: radius },
    },
    { ty: "fl", nm: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 } },
  ]);
}

function animation(name: string, shapes: unknown[], spin: boolean) {
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 120,
    h: 120,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: name,
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: spin
            ? {
                a: 1,
                k: [
                  { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
                  { t: 90, s: [360] },
                ],
              }
            : { a: 0, k: 0 },
          p: { a: 0, k: [60, 60, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: spin
            ? { a: 0, k: [100, 100, 100] }
            : {
                a: 1,
                k: [
                  { t: 0, s: [90, 90, 100], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
                  { t: 45, s: [108, 108, 100], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
                  { t: 90, s: [90, 90, 100] },
                ],
              },
        },
        ao: 0,
        shapes,
        ip: 0,
        op: 90,
        st: 0,
      },
    ],
  };
}

export const lottieByService = {
  split: animation("split", [rect(78, 28, ice, 10), ellipse(16, 16, cyan)], false),
  service: animation(
    "service",
    [
      group([ellipse(16, 52, cyan)], 0),
      group([ellipse(16, 52, ice)], 60),
      group([ellipse(16, 52, cyan)], 120),
    ],
    true,
  ),
  gas: animation("gas", [ellipse(34, 48, cyan), ellipse(14, 14, ice)], false),
  comercial: animation("comercial", [rect(46, 70, ice, 8), rect(28, 8, cyan, 2)], false),
  inverter: animation("inverter", [rect(64, 40, ink, 6), ellipse(10, 10, cyan), ellipse(10, 10, ice)], false),
  venta: animation("venta", [rect(54, 40, ice, 8), ellipse(16, 16, cyan)], false),
} as const;
