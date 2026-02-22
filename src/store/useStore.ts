/**
 * Global app state (idea.md data model + UI).
 */
import { create } from 'zustand';
import type { UserProfile } from '../types/profile';
import type { NodeInstance, EdgeInstance } from '../types/graph';
import type { GraphAnalysis } from '../graph/evaluateGraph';
import { AstroService } from '../services/astroService';
import { evaluateGraph } from '../graph/evaluateGraph';
import { getNodeType, canConnect, getInvalidConnectionMessage } from '../graph/nodeRegistry';
import type { NodeTypeId } from '../types/graph';

let nodeIdCounter = 0;
function nextNodeId(): string {
  return `node_${++nodeIdCounter}`;
}
let edgeIdCounter = 0;
function nextEdgeId(): string {
  return `edge_${++edgeIdCounter}`;
}

export interface ConnectionTooltip {
  message: string;
  astroMeaning?: string;
}

interface AppState {
  profile: UserProfile | null;
  natalChartComputed: boolean;
  nodes: NodeInstance[];
  edges: EdgeInstance[];
  selectedNodeId: string | null;
  connectionTooltip: ConnectionTooltip | null;
  analysis: GraphAnalysis | null;
  finalResultsView: 'full' | 'optionA' | 'optionB';

  setProfile: (p: UserProfile | null) => void;
  calculateNatalChart: () => void;
  setSelectedNodeId: (id: string | null) => void;
  addNode: (type: NodeTypeId, position: { x: number; y: number }, config?: Record<string, unknown>) => string;
  removeNode: (id: string) => void;
  setNodes: (nodes: NodeInstance[] | ((prev: NodeInstance[]) => NodeInstance[])) => void;
  addEdge: (source: string, sourcePort: string, target: string, targetPort: string) => { ok: boolean; message?: string };
  setEdges: (edges: EdgeInstance[]) => void;
  clearConnectionTooltip: () => void;
  runCalculation: () => void;
  setFinalResultsView: (view: 'full' | 'optionA' | 'optionB') => void;
  applyTemplate: (templateId: 'decisionCheck' | 'transitImpact' | 'careerTiming') => void;
}

const defaultAnalysis: GraphAnalysis = {
  activeAspects: [
    { name: 'Sun Square Saturn', orb: '0.2°' },
    { name: 'Venus Trine Mars', orb: '1.4°' },
    { name: 'Moon Opp Pluto', orb: '2.1°' },
    { name: 'Merc Conj Jup', orb: '3.5°' },
  ],
  houseActivation: [
    { houseNumber: 10, label: '10th House (Career)', score: 0.92 },
    { houseNumber: 7, label: '7th House (Rel)', score: 0.45 },
  ],
  alignmentScore: 84,
  volatility: 'Low',
  dominantFactors: ['Fire / Fixed', '10th house'],
  summaryParagraphs: [
    'Natal configuration suggests strong resistance to external pressure. Saturn transit currently testing structural integrity of House 10.',
  ],
};

