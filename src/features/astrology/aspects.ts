/**
 * Aspect math: normalize longitudes, shortest arc, detect aspects, orbs.
 * All longitudes in [0, 360). Delta uses shortest arc [0, 180].
 */

import type { AspectType, AspectTone } from './types';

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const ASPECT_DEFS: { angle: number; type: AspectType; tone: AspectTone }[] = [
  { angle: 0, type: 'conjunction', tone: 'neutral' },
  { angle: 60, type: 'sextile', tone: 'support' },
  { angle: 90, type: 'square', tone: 'challenge' },
  { angle: 120, type: 'trine', tone: 'support' },
  { angle: 180, type: 'opposition', tone: 'challenge' },
];

export const DEFAULT_MAX_ORB = 8;

/** Normalize longitude to [0, 360). */
export function normalizeLongitude(lon: number): number {
  let x = lon % 360;
  if (x < 0) x += 360;
  return x;
}

/**
 * Shortest arc between two longitudes: result in [0, 180].
 * raw = abs(a - b) % 360, delta = raw > 180 ? 360 - raw : raw
 */
export function angleDelta(a: number, b: number): number {
  const na = normalizeLongitude(a);
  const nb = normalizeLongitude(b);
  let raw = Math.abs(na - nb) % 360;
  if (raw > 180) raw = 360 - raw;
  return raw;
}

/**
 * Find the closest major aspect for a given angular separation (0..180).
 * orb = distance from nearest target (0, 60, 90, 120, 180).
 * Returns null if nearest aspect is beyond maxOrb.
 */
export function detectAspect(
  deltaDegrees: number,
  maxOrb: number = DEFAULT_MAX_ORB,
): { type: AspectType; orb: number; tone: AspectTone } | null {
  let best: (typeof ASPECT_DEFS)[number] | null = null;
  let bestOrb = Infinity;
  for (const def of ASPECT_DEFS) {
    const orb = Math.abs(deltaDegrees - def.angle);
    if (orb < bestOrb) {
      best = def;
      bestOrb = orb;
    }
  }
  if (!best || bestOrb > maxOrb) return null;
  return {
    type: best.type,
    orb: Math.round(bestOrb * 10) / 10,
    tone: best.tone,
  };
}

/** Longitude to sign name and degree within sign. */
export function longitudeToSignDegree(lon: number): { sign: string; degree: number } {
  const n = normalizeLongitude(lon);
  const signIndex = Math.floor(n / 30) % 12;
  const sign = SIGNS[signIndex]!;
  const degree = Math.round((n % 30) * 100) / 100;
  return { sign, degree };
}

/** Sign name + degree in sign → longitude [0, 360). */
export function signDegreeToLongitude(sign: string, degree: number): number {
  const idx = SIGNS.indexOf(sign);
  if (idx === -1) return degree;
  return normalizeLongitude(idx * 30 + (degree % 30));
}
