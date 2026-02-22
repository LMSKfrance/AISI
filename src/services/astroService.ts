/**
 * Astrology calculation service (idea.md).
 * MVP: mock implementation with clear interface for swapping in Swiss Ephemeris later.
 */
import type { NatalChartData, NatalPlanetPosition } from '../types/profile';

const PLANETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
const SIGN_ABBREV: Record<string, string> = {
  Aries: 'Ari', Taurus: 'Tau', Gemini: 'Gem', Cancer: 'Can', Leo: 'Leo', Virgo: 'Vir',
  Libra: 'Lib', Scorpio: 'Sco', Sagittarius: 'Sag', Capricorn: 'Cap', Aquarius: 'Aqu', Pisces: 'Pis',
};

/** MVP: deterministic mock from birth date string so same input = same chart */
function mockDegreesFromDate(dateStr: string): number[] {
  const d = dateStr.slice(0, 10).replace(/-/g, '');
  let seed = 0;
  for (let i = 0; i < d.length; i++) seed += d.charCodeAt(i);
  const rng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return PLANETS.map((_, i) => Math.floor(rng() * 30 + (i * 4) % 30));
}

export const AstroService = {
  /**
   * Calculate natal chart from birth data.
   * MVP: mock positions; interface ready for real ephemeris.
   */
  calculateNatalChart(profile: {
    birthDate: string;
    birthTime: string | null;
    birthLocation: string;
    timezone: string;
  }): NatalChartData {
    const degrees = mockDegreesFromDate(profile.birthDate);
    const planets: NatalPlanetPosition[] = PLANETS.map((planet, i) => {
      const deg = degrees[i]!;
      const signIndex = Math.floor(deg / 30) % 12;
      const sign = SIGNS[signIndex]!;
      const house = (signIndex + 3) % 12 + 1; // simplistic house
      return {
        planet,
        sign,
        signAbbrev: SIGN_ABBREV[sign] ?? sign.slice(0, 3),
        degree: deg % 30,
        house,
        retrograde: planet === 'Mercury' && i % 3 === 0,
      };
    });
    const houses = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      sign: SIGNS[i % 12]!,
      signAbbrev: SIGN_ABBREV[SIGNS[i % 12]!] ?? '???',
    }));
    return {
      planets,
      houses,
      ascendant: { sign: SIGNS[0]!, degree: 4 },
      system: 'placidus',
    };
  },

  /**
   * Get transits for a date (or range).
   * MVP: mock transits.
   */
  calculateTransits(_dateRange: { start: string; end?: string }, _natalChart: NatalChartData) {
    return {
      date: new Date().toISOString().slice(0, 10),
      positions: PLANETS.map((planet, i) => ({
        planet,
        sign: SIGNS[(i + 2) % 12]!,
        signAbbrev: SIGN_ABBREV[SIGNS[(i + 2) % 12]!] ?? '???',
        degree: (i * 5 + 12) % 30,
        retrograde: false,
      })),
    };
  },

  /**
   * Calculate aspect between two planet positions.
   * Returns type, orb, intensity, interpretation.
   */
  calculateAspect(
    _planetA: { sign: string; degree: number },
    _planetB: { sign: string; degree: number },
  ): {
    type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
    orb: number;
    intensity: number;
    interpretation: 'support' | 'tension' | 'neutral';
  } {
    return {
      type: 'square',
      orb: 1.1,
      intensity: 0.8,
      interpretation: 'tension',
    };
  },

  /**
   * House activation from planets/aspects.
   * MVP: returns mock activation scores per house.
   */
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
