/**
 * Port types for astrologically valid connections (idea.md).
 */
export type PortType =
  | 'planet'
  | 'transitPlanet'
  | 'timeContext'
  | 'houseActivation'
  | 'house'
  | 'aspectResult'
  | 'domainImpact'
  | 'decisionAnalysis'
  | 'personProfile'
  | 'finalInput';

/**
 * Node type identifiers.
 */
export type NodeTypeId =
  | 'natalPlanet'
  | 'transitPlanet'
  | 'house'
  | 'timeWindow'
  | 'aspect'
  | 'houseActivation'
  | 'decisionScore'
  | 'finalResults'
  | 'person';

export interface PortDef {
  id: string;
  type: PortType;
  label: string;
  /** true = output, false = input */
  isOutput: boolean;
}

export interface NodeTypeDef {
  id: NodeTypeId;
  label: string;
  category: 'natal' | 'dynamic' | 'analysis' | 'outcome';
  inputs: PortDef[];
  outputs: PortDef[];
}

export interface NodeInstance {
  id: string;
  type: NodeTypeId;
  position: { x: number; y: number };
  config: Record<string, unknown>;
  computedOutput?: unknown;
  uiState?: { collapsed?: boolean };
}

export interface EdgeInstance {
  id: string;
  sourceNodeId: string;
  sourcePort: string;
  targetNodeId: string;
  targetPort: string;
}

export interface GraphProject {
  id: string;
  name: string;
  nodes: NodeInstance[];
  edges: EdgeInstance[];
  createdAt: string;
  updatedAt: string;
}
