/**
 * AstroService: single entry point for astrology.
 * Selects Swiss Ephemeris provider when available (Node), otherwise Astronomy Engine.
 */

import type { NatalChart, PersonInput, SynastryResult, CompatibilitySummary } from './types';
import { createSwissEphemerisProvider } from './providers/SwissEphemerisProvider';
import { createAstronomyEngineProvider } from './providers/AstronomyEngineProvider';
import { computeSynastry, computeCompatibilityScore } from './synastry';
import { parsePersonNodeInput } from './parsePersonInput';
import type { ParsedPersonInput } from './types';

type Provider = { name: string; computeNatalChart(input: PersonInput): NatalChart | null };

let provider: Provider | null = null;

function getProvider(): Provider {
  if (provider) return provider;
  const swiss = createSwissEphemerisProvider();
  if (swiss) {
    provider = swiss;
    return provider;
  }
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(
      '[Aisi] Swiss Ephemeris not available; using astronomy-engine fallback for planetary positions.',
    );
  }
  provider = createAstronomyEngineProvider();
  return provider;
}

export function getActiveProviderName(): string {
  return getProvider().name;
}

/**
 * Compute natal chart from person input.
 * Uses Swiss if available, else astronomy-engine.
 */
export function computeNatalChart(input: PersonInput): NatalChart | null {
  const p = getProvider();
  return p.computeNatalChart(input);
}

/**
 * Compute synastry between two charts.
 */
export function computeSynastryResult(
  chartA: NatalChart,
  chartB: NatalChart,
): SynastryResult {
  return computeSynastry(chartA, chartB);
}

/**
 * Compute compatibility summary from synastry result.
 */
export function computeCompatibility(synastry: SynastryResult): CompatibilitySummary {
  return computeCompatibilityScore(synastry);
}

/**
 * Parse Person node config. Use for graph evaluator.
 */
export function parsePersonInput(data: Record<string, unknown>): ParsedPersonInput {
  return parsePersonNodeInput({
    name: data.name,
    birthDate: data.birthDate,
    birthTime: data.birthTime,
    birthPlace: data.birthPlace,
    timezone: data.timezone,
  });
}

/**
 * Compute natal chart from parsed person input.
 * Returns null if birth date missing or invalid.
 */
export function natalChartFromParsedInput(parsed: ParsedPersonInput): NatalChart | null {
  if (!parsed.birthDateIso) return null;
  return computeNatalChart({
    name: parsed.name,
    birthDate: parsed.birthDateIso,
    birthTime: parsed.birthTime,
    birthPlace: parsed.birthPlace ?? undefined,
    timezone: parsed.timezone ?? undefined,
  });
}

// Re-export for consumers that need to map to legacy profile types
export { parsePersonNodeInput, normalizeBirthDateToISO } from './parsePersonInput';
export { angleDelta, normalizeLongitude, detectAspect } from './aspects';
export type { NatalChart, SynastryResult, CompatibilitySummary, ParsedPersonInput } from './types';
