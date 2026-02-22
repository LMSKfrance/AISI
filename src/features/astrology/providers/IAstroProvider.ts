/**
 * Provider interface for natal chart computation.
 * Implementations: Swiss Ephemeris (Node-only) or Astronomy Engine (browser).
 */

import type { NatalChart, PersonInput } from '../types';

export interface IAstroProvider {
  readonly name: string;
  computeNatalChart(input: PersonInput): NatalChart | null;
}
