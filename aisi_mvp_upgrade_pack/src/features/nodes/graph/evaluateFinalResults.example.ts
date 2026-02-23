// Example evaluator logic for final results aggregation.
// Merge into your graph engine and adapt input shapes.

type DecisionAnalysis = {
  alignmentScore: number;
  volatility: 'Low' | 'Medium' | 'High';
  dominantAspect: string;
  dominantHouse: string;
  activeWindow: string;
  supportLabel: string;
  frictionLabel: string;
  compareA?: { label: string; score: number };
  compareB?: { label: string; score: number };
};

export function evaluateFinalResultsNode(inputs: any[]): { summary: DecisionAnalysis } {
  const decision = inputs.find(i => i?.type === 'decisionAnalysis')?.value;
  const aspect = inputs.find(i => i?.type === 'aspectResult')?.value;
  const domain = inputs.find(i => i?.type === 'domainImpact')?.value;
  const person = inputs.find(i => i?.type === 'personProfile')?.value;

  const summary: DecisionAnalysis = {
    alignmentScore: decision?.alignmentScore ?? 62,
    volatility: decision?.volatility ?? 'Medium',
    dominantAspect: decision?.dominantAspect ?? aspect?.label ?? 'Saturn square Moon',
    dominantHouse: decision?.dominantHouse ?? domain?.topHouse ?? '10th House',
    activeWindow: decision?.activeWindow ?? 'Single-day analysis',
    supportLabel: decision?.supportLabel ?? 'Moderate support if orb widens',
    frictionLabel: decision?.frictionLabel ?? 'Tight orb increases pressure',
    compareA: decision?.compareA,
    compareB: decision?.compareB,
  };

  if (person?.name) {
    summary.supportLabel = `${summary.supportLabel} • Compare target: ${person.name}`;
  }

  return { summary };
}
