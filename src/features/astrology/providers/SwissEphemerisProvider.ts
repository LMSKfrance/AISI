/**
 * Swiss Ephemeris provider (Node-only, native N-API).
 * Use when running in Node with sweph installed and ephemeris path set.
 * In browser/Vite builds this provider is unavailable; AstroService falls back to AstronomyEngine.
 *
 * Expected API (when sweph is available):
 * - set_ephe_path(path: string)
 * - calc_ut(julday_ut: number, body: number) => { longitude, ... }
 * - swe_julday(year, month, day, hour, calendar) => julday_ut
 *
 * TODO: When integrating sweph, implement computeNatalChart using swe_calc_ut for each planet,
 * convert JD to date for MakeTime equivalent, then return NatalChart with same shape.
 */

import type { NatalChart, PersonInput } from '../types';

let _swephAvailable: boolean | null = null;

function tryLoadSweph(): unknown {
  if (_swephAvailable === false) return null;
  try {
    if (typeof globalThis === 'undefined' || !('require' in globalThis)) return null;
    const req = (globalThis as { require?: (id: string) => unknown }).require;
    if (!req) return null;
    const modId = 'sweph';
    const sweph = req(modId);
    _swephAvailable = Boolean(sweph);
    return sweph ?? null;
  } catch {
    _swephAvailable = false;
    return null;
  }
}

export function createSwissEphemerisProvider(): { name: string; computeNatalChart(input: PersonInput): NatalChart | null } | null {
  const sweph = tryLoadSweph();
  if (!sweph) return null;
  return {
    name: 'Swiss',
    computeNatalChart(_input: PersonInput): NatalChart | null {
      // Stub: full implementation would use sweph.calc_ut, swe_julday, set_ephe_path.
      // For now return null so AstroService uses fallback.
      return null;
    },
  };
}
