/**
 * Synastry: inter-chart aspects and compatibility score from two natal charts.
 */

import type { NatalChart, SynastryAspect, SynastryResult, CompatibilitySummary } from './types';
import { angleDelta, detectAspect, DEFAULT_MAX_ORB } from './aspects';
import { confidenceFromCharts, buildPrecisionWarnings } from './confidence';

const KEY_PAIRS: [string, string][] = [
  ['Sun', 'Sun'],
  ['Sun', 'Moon'],
  ['Sun', 'Venus'],
  ['Moon', 'Moon'],
  ['Moon', 'Venus'],
  ['Moon', 'Mars'],
  ['Venus', 'Venus'],
  ['Venus', 'Mars'],
  ['Mars', 'Mars'],
  ['Mercury', 'Mercury'],
  ['Saturn', 'Moon'],
  ['Jupiter', 'Venus'],
];

function getLongitude(chart: NatalChart, planet: string): number | undefined {
  const p = chart.planets.find((x) => x.planet === planet);
  return p?.longitude;
}

function isMoonApproximate(chartA: NatalChart, chartB: NatalChart, pA: string, pB: string): boolean {
  const moonApproxA = chartA.planets.find((x) => x.planet === 'Moon')?.approximate ?? false;
  const moonApproxB = chartB.planets.find((x) => x.planet === 'Moon')?.approximate ?? false;
  return (pA === 'Moon' && moonApproxA) || (pB === 'Moon' && moonApproxB);
}

export function computeSynastryAspects(
  chartA: NatalChart,
  chartB: NatalChart,
  maxOrb: number = DEFAULT_MAX_ORB,
): SynastryAspect[] {
  const aspects: SynastryAspect[] = [];
  for (const [pA, pB] of KEY_PAIRS) {
    const lonA = getLongitude(chartA, pA);
    const lonB = getLongitude(chartB, pB);
    if (lonA == null || lonB == null) continue;
    const delta = angleDelta(lonA, lonB);
    const detected = detectAspect(delta, maxOrb);
    if (!detected) continue;
    const approximate = isMoonApproximate(chartA, chartB, pA, pB);
    aspects.push({
      planetA: `${pA}(A)`,
      planetB: `${pB}(B)`,
      type: detected.type,
      orb: detected.orb,
      tone: detected.tone,
      interpretation: detected.tone,
      approximate,
    });
  }
  aspects.sort((a, b) => a.orb - b.orb);
  return aspects;
}

export function computeSynastry(
  chartA: NatalChart,
  chartB: NatalChart,
  _options?: { maxOrb?: number },
): SynastryResult {
  const aspects = computeSynastryAspects(chartA, chartB);
  const supportCount = aspects.filter((a) => a.tone === 'support').length;
  const challengeCount = aspects.filter((a) => a.tone === 'challenge').length;
  const neutralCount = aspects.filter((a) => a.tone === 'neutral').length;
  const confidence = confidenceFromCharts(chartA, chartB);
  const warnings = buildPrecisionWarnings(
    chartA,
    chartB,
    'Person A',
    'Person B',
  );
  return {
    aspects,
    supportCount,
    challengeCount,
    neutralCount,
    warnings,
    confidence,
  };
}

/**
 * Compatibility score: start at 50, add weight for supportive aspects,
 * subtract for challenging, mild adjustment for neutral. Clamp 0..100.
 * Tighter orbs count more (weight = 1 - orb/8).
 */
export function computeCompatibilityScore(synastry: SynastryResult): CompatibilitySummary {
  const { aspects, supportCount, challengeCount, neutralCount } = synastry;
  const total = aspects.length || 1;
  let score = 50;
  const orbWeight = (orb: number) => Math.max(0, 1 - orb / DEFAULT_MAX_ORB);
  for (const a of aspects) {
    const w = orbWeight(a.orb);
    if (a.tone === 'support') score += (w * 50) / total;
    else if (a.tone === 'challenge') score -= (w * 50) / total;
    else score += (w * 10) / total - 5 / total; // mild neutral
  }
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const dominantThemes: string[] = [];
  const supportRatio = supportCount / total;
  const challengeRatio = challengeCount / total;
  if (supportRatio > 0.4) dominantThemes.push('Emotional harmony', 'Natural affinity');
  if (challengeRatio > 0.4) dominantThemes.push('Growth through friction', 'Dynamic tension');
  if (supportRatio <= 0.4 && challengeRatio <= 0.4) dominantThemes.push('Mixed influences');
  const summary =
    aspects.length > 0
      ? `${aspects.length} inter-chart aspects. ${supportCount} supportive, ${challengeCount} challenging. Compatibility ${clamped}/100.`
      : 'No major inter-chart aspects within orb.';
  return {
    score: clamped,
    supportCount,
    challengeCount,
    neutralCount,
    dominantThemes: dominantThemes.length ? dominantThemes : ['Mixed influences'],
    summary,
  };
}
