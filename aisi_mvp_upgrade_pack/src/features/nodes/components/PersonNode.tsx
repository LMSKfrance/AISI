import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

type PersonNodeData = {
  label?: string;
  name?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
};

export default function PersonNode({ data, selected }: NodeProps<PersonNodeData>) {
  return (
    <div
      className={`aisi-node aisi-node--person ${selected ? 'is-selected' : ''}`}
      style={{
        minWidth: 220,
        border: '1px solid var(--line)',
        background: 'var(--panel)',
        borderRadius: 8,
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
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>
          PERSON
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
          PROFILE
        </div>
      </div>

      <div style={{ padding: 10, display: 'grid', rowGap: 6, fontSize: 12 }}>
        <Row k="Name" v={data?.name || 'Person B'} />
        <Row k="Date" v={data?.birthDate || '—'} />
        <Row k="Time" v={data?.birthTime || '—'} />
        <Row k="Place" v={data?.birthPlace || '—'} />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="personProfile"
        style={{
          width: 8,
          height: 8,
          right: -4,
          border: '1px solid var(--line-strong)',
          background: 'var(--accent)',
        }}
      />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ color: 'var(--muted)' }}>{k}</span>
      <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{v}</span>
    </div>
  );
}
