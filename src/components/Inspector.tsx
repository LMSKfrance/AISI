import { useState } from 'react';
import { useStore } from '../store/useStore';
import styles from './Inspector.module.css';

function ExpandableSection({
  id,
  title,
  badge,
  defaultOpen,
  children,
}: {
  id: string;
  title: string;
  badge?: React.ReactNode;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.panelSection}>
      <button
        type="button"
        className={styles.sectionToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className={styles.sectionTitle}>
          {badge}
          {title}
        </span>
        <span className={styles.expandIcon} aria-hidden>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id={id} className={styles.sectionBody}>
          {children}
        </div>
      )}
    </div>
  );
}

export function Inspector() {
  const { analysis, selectedNodeIds, nodes, expandPersonWithTemplate, removeNodes } = useStore();
  const selectedNode =
    selectedNodeIds.length === 1 ? nodes.find((n) => n.id === selectedNodeIds[0]) ?? null : null;
  const primarySelectedId = selectedNodeIds[0] ?? null;
  const isPersonSelected = selectedNode?.type === 'person';
  const hasMultiSelection = selectedNodeIds.length > 1;

  const a = analysis ?? {
    activeAspects: [],
    houseActivation: [],
    alignmentScore: 0,
    volatility: 'Low' as const,
    dominantFactors: [],
    summaryParagraphs: [],
    synastry: undefined,
  };

  const synastry = a.synastry;
  const mainSummary = synastry?.summary ?? a.summaryParagraphs[0] ?? null;

  return (
    <aside className={styles.inspector} aria-label="Main results">
      {/* Right sidebar: Main results — primary output */}
      <ExpandableSection
        id="main-results"
        title="Main results"
        badge={
          <span
            className={styles.dnaCircleTag}
            style={{ background: 'var(--c-cobalt)', color: 'white', border: 'none' }}
          >
            00
          </span>
        }
        defaultOpen={true}
      >
        <div className={`${styles.panelSection} ${styles.highlight}`} style={{ paddingTop: 0 }}>
          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>
                {synastry ? 'Compatibility' : 'Alignment'}
              </span>
              <span className={styles.statValue}>
                {synastry ? `${synastry.compatibilityScore}/100` : `${a.alignmentScore}/100`}
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
            {hasMultiSelection
              ? `${selectedNodeIds.length} nodes selected. Delete or deselect to edit one.`
              : selectedNode
                ? `Selected: ${selectedNode.type}. Run calculation to see analysis.`
                : mainSummary ??
                  'Natal configuration suggests strong resistance to external pressure. Saturn transit currently testing structural integrity of House 10.'}
          </p>
          {hasMultiSelection && (
            <button
              type="button"
              className={styles.expandBtn}
              style={{ marginTop: 8 }}
              onClick={() => removeNodes(selectedNodeIds)}
            >
              Delete selected ({selectedNodeIds.length})
            </button>
          )}
          {synastry && (
            <p className={styles.analysisText} style={{ marginTop: 8 }}>
              <strong>{synastry.personAName}</strong> ↔ <strong>{synastry.personBName}</strong>
              {synastry.dominantThemes.length > 0 && (
                <> — {synastry.dominantThemes.join(', ')}</>
              )}
            </p>
          )}
        </div>
      </ExpandableSection>

      {isPersonSelected && primarySelectedId && !hasMultiSelection && (
        <ExpandableSection
          id="person-expand"
          title="Expand / calculate more"
          defaultOpen={true}
        >
          <p className={styles.analysisText} style={{ marginBottom: 12 }}>
            Add nodes and connect this person to run more analysis.
          </p>
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.expandBtn}
              onClick={() => expandPersonWithTemplate(primarySelectedId, 'toFinal')}
            >
              Connect to Final Results
            </button>
            <button
              type="button"
              className={styles.expandBtn}
              onClick={() => expandPersonWithTemplate(primarySelectedId, 'synastry')}
            >
              Synastry (add Person B + Results)
            </button>
            <button
              type="button"
              className={styles.expandBtn}
              onClick={() => expandPersonWithTemplate(primarySelectedId, 'transit')}
            >
              Transit analysis (Natal + Aspect + Results)
            </button>
          </div>
        </ExpandableSection>
      )}

      <ExpandableSection
        id="selection-analysis"
        title="Selection Analysis"
        badge={
          <span className={styles.dnaCircleTag} style={{ background: 'var(--c-cobalt)', color: 'white', border: 'none' }}>
            01
          </span>
        }
        defaultOpen={true}
      >
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
          {hasMultiSelection
            ? `${selectedNodeIds.length} nodes selected`
            : selectedNode
              ? `Selected: ${selectedNode.type}. Run calculation to see analysis.`
              : a.summaryParagraphs[0] ??
                'Natal configuration suggests strong resistance to external pressure. Saturn transit currently testing structural integrity of House 10.'}
        </p>
      </ExpandableSection>

      <ExpandableSection
        id="active-aspects"
        title="Active Aspects"
        defaultOpen={true}
      >
        <>
          <div className={styles.sectionHeader}>
            <span className={styles.sortLabel}>Sort: Orb</span>
          </div>
          {(synastry?.aspects?.length ? synastry.aspects : a.activeAspects).length > 0 ? (
            (synastry?.aspects ?? a.activeAspects).map((item: { planetA?: string; planetB?: string; type?: string; name?: string; orb?: number | string }, i: number) => (
              <div key={i} className={styles.listItem}>
                <span className={styles.listItemBold}>
                  {item.planetA && item.planetB && item.type
                    ? `${item.planetA} ${item.type} ${item.planetB}`
                    : (item as { name?: string }).name ?? '—'}
                </span>
                <span className={styles.listItemMonoCobalt}>
                  {typeof item.orb === 'number' ? `${item.orb}°` : item.orb ?? '—'}
                </span>
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
        </>
      </ExpandableSection>

      <ExpandableSection
        id="house-activation"
        title="House Activation"
        defaultOpen={false}
      >
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
      </ExpandableSection>

      <div className={styles.verticalLabel}>AISI ENGINE</div>
    </aside>
  );
}
