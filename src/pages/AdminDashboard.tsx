import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth/adminAuth';
import './admin-design.css';

export function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  const handleClearCache = () => {
    if (typeof caches !== 'undefined' && caches.keys) {
      caches.keys().then((names) => names.forEach((name) => caches.delete(name)));
    }
    localStorage.removeItem('aisi_birth_data');
    alert('Cache cleared.');
  };

  const handleExportConfig = () => {
    const config = {
      app: 'AISI',
      version: '0.0.1',
      exportedAt: new Date().toISOString(),
      env: typeof import.meta !== 'undefined' ? (import.meta as { env?: Record<string, string> }).env?.MODE : 'development',
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aisi-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefreshData = () => {
    window.location.reload();
  };

  return (
    <div className="aisi-layout-app">
      <nav className="aisi-layout-sidebar">
        <div className="aisi-layout-brand">
          <div className="aisi-layout-brand-logo">
            <span className="aisi-badge-circle">A</span>
            <span>Admin</span>
          </div>
          <div className="aisi-layout-version">v0.0.1</div>
        </div>

        <div className="aisi-layout-nav">
          <Link to="/admin" className="aisi-nav-item active">
            <span className="aisi-nav-item__number">01</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/design-system" className="aisi-nav-item">
            <span className="aisi-nav-item__number">02</span>
            <span>Design system</span>
          </Link>
          <Link to="/" className="aisi-nav-item">
            <span className="aisi-nav-item__number">03</span>
            <span>Back to app</span>
          </Link>
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--aisi-color-border)', padding: 'var(--aisi-space-xl)' }}>
          <button type="button" className="aisi-btn" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      <main className="aisi-layout-content">
        <header className="aisi-layout-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="aisi-layout-header-title">
            <span className="aisi-display-number">01</span>
            <div className="aisi-layout-header-text">
              <h1>Admin Dashboard</h1>
              <p className="aisi-label-uppercase">Design system &amp; quick operations</p>
            </div>
          </div>
          <button type="button" className="aisi-btn" onClick={handleRefreshData}>
            Refresh
          </button>
        </header>

        <div className="aisi-layout-sections">
          {/* 01 Design system */}
          <section className="aisi-layout-section" id="design-system">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
              <h2 className="aisi-layout-section-title">Design system</h2>
              <p className="aisi-layout-section-subtitle">Tokens used across the app</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Color palette</h3>
              <div className="aisi-showcase-color-grid">
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ background: 'var(--aisi-color-bg)' }} />
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Background</span>
                    <span className="aisi-showcase-color-token">--c-bg</span>
                    <span className="aisi-showcase-color-value">#FDFCF9</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-fg" />
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Foreground</span>
                    <span className="aisi-showcase-color-token">--c-fg</span>
                    <span className="aisi-showcase-color-value">#2A363B</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-primary" />
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Cobalt (primary)</span>
                    <span className="aisi-showcase-color-token">--c-cobalt</span>
                    <span className="aisi-showcase-color-value">#1F5673</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-accent" />
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Blush (accent)</span>
                    <span className="aisi-showcase-color-token">--c-blush</span>
                    <span className="aisi-showcase-color-value">#D98E73</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ background: 'var(--aisi-color-surface)' }} />
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Surface</span>
                    <span className="aisi-showcase-color-token">--c-node-bg</span>
                    <span className="aisi-showcase-color-value">#F2F6F7</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Button variants</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-button-row">
                  <div className="aisi-showcase-button-example">
                    <button type="button" className="aisi-btn aisi-btn--primary">
                      Primary Button
                    </button>
                    <code className="aisi-showcase-code">.aisi-btn.aisi-btn--primary</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <button type="button" className="aisi-btn">
                      Default Button
                    </button>
                    <code className="aisi-showcase-code">.aisi-btn</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 02 Overview */}
          <section className="aisi-layout-section" id="overview">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">02</span>
              <h2 className="aisi-layout-section-title">Overview</h2>
              <p className="aisi-layout-section-subtitle">App summary</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Stats</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-stat-grid">
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Routes</span>
                    <span className="aisi-stat-value aisi-stat-value--primary">8</span>
                  </div>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Version</span>
                    <span className="aisi-stat-value">0.0.1</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 Admin actions */}
          <section className="aisi-layout-section" id="admin-actions">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">03</span>
              <h2 className="aisi-layout-section-title">Admin actions</h2>
              <p className="aisi-layout-section-subtitle">Quick operations</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--aisi-space-xl)' }}>
                <div className="aisi-panel-section">
                  <div className="aisi-panel-section__header">
                    <span className="aisi-heading-section">
                      <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
                      Clear cache
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--aisi-size-base)', color: 'var(--aisi-color-neutral-300)', marginBottom: 'var(--aisi-space-md)' }}>
                    Clear browser cache and local storage (e.g. birth data).
                  </p>
                  <button type="button" className="aisi-btn aisi-btn--primary" onClick={handleClearCache}>
                    Clear cache
                  </button>
                </div>
                <div className="aisi-panel-section">
                  <div className="aisi-panel-section__header">
                    <span className="aisi-heading-section">
                      <span className="aisi-badge-circle aisi-badge-circle--primary">02</span>
                      Export config
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--aisi-size-base)', color: 'var(--aisi-color-neutral-300)', marginBottom: 'var(--aisi-space-md)' }}>
                    Download current app config as JSON.
                  </p>
                  <button type="button" className="aisi-btn aisi-btn--primary" onClick={handleExportConfig}>
                    Export config
                  </button>
                </div>
                <div className="aisi-panel-section">
                  <div className="aisi-panel-section__header">
                    <span className="aisi-heading-section">
                      <span className="aisi-badge-circle aisi-badge-circle--primary">03</span>
                      Refresh app
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--aisi-size-base)', color: 'var(--aisi-color-neutral-300)', marginBottom: 'var(--aisi-space-md)' }}>
                    Reload the page to pick up latest state.
                  </p>
                  <button type="button" className="aisi-btn" onClick={handleRefreshData}>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="aisi-layout-footer">
          <div className="aisi-layout-footer-item">
            <span>Version:</span>
            <span className="aisi-layout-footer-value">0.0.1</span>
          </div>
          <div className="aisi-layout-footer-item">
            <span>System:</span>
            <span className="aisi-layout-footer-value">AISI ADMIN</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
