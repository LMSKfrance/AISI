/**
 * Final Results node: detailed, reactive to computed graph outputs.
 * Single input handle (finalInput). Tabs: Full / Option A / Option B.
 */
import { memo, useState, useMemo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { NodeInstance } from '../../types/graph';
import styles from './GraphNode.module.css';

type ResultMode = 'full' | 'optionA' | 'optionB';

type SynastrySummary = {
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
};

type Summary = {
  alignmentScore?: number;
  volatility?: 'Low' | 'Medium' | 'High';
  dominantAspect?: string;
  dominantHouse?: string;
  activeWindow?: string;
  supportLabel?: string;
  frictionLabel?: string;
  compareA?: { label: string; score: number };
  compareB?: { label: string; score: number };
  synastry?: SynastrySummary;
};

type DebugInfo = {
  connectedPersons: string[];
  lastComputed: string;
  inputCount: number;
  provider?: string | null;
  confidence?: string | null;
};

const DEBUG_ENABLED = true;

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.tabBtn} ${active ? styles.tabBtnActive : ''}`}
    >
      {children}
    </button>
  );
}

export const FinalResultsNode = memo(function FinalResultsNode({ data, selected }: NodeProps) {
  const node = data.node as NodeInstance;
  const output = node.computedOutput as { summary?: Summary; _debug?: DebugInfo } | undefined;
  const s = output?.summary ?? {};
  const debug = output?._debug;

  const [mode, setMode] = useState<ResultMode>('full');

  const modeContent = useMemo(() => {
    if (mode === 'optionA') return s.compareA;
    if (mode === 'optionB') return s.compareB;
    return null;
  }, [mode, s]);

  return (
    <div
      className={`${styles.node} ${styles.outcome} ${selected ? styles.selected : ''}`}
      style={{ minWidth: 260, maxWidth: 300 }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="finalInput"
        className={styles.handle}
      />
      <div className={styles.header}>
        <span className={styles.title}>FINAL RESULTS</span>
        <span className={styles.badge}>RESULT</span>
      </div>

      <div className={styles.tabRow}>
        <TabButton active={mode === 'full'} onClick={() => setMode('full')}>
          Full
        </TabButton>
        <TabButton active={mode === 'optionA'} onClick={() => setMode('optionA')}>
          Option A
        </TabButton>
        <TabButton active={mode === 'optionB'} onClick={() => setMode('optionB')}>
          Option B
        </TabButton>
      </div>

      {mode === 'full' ? (
        <div className={styles.content}>
          {s.synastry ? (
            <>
              <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                <span className={styles.badge} style={{ fontSize: 8, opacity: 0.9 }}>{s.synastry.provider}</span>
                <span className={styles.badge} style={{ fontSize: 8, opacity: 0.9 }}>{s.synastry.confidence}</span>
              </div>
              <div className={styles.metricBig}>
                <div className={styles.metricBigLabel}>Compatibility</div>
                <div className={styles.metricBigValue}>
                  {s.synastry.compatibilityScore}/100
                </div>
              </div>
              <div className={styles.dataRow}>
                <span>Comparison</span>
                <span className={styles.dataValue}>{s.synastry.personAName} ↔ {s.synastry.personBName}</span>
              </div>
              <div className={styles.dataRow}>
                <span>Support</span>
                <span className={styles.dataValue}>{s.synastry.supportCount} aspect{s.synastry.supportCount !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.dataRow}>
                <span>Challenge</span>
                <span className={styles.dataValue}>{s.synastry.challengeCount} aspect{s.synastry.challengeCount !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.supportFriction}>
                {s.synastry.summary}
              </div>
              {s.synastry.dominantThemes.length > 0 && (
                <div className={styles.dataRow}>
                  <span>Themes</span>
                  <span className={styles.dataValue}>{s.synastry.dominantThemes.join(', ')}</span>
                </div>
              )}
              {s.synastry.aspects.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className={styles.metricBigLabel}>Key aspects (by orb)</div>
                  {s.synastry.aspects.slice(0, 6).map((asp, i) => (
                    <div key={i} className={styles.dataRow}>
                      <span>
                        {asp.planetA} {asp.type} {asp.planetB}
                        {asp.approximate && <span style={{ marginLeft: 4, fontSize: 8, color: '#996600' }}>approx</span>}
                      </span>
                      <span className={styles.dataValue}>{asp.orb}° · {asp.interpretation}</span>
                    </div>
                  ))}
                </div>
              )}
              {s.synastry.warnings && s.synastry.warnings.length > 0 && (
                <div
                  className="aisi-warnings"
                  style={{
                    marginTop: 8,
                    padding: '4px 6px',
                    background: 'rgba(255,180,0,0.1)',
                    borderRadius: 4,
                    fontSize: 9,
                    color: '#996600',
                    lineHeight: 1.4,
                  }}
                >
                  {s.synastry.warnings.map((w, i) => (
                    <div key={i}>{w}</div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.metricBig}>
                <div className={styles.metricBigLabel}>Alignment</div>
                <div className={styles.metricBigValue}>
                  {typeof s.alignmentScore === 'number' ? `${s.alignmentScore}/100` : '—'}
                </div>
              </div>
              <div className={styles.dataRow}>
                <span>Volatility</span>
                <span className={styles.dataValue}>{s.volatility ?? '—'}</span>
              </div>
              <div className={styles.dataRow}>
                <span>Dominant Aspect</span>
                <span className={styles.dataValue}>{s.dominantAspect ?? '—'}</span>
              </div>
              <div className={styles.dataRow}>
                <span>Dominant House</span>
                <span className={styles.dataValue}>{s.dominantHouse ?? '—'}</span>
              </div>
              <div className={styles.dataRow}>
                <span>Window</span>
                <span className={styles.dataValue}>{s.activeWindow ?? '—'}</span>
              </div>
              <div className={styles.supportFriction}>
                <div>Support: {s.supportLabel ?? '—'}</div>
                <div>Friction: {s.frictionLabel ?? '—'}</div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.dataRow}>
            <span>Selection</span>
            <span className={styles.dataValue}>{modeContent?.label ?? '—'}</span>
          </div>
          <div className={styles.metricBig}>
            <div className={styles.metricBigLabel}>Score</div>
            <div className={styles.metricBigValue}>
              {typeof modeContent?.score === 'number' ? `${modeContent.score}/100` : '—'}
            </div>
          </div>
          <div className={styles.supportFriction}>
            Compare mode output from Decision Score node.
          </div>
        </div>
      )}

      {DEBUG_ENABLED && debug && (
        <div
          className="aisi-debug"
          style={{
            marginTop: 8,
            padding: '6px 8px',
            background: 'rgba(0,0,0,0.04)',
            borderRadius: 4,
            fontSize: 9,
            fontFamily: 'monospace',
            color: '#666',
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 2 }}>DEBUG</div>
          <div>Persons: {debug.connectedPersons.length ? debug.connectedPersons.join(', ') : '(none)'}</div>
          <div>Inputs: {debug.inputCount}</div>
          <div>Computed: {debug.lastComputed.replace('T', ' ').slice(0, 19)}</div>
          {debug.provider != null && <div>Provider: {debug.provider}</div>}
          {debug.confidence != null && <div>Confidence: {debug.confidence}</div>}
        </div>
      )}
    </div>
  );
});
