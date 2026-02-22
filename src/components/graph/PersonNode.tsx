/**
 * Person node: birth profile with personProfile output (idea.md).
 * Editable birth data; shows chart summary when computed.
 * Uses local state while typing to avoid focus loss from store-driven re-renders.
 */
import { memo, useCallback, useState, useEffect } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStore } from '../../store/useStore';
import type { NodeInstance } from '../../types/graph';
import type { NatalChartData } from '../../types/profile';
import styles from './GraphNode.module.css';

function chartSummary(chart: NatalChartData): string {
  const sun = chart.planets.find((p) => p.planet === 'Sun');
  const moon = chart.planets.find((p) => p.planet === 'Moon');
  const venus = chart.planets.find((p) => p.planet === 'Venus');
  const parts: string[] = [];
  if (sun) parts.push(`Sun ${sun.sign}`);
  if (moon) parts.push(`Moon ${moon.sign}`);
  if (venus) parts.push(`Venus ${venus.sign}`);
  return parts.length ? parts.join(', ') : '—';
}

function configValues(config: Record<string, unknown>) {
  return {
    name: (config.name as string) ?? '',
    birthDate: (config.birthDate as string) ?? '',
    birthTime: (config.birthTime as string) ?? '',
    birthPlace: (config.birthPlace as string) ?? '',
  };
}

export const PersonNode = memo(function PersonNode({ data, selected }: NodeProps) {
  const node = data.node as NodeInstance;
  const { updateNodeConfig, runCalculation } = useStore();
  const config = node.config || {};
  const configVals = configValues(config);

  const [name, setName] = useState(configVals.name);
  const [birthDate, setBirthDate] = useState(configVals.birthDate);
  const [birthTime, setBirthTime] = useState(configVals.birthTime);
  const [birthPlace, setBirthPlace] = useState(configVals.birthPlace);

  useEffect(() => {
    setName(configVals.name);
    setBirthDate(configVals.birthDate);
    setBirthTime(configVals.birthTime);
    setBirthPlace(configVals.birthPlace);
  }, [node.id, configVals.name, configVals.birthDate, configVals.birthTime, configVals.birthPlace]);

  const output = node.computedOutput as
    | { type?: string; name?: string; natalChartData?: NatalChartData }
    | undefined;
  const chart = output?.natalChartData;
  const summary = chart ? chartSummary(chart) : null;

  const persist = useCallback(
    (patch: Record<string, unknown>) => {
      updateNodeConfig(node.id, patch);
      runCalculation();
    },
    [node.id, updateNodeConfig, runCalculation],
  );

  const handleBlur = useCallback(() => {
    persist({
      name,
      birthDate,
      birthTime,
      birthPlace,
    });
  }, [persist, name, birthDate, birthTime, birthPlace]);

  return (
    <div
      className={`${styles.node} ${styles.natal} ${selected ? styles.selected : ''}`}
      style={{ minWidth: 200 }}
    >
      <Handle
        type="source"
        position={Position.Right}
        id="personProfile"
        className={styles.handle}
      />
      <div className={styles.header}>
        <span className={styles.title}>PERSON</span>
        <span className={styles.badge}>PROFILE</span>
      </div>
      <div className={styles.content}>
        <div className={styles.dataRow}>
          <span>Name</span>
          <input
            type="text"
            className={styles.dataInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            placeholder="Name"
            aria-label="Person name"
          />
        </div>
        <div className={styles.dataRow}>
          <span>Date</span>
          <input
            type="date"
            className={styles.dataInput}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            onBlur={handleBlur}
            aria-label="Birth date"
          />
        </div>
        <div className={styles.dataRow}>
          <span>Time</span>
          <input
            type="text"
            className={styles.dataInput}
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            onBlur={handleBlur}
            placeholder="HH:mm"
            aria-label="Birth time"
          />
        </div>
        <div className={styles.dataRow}>
          <span>Place</span>
          <input
            type="text"
            className={styles.dataInput}
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            onBlur={handleBlur}
            placeholder="City, Country"
            aria-label="Birth place"
          />
        </div>
        {summary && (
          <div className={styles.dataRow} style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <span>Chart</span>
            <span className={styles.dataValue} style={{ fontSize: 10 }}>{summary}</span>
          </div>
        )}
      </div>
    </div>
  );
});