export const useStore = create<AppState>((set, get) => ({
  profile: null,
  natalChartComputed: false,
  nodes: [],
  edges: [],
  selectedNodeId: null,
  connectionTooltip: null,
  analysis: defaultAnalysis,
  finalResultsView: 'full',

  setProfile: (p) => set({ profile: p, natalChartComputed: false }),

  calculateNatalChart: () => {
    const { profile } = get();
    if (!profile) return;
    const chart = AstroService.calculateNatalChart(profile);
    set({
      profile: { ...profile, natalChartData: chart },
      natalChartComputed: true,
    });
  },

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  addNode: (type, position, config = {}) => {
    const def = getNodeType(type);
    const id = nextNodeId();
    const node: NodeInstance = {
      id,
      type,
      position,
      config: def ? { ...Object.fromEntries(def.inputs.filter((p) => !p.isOutput).map((p) => [p.id, undefined])), ...config } : config,
    };
    set((s) => ({ nodes: [...s.nodes, node] }));
    return id;
  },

  removeNode: (id) => {
    set((s) => ({
      nodes: s.nodes.filter((n) => n.id !== id),
      edges: s.edges.filter((e) => e.sourceNodeId !== id && e.targetNodeId !== id),
      selectedNodeId: s.selectedNodeId === id ? null : s.selectedNodeId,
    }));
  },

  setNodes: (nodesOrUpdater) =>
    set((s) => ({
      nodes: typeof nodesOrUpdater === 'function' ? nodesOrUpdater(s.nodes) : nodesOrUpdater,
    })),

  addEdge: (sourceId, sourcePort, targetId, targetPort) => {
    const { nodes } = get();
    const sourceNode = nodes.find((n) => n.id === sourceId);
    const targetNode = nodes.find((n) => n.id === targetId);
    if (!sourceNode || !targetNode) return { ok: false, message: 'Node not found' };
    const sourceDef = getNodeType(sourceNode.type);
    const targetDef = getNodeType(targetNode.type);
    const outPort = sourceDef?.outputs.find((p) => p.id === sourcePort);
    const inPort = targetDef?.inputs.find((p) => p.id === targetPort);
    if (!outPort || !inPort) return { ok: false, message: 'Invalid port' };
    const sourceType = outPort.type;
    const targetType = inPort.type;
    if (!canConnect(sourceType, targetType)) {
      const message = getInvalidConnectionMessage(sourceNode.type, targetNode.type);
      set({ connectionTooltip: { message, astroMeaning: 'Connect through the correct analysis nodes.' } });
      return { ok: false, message };
    }
    const id = nextEdgeId();
    set((s) => ({
      edges: [...s.edges, { id, sourceNodeId: sourceId, sourcePort, targetNodeId: targetId, targetPort }],
      connectionTooltip: {
        message: `Connected ${sourceDef?.label ?? sourceId} to ${targetDef?.label ?? targetId}`,
        astroMeaning: 'This updates the analysis flow. Run calculation to refresh results.',
      },
    }));
    return { ok: true };
  },

  setEdges: (edges) => set({ edges }),

  clearConnectionTooltip: () => set({ connectionTooltip: null }),

  runCalculation: () => {
    const { nodes, edges, profile } = get();
    const natalChart = profile?.natalChartData?.planets ? { planets: profile.natalChartData.planets } : null;
    const { nodes: updatedNodes, analysis } = evaluateGraph(nodes, edges, natalChart);
    set({ nodes: updatedNodes, analysis });
  },

  setFinalResultsView: (view) => set({ finalResultsView: view }),

  applyTemplate: (templateId) => {
    const base = 100;
    const nodes: NodeInstance[] = [];
    const edges: EdgeInstance[] = [];
    const add = (type: NodeTypeId, x: number, y: number, config?: Record<string, unknown>) => {
      const id = nextNodeId();
      nodes.push({
        id,
        type,
        position: { x: base + x, y: base + y },
        config: config ?? {},
      });
      return id;
    };
    if (templateId === 'decisionCheck') {
      const natal = add('natalPlanet', 0, 0, { planet: 'Moon' });
      const transit = add('transitPlanet', 200, 0, { planet: 'Saturn' });
      const aspect = add('aspect', 400, 100);
      const house = add('house', 0, 150, { houseNumber: 10 });
      const houseAct = add('houseActivation', 400, 250);
      const timeW = add('timeWindow', 200, 150, { startDate: new Date().toISOString().slice(0, 10) });
      const decision = add('decisionScore', 600, 200);
      const final_ = add('finalResults', 800, 200);
      edges.push(
        { id: nextEdgeId(), sourceNodeId: natal, sourcePort: 'planet', targetNodeId: aspect, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: transit, sourcePort: 'transitPlanet', targetNodeId: aspect, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: aspect, sourcePort: 'aspectResult', targetNodeId: decision, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: house, sourcePort: 'houseActivation', targetNodeId: houseAct, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: natal, sourcePort: 'planet', targetNodeId: houseAct, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: houseAct, sourcePort: 'domainImpact', targetNodeId: decision, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: timeW, sourcePort: 'timeContext', targetNodeId: decision, targetPort: 'inC' },
        { id: nextEdgeId(), sourceNodeId: decision, sourcePort: 'decisionAnalysis', targetNodeId: final_, targetPort: 'decisionAnalysis' },
        { id: nextEdgeId(), sourceNodeId: aspect, sourcePort: 'aspectResult', targetNodeId: final_, targetPort: 'aspectResult' },
      );
    } else if (templateId === 'transitImpact') {
      const transit = add('transitPlanet', 0, 0, { planet: 'Saturn' });
      const natal = add('natalPlanet', 0, 100, { planet: 'Moon' });
      const aspect = add('aspect', 300, 50);
      const final_ = add('finalResults', 500, 50);
      edges.push(
        { id: nextEdgeId(), sourceNodeId: transit, sourcePort: 'transitPlanet', targetNodeId: aspect, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: natal, sourcePort: 'planet', targetNodeId: aspect, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: aspect, sourcePort: 'aspectResult', targetNodeId: final_, targetPort: 'aspectResult' },
      );
    } else {
      const natal = add('natalPlanet', 0, 0, { planet: 'Saturn' });
      const house = add('house', 0, 100, { houseNumber: 10 });
      const transit = add('transitPlanet', 200, 0, { planet: 'Mars' });
      const aspect = add('aspect', 400, 50);
      const houseAct = add('houseActivation', 400, 150);
      const decision = add('decisionScore', 600, 100);
      const final_ = add('finalResults', 800, 100);
      edges.push(
        { id: nextEdgeId(), sourceNodeId: natal, sourcePort: 'planet', targetNodeId: aspect, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: transit, sourcePort: 'transitPlanet', targetNodeId: aspect, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: aspect, sourcePort: 'aspectResult', targetNodeId: decision, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: natal, sourcePort: 'planet', targetNodeId: houseAct, targetPort: 'inA' },
        { id: nextEdgeId(), sourceNodeId: house, sourcePort: 'houseActivation', targetNodeId: houseAct, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: houseAct, sourcePort: 'domainImpact', targetNodeId: decision, targetPort: 'inB' },
        { id: nextEdgeId(), sourceNodeId: decision, sourcePort: 'decisionAnalysis', targetNodeId: final_, targetPort: 'decisionAnalysis' },
        { id: nextEdgeId(), sourceNodeId: aspect, sourcePort: 'aspectResult', targetNodeId: final_, targetPort: 'aspectResult' },
      );
    }
    nodeIdCounter += nodes.length;
    edgeIdCounter += edges.length;
    set({ nodes, edges, analysis: defaultAnalysis });
  },
}));
