/**
 * Graph evaluation: topological order and compute outputs.
 */
import type { NodeInstance, EdgeInstance } from '../types/graph';
import type { NodeTypeId } from '../types/graph';
import { getNodeType } from './nodeRegistry';
import { AstroService } from '../services/astroService';
import type { NatalChartData } from '../types/profile';
import {
  parsePersonInput,
  natalChartFromParsedInput,
  computeSynastryResult,
  computeCompatibility,
  getActiveProviderName,
} from '../features/astrology/AstroService';

export interface SynastryResult {
  personAName: string;
  personBName: string;
  compatibilityScore: number;
  aspects: { planetA: string; planetB: string; type: string; orb: number; interpretation: string; approximate?: boolean }[];
  dominantThemes: string[];
  summary: string;
  supportCount: number;
  challengeCount: number;
  neutralCount?: number;
  precisionNote?: string;
  warnings: string[];
  confidence: 'high' | 'medium' | 'low';
  provider: string;
}

export interface GraphAnalysis {
  activeAspects: { name: string; orb: string; interpretation?: string }[];
  houseActivation: { houseNumber: number; label: string; score: number }[];
  alignmentScore: number;
  volatility: 'Low' | 'Medium' | 'High';
  dominantFactors: string[];
  summaryParagraphs: string[];
  synastry?: SynastryResult | null;
}

type IncomingEntry = { nodeId: string; port: string; value: unknown };

function buildIncomingForNode(
  nodeId: string,
  edges: EdgeInstance[],
  nodeMap: Map<string, NodeInstance>,
): Record<string, IncomingEntry | IncomingEntry[]> {
  const result: Record<string, IncomingEntry | IncomingEntry[]> = {};
  for (const e of edges) {
    if (e.targetNodeId !== nodeId) continue;
    const source = nodeMap.get(e.sourceNodeId);
    if (!source?.computedOutput) continue;
    const entry: IncomingEntry = { nodeId: e.sourceNodeId, port: e.sourcePort, value: source.computedOutput };
    if (e.targetPort === 'finalInput') {
      const existing = result[e.targetPort];
      if (Array.isArray(existing)) existing.push(entry);
      else result[e.targetPort] = [entry];
    } else {
      result[e.targetPort] = entry;
    }
  }
  return result;
}

function topologicalOrder(nodes: NodeInstance[], edges: EdgeInstance[]): NodeInstance[] {
  const idToNode = new Map(nodes.map((n) => [n.id, n]));
  const inDegree: Record<string, number> = {};
  nodes.forEach((n) => (inDegree[n.id] = 0));
  edges.forEach((e) => {
    if (idToNode.has(e.targetNodeId)) inDegree[e.targetNodeId] = (inDegree[e.targetNodeId] ?? 0) + 1;
  });
  const queue = nodes.filter((n) => inDegree[n.id] === 0);
  const order: NodeInstance[] = [];
  while (queue.length) {
    const n = queue.shift()!;
    order.push(n);
    edges
      .filter((e) => e.sourceNodeId === n.id)
      .forEach((e) => {
        inDegree[e.targetNodeId] = (inDegree[e.targetNodeId] ?? 1) - 1;
        if (inDegree[e.targetNodeId] === 0) {
          const next = idToNode.get(e.targetNodeId);
          if (next) queue.push(next);
        }
      });
  }
  return order.length === nodes.length ? order : nodes;
}


