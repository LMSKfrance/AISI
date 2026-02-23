/**
 * Node type definitions and connection rules (idea.md).
 */
import type { NodeTypeDef, PortType } from '../types/graph';
import type { NodeTypeId } from '../types/graph';

export const NODE_TYPES: NodeTypeDef[] = [
  {
    id: 'natalPlanet',
    label: 'Natal Planet',
    category: 'natal',
    inputs: [],
    outputs: [{ id: 'planet', type: 'planet', label: 'Planet', isOutput: true }],
  },
  {
    id: 'transitPlanet',
    label: 'Transit Planet',
    category: 'dynamic',
    inputs: [],
    outputs: [{ id: 'transitPlanet', type: 'transitPlanet', label: 'Transit', isOutput: true }],
  },
  {
    id: 'house',
    label: 'House',
    category: 'natal',
    inputs: [],
    outputs: [{ id: 'houseActivation', type: 'houseActivation', label: 'House', isOutput: true }],
  },
  {
    id: 'timeWindow',
    label: 'Time Window',
    category: 'dynamic',
    inputs: [],
    outputs: [{ id: 'timeContext', type: 'timeContext', label: 'Time', isOutput: true }],
  },
  {
    id: 'aspect',
    label: 'Aspect',
    category: 'analysis',
    inputs: [
      { id: 'inA', type: 'planet', label: 'A', isOutput: false },
      { id: 'inB', type: 'planet', label: 'B', isOutput: false },
      { id: 'inC', type: 'timeContext', label: 'Time (opt)', isOutput: false },
    ],
    outputs: [{ id: 'aspectResult', type: 'aspectResult', label: 'Aspect', isOutput: true }],
  },
  {
    id: 'houseActivation',
    label: 'House Activation',
    category: 'analysis',
    inputs: [
      { id: 'inA', type: 'planet', label: 'Planet', isOutput: false },
      { id: 'inB', type: 'houseActivation', label: 'House', isOutput: false },
      { id: 'inC', type: 'aspectResult', label: 'Aspect (opt)', isOutput: false },
    ],
    outputs: [{ id: 'domainImpact', type: 'domainImpact', label: 'Impact', isOutput: true }],
  },
  {
    id: 'decisionScore',
    label: 'Decision Score',
    category: 'analysis',
    inputs: [
      { id: 'inA', type: 'aspectResult', label: 'Aspects', isOutput: false },
      { id: 'inB', type: 'domainImpact', label: 'Domains', isOutput: false },
      { id: 'inC', type: 'timeContext', label: 'Time', isOutput: false },
    ],
    outputs: [{ id: 'decisionAnalysis', type: 'decisionAnalysis', label: 'Analysis', isOutput: true }],
  },
  {
    id: 'finalResults',
    label: 'Final Results',
    category: 'outcome',
    inputs: [{ id: 'finalInput', type: 'finalInput', label: 'Input', isOutput: false }],
    outputs: [],
  },
  {
    id: 'person',
    label: 'Person',
    category: 'natal',
    inputs: [],
    outputs: [{ id: 'personProfile', type: 'personProfile', label: 'Profile', isOutput: true }],
  },
];

/** Valid (sourcePortType -> targetPortType) for edges */
const VALID_CONNECTIONS: Record<PortType, PortType[]> = {
  planet: ['planet'], // aspect inA, inB; houseActivation inA
  transitPlanet: ['transitPlanet', 'planet'], // treat as planet for aspect
  timeContext: ['timeContext'],
  house: ['house', 'houseActivation'], // house node outputs house -> houseActivation inB
  houseActivation: ['houseActivation', 'domainImpact', 'decisionAnalysis', 'finalInput'],
  aspectResult: ['aspectResult', 'decisionAnalysis', 'domainImpact', 'finalInput'],
  domainImpact: ['domainImpact', 'decisionAnalysis', 'finalInput'],
  decisionAnalysis: ['decisionAnalysis', 'finalInput'],
  personProfile: ['finalInput'],
  finalInput: [], // target only, no outputs
};

export function canConnect(sourcePortType: PortType, targetPortType: PortType): boolean {
  const allowed = VALID_CONNECTIONS[sourcePortType];
  if (!allowed) return false;
  return allowed.includes(targetPortType);
}

export function getNodeType(id: string): NodeTypeDef | undefined {
  return NODE_TYPES.find((t) => t.id === id);
}

export function getInvalidConnectionMessage(
  sourceType: string,
  targetType: string,
): string {
  return `Invalid connection: ${sourceType} cannot feed ${targetType} directly. Connect through the correct analysis nodes.`;
}

/** Node types that can receive output from this node (related nodes for context menu). Max 5. */
export function getRelatedNodeTypes(sourceNodeType: NodeTypeId): NodeTypeDef[] {
  const sourceDef = getNodeType(sourceNodeType);
  if (!sourceDef) return [];
  const outTypes = sourceDef.outputs.map((p) => p.type);
  const allowed: NodeTypeDef[] = [];
  const seen = new Set<string>();
  for (const outType of outTypes) {
    const targetTypes = VALID_CONNECTIONS[outType];
    if (!targetTypes) continue;
    for (const def of NODE_TYPES) {
      if (def.id === sourceNodeType || seen.has(def.id)) continue;
      const accepts = def.inputs.some((inPort) => targetTypes.includes(inPort.type));
      if (accepts) {
        seen.add(def.id);
        allowed.push(def);
        if (allowed.length >= 5) return allowed;
      }
    }
  }
  return allowed;
}

/** Filter node types by search query (label). */
export function searchNodeTypes(query: string): NodeTypeDef[] {
  const q = query.trim().toLowerCase();
  if (!q) return NODE_TYPES;
  return NODE_TYPES.filter((t) => t.label.toLowerCase().includes(q));
}
