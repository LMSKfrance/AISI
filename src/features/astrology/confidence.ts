/**
 * Confidence and precision: when to mark high/medium/low and what warnings to add.
 */

import type { NatalChart, ConfidenceLevel } from './types';

export function confidenceFromCharts(chartA: NatalChart, chartB: NatalChart): ConfidenceLevel {
  const hasTimeA = chartA.hasBirthTime;
  const hasTimeB = chartB.hasBirthTime;
  const hasPlaceA = chartA.hasBirthPlace;
  const hasPlaceB = chartB.hasBirthPlace;
  const warningsA = chartA.warnings.length;
  const warningsB = chartB.warnings.length;

  if (hasTimeA && hasTimeB && hasPlaceA && hasPlaceB && warningsA === 0 && warningsB === 0) {
    return 'high';
  }
  if (hasTimeA && hasTimeB && (hasPlaceA || hasPlaceB) && warningsA + warningsB <= 2) {
    return 'medium';
  }
  return 'low';
}

export function buildPrecisionWarnings(
  chartA: NatalChart,
  chartB: NatalChart,
  nameA: string,
  nameB: string,
): string[] {
  const warnings: string[] = [];
  if (!chartA.hasBirthTime || !chartB.hasBirthTime) {
    warnings.push('House and angle analysis unavailable without exact birth time and birthplace.');
  }
  if (!chartA.hasBirthTime && chartA.planets.some((p) => p.planet === 'Moon')) {
    warnings.push(`Moon position for ${nameA} is approximate (birth time missing).`);
  }
  if (!chartB.hasBirthTime && chartB.planets.some((p) => p.planet === 'Moon')) {
    warnings.push(`Moon position for ${nameB} is approximate (birth time missing).`);
  }
  chartA.warnings.forEach((w) => warnings.push(`${nameA}: ${w}`));
  chartB.warnings.forEach((w) => warnings.push(`${nameB}: ${w}`));
  return warnings;
}

export function shouldShowHouses(chart: NatalChart): boolean {
  return chart.hasBirthTime && chart.hasBirthPlace && chart.houses != null;
}
