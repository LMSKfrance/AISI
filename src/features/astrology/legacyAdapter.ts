/**
 * Map NatalChart (feature) to legacy NatalChartData (profile) for UI and existing consumers.
 */

import type { NatalChart } from './types';
import type { NatalChartData, NatalPlanetPosition } from '../../types/profile';

const SIGN_ABBREV: Record<string, string> = {
  Aries: 'Ari', Taurus: 'Tau', Gemini: 'Gem', Cancer: 'Can', Leo: 'Leo', Virgo: 'Vir',
  Libra: 'Lib', Scorpio: 'Sco', Sagittarius: 'Sag', Capricorn: 'Cap', Aquarius: 'Aqu', Pisces: 'Pis',
};

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export function natalChartToLegacy(chart: NatalChart): NatalChartData {
  const planets: NatalPlanetPosition[] = chart.planets.map((p) => {
    const signIndex = Math.floor((p.longitude % 360) / 30) % 12;
    const house = chart.houses?.length
      ? (chart.houses[signIndex]?.number ?? signIndex + 1)
      : signIndex + 1;
    return {
      planet: p.planet,
      sign: p.sign ?? SIGNS[signIndex] ?? '—',
      signAbbrev: p.sign ? (SIGN_ABBREV[p.sign] ?? p.sign.slice(0, 3)) : (SIGN_ABBREV[SIGNS[signIndex]!] ?? '—'),
      degree: p.degreeInSign ?? (p.longitude % 30),
      house,
      retrograde: false,
    };
  });
  const houses = chart.houses?.length
    ? chart.houses.map((h) => ({ ...h, signAbbrev: SIGN_ABBREV[h.sign] ?? h.sign.slice(0, 3) }))
    : Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        sign: SIGNS[i % 12]!,
        signAbbrev: SIGN_ABBREV[SIGNS[i % 12]!] ?? '—',
      }));
  return {
    planets,
    houses,
    ascendant: chart.ascendant,
    system: 'placidus',
  };
}
