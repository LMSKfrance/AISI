/**
 * Natal chart provider using astronomy-engine (browser + Node).
 * Uses true ecliptic longitudes; no ephemeris files required.
 */

import { Body, EclipticLongitude, SunPosition, MakeTime } from 'astronomy-engine';
import type { NatalChart, PersonInput, PlanetId } from '../types';
import { normalizeLongitude, longitudeToSignDegree } from '../aspects';

const BODY_MAP: Record<PlanetId, Body> = {
  Sun: Body.Sun,
  Moon: Body.Moon,
  Mercury: Body.Mercury,
  Venus: Body.Venus,
  Mars: Body.Mars,
  Jupiter: Body.Jupiter,
  Saturn: Body.Saturn,
};

const PLANET_IDS: PlanetId[] = [
  'Sun',
  'Moon',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
];

function parseTime(dateIso: string, timeStr: string | null): Date {
  if (timeStr && /^\d{1,2}:\d{2}$/.test(timeStr.trim())) {
    const [h, m] = timeStr.trim().split(':').map(Number);
    return new Date(`${dateIso}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`);
  }
  return new Date(`${dateIso}T12:00:00Z`);
}

export function createAstronomyEngineProvider(): { name: string; computeNatalChart(input: PersonInput): NatalChart | null } {
  return {
    name: 'Fallback',
    computeNatalChart(input: PersonInput): NatalChart | null {
      const birthDate = input.birthDate?.trim();
      if (!birthDate || birthDate.length < 8) return null;
      const warnings: string[] = [];
      const hasBirthTime = Boolean(input.birthTime?.trim());
      const hasBirthPlace = Boolean(input.birthPlace?.trim());
      if (!hasBirthTime) {
        warnings.push('Birth time missing; Moon and house positions are approximate or unavailable.');
      }
      if (!hasBirthPlace) {
        warnings.push('Birth place missing; houses and angles unavailable.');
      }
      const date = parseTime(birthDate, input.birthTime ?? null);
      if (isNaN(date.getTime())) return null;

      const time = MakeTime(date);
      const planets = PLANET_IDS.map((planetId): NatalChart['planets'][0] => {
        const lon =
          planetId === 'Sun'
            ? SunPosition(time).elon
            : EclipticLongitude(BODY_MAP[planetId], time);
        const longitude = normalizeLongitude(lon);
        const { sign, degree } = longitudeToSignDegree(longitude);
        const approximate = !hasBirthTime && planetId === 'Moon';
        return {
          planet: planetId,
          longitude,
          sign,
          degreeInSign: degree,
          approximate,
        };
      });

      const calculationMode = hasBirthTime && hasBirthPlace ? 'precise' : 'date-only';
      const chart: NatalChart = {
        planets,
        calculationMode,
        warnings,
        hasBirthTime,
        hasBirthPlace,
      };
      if (hasBirthTime && hasBirthPlace) {
        chart.houses = [];
        chart.ascendant = undefined;
      }
      return chart;
    },
  };
}
