/**
 * Node library and templates for Nodes workspace (idea.md).
 */
import { useStore } from '../store/useStore';
import { NODE_TYPES } from '../graph/nodeRegistry';
import type { NodeTypeId } from '../types/graph';
import styles from './NodeLibrary.module.css';

const TEMPLATES: { id: 'decisionCheck' | 'transitImpact' | 'careerTiming'; label: string }[] = [
  { id: 'decisionCheck', label: 'Decision Check' },
  { id: 'transitImpact', label: 'Transit Impact' },
  { id: 'careerTiming', label: 'Career Timing' },
];

export function NodeLibrary() {
  const { nodes, addNode, applyTemplate } = useStore();

  const handleAddNode = (typeId: NodeTypeId) => {
    const x = 150 + (nodes.length % 3) * 220;
    const y = 120 + Math.floor(nodes.length / 3) * 120;
    addNode(typeId, { x, y });
  };

  const handleApplyTemplate = (templateId: 'decisionCheck' | 'transitImpact' | 'careerTiming') => {
    applyTemplate(templateId);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Add node</h3>
        <div className={styles.nodeList}>
          {NODE_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.nodeBtn}
              onClick={() => handleAddNode(t.id)}
              title={t.label}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Templates</h3>
        <div className={styles.templateList}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.templateBtn}
              onClick={() => handleApplyTemplate(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
