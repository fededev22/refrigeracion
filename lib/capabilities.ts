type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/** 3D solo en pantallas amplias, sin ahorro de datos y sin reduced-motion. */
export function allowHeavy3d() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 768;
  const save = (navigator as NavigatorWithConnection).connection?.saveData === true;
  const cores = navigator.hardwareConcurrency ?? 8;
  const lowEnd = cores > 0 && cores <= 4;
  return !reduce && !save && !narrow && !lowEnd;
}

export function allowCursorTrail() {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return fine && !reduce && window.innerWidth >= 1024;
}

export function allowSmoothScroll() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  return fine && !reduce;
}
