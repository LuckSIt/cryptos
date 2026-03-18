const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

let activeScrollGeneration = 0;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getHeaderOffset = () => {
  const header = document.querySelector('header');
  if (!header) return 0;
  const rect = header.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  return Math.round(rect.height);
};

type ScrollToYOptions = {
  /** If provided, overrides speed-based duration */
  durationMs?: number;
  /** Constant speed in px/sec (lower = плавнее) */
  speedPxPerSec?: number;
  minDurationMs?: number;
  maxDurationMs?: number;
  /** Subtracted from targetY (e.g. header height) */
  offsetPx?: number;
  /** If provided, updates URL hash at the end */
  updateHash?: string;
};

/** Мягче cubic: дольше плавное замедление в конце. */
function easeOutQuint(t: number) {
  const u = 1 - t;
  return 1 - u * u * u * u * u;
}

export function smoothScrollToY(
  targetY: number,
  {
    durationMs,
    speedPxPerSec = 260,
    minDurationMs = 380,
    maxDurationMs = 8000,
    offsetPx = 0,
    updateHash,
  }: ScrollToYOptions = {},
) {
  if (typeof window === 'undefined') return;

  activeScrollGeneration += 1;
  const generation = activeScrollGeneration;

  const startY = window.scrollY || window.pageYOffset || 0;
  const finalY = Math.max(0, Math.round(targetY - offsetPx));

  if (prefersReducedMotion() || durationMs === 0) {
    window.scrollTo(0, finalY);
    if (updateHash) window.history.pushState(null, '', updateHash);
    return;
  }

  const distance = finalY - startY;
  const absDistance = Math.abs(distance);
  const resolvedDurationMs =
    typeof durationMs === 'number' ? durationMs : clamp(absDistance / (speedPxPerSec / 1000), minDurationMs, maxDurationMs);

  const startTime = performance.now();

  const step = (now: number) => {
    if (generation !== activeScrollGeneration) return;
    // +16ms чтобы движение началось сразу (без "паузы" первого кадра), но без рывка.
    const elapsed = now - startTime + 16;
    const t = resolvedDurationMs <= 0 ? 1 : Math.min(1, elapsed / resolvedDurationMs);
    const p = easeOutQuint(t);
    window.scrollTo(0, startY + distance * p);
    if (t < 1) {
      requestAnimationFrame(step);
    } else if (updateHash) {
      window.history.pushState(null, '', updateHash);
    }
  };

  requestAnimationFrame(step);
}

type ScrollToHashOptions = {
  durationMs?: number;
  speedPxPerSec?: number;
  minDurationMs?: number;
  maxDurationMs?: number;
  offsetPx?: number;
  autoHeaderOffset?: boolean;
};

export function smoothScrollToHash(hash: string, options: ScrollToHashOptions = {}) {
  if (typeof document === 'undefined') return;
  if (!hash || !hash.startsWith('#')) return;

  const id = hash.slice(1);
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const baseY = rect.top + (window.scrollY || window.pageYOffset || 0);
  const headerOffset = options.autoHeaderOffset === false ? 0 : getHeaderOffset();
  const offsetPx = (options.offsetPx ?? 0) + headerOffset;

  smoothScrollToY(baseY, {
    durationMs: options.durationMs,
    speedPxPerSec: options.speedPxPerSec,
    minDurationMs: options.minDurationMs,
    maxDurationMs: options.maxDurationMs,
    offsetPx,
    updateHash: hash,
  });
}

