import { Node } from './Node';
import styles from './CanvasArea.module.css';

const SPOKE_ANGLES = [0, 30, 60, 90, 120, 150];

export function CanvasArea() {
  return (
    <main className={styles.canvasArea}>
      <div className={styles.bgNatalWheel}>
        {SPOKE_ANGLES.map((deg) => (
          <div
            key={deg}
            className={styles.bgSpoke}
            style={{ transform: `rotate(${deg}deg)` }}
          />
        ))}
        <div className={styles.bgNatalInner} />
      </div>

      <div className={styles.nodeGraph}>
        <svg className={styles.connectionLines} viewBox="0 0 1000 600" preserveAspectRatio="none">
          <path
            d="M 380 250 C 450 250, 450 350, 520 350"
            className={`${styles.connector} ${styles.active}`}
          />
          <path d="M 380 250 C 450 250, 450 150, 520 150" className={styles.connector} />
          <path d="M 760 350 C 800 350, 800 250, 840 250" className={styles.connector} />
          <path
            d="M 380 250 C 440 250, 440 530, 520 530"
            className={styles.connector}
            style={{ stroke: 'var(--c-blush)', strokeDasharray: '4,3' }}
          />
          <path
            d="M 760 530 C 800 530, 800 450, 840 430"
            className={styles.connector}
            style={{ stroke: 'var(--c-blush)', strokeDasharray: '4,3' }}
          />
          <path d="M 760 150 C 800 150, 800 230, 840 250" className={styles.connector} />
        </svg>

        <Node
          index="01"
          title="Natal Profile"
          badge="SOURCE"
          variant="natal"
          selected
          position={{ top: 200, left: 140 }}
          data={[
            { label: 'Subject', value: 'J. Doe' },
            { label: 'Sun', value: '24° Leo' },
            { label: 'Moon', value: '12° Tau' },
            { label: 'Asc', value: '04° Sco' },
          ]}
        />

        <Node
          index="02"
          title="Current Transit"
          badge="TIME"
          variant="dynamic"
          position={{ top: 300, left: 520 }}
          data={[
            { label: 'Date', value: 'Oct 24, 2023' },
            { label: 'Active', value: 'Saturn Square', valueClass: 'cobalt' },
            { label: 'Orb', value: "0° 12'" },
          ]}
        />

        <Node
          index="03"
          title="Career Move"
          badge="DECISION"
          variant="default"
          position={{ top: 100, left: 520 }}
          data={[
            { label: 'Context', value: 'Expansion' },
            { label: 'Risk', value: 'High Volatility', valueClass: 'blush' },
          ]}
        />

        <Node
          index="04"
          title="Synthesis"
          badge="RESULT"
          variant="default"
          position={{ top: 200, left: 840 }}
          statGrid={[
            { label: 'Align', value: '84%', valueClass: 'cobalt' },
            { label: 'Friction', value: 'Low' },
          ]}
          data={[{ label: 'Compat.', value: '76%', valueClass: 'cobalt' }]}
        />

        <Node
          index="05"
          title="Person B — Profile"
          badge="NATAL"
          variant="natal"
          accent="blush"
          position={{ top: 470, left: 520 }}
          data={[
            { label: 'Subject', value: 'A. Smith' },
            { label: 'Sun', value: '08° Aqu' },
            { label: 'Moon', value: '29° Sco' },
            { label: 'Asc', value: '17° Gem' },
          ]}
        />

        <Node
          index="06"
          title="Synastry Aspects"
          badge="RELATIONSHIP"
          variant="default"
          accent="zinc"
          position={{ top: 400, left: 760 }}
          data={[
            { label: 'Compat.', value: '76%', valueClass: 'cobalt' },
            { label: 'Sun–Moon', value: 'Trine 2.1°' },
            { label: 'Venus–Mars', value: 'Square 0.8°', valueClass: 'blush' },
          ]}
        />
      </div>

      <div className={styles.canvasControls}>
        <button type="button" className={styles.iconBtn} aria-label="Zoom in">
          +
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Zoom out">
          -
        </button>
        <button type="button" className={styles.iconBtn}>
          Fit
        </button>
      </div>
    </main>
  );
}
