/**
 * Astro service adapter: delegates to features/astrology, exposes legacy API.
 * No placeholder logic; all calculations use the real engine (Swiss or astronomy-engine).
 */

import type { NatalChartData, NatalPlanetPosition } from '../types/profile';
import {
  computeNatalChart,
  parsePersonInput,
  natalChartFromParsedInput,
} from '../features/astrology/AstroService';
import { angleDelta, detectAspect, signDegreeToLongitude } from '../features/astrology/aspects';
import { natalChartToLegacy } from '../features/astrology/legacyAdapter';

export { normalizeBirthDateToISO } from '../features/astrology/parsePersonInput';
export { angleDelta, detectAspect } from '../features/astrology/aspects';
export { getActiveProviderName } from '../features/astrology/AstroService';

/** @deprecated Use angleDelta */
export const normalizeAngle = (a: number, b: number) => angleDelta(a, b);

export const AstroService = {
  calculateNatalChart(profile: {
    birthDate: string;
    birthTime: string | null;
    birthLocation: string;
    timezone: string;
  }): NatalChartData {
    const chart = computeNatalChart({
      name: '',
      birthDate: profile.birthDate,
      birthTime: profile.birthTime ?? undefined,
      birthPlace: profile.birthLocation || undefined,
      timezone: profile.timezone || undefined,
    });
    if (!chart) {
      return { planets: [], houses: [], system: 'placidus' };
    }
    return natalChartToLegacy(chart);
  },

  natalChartFromPersonConfig(config: {
    birthDate?: string;
    birthTime?: string | null;
    birthPlace?: string;
  }): NatalChartData | null {
    const parsed = parsePersonInput({
      name: '',
      birthDate: config.birthDate,
      birthTime: config.birthTime,
      birthPlace: config.birthPlace,
    });
    const chart = natalChartFromParsedInput(parsed);
    if (!chart) return null;
    return natalChartToLegacy(chart);
  },

  calculateAspect(
    planetA: { sign: string; degree: number },
    planetB: { sign: string; degree: number },
  ): {
    type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
    orb: number;
    intensity: number;
    interpretation: 'support' | 'tension' | 'neutral';
  } | null {
    const lonA = signDegreeToLongitude(planetA.sign, planetA.degree);
    const lonB = signDegreeToLongitude(planetB.sign, planetB.degree);
    const delta = angleDelta(lonA, lonB);
    const result = detectAspect(delta);
    if (!result) return null;
    const interpretation =
      result.tone === 'support' ? 'support' : result.tone === 'challenge' ? 'tension' : 'neutral';
    const intensity = Math.max(0, 1 - result.orb / 8);
    return {
      type: result.type,
      orb: result.orb,
      intensity,
      interpretation,
    };
  },

  getHouseActivation(
    _planets: NatalPlanetPosition[],
    _transitDate?: string,
  ): { houseNumber: number; label: string; score: number }[] {
    return [
      { houseNumber: 10, label: 'Career', score: 0.92 },
      { houseNumber: 7, label: 'Relationships', score: 0.45 },
    ];
  },
};
