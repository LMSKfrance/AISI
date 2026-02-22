import { useStore } from '../store/useStore';
import styles from './Inspector.module.css';

export function Inspector() {
  const { analysis, selectedNodeId, nodes } = useStore();
  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;

  const a = analysis ?? {
    activeAspects: [],
    houseActivation: [],
    alignmentScore: 0,
    volatility: 'Low' as const,
    dominantFactors: [],
    summaryParagraphs: [],
  };

  return (
    <aside className={styles.inspector}>
      <div className={`${styles.panelSection} ${styles.highlight}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>
            <span
              className={styles.dnaCircleTag}
              style={{ background: 'var(--c-cobalt)', color: 'white', border: 'none' }}
            >
              01
            </span>
            Selection Analysis
          </span>
        </div>
        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Dominant</span>
            <span className={styles.statValue}>
              {a.dominantFactors[0] ?? 'Fire / Fixed'}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Vitality</span>
            <span className={styles.statValue}>
              {a.volatility === 'Low' ? 'High' : a.volatility === 'High' ? 'Variable' : 'Medium'}
            </span>
          </div>
        </div>
        <p className={styles.analysisText}>
          {selectedNode
            ? `Selected: ${selectedNode.type}. Run calculation to see analysis.`
            : a.summaryParagraphs[0] ??
              'Natal configuration suggests strong resistance to external pressure. Saturn transit currently testing structural integrity of House 10.'}
        </p>
      </div>

      <div className={styles.panelSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Active Aspects</span>
          <span className={styles.sortLabel}>Sort: Orb</span>
        </div>
        {a.activeAspects.length > 0 ? (
          a.activeAspects.map((item, i) => (
            <div key={i} className={styles.listItem}>
              <span className={styles.listItemBold}>{item.name}</span>
              <span className={styles.listItemMonoCobalt}>{item.orb}</span>
            </div>
          ))
        ) : (
          <>
            <div className={styles.listItem}>
              <span className={styles.listItemBold}>Sun Square Saturn</span>
              <span className={styles.listItemMonoCobalt}>0.2°</span>
            </div>
            <div className={styles.listItem}>
              <span>Venus Trine Mars</span>
              <span className={styles.listItemMono}>1.4°</span>
            </div>
            <div className={styles.listItem}>
              <span>Moon Opp Pluto</span>
              <span className={styles.listItemMono}>2.1°</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.panelSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>House Activation</span>
        </div>
        {(a.houseActivation.length > 0 ? a.houseActivation : [
          { houseNumber: 10, label: '10th House (Career)', score: 0.92 },
          { houseNumber: 7, label: '7th House (Rel)', score: 0.45 },
        ]).map((h) => (
          <div key={h.houseNumber} className={styles.statItem} style={{ marginBottom: 12 }}>
            <div className={styles.progressRow}>
              <span className={styles.statLabel}>{h.label}</span>
              <span className={styles.statLabel}>{Math.round(h.score * 100)}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${h.score * 100}%`,
                  background: h.houseNumber === 7 ? 'var(--c-zinc-medium)' : undefined,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.verticalLabel}>AISI ENGINE</div>
    </aside>
  );
}
