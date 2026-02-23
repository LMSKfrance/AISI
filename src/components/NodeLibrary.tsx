/**
 * Node library and templates for Nodes workspace (idea.md).
 */
import { useStore } from '../store/useStore';
import { NODE_TYPES } from '../graph/nodeRegistry';
import type { NodeTypeId } from '../types/graph';
import styles from './NodeLibrary.module.css';

type TemplateId = 'decisionCheck' | 'transitImpact' | 'careerTiming' | 'relationshipCheck' | 'compareTwoPeople';

/** Node group templates by logical category: decision, transit, relationship, comparison. */
const TEMPLATE_GROUPS: {
  category: string;
  description: string;
  templates: { id: TemplateId; label: string; description: string }[];
}[] = [
  {
    category: 'Decision & timing',
    description: 'Natal + transit + houses → decision score → results',
    templates: [
      { id: 'decisionCheck', label: 'Decision Check', description: 'Moon–Saturn aspect, house 10, time window → decision + final' },
      { id: 'careerTiming', label: 'Career Timing', description: 'Saturn/Mars transits, 10th house, aspect + domain → results' },
    ],
  },
  {
    category: 'Transit impact',
    description: 'Transit meets natal → aspect → results',
    templates: [
      { id: 'transitImpact', label: 'Transit Impact', description: 'Transit + natal planet → aspect → final results' },
    ],
  },
  {
    category: 'Relationship & comparison',
    description: 'Person(s) and optional analysis → final results',
    templates: [
      { id: 'relationshipCheck', label: 'Relationship Check', description: 'Person + natal/transit/aspect/decision → results' },
      { id: 'compareTwoPeople', label: 'Compare Two People', description: 'Two Person nodes → Final Results (synastry-ready)' },
    ],
  },
];

export function NodeLibrary() {
  const { nodes, addNode, applyTemplate } = useStore();

  const handleAddNode = (typeId: NodeTypeId) => {
    const x = 150 + (nodes.length % 3) * 220;
    const y = 120 + Math.floor(nodes.length / 3) * 120;
    addNode(typeId, { x, y });
  };

  const handleApplyTemplate = (templateId: TemplateId) => {
    applyTemplate(templateId);
  };

  const handleAddPerson = () => {
    handleAddNode('person');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Create & compare</h3>
        <div className={styles.nodeList}>
          <button
            type="button"
            className={styles.addPersonBtn}
            onClick={handleAddPerson}
            title="Add a person with birth data for chart and comparison"
          >
            + Add Person
          </button>
          <button
            type="button"
            className={styles.templateBtn}
            onClick={() => handleApplyTemplate('compareTwoPeople')}
            title="Two Person nodes + Final Results for synastry comparison"
          >
            Compare Two People
          </button>
        </div>
      </div>
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
        <h3 className={styles.sectionTitle}>Node group templates</h3>
        <p className={styles.templateIntro}>
          Pre-built groups of nodes and connections. One click adds the full subgraph.
        </p>
        {TEMPLATE_GROUPS.map((group) => (
          <div key={group.category} className={styles.templateGroup}>
            <h4 className={styles.templateGroupTitle}>{group.category}</h4>
            <p className={styles.templateGroupDesc}>{group.description}</p>
            <div className={styles.templateList}>
              {group.templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={styles.templateBtn}
                  onClick={() => handleApplyTemplate(t.id)}
                  title={t.description}
                >
                  <span className={styles.templateLabel}>{t.label}</span>
                  <span className={styles.templateDesc}>{t.description}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
