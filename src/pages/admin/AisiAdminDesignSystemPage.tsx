/**
 * AISI Admin Design System — visual reference page.
 * Do not use legacy `dna-*` classes or `--c-*` tokens in this file.
 * Use ONLY: --aisi-* CSS variables and .aisi-* component classes.
 * See design/AISI_DESIGN_SYSTEM.md and design/FIGMA_TOKEN_MAP.md.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../auth/adminAuth';
import './aisi-admin-design-system.css';

function useComputedToken(varName: string): string {
  const [value, setValue] = useState('');
  useEffect(() => {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    setValue(v || '—');
  }, [varName]);
  return value;
}

function TokenSwatch({ varName, label }: { varName: string; label: string }) {
  const value = useComputedToken(varName);
  const isColor = varName.includes('color');
  return (
    <div className="aisi-showcase-color-card">
      {isColor ? (
        <div
          className="aisi-showcase-color-swatch"
          style={{ background: `var(${varName})` }}
        />
      ) : (
        <div
          className="aisi-showcase-color-swatch"
          style={{
            background: 'var(--aisi-color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--aisi-size-base)',
            fontFamily: 'var(--aisi-font-mono)',
            color: 'var(--aisi-color-neutral-300)',
          }}
        >
          {value}
        </div>
      )}
      <div className="aisi-showcase-color-info">
        <span className="aisi-showcase-color-name">{label}</span>
        <span className="aisi-showcase-color-token">{varName}</span>
        {isColor && <span className="aisi-showcase-color-value">{value}</span>}
      </div>
    </div>
  );
}

export function AisiAdminDesignSystemPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'tokens' | 'components'>('tokens');

  const handleCopyTokens = () => {
    const vars = [
      '--aisi-color-bg',
      '--aisi-color-fg',
      '--aisi-color-brand-primary',
      '--aisi-color-brand-secondary',
      '--aisi-space-xs',
      '--aisi-space-xl',
    ];
    const text = vars
      .map((v) => `${v}: ${getComputedStyle(document.documentElement).getPropertyValue(v).trim()}`)
      .join('\n');
    navigator.clipboard.writeText(text).then(() => alert('Token snippet copied.'));
  };

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="aisi-admin-ds aisi-layout-app">
      <nav className="aisi-layout-sidebar">
        <div className="aisi-layout-brand">
          <div className="aisi-layout-brand-logo">
            <span className="aisi-badge-circle aisi-badge-circle--primary">A</span>
            <span>Admin</span>
          </div>
          <div className="aisi-layout-version">v2.4</div>
        </div>

        <div className="aisi-layout-nav">
          <Link to="/admin" className="aisi-nav-item">
            <span className="aisi-nav-item__number">01</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/design-system" className="aisi-nav-item active">
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
        {/* A. Header / toolbar */}
        <header
          className="aisi-layout-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--aisi-space-lg)' }}
        >
          <div className="aisi-layout-header-title">
            <span className="aisi-display-number">02</span>
            <div className="aisi-layout-header-text">
              <h1>AISI Admin Design System</h1>
              <p className="aisi-label-uppercase">Token and component reference — aisi-* only</p>
            </div>
          </div>
          <div className="aisi-tool-controls" style={{ flexShrink: 0 }}>
            <button
              type="button"
              className={`aisi-btn ${viewMode === 'tokens' ? 'aisi-btn--primary' : ''}`}
              onClick={() => setViewMode('tokens')}
            >
              Tokens
            </button>
            <button
              type="button"
              className={`aisi-btn ${viewMode === 'components' ? 'aisi-btn--primary' : ''}`}
              onClick={() => setViewMode('components')}
            >
              Components
            </button>
            <button type="button" className="aisi-btn" onClick={handleCopyTokens}>
              Copy tokens
            </button>
            <button type="button" className="aisi-btn" onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        </header>

        <div className="aisi-layout-sections">
          {/* B. Token preview grid */}
          <section className="aisi-layout-section" id="tokens">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
              <h2 className="aisi-layout-section-title">Token preview</h2>
              <p className="aisi-layout-section-subtitle">Live values from --aisi-* variables</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Color</h3>
              <div className="aisi-showcase-color-grid">
                <TokenSwatch varName="--aisi-color-bg" label="Background" />
                <TokenSwatch varName="--aisi-color-fg" label="Foreground" />
                <TokenSwatch varName="--aisi-color-border" label="Border" />
                <TokenSwatch varName="--aisi-color-active" label="Active" />
                <TokenSwatch varName="--aisi-color-brand-primary" label="Brand primary" />
                <TokenSwatch varName="--aisi-color-brand-secondary" label="Brand secondary" />
                <TokenSwatch varName="--aisi-color-neutral-100" label="Neutral 100" />
                <TokenSwatch varName="--aisi-color-neutral-200" label="Neutral 200" />
                <TokenSwatch varName="--aisi-color-neutral-300" label="Neutral 300" />
                <TokenSwatch varName="--aisi-color-highlight" label="Highlight" />
                <TokenSwatch varName="--aisi-color-surface" label="Surface" />
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Typography (size / family)</h3>
              <div className="aisi-showcase-color-grid">
                <TokenSwatch varName="--aisi-size-display" label="Display" />
                <TokenSwatch varName="--aisi-size-stat" label="Stat" />
                <TokenSwatch varName="--aisi-size-body" label="Body" />
                <TokenSwatch varName="--aisi-size-base" label="Base" />
                <TokenSwatch varName="--aisi-size-mini" label="Mini" />
                <TokenSwatch varName="--aisi-size-micro" label="Micro" />
              </div>
              <div style={{ marginTop: 'var(--aisi-space-xl)', display: 'flex', gap: 'var(--aisi-space-xl)', flexWrap: 'wrap' }}>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ height: 48, fontFamily: 'var(--aisi-font-sans)', fontSize: 'var(--aisi-size-body)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Aa
                  </div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Sans</span>
                    <span className="aisi-showcase-color-token">--aisi-font-sans</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ height: 48, fontFamily: 'var(--aisi-font-mono)', fontSize: 'var(--aisi-size-body)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Aa
                  </div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Mono</span>
                    <span className="aisi-showcase-color-token">--aisi-font-mono</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Spacing</h3>
              <div className="aisi-showcase-color-grid">
                <TokenSwatch varName="--aisi-space-xs" label="xs" />
                <TokenSwatch varName="--aisi-space-sm" label="sm" />
                <TokenSwatch varName="--aisi-space-md" label="md" />
                <TokenSwatch varName="--aisi-space-lg" label="lg" />
                <TokenSwatch varName="--aisi-space-xl" label="xl" />
                <TokenSwatch varName="--aisi-space-2xl" label="2xl" />
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Radius</h3>
              <div className="aisi-showcase-color-grid">
                <TokenSwatch varName="--aisi-radius-sm" label="sm" />
                <TokenSwatch varName="--aisi-radius-md" label="md" />
                <TokenSwatch varName="--aisi-radius-pill" label="pill" />
              </div>
            </div>
          </section>

          {/* C. Core components showcase */}
          <section className="aisi-layout-section" id="components">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">02</span>
              <h2 className="aisi-layout-section-title">Core components</h2>
              <p className="aisi-layout-section-subtitle">.aisi-* only</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Buttons</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-button-row">
                  <div className="aisi-showcase-button-example">
                    <button type="button" className="aisi-btn aisi-btn--primary">Primary</button>
                    <code className="aisi-showcase-code">.aisi-btn.aisi-btn--primary</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <button type="button" className="aisi-btn">Default</button>
                    <code className="aisi-showcase-code">.aisi-btn</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <button type="button" className="aisi-btn" disabled>Disabled</button>
                    <code className="aisi-showcase-code">.aisi-btn:disabled</code>
                  </div>
                </div>
                <div className="aisi-showcase-icon-button-row" style={{ marginTop: 'var(--aisi-space-lg)' }}>
                  <button type="button" className="aisi-btn-icon">+</button>
                  <button type="button" className="aisi-btn-icon">−</button>
                  <button type="button" className="aisi-btn-icon">×</button>
                  <button type="button" className="aisi-btn-icon">Fit</button>
                </div>
                <code className="aisi-showcase-code" style={{ marginTop: 'var(--aisi-space-sm)' }}>.aisi-btn-icon</code>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Badges &amp; tags</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-badge-row">
                  <span className="aisi-badge-circle">A</span>
                  <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
                  <span className="aisi-badge-circle aisi-badge-circle--accent">02</span>
                  <span className="aisi-badge-type">SOURCE</span>
                  <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-highlight)', color: 'var(--aisi-color-brand-primary)', borderColor: 'transparent' }}>NATAL</span>
                  <span className="aisi-badge-index">01</span>
                  <span className="aisi-badge-index aisi-badge-index--accent">02</span>
                  <span className="aisi-badge-index aisi-badge-index--neutral">03</span>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Data rows &amp; stats</h3>
              <div className="aisi-showcase-container">
                <div className="aisi-data-row">
                  <span>Subject</span>
                  <span className="aisi-data-value">J. Doe</span>
                </div>
                <div className="aisi-data-row">
                  <span>Active</span>
                  <span className="aisi-data-value aisi-data-value--primary">Saturn Square</span>
                </div>
                <div className="aisi-data-row">
                  <span>Risk</span>
                  <span className="aisi-data-value aisi-data-value--accent">High</span>
                </div>
                <div className="aisi-stat-grid" style={{ marginTop: 'var(--aisi-space-xl)' }}>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Align</span>
                    <span className="aisi-stat-value aisi-stat-value--primary">84%</span>
                  </div>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Friction</span>
                    <span className="aisi-stat-value">Low</span>
                  </div>
                </div>
                <div className="aisi-stat-item" style={{ marginTop: 'var(--aisi-space-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="aisi-stat-label">10th House</span>
                    <span className="aisi-stat-label">92%</span>
                  </div>
                  <div className="aisi-progress">
                    <div className="aisi-progress__fill" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Panel &amp; list</h3>
              <div className="aisi-showcase-surface" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--aisi-space-lg)' }}>
                <div className="aisi-panel-section">
                  <div className="aisi-panel-section__header">
                    <span className="aisi-heading-section">
                      <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
                      Active aspects
                    </span>
                  </div>
                  <div className="aisi-list-item">
                    <span style={{ fontWeight: 'var(--aisi-weight-medium)' }}>Sun Square Saturn</span>
                    <span className="aisi-text-primary" style={{ fontFamily: 'var(--aisi-font-mono)' }}>0.2°</span>
                  </div>
                  <div className="aisi-list-item">
                    <span>Venus Trine Mars</span>
                    <span style={{ fontFamily: 'var(--aisi-font-mono)', color: 'var(--aisi-color-neutral-300)' }}>1.4°</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Navigation</h3>
              <div className="aisi-showcase-nav-container">
                <a href="#tokens" className="aisi-nav-item">
                  <span className="aisi-nav-item__number">00</span>
                  <span>Tokens</span>
                </a>
                <a href="#components" className="aisi-nav-item active">
                  <span className="aisi-nav-item__number">01</span>
                  <span>Components</span>
                </a>
                <a href="#product" className="aisi-nav-item">
                  <span className="aisi-nav-item__number">02</span>
                  <span>Product</span>
                </a>
              </div>
            </div>
          </section>

          {/* D. AISI product components */}
          <section className="aisi-layout-section" id="product">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">03</span>
              <h2 className="aisi-layout-section-title">AISI product components</h2>
              <p className="aisi-layout-section-subtitle">Node cards, analysis panel, footer bar</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Node cards</h3>
              <div className="aisi-showcase-node-grid">
                <div className="aisi-showcase-node-wrapper">
                  <div className="aisi-card-node" style={{ position: 'relative' }}>
                    <span className="aisi-badge-index">01</span>
                    <div className="aisi-card-node__header">
                      <span className="aisi-card-node__title">Natal Profile</span>
                      <span className="aisi-badge-type">SOURCE</span>
                    </div>
                    <div className="aisi-card-node__content">
                      <div className="aisi-data-row">
                        <span>Subject</span>
                        <span className="aisi-data-value">J. Doe</span>
                      </div>
                      <div className="aisi-data-row">
                        <span>Sun</span>
                        <span className="aisi-data-value">24° Leo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aisi-showcase-node-wrapper">
                  <div className="aisi-card-node aisi-card-node--selected" style={{ position: 'relative' }}>
                    <span className="aisi-badge-index aisi-badge-index--accent">02</span>
                    <div className="aisi-card-node__header">
                      <span className="aisi-card-node__title">Current Transit</span>
                      <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-node-accent-bg)', color: 'var(--aisi-color-brand-secondary)', borderColor: 'transparent' }}>TIME</span>
                    </div>
                    <div className="aisi-card-node__content">
                      <div className="aisi-data-row">
                        <span>Date</span>
                        <span className="aisi-data-value">Oct 24, 2025</span>
                      </div>
                      <div className="aisi-data-row">
                        <span>Active</span>
                        <span className="aisi-data-value aisi-data-value--primary">Saturn Square</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aisi-showcase-node-wrapper">
                  <div className="aisi-card-node aisi-card-node--natal" style={{ position: 'relative' }}>
                    <span className="aisi-badge-index aisi-badge-index--neutral">03</span>
                    <div className="aisi-card-node__header">
                      <span className="aisi-card-node__title" style={{ color: 'var(--aisi-color-brand-secondary)' }}>Decision Score</span>
                      <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-highlight)', color: 'var(--aisi-color-brand-primary)', borderColor: 'transparent' }}>RESULT</span>
                    </div>
                    <div className="aisi-card-node__content">
                      <div className="aisi-stat-grid">
                        <div className="aisi-stat-item">
                          <span className="aisi-stat-label">Align</span>
                          <span className="aisi-stat-value aisi-stat-value--primary">84%</span>
                        </div>
                        <div className="aisi-stat-item">
                          <span className="aisi-stat-label">Friction</span>
                          <span className="aisi-stat-value">Low</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Analysis panel block</h3>
              <div className="aisi-panel-section aisi-panel-section--highlight">
                <div className="aisi-panel-section__header">
                  <span className="aisi-heading-section">
                    <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
                    Selection analysis
                  </span>
                </div>
                <div className="aisi-stat-grid">
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Dominant</span>
                    <span className="aisi-stat-value">Fire</span>
                  </div>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Vitality</span>
                    <span className="aisi-stat-value aisi-stat-value--primary">High</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Footer info bar</h3>
              <footer className="aisi-layout-footer" style={{ position: 'relative', borderTop: '1px solid var(--aisi-color-border)' }}>
                <div className="aisi-layout-footer-item">
                  <span>Version:</span>
                  <span className="aisi-layout-footer-value">2.4</span>
                </div>
                <div className="aisi-layout-footer-item">
                  <span>System:</span>
                  <span className="aisi-layout-footer-value">AISI DESIGN SYSTEM</span>
                </div>
              </footer>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Background (subtle wheel)</h3>
              <div
                style={{
                  height: 120,
                  border: '1px solid var(--aisi-color-border)',
                  borderRadius: 'var(--aisi-radius-full)',
                  background: 'var(--aisi-color-surface)',
                  opacity: 0.4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--aisi-size-micro)',
                  color: 'var(--aisi-color-neutral-300)',
                  fontFamily: 'var(--aisi-font-mono)',
                }}
              >
                Wheel placeholder
              </div>
            </div>
          </section>

          {/* E. Figma token compliance */}
          <section className="aisi-layout-section" id="compliance">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">04</span>
              <h2 className="aisi-layout-section-title">Figma token compliance</h2>
              <p className="aisi-layout-section-subtitle">Prevent regressions</p>
            </div>

            <div className="aisi-panel-section" style={{ maxWidth: 560 }}>
              <div className="aisi-panel-section__header">
                <span className="aisi-heading-section">
                  <span className="aisi-badge-circle aisi-badge-circle--primary">✓</span>
                  This page uses
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--aisi-size-body)', color: 'var(--aisi-color-fg)' }}>
                <li style={{ marginBottom: 'var(--aisi-space-sm)' }}>• <strong>--aisi-*</strong> variables only</li>
                <li style={{ marginBottom: 'var(--aisi-space-sm)' }}>• <strong>.aisi-*</strong> component classes only</li>
              </ul>
              <div className="aisi-panel-section__header" style={{ marginTop: 'var(--aisi-space-xl)' }}>
                <span className="aisi-heading-section">
                  <span className="aisi-badge-circle aisi-badge-circle--accent">✗</span>
                  Not used (legacy)
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--aisi-size-body)', color: 'var(--aisi-color-neutral-300)' }}>
                <li style={{ marginBottom: 'var(--aisi-space-sm)' }}>• dna-* classes</li>
                <li style={{ marginBottom: 'var(--aisi-space-sm)' }}>• --c-* / --f-* / --space-* tokens</li>
              </ul>
            </div>
          </section>
        </div>

        <footer className="aisi-layout-footer">
          <div className="aisi-layout-footer-item">
            <span>Version:</span>
            <span className="aisi-layout-footer-value">2.4</span>
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
