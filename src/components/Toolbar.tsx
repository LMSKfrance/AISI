import { useStore } from '../store/useStore';
import styles from './Toolbar.module.css';

type ToolbarProps = {
  dnaNumber: string;
  title: string;
};

export function Toolbar({ dnaNumber, title }: ToolbarProps) {
  const { runCalculation } = useStore();
  return (
    <header className={styles.toolbar}>
      <div className={styles.workspaceTitle}>
        <span className={styles.dnaNumber}>{dnaNumber}</span>
        <span className={styles.dnaUppercase}>{title}</span>
      </div>
      <div className={styles.toolControls}>
        <button type="button" className={styles.btn}>
          Auto Layout
        </button>
        <button type="button" className={styles.btn}>
          Add Node +
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.primary}`}
          onClick={() => runCalculation()}
        >
          Run Calculation
        </button>
      </div>
    </header>
  );
}
