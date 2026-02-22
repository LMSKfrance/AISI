import styles from './Node.module.css';

export type NodeVariant = 'natal' | 'dynamic' | 'default';

export type DataRow = { label: string; value: string; valueClass?: 'cobalt' | 'blush' };

export type NodeProps = {
  index: string;
  title: string;
  badge: string;
  variant: NodeVariant;
  selected?: boolean;
  data: DataRow[];
  position: { top: number; left: number };
  /** Optional accent: 'blush' | 'zinc' for left border + index color */
  accent?: 'blush' | 'zinc';
  /** Optional inline stat grid (e.g. Align / Friction) */
  statGrid?: { label: string; value: string; valueClass?: 'cobalt' }[];
  className?: string;
};

export function Node({
  index,
  title,
  badge,
  variant,
  selected = false,
  data,
  position,
  accent,
  statGrid,
  className = '',
}: NodeProps) {
  const indexStyle =
    accent === 'blush'
      ? { background: 'var(--c-blush)' }
      : accent === 'zinc'
        ? { background: 'var(--c-zinc-dark)' }
        : undefined;
  const titleStyle =
    accent === 'blush'
      ? { color: 'var(--c-blush)' }
      : accent === 'zinc'
        ? { color: 'var(--c-zinc-dark)' }
        : undefined;
  const badgeStyle =
    variant === 'natal' && accent === 'blush'
      ? { background: '#FDE8E4', color: 'var(--c-blush)' }
      : undefined;
  const borderStyle =
    accent === 'blush'
      ? { borderLeft: '3px solid var(--c-blush)' }
      : accent === 'zinc'
        ? { borderLeft: '3px solid var(--c-zinc-medium)' }
        : undefined;

  return (
    <div
      className={`${styles.node} ${styles[variant]} ${selected ? styles.selected : ''} ${className}`}
      style={{ top: position.top, left: position.left, ...borderStyle }}
    >
      <span className={styles.nodeIndex} style={indexStyle}>
        {index}
      </span>
      <div className={styles.nodeHeader}>
        <span className={styles.nodeTitle} style={titleStyle}>
          {title}
        </span>
        <span className={styles.nodeTypeBadge} style={badgeStyle}>
          {badge}
        </span>
      </div>
      <div className={styles.nodeContent}>
        {statGrid != null && statGrid.length > 0 && (
          <div className={styles.statGrid} style={{ marginBottom: 8 }}>
            {statGrid.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statLabel}>{s.label}</span>
                <span
                  className={styles.statValue}
                  style={s.valueClass === 'cobalt' ? { color: 'var(--c-cobalt)' } : undefined}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        )}
        {data.length > 0 && (
          <div
            className={statGrid != null && statGrid.length > 0 ? styles.dataSectionWithStat : ''}
          >
            {data.map((row) => (
              <div key={row.label} className={styles.dataRow}>
                <span>{row.label}</span>
                <span
                  className={styles.dataValue}
                  style={
                    row.valueClass === 'cobalt'
                      ? { color: 'var(--c-cobalt)' }
                      : row.valueClass === 'blush'
                        ? { color: 'var(--c-blush)' }
                        : undefined
                  }
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
