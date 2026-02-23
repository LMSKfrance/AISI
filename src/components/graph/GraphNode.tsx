/**
 * Custom React Flow node: AISI node with typed handles (idea.md).
 */
import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { getNodeType } from '../../graph/nodeRegistry';
import type { NodeInstance } from '../../types/graph';
import styles from './GraphNode.module.css';

const CATEGORY_STYLE: Record<string, string> = {
  natal: styles.natal,
  dynamic: styles.dynamic,
  analysis: styles.default,
  outcome: styles.outcome,
};

function nodeLabel(typeId: string): string {
  const def = getNodeType(typeId as import('../../types/graph').NodeTypeId);
  return def?.label ?? typeId;
}

function nodeBadge(typeId: string): string {
  const map: Record<string, string> = {
    natalPlanet: 'SOURCE',
    transitPlanet: 'TIME',
    house: 'HOUSE',
    timeWindow: 'TIME',
    aspect: 'ASPECT',
    houseActivation: 'DOMAIN',
    decisionScore: 'DECISION',
    finalResults: 'RESULT',
    person: 'PROFILE',
  };
  return map[typeId] ?? 'NODE';
}

export const GraphNode = memo(function GraphNode({ data, selected }: NodeProps) {
  const node = data.node as NodeInstance;
  const def = getNodeType(node.type);
  const category = def?.category ?? 'analysis';

  const dataRows = dataRowsFromNode(node);

  return (
    <div
      className={`${styles.node} ${CATEGORY_STYLE[category] ?? styles.default} ${selected ? styles.selected : ''}`}
    >
      {(def?.outputs.length || def?.inputs.length) ? (
        <div className={styles.portsColumn} data-side="right">
          {def?.outputs.map((p) => (
            <div key={`out-${p.id}`} className={styles.portWrap}>
              <Handle
                type="source"
                position={Position.Right}
                id={p.id}
                className={styles.handle}
              />
              <span className={styles.portLabel}>{p.label}</span>
            </div>
          ))}
          {def?.inputs.map((p) => (
            <div key={`right-${p.id}`} className={styles.portWrap}>
              <Handle
                type="target"
                position={Position.Right}
                id={`${p.id}-right`}
                className={styles.handle}
              />
              <span className={styles.portLabel}>{p.label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className={styles.header}>
        <span className={styles.title}>{nodeLabel(node.type)}</span>
        <span className={styles.badge}>{nodeBadge(node.type)}</span>
      </div>
      <div className={styles.content}>
        {dataRows.map((row) => (
          <div key={row.label} className={styles.dataRow}>
            <span>{row.label}</span>
            <span className={styles.dataValue}>{row.value}</span>
          </div>
        ))}
      </div>
      {def?.inputs.length ? (
        <div className={styles.portsColumn} data-side="left">
          {def.inputs.map((p) => (
            <div key={`left-${p.id}`} className={styles.portWrap}>
              <span className={styles.portLabel}>{p.label}</span>
              <Handle
                type="target"
                position={Position.Left}
                id={p.id}
                className={styles.handle}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
});

function dataRowsFromNode(node: NodeInstance): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  if (node.type === 'natalPlanet') {
    const planet = (node.config.planet as string) || 'Sun';
    rows.push({ label: 'Planet', value: planet });
  }
  if (node.type === 'transitPlanet') {
    rows.push({ label: 'Planet', value: (node.config.planet as string) || 'Saturn' });
    rows.push({ label: 'Date', value: (node.config.date as string) || '—' });
  }
  if (node.type === 'house') {
    rows.push({ label: 'House', value: String(node.config.houseNumber ?? 10) });
  }
  if (node.type === 'timeWindow') {
    rows.push({ label: 'Start', value: (node.config.startDate as string) || '—' });
    if (node.config.endDate) rows.push({ label: 'End', value: String(node.config.endDate) });
  }
  if (node.type === 'person') {
    rows.push({ label: 'Name', value: (node.config.name as string) || '—' });
    rows.push({ label: 'Date', value: (node.config.birthDate as string) || '—' });
    rows.push({ label: 'Time', value: (node.config.birthTime as string) || '—' });
    rows.push({ label: 'Place', value: (node.config.birthPlace as string) || '—' });
  }
  if (node.type === 'finalResults' && node.computedOutput) {
    const o = node.computedOutput as { summary?: { alignmentScore?: number; volatility?: string } };
    const s = o.summary ?? {};
    rows.push({ label: 'Align', value: `${s.alignmentScore ?? '—'}/100` });
    rows.push({ label: 'Volatility', value: s.volatility ?? '—' });
  }
  if (rows.length === 0) rows.push({ label: 'Type', value: node.type });
  return rows;
}