function computeNodeOutput(
  node: NodeInstance,
  incoming: Record<string, { value: unknown } | IncomingEntry[]>,
  _natalChart: { planets: { planet: string; sign: string; degree: number }[] } | null,
): unknown {
  const type = getNodeType(node.type);
  if (!type) return null;
  switch (node.type as NodeTypeId) {
    case 'natalPlanet': {
      const planet = (node.config.planet as string) || 'Sun';
      return { type: 'planet', planet, source: 'natal' };
    }
    case 'transitPlanet':
      return { type: 'transitPlanet', planet: node.config.planet || 'Saturn', date: node.config.date };
    case 'house':
      return { type: 'house', houseNumber: node.config.houseNumber ?? 10 };
    case 'timeWindow':
      return { type: 'timeContext', start: node.config.startDate, end: node.config.endDate };
    case 'person': {
      const name = (node.config.name as string) ?? '';
      const birthDate = (node.config.birthDate as string) ?? '';
      const birthTime = (node.config.birthTime as string) ?? '';
      const birthPlace = (node.config.birthPlace as string) ?? '';
      const natalChartData = AstroService.natalChartFromPersonConfig({
        birthDate,
        birthTime: birthTime || null,
        birthPlace,
      });
      return {
        type: 'personProfile',
        name,
        birthDate,
        birthTime,
        birthPlace,
        natalChartData: natalChartData ?? undefined,
      };
    }
    case 'aspect': {
      const a = (incoming.inA as { value: unknown })?.value as { planet?: string; sign?: string; degree?: number } | undefined;
      const b = (incoming.inB as { value: unknown })?.value as { planet?: string; sign?: string; degree?: number } | undefined;
      if (a?.sign && b?.sign) {
        const aspect = AstroService.calculateAspect(
          { sign: a.sign, degree: a.degree ?? 0 },
          { sign: b.sign, degree: b.degree ?? 0 },
        );
        if (aspect) {
          return { ...aspect, type: 'aspectResult', from: a.planet ?? 'A', to: b.planet ?? 'B' };
        }
      }
      return { type: 'aspectResult', label: 'No aspect in orb', orb: null, from: a?.planet ?? 'A', to: b?.planet ?? 'B' };
    }
    case 'houseActivation': {
      const houseActivation = AstroService.getHouseActivation([]);
      return { type: 'domainImpact', houseActivation };
    }
    case 'decisionScore':
      return {
        type: 'decisionAnalysis',
        alignmentScore: 84,
        volatility: 'Low' as const,
        dominantAspect: 'Saturn square Moon',
        dominantHouse: '10th House',
        activeWindow: 'Single-day analysis',
        supportLabel: 'Moderate support if orb widens',
        frictionLabel: 'Tight orb increases pressure',
        compareA: { label: 'Option A', score: 72 },
        compareB: { label: 'Option B', score: 68 },
      };
    case 'finalResults': {
      const raw = incoming.finalInput;
      const entries = Array.isArray(raw) ? raw : [];
      const decision = entries.find((e) => e.port === 'decisionAnalysis')?.value as {
        alignmentScore?: number;
        volatility?: string;
        dominantAspect?: string;
        dominantHouse?: string;
        activeWindow?: string;
        supportLabel?: string;
        frictionLabel?: string;
        compareA?: { label: string; score: number };
        compareB?: { label: string; score: number };
      } | undefined;
      const aspect = entries.find((e) => e.port === 'aspectResult')?.value as { label?: string } | undefined;
      const domain = entries.find((e) => e.port === 'domainImpact')?.value as { topHouse?: string } | undefined;
      const personProfiles = entries
        .filter((e) => e.port === 'personProfile')
        .map((e) => e.value as { name?: string; birthDate?: string; birthTime?: string; birthPlace?: string; natalChartData?: NatalChartData });

      let synastry: SynastryResult | undefined;
      const providerName = getActiveProviderName();
      if (personProfiles.length >= 2) {
        const [first, second] = personProfiles;
        const nameA = first?.name || 'Person A';
        const nameB = second?.name || 'Person B';
        const parsedA = parsePersonInput({
          name: nameA,
          birthDate: first?.birthDate,
          birthTime: first?.birthTime,
          birthPlace: first?.birthPlace,
        });
        const parsedB = parsePersonInput({
          name: nameB,
          birthDate: second?.birthDate,
          birthTime: second?.birthTime,
          birthPlace: second?.birthPlace,
        });
        const chartA = natalChartFromParsedInput(parsedA);
        const chartB = natalChartFromParsedInput(parsedB);

        if (chartA && chartB) {
          const synastryResult = computeSynastryResult(chartA, chartB);
          const compatibility = computeCompatibility(synastryResult);
          synastry = {
            personAName: nameA,
            personBName: nameB,
            compatibilityScore: compatibility.score,
            aspects: synastryResult.aspects.map((a) => ({
              planetA: a.planetA,
              planetB: a.planetB,
              type: a.type,
              orb: a.orb,
              interpretation: a.tone,
              approximate: a.approximate,
            })),
            dominantThemes: compatibility.dominantThemes,
            summary: compatibility.summary,
            supportCount: synastryResult.supportCount,
            challengeCount: synastryResult.challengeCount,
            neutralCount: synastryResult.neutralCount,
            warnings: synastryResult.warnings,
            confidence: synastryResult.confidence,
            provider: providerName,
          };
        } else {
          const missingParts: string[] = [];
          if (!parsedA.birthDateIso) missingParts.push(`${nameA}: birth date`);
          if (!parsedB.birthDateIso) missingParts.push(`${nameB}: birth date`);
          synastry = {
            personAName: nameA,
            personBName: nameB,
            compatibilityScore: 0,
            aspects: [],
            dominantThemes: [],
            summary: missingParts.length ? `Enter ${missingParts.join(' and ')} for synastry.` : 'Connect 2 Person nodes for synastry analysis.',
            supportCount: 0,
            challengeCount: 0,
            neutralCount: 0,
            warnings: missingParts.length ? [`Awaiting: ${missingParts.join(', ')}`] : [],
            confidence: 'low',
            provider: providerName,
          };
        }
      }

      const summary = {
        alignmentScore: decision?.alignmentScore ?? (synastry ? synastry.compatibilityScore : undefined),
        volatility: (decision?.volatility as 'Low' | 'Medium' | 'High') ?? (synastry ? undefined : 'Medium'),
        dominantAspect: decision?.dominantAspect ?? aspect?.label ?? (synastry?.aspects[0] ? `${synastry.aspects[0].planetA} ${synastry.aspects[0].type} ${synastry.aspects[0].planetB}` : undefined),
        dominantHouse: decision?.dominantHouse ?? domain?.topHouse ?? undefined,
        activeWindow: decision?.activeWindow ?? undefined,
        supportLabel: decision?.supportLabel ?? undefined,
        frictionLabel: decision?.frictionLabel ?? undefined,
        compareA: decision?.compareA,
        compareB: decision?.compareB,
        synastry,
      };
      if (personProfiles.length === 1 && personProfiles[0]?.name) {
        summary.supportLabel = `Profile: ${personProfiles[0].name}`;
      }
      return {
        summary,
        _debug: {
          connectedPersons: personProfiles.map((p) => p.name || '(unnamed)'),
          lastComputed: new Date().toISOString(),
          inputCount: entries.length,
          provider: synastry?.provider ?? providerName,
          confidence: synastry?.confidence ?? null,
        },
      };
    }
    default:
      return null;
  }
}

