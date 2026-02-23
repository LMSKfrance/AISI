import React, { useMemo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

type ResultMode = 'full' | 'a' | 'b';

type FinalResultsData = {
  mode?: ResultMode;
  summary?: {
    alignmentScore?: number;
    volatility?: 'Low' | 'Medium' | 'High';
    dominantAspect?: string;
    dominantHouse?: string;
    activeWindow?: string;
    supportLabel?: string;
    frictionLabel?: string;
    compareA?: { label: string; score: number };
    compareB?: { label: string; score: number };
  };
};

export default function FinalResultsNode({ data, selected }: NodeProps<FinalResultsData>) {
  const [mode, setMode] = useState<ResultMode>(data?.mode ?? 'full');
  const s = data?.summary ?? {};

  const modeContent = useMemo(() => {
    if (mode === 'a') return s.compareA;
    if (mode === 'b') return s.compareB;
    return null;
  }, [mode, s]);

  return (
    <div
      className={`aisi-node aisi-node--results ${selected ? 'is-selected' : ''}`}
      style={{
        minWidth: 280,
        border: '1px solid var(--line)',
        background: 'var(--panel)',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 10px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--panel-soft)',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>
          FINAL RESULTS
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.08em',
            color: 'var(--muted)',
            border: '1px solid var(--line)',
            padding: '2px 6px',
            borderRadius: 999,
          }}
        >
          RESULT
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, padding: 8, borderBottom: '1px solid var(--line)' }}>
        <TabButton active={mode === 'full'} onClick={() => setMode('full')}>Full</TabButton>
        <TabButton active={mode === 'a'} onClick={() => setMode('a')}>Option A</TabButton>
        <TabButton active={mode === 'b'} onClick={() => setMode('b')}>Option B</TabButton>
      </div>

      {mode === 'full' ? (
        <div style={{ padding: 10, display: 'grid', rowGap: 8 }}>
          <MetricBig label="Alignment" value={typeof s.alignmentScore === 'number' ? `${s.alignmentScore}/100` : '—'} />
          <MetricRow label="Volatility" value={s.volatility || '—'} />
          <MetricRow label="Dominant Aspect" value={s.dominantAspect || '—'} />
          <MetricRow label="Dominant House" value={s.dominantHouse || '—'} />
          <MetricRow label="Window" value={s.activeWindow || '—'} />
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 8, color: 'var(--muted)', fontSize: 11 }}>
            <div>Support: {s.supportLabel || '—'}</div>
            <div>Friction: {s.frictionLabel || '—'}</div>
          </div>
        </div>
      ) : (
        <div style={{ padding: 10, display: 'grid', rowGap: 6 }}>
          <MetricRow label="Selection" value={modeContent?.label || '—'} />
          <MetricBig label="Score" value={typeof modeContent?.score === 'number' ? `${modeContent.score}/100` : '—'} />
          <div style={{ color: 'var(--muted)', fontSize: 11 }}>
            Compare mode output from Decision Score node.
          </div>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        id="finalInput"
        style={{
          width: 8,
          height: 8,
          left: -4,
          border: '1px solid var(--line-strong)',
          background: 'var(--bg)',
        }}
      />
    </div>
  );
}

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
      onClick={onClick}
      style={{
        border: '1px solid var(--line)',
        background: active ? 'var(--panel-soft)' : 'transparent',
        color: active ? 'var(--text)' : 'var(--muted)',
        borderRadius: 6,
        padding: '4px 8px',
        fontSize: 11,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function MetricBig({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12 }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
