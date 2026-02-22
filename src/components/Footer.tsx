import { useStore } from '../store/useStore';
import styles from './Footer.module.css';

export function Footer() {
  const { analysis } = useStore();
  const summary = analysis?.summaryParagraphs?.[0];
  return (
    <footer className={styles.footer}>
      <div className={styles.footerItem}>
        <span>Status:</span>
        <span className={styles.footerValue}>Calculated</span>
      </div>
      <div className={styles.footerItem}>
        <span>Ephemeris:</span>
        <span className={styles.footerValue}>Swiss 2.0</span>
      </div>
      {summary && (
        <div className={styles.footerSummary}>{summary}</div>
      )}
      <div className={`${styles.footerItem} ${styles.footerItemEnd}`}>
        <span>UTC:</span>
        <span className={styles.footerValue}>14:22:01</span>
      </div>
    </footer>
  );
}
