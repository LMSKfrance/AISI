import { NavLink, useLocation } from 'react-router-dom';
import { NodeLibrary } from './NodeLibrary';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { num: '00', label: 'Dashboard', to: '/' },
  { num: '01', label: 'Chart', to: '/chart' },
  { num: '02', label: 'Calendar', to: '/calendar' },
  { num: '03', label: 'Decisions', to: '/decisions' },
  { num: '04', label: 'Compare', to: '/compare' },
  { num: '05', label: 'Nodes', to: '/nodes' },
  { num: '06', label: 'Reports', to: '/reports' },
  { num: '07', label: 'Learn', to: '/learn' },
];

export function Sidebar() {
  const location = useLocation();
  const isNodes = location.pathname === '/nodes';

  return (
    <nav className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandLogo}>
          <span className={styles.dnaCircleTag}>A</span>
          AISI
        </div>
      </div>
      <div className={styles.navList}>
        {NAV_ITEMS.map(({ num, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')
            }
          >
            <span className={styles.navNumber}>{num}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
      {isNodes && <NodeLibrary />}
      <div className={styles.verticalProjectLabel}>ZINC PROJECT SYSTEM v2.4</div>
    </nav>
  );
}