export function evaluateGraph(
  nodes: NodeInstance[],
  edges: EdgeInstance[],
  natalChart: { planets: { planet: string; sign: string; degree: number }[] } | null,
): { nodes: NodeInstance[]; analysis: GraphAnalysis } {
  const order = topologicalOrder([...nodes], edges);
  const nodeMap = new Map(nodes.map((n) => [n.id, { ...n }]));

  for (const n of order) {
    const incoming = buildIncomingForNode(n.id, edges, nodeMap);
    const inputs = Object.fromEntries(
      Object.entries(incoming).map(([k, v]) => {
        if (Array.isArray(v)) return [k, v];
        return [k, { value: (v as IncomingEntry)?.value }];
      }),
    );
    const output = computeNodeOutput(n, inputs, natalChart);
    nodeMap.set(n.id, { ...nodeMap.get(n.id)!, computedOutput: output });
  }

  const updatedNodes = Array.from(nodeMap.values());
  const analysis = buildAnalysis(updatedNodes, edges, natalChart);
  return { nodes: updatedNodes, analysis };
}

function buildAnalysis(
  nodes: NodeInstance[],
  _edges: EdgeInstance[],
  _natalChart: { planets: unknown[] } | null,
): GraphAnalysis {
  const aspects = nodes
    .filter((n) => n.computedOutput && (n.computedOutput as { type?: string }).type === 'aspectResult')
    .map((n) => n.computedOutput as { type?: string; orb?: number; from?: string; to?: string });
  const decision = nodes.find(
    (n) => n.computedOutput && (n.computedOutput as { type?: string }).type === 'decisionAnalysis',
  )?.computedOutput as { alignmentScore?: number; volatility?: string; dominantFactors?: string[] } | undefined;
  const finalResult = nodes.find(
    (n) => n.computedOutput && (n.computedOutput as { summary?: unknown }).summary,
  )?.computedOutput as { summary?: { synastry?: SynastryResult } } | undefined;
  const synastry = finalResult?.summary?.synastry ?? null;
  const houseActivation = AstroService.getHouseActivation([]);

  const summaryParagraphs = synastry
    ? [synastry.summary, ...(synastry.dominantThemes.length ? [`Themes: ${synastry.dominantThemes.join(', ')}.`] : [])]
    : [
        'Connect Person nodes to Final Results for synastry analysis, or use the Aspect/Decision pipeline for single-chart analysis.',
      ];

  return {
    activeAspects: aspects
      .filter((a) => a.orb != null)
      .map((a) => {
        const label = a.type ? `${a.from ?? 'A'} ${a.type} ${a.to ?? 'B'}` : '—';
        return { name: label, orb: `${a.orb}°`, interpretation: a.type ?? undefined };
      }),
    houseActivation,
    alignmentScore: decision?.alignmentScore ?? synastry?.compatibilityScore ?? 0,
    volatility: (decision?.volatility as 'Low' | 'Medium' | 'High') ?? 'Low',
    dominantFactors: decision?.dominantFactors ?? (synastry?.dominantThemes ?? []),
    summaryParagraphs,
    synastry: synastry ?? undefined,
  };
}
