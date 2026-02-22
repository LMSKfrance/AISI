/**
 * User profile and natal chart (idea.md data model).
 */
export interface NatalPlanetPosition {
  planet: string;
  sign: string;
  signAbbrev: string;
  degree: number;
  house: number;
  retrograde?: boolean;
}

export interface NatalChartData {
  planets: NatalPlanetPosition[];
  houses: { number: number; sign: string; signAbbrev: string }[];
  ascendant?: { sign: string; degree: number };
  system: 'placidus' | 'whole-sign';
}

export interface UserProfile {
  id: string;
  name: string;
  birthDate: string; // ISO date
  birthTime: string | null; // "HH:mm" or null
  birthLocation: string;
  timezone: string;
  natalChartData: NatalChartData | null;
}
