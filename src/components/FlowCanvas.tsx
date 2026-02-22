/**
 * React Flow canvas for Nodes workspace (idea.md).
 */
import { useCallback, useEffect } from 'react';
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
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '../store/useStore';
import { getNodeType, canConnect } from '../graph/nodeRegistry';
import { GraphNode } from './graph/GraphNode';
import styles from './FlowCanvas.module.css';

const nodeTypes = { graphNode: GraphNode };

function flowNodeFromInstance(node: import('../types/graph').NodeInstance) {
  return {
    id: node.id,
    type: 'graphNode' as const,
    position: node.position,
    data: { node },
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
    runCalculation,
    setSelectedNodeId,
  } = useStore();

  const [nodes, setNodesState] = useNodesState(
    storeNodes.map(flowNodeFromInstance),
  );
  const [edges, setEdgesState] = useEdgesState(
    storeEdges.map(flowEdgeFromInstance),
  );

  useEffect(() => {
    setNodesState(storeNodes.map(flowNodeFromInstance));
    setEdgesState(storeEdges.map(flowEdgeFromInstance));
  }, [storeNodes, storeEdges, setNodesState, setEdgesState]);

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
      });
    },
    [setNodesState, setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdgesState((eds) => applyEdgeChanges(changes, eds) as typeof eds);
    },
    [setEdgesState],
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
      const inPort = tgtDef?.inputs.find((p) => p.id === conn.targetHandle);
      if (!outPort || !inPort) return false;
      return canConnect(outPort.type, inPort.type);
    },
    [storeNodes],
  );

  const onSelectionChange = useCallback(
    ({ nodes: sel }: { nodes: { id: string }[] }) => {
      setSelectedNodeId(sel.length === 1 ? sel[0]!.id : null);
    },
    [setSelectedNodeId],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wheel} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
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
    </div>
  );
}
