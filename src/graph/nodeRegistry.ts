/**
 * Node type definitions and connection rules (idea.md).
 */
import type { NodeTypeDef, PortType } from '../types/graph';

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
    inputs: [
      { id: 'aspectResult', type: 'aspectResult', label: 'Aspects', isOutput: false },
      { id: 'domainImpact', type: 'domainImpact', label: 'Domains', isOutput: false },
      { id: 'decisionAnalysis', type: 'decisionAnalysis', label: 'Decision', isOutput: false },
    ],
    outputs: [],
  },
];

/** Valid (sourcePortType -> targetPortType) for edges */
const VALID_CONNECTIONS: Record<PortType, PortType[]> = {
  planet: ['planet'], // aspect inA, inB; houseActivation inA
  transitPlanet: ['transitPlanet', 'planet'], // treat as planet for aspect
  timeContext: ['timeContext'],
  house: ['house', 'houseActivation'], // house node outputs house -> houseActivation inB
  houseActivation: ['houseActivation', 'domainImpact', 'decisionAnalysis'],
  aspectResult: ['aspectResult', 'decisionAnalysis', 'domainImpact'],
  domainImpact: ['domainImpact', 'decisionAnalysis'],
  decisionAnalysis: ['decisionAnalysis'],
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
