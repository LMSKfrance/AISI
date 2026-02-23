/**
 * Context menu on node right-click: Add node (related + search) and, for Person nodes, expand templates.
 */
import { useRef, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../store/useStore';
import { NODE_TYPES, getRelatedNodeTypes, searchNodeTypes } from '../graph/nodeRegistry';
import type { NodeInstance } from '../types/graph';
import type { NodeTypeId } from '../types/graph';
import styles from './NodeContextMenu.module.css';

const PERSON_EXPAND_OPTIONS: { key: 'synastry' | 'transit' | 'toFinal'; label: string }[] = [
  { key: 'synastry', label: 'Synastry comparison (add Person B + Final Results)' },
  { key: 'transit', label: 'Transit analysis (Natal + Transit + Aspect + Results)' },
  { key: 'toFinal', label: 'Connect to Final Results' },
];

export interface NodeContextMenuProps {
  node: NodeInstance;
  position: { x: number; y: number };
  onClose: () => void;
}

export function NodeContextMenu({ node, position, onClose }: NodeContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const { addNodeNear, expandPersonWithTemplate } = useStore();

  const related = useMemo(() => getRelatedNodeTypes(node.type as NodeTypeId), [node.type]);
  const searchResults = useMemo(
    () => (search.trim() ? searchNodeTypes(search) : NODE_TYPES),
    [search],
  );
  const isPerson = node.type === 'person';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleAddNode = (typeId: NodeTypeId, connect = true) => {
    addNodeNear(node.id, typeId, { connect });
    onClose();
  };

  const handleExpandPerson = (templateKey: 'synastry' | 'transit' | 'toFinal') => {
    expandPersonWithTemplate(node.id, templateKey);
    onClose();
  };

  return createPortal(
    <div
      ref={menuRef}
      className={styles.menu}
      style={{ left: position.x, top: position.y }}
      role="menu"
    >
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Add node</div>
        {related.length > 0 && (
          <div className={styles.related}>
            {related.slice(0, 3).map((t) => (
              <button
                key={t.id}
                type="button"
                className={styles.item}
                onClick={() => handleAddNode(t.id as NodeTypeId, true)}
                role="menuitem"
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
        <div className={styles.searchWrap}>
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search node type…"
            autoFocus
            aria-label="Search nodes"
          />
        </div>
        <div className={styles.searchResults}>
          {searchResults.slice(0, 8).map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.item}
              onClick={() => handleAddNode(t.id as NodeTypeId, true)}
              role="menuitem"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {isPerson && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Expand / calculate more</div>
          {PERSON_EXPAND_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={styles.item}
              onClick={() => handleExpandPerson(opt.key)}
              role="menuitem"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
