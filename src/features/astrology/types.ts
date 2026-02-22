/**
 * Astrology feature: shared types for natal charts, synastry, and providers.
 */

export const PLANET_IDS = [
  'Sun',
  'Moon',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
] as const;
export type PlanetId = (typeof PLANET_IDS)[number];

export type CalculationMode = 'precise' | 'date-only';

export interface PlanetLongitude {
  planet: PlanetId;
  longitude: number; // 0..360 ecliptic
  sign?: string;
  degreeInSign?: number;
  approximate?: boolean; // true when birth time missing (e.g. Moon)
}

export interface NatalChart {
  planets: PlanetLongitude[];
  calculationMode: CalculationMode;
  warnings: string[];
  hasBirthTime: boolean;
  hasBirthPlace: boolean;
  houses?: { number: number; sign: string; degree?: number }[];
  ascendant?: { sign: string; degree: number };
}

export type AspectTone = 'support' | 'challenge' | 'neutral';

export type AspectType =
  | 'conjunction'
  | 'sextile'
  | 'square'
  | 'trine'
  | 'opposition';

export interface SynastryAspect {
  planetA: string;
  planetB: string;
  type: AspectType;
  orb: number;
  tone: AspectTone;
  interpretation: string;
  approximate?: boolean; // Moon-related when time missing
}

export interface SynastryResult {
  aspects: SynastryAspect[];
  supportCount: number;
  challengeCount: number;
  neutralCount: number;
  warnings: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface CompatibilitySummary {
  score: number; // 0..100
  supportCount: number;
  challengeCount: number;
  neutralCount: number;
  dominantThemes: string[];
  summary: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface PersonInput {
  name: string;
  birthDate: string; // required, ISO or normalized
  birthTime?: string | null; // HH:mm
  birthPlace?: string | null;
  timezone?: string | null;
}

export interface ParsedPersonInput {
  name: string;
  birthDateIso: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  timezone: string | null;
  warnings: string[];
  valid: boolean;
}

export interface IAstroProvider {
  readonly name: string;
  computeNatalChart(input: PersonInput): NatalChart | null;
}
