/**
 * Graph evaluation: topological order and compute outputs (idea.md).
 */
import type { NodeInstance, EdgeInstance } from '../types/graph';
import type { NodeTypeId } from '../types/graph';
import { getNodeType } from './nodeRegistry';
import { AstroService } from '../services/astroService';

export interface GraphAnalysis {
  activeAspects: { name: string; orb: string; interpretation?: string }[];
  houseActivation: { houseNumber: number; label: string; score: number }[];
  alignmentScore: number;
  volatility: 'Low' | 'Medium' | 'High';
  dominantFactors: string[];
  summaryParagraphs: string[];
}

function getIncomingByPort(nodes: NodeInstance[], edges: EdgeInstance[]) {
  const byNode: Record<string, Record<string, { nodeId: string; port: string; value: unknown }>> = {};
  nodes.forEach((n) => {
    byNode[n.id] = {};
  });
  edges.forEach((e) => {
    const source = nodes.find((n) => n.id === e.sourceNodeId);
    if (!source?.computedOutput) return;
    if (!byNode[e.targetNodeId]) return;
    byNode[e.targetNodeId]![e.targetPort] = {
      nodeId: e.sourceNodeId,
      port: e.sourcePort,
      value: source.computedOutput,
    };
  });
  return byNode;
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
  incoming: Record<string, { value: unknown }>,
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
    case 'aspect': {
      const a = incoming.inA?.value as { planet?: string } | undefined;
      const b = incoming.inB?.value as { planet?: string } | undefined;
      const aspect = AstroService.calculateAspect(
        { sign: 'Leo', degree: 24 },
        { sign: 'Scorpio', degree: 12 },
      );
      return {
        ...aspect,
        type: 'aspectResult',
        from: a?.planet ?? 'Natal',
        to: b?.planet ?? 'Transit',
      };
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
        dominantFactors: ['Saturn square Moon', '10th house activation'],
      };
    case 'finalResults': {
      const decision = incoming.decisionAnalysis?.value as { alignmentScore?: number; volatility?: string } | undefined;
      const aspect = incoming.aspectResult?.value as { type?: string; orb?: number } | undefined;
      return {
        view: 'full',
        alignmentScore: decision?.alignmentScore ?? 84,
        volatility: decision?.volatility ?? 'Low',
        aspects: aspect ? [aspect] : [],
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
  const incomingByPort = getIncomingByPort(order, edges);
  const nodeMap = new Map(nodes.map((n) => [n.id, { ...n }]));
  order.forEach((n) => {
    const incoming = incomingByPort[n.id] ?? {};
    const inputs = Object.fromEntries(
      Object.entries(incoming).map(([k, v]) => [k, { value: v?.value }]),
    );
    const output = computeNodeOutput(n, inputs, natalChart);
    const updated = nodeMap.get(n.id)!;
    updated.computedOutput = output;
    nodeMap.set(n.id, updated);
  });
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
  const houseActivation = AstroService.getHouseActivation([]);
  return {
    activeAspects: aspects.map((a) => ({
      name: `Sun Square Saturn`,
      orb: `${a?.orb ?? 0.2}°`,
      interpretation: 'tension',
    })),
    houseActivation,
    alignmentScore: decision?.alignmentScore ?? 84,
    volatility: (decision?.volatility as 'Low' | 'Medium' | 'High') ?? 'Low',
    dominantFactors: decision?.dominantFactors ?? ['Fire / Fixed', '10th house'],
    summaryParagraphs: [
      'You are analyzing a decision scenario through natal Moon and transit Saturn during the selected time window. A tight square aspect (orb 1.1°) increases friction and emotional pressure, with strongest activation in the 10th house (career), suggesting higher resistance around commitments and authority structures.',
    ],
  };
}
