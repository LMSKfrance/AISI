/**
 * React Flow canvas for Nodes workspace (idea.md).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type NodeChange,
  type EdgeChange,
  type OnConnect,
  type Node,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '../store/useStore';
import { getNodeType, canConnect } from '../graph/nodeRegistry';
import { GraphNode } from './graph/GraphNode';
import { PersonNode } from './graph/PersonNode';
import { FinalResultsNode } from './graph/FinalResultsNode';
import { NodeContextMenu } from './NodeContextMenu';
import type { NodeTypeId } from '../types/graph';
import type { NodeInstance } from '../types/graph';
import styles from './FlowCanvas.module.css';

const nodeTypes = {
  graphNode: GraphNode,
  personNode: PersonNode,
  finalResultsNode: FinalResultsNode,
};

function flowNodeTypeFromNodeType(type: NodeTypeId): keyof typeof nodeTypes {
  if (type === 'person') return 'personNode';
  if (type === 'finalResults') return 'finalResultsNode';
  return 'graphNode';
}

function flowNodeFromInstance(
  node: import('../types/graph').NodeInstance,
  selectedIds: string[],
) {
  return {
    id: node.id,
    type: flowNodeTypeFromNodeType(node.type),
    position: node.position,
    data: { node },
    selected: selectedIds.includes(node.id),
  };
}

function flowEdgeFromInstance(edge: import('../types/graph').EdgeInstance) {
  return {
    id: edge.id,
    source: edge.sourceNodeId,
    target: edge.targetNodeId,
    sourceHandle: edge.sourcePort,
    targetHandle: edge.targetPort,
  };
}

export function FlowCanvas() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes,
    addEdge: addEdgeToStore,
    removeNode: removeNodeFromStore,
    removeNodes: removeNodesFromStore,
    removeEdges,
    runCalculation,
    selectedNodeIds,
    setSelectedNodeIds,
  } = useStore();

  const configFingerprint = useMemo(
    () =>
      JSON.stringify({
        n: storeNodes.map((n) => ({ id: n.id, t: n.type, c: n.config })),
        e: storeEdges.map((e) => ({ id: e.id, s: e.sourceNodeId, t: e.targetNodeId })),
      }),
    [storeNodes, storeEdges],
  );
  const prevFingerprint = useRef(configFingerprint);
  useEffect(() => {
    if (prevFingerprint.current !== configFingerprint) {
      prevFingerprint.current = configFingerprint;
      runCalculation();
    }
  }, [configFingerprint, runCalculation]);

  const [contextMenu, setContextMenu] = useState<{
    node: NodeInstance;
    position: { x: number; y: number };
  } | null>(null);

  const [nodes, setNodesState] = useNodesState(
    storeNodes.map((n) => flowNodeFromInstance(n, selectedNodeIds)),
  );
  const [edges, setEdgesState] = useEdgesState(
    storeEdges.map(flowEdgeFromInstance),
  );

  useEffect(() => {
    setNodesState(storeNodes.map((n) => flowNodeFromInstance(n, selectedNodeIds)));
    setEdgesState(storeEdges.map(flowEdgeFromInstance));
  }, [storeNodes, storeEdges, selectedNodeIds, setNodesState, setEdgesState]);

  const onConnect: OnConnect = useCallback(
    (conn: Connection) => {
      if (!conn.source || !conn.target || !conn.sourceHandle || !conn.targetHandle) return;
      const result = addEdgeToStore(
        conn.source,
        conn.sourceHandle,
        conn.target,
        conn.targetHandle,
      );
      if (result.ok) {
        setEdgesState((eds) =>
          addEdge(
            {
              ...conn,
              sourceHandle: conn.sourceHandle!,
              targetHandle: conn.targetHandle!,
            },
            eds,
          ),
        );
        runCalculation();
      }
    },
    [addEdgeToStore, setEdgesState, runCalculation],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodesState((nds) => applyNodeChanges(changes, nds) as typeof nds);
      changes.forEach((c) => {
        if (c.type === 'position' && c.dragging === false && c.position) {
          setNodes((prev) =>
            prev.map((n) => (n.id === c.id ? { ...n, position: c.position! } : n)),
          );
        }
        if (c.type === 'remove') {
          removeNodeFromStore(c.id);
        }
      });
    },
    [setNodesState, setNodes, removeNodeFromStore],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdgesState((eds) => applyEdgeChanges(changes, eds) as typeof eds);
      const removedIds = changes
        .filter((c): c is EdgeChange & { type: 'remove' } => c.type === 'remove')
        .map((c) => c.id);
      if (removedIds.length > 0) {
        removeEdges(removedIds);
      }
    },
    [setEdgesState, removeEdges],
  );

  const isValidConnection = useCallback(
    (conn: Connection) => {
      if (!conn.source || !conn.target || !conn.sourceHandle || !conn.targetHandle)
        return false;
      const srcNode = storeNodes.find((n) => n.id === conn.source);
      const tgtNode = storeNodes.find((n) => n.id === conn.target);
      if (!srcNode || !tgtNode) return false;
      const srcDef = getNodeType(srcNode.type);
      const tgtDef = getNodeType(tgtNode.type);
      const outPort = srcDef?.outputs.find((p) => p.id === conn.sourceHandle);
      const logicalTarget = conn.targetHandle.replace(/-right$/, '');
      const inPort = tgtDef?.inputs.find((p) => p.id === logicalTarget);
      if (!outPort || !inPort) return false;
      return canConnect(outPort.type, inPort.type);
    },
    [storeNodes],
  );

  const onSelectionChange = useCallback(
    ({ nodes: sel }: { nodes: { id: string }[] }) => {
      setSelectedNodeIds(sel.map((n) => n.id));
    },
    [setSelectedNodeIds],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeIds.length > 0) {
        e.preventDefault();
        removeNodesFromStore(selectedNodeIds);
      }
    },
    [selectedNodeIds, removeNodesFromStore],
  );

  const onNodeContextMenu = useCallback((_event: React.MouseEvent, flowNode: Node) => {
    const storeNode = storeNodes.find((n) => n.id === flowNode.id) as NodeInstance | undefined;
    if (!storeNode) return;
    _event.preventDefault();
    setContextMenu({
      node: storeNode,
      position: { x: _event.clientX, y: _event.clientY },
    });
  }, [storeNodes]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wheel}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={styles.wheelSpoke} aria-hidden />
        ))}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onNodeContextMenu={onNodeContextMenu}
        onKeyDown={onKeyDown}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        multiSelectionKeyCode={['Shift']}
        fitView
        className={styles.flow}
      >
        <Background color="var(--c-zinc-medium)" gap={16} size={0.5} />
        <Controls className={styles.controls} />
        <MiniMap className={styles.minimap} />
        <Panel position="bottom-left" className={styles.panel}>
          <button type="button" className={styles.iconBtn} title="Zoom in">+</button>
          <button type="button" className={styles.iconBtn} title="Zoom out">−</button>
          <button type="button" className={styles.iconBtn} title="Fit view">Fit</button>
        </Panel>
      </ReactFlow>
      {contextMenu && (
        <NodeContextMenu
          node={contextMenu.node}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
