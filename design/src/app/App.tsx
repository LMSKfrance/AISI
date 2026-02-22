import './design-system.css';

export default function App() {
  return (
    <div className="aisi-layout-app">
      {/* Sidebar Navigation */}
      <nav className="aisi-layout-sidebar">
        <div className="aisi-layout-brand">
          <div className="aisi-layout-brand-logo">
            <span className="aisi-badge-circle">A</span>
            <span>AISI Design System</span>
          </div>
          <div className="aisi-layout-version">v2.4</div>
        </div>

        <div className="aisi-layout-nav">
          <a href="#tokens" className="aisi-nav-item active">
            <span className="aisi-nav-item__number">01</span>
            <span>Design Tokens</span>
          </a>
          <a href="#colors" className="aisi-nav-item">
            <span className="aisi-nav-item__number">02</span>
            <span>Colors</span>
          </a>
          <a href="#typography" className="aisi-nav-item">
            <span className="aisi-nav-item__number">03</span>
            <span>Typography</span>
          </a>
          <a href="#buttons" className="aisi-nav-item">
            <span className="aisi-nav-item__number">04</span>
            <span>Buttons</span>
          </a>
          <a href="#badges" className="aisi-nav-item">
            <span className="aisi-nav-item__number">05</span>
            <span>Badges & Tags</span>
          </a>
          <a href="#navigation" className="aisi-nav-item">
            <span className="aisi-nav-item__number">06</span>
            <span>Navigation</span>
          </a>
          <a href="#nodes" className="aisi-nav-item">
            <span className="aisi-nav-item__number">07</span>
            <span>Node Cards</span>
          </a>
          <a href="#panels" className="aisi-nav-item">
            <span className="aisi-nav-item__number">08</span>
            <span>Panels</span>
          </a>
          <a href="#data" className="aisi-nav-item">
            <span className="aisi-nav-item__number">09</span>
            <span>Data Display</span>
          </a>
          <a href="#spacing" className="aisi-nav-item">
            <span className="aisi-nav-item__number">10</span>
            <span>Spacing</span>
          </a>
          <a href="#export" className="aisi-nav-item">
            <span className="aisi-nav-item__number">11</span>
            <span>Export & Sync</span>
          </a>
        </div>

        <div className="aisi-label-vertical">
          ZINC PROJECT SYSTEM v2.4
        </div>
      </nav>

      {/* Main Content */}
      <main className="aisi-layout-content">
        {/* Header */}
        <header className="aisi-layout-header">
          <div className="aisi-layout-header-title">
            <span className="aisi-display-number">01</span>
            <div className="aisi-layout-header-text">
              <h1>AISI Design System</h1>
              <p className="aisi-label-uppercase">Professional Astrology Platform Component Library</p>
            </div>
          </div>
        </header>

        {/* Content Sections */}
        <div className="aisi-layout-sections">

          {/* Introduction */}
          <section className="aisi-layout-section" id="intro">
            <div className="aisi-layout-section-intro">
              <h2 className="aisi-layout-section-title">Design System Overview</h2>
              <p className="aisi-layout-intro-text">
                A comprehensive component library and design token system for building professional astrology applications. 
                This system emphasizes clarity, precision, and sophisticated data visualization.
              </p>
            </div>
          </section>

          {/* Color Tokens */}
          <section className="aisi-layout-section" id="colors">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">02</span>
              <h2 className="aisi-layout-section-title">Color Palette</h2>
              <p className="aisi-layout-section-subtitle">Core brand colors and semantic color tokens</p>
            </div>

            {/* Primary Colors */}
            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Primary Colors</h3>
              <div className="aisi-showcase-color-grid">
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-primary"></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Cobalt</span>
                    <span className="aisi-showcase-color-token">--aisi-color-brand-primary</span>
                    <span className="aisi-showcase-color-value">#1F5673</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-accent"></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Blush</span>
                    <span className="aisi-showcase-color-token">--aisi-color-brand-secondary</span>
                    <span className="aisi-showcase-color-value">#D98E73</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-fg"></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Foreground</span>
                    <span className="aisi-showcase-color-token">--aisi-color-fg</span>
                    <span className="aisi-showcase-color-value">#2A363B</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Neutral Colors */}
            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Neutral Scale (Zinc)</h3>
              <div className="aisi-showcase-color-grid">
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-neutral-100"></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Neutral 100</span>
                    <span className="aisi-showcase-color-token">--aisi-color-neutral-100</span>
                    <span className="aisi-showcase-color-value">#F3F1EA</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-neutral-200"></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Neutral 200</span>
                    <span className="aisi-showcase-color-token">--aisi-color-neutral-200</span>
                    <span className="aisi-showcase-color-value">#BCCACD</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch aisi-bg-neutral-300"></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Neutral 300</span>
                    <span className="aisi-showcase-color-token">--aisi-color-neutral-300</span>
                    <span className="aisi-showcase-color-value">#6B7C85</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Functional Colors */}
            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Functional Colors</h3>
              <div className="aisi-showcase-color-grid">
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ background: 'var(--aisi-color-bg)' }}></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Background</span>
                    <span className="aisi-showcase-color-token">--aisi-color-bg</span>
                    <span className="aisi-showcase-color-value">#FDFCF9</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ background: 'var(--aisi-color-highlight)' }}></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Highlight</span>
                    <span className="aisi-showcase-color-token">--aisi-color-highlight</span>
                    <span className="aisi-showcase-color-value">#EEF4F4</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ background: 'var(--aisi-color-surface)' }}></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Surface</span>
                    <span className="aisi-showcase-color-token">--aisi-color-surface</span>
                    <span className="aisi-showcase-color-value">#F2F6F7</span>
                  </div>
                </div>
                <div className="aisi-showcase-color-card">
                  <div className="aisi-showcase-color-swatch" style={{ background: 'var(--aisi-color-border)', border: '1px solid var(--aisi-color-neutral-200)' }}></div>
                  <div className="aisi-showcase-color-info">
                    <span className="aisi-showcase-color-name">Border</span>
                    <span className="aisi-showcase-color-token">--aisi-color-border</span>
                    <span className="aisi-showcase-color-value">#DEDBD0</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="aisi-layout-section" id="typography">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">03</span>
              <h2 className="aisi-layout-section-title">Typography</h2>
              <p className="aisi-layout-section-subtitle">Type scale and font families</p>
            </div>

            {/* Font Families */}
            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Font Families</h3>
              <div className="aisi-showcase-font-grid">
                <div className="aisi-showcase-font-sample">
                  <div className="aisi-showcase-font-display" style={{ fontFamily: 'var(--aisi-font-sans)' }}>
                    Aa
                  </div>
                  <div className="aisi-showcase-font-info">
                    <span className="aisi-showcase-font-name">Sans Serif</span>
                    <span className="aisi-showcase-font-stack">Gill Sans, Helvetica Neue</span>
                    <span className="aisi-showcase-color-token">--aisi-font-sans</span>
                  </div>
                </div>
                <div className="aisi-showcase-font-sample">
                  <div className="aisi-showcase-font-display" style={{ fontFamily: 'var(--aisi-font-mono)' }}>
                    Aa
                  </div>
                  <div className="aisi-showcase-font-info">
                    <span className="aisi-showcase-font-name">Monospace</span>
                    <span className="aisi-showcase-font-stack">Courier New</span>
                    <span className="aisi-showcase-color-token">--aisi-font-mono</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Type Scale */}
            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Type Scale</h3>
              <div className="aisi-showcase-type-scale">
                <div className="aisi-showcase-type-sample">
                  <div className="aisi-display-number">24px Display</div>
                  <div className="aisi-showcase-type-meta">
                    <span>Display Number</span>
                    <span className="aisi-showcase-type-specs">--aisi-size-display</span>
                  </div>
                </div>
                <div className="aisi-showcase-type-sample">
                  <div className="aisi-stat-value">22px Statistical</div>
                  <div className="aisi-showcase-type-meta">
                    <span>Stat Value</span>
                    <span className="aisi-showcase-type-specs">--aisi-size-stat</span>
                  </div>
                </div>
                <div className="aisi-showcase-type-sample">
                  <div className="type-example" style={{ fontSize: 'var(--aisi-size-body)' }}>13px Body Text</div>
                  <div className="aisi-showcase-type-meta">
                    <span>Body</span>
                    <span className="aisi-showcase-type-specs">--aisi-size-body</span>
                  </div>
                </div>
                <div className="aisi-showcase-type-sample">
                  <div className="type-example" style={{ fontSize: 'var(--aisi-size-base)' }}>12px Secondary</div>
                  <div className="aisi-showcase-type-meta">
                    <span>Base</span>
                    <span className="aisi-showcase-type-specs">--aisi-size-base</span>
                  </div>
                </div>
                <div className="aisi-showcase-type-sample">
                  <div className="aisi-label-uppercase">10px Uppercase Label</div>
                  <div className="aisi-showcase-type-meta">
                    <span>Label Uppercase</span>
                    <span className="aisi-showcase-type-specs">--aisi-size-mini</span>
                  </div>
                </div>
                <div className="aisi-showcase-type-sample">
                  <div className="type-example" style={{ fontSize: 'var(--aisi-size-micro)' }}>9px Micro</div>
                  <div className="aisi-showcase-type-meta">
                    <span>Micro</span>
                    <span className="aisi-showcase-type-specs">--aisi-size-micro</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Components */}
            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Typography Components</h3>
              <div className="aisi-showcase-component-grid">
                <div className="aisi-showcase-example-card">
                  <div className="aisi-showcase-example-preview">
                    <span className="aisi-display-number">05</span>
                  </div>
                  <span className="aisi-showcase-example-name">Display Number</span>
                  <code className="aisi-showcase-example-code">.aisi-display-number</code>
                </div>
                <div className="aisi-showcase-example-card">
                  <div className="aisi-showcase-example-preview">
                    <span className="aisi-label-uppercase">Analysis Workspace</span>
                  </div>
                  <span className="aisi-showcase-example-name">Label Uppercase</span>
                  <code className="aisi-showcase-example-code">.aisi-label-uppercase</code>
                </div>
                <div className="aisi-showcase-example-card">
                  <div className="aisi-showcase-example-preview">
                    <span className="aisi-heading-section">Selection Analysis</span>
                  </div>
                  <span className="aisi-showcase-example-name">Heading Section</span>
                  <code className="aisi-showcase-example-code">.aisi-heading-section</code>
                </div>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section className="aisi-layout-section" id="buttons">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">04</span>
              <h2 className="aisi-layout-section-title">Buttons</h2>
              <p className="aisi-layout-section-subtitle">Action components and interactive elements</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Button Variants</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-button-row">
                  <div className="aisi-showcase-button-example">
                    <button className="aisi-btn aisi-btn--primary" type="button">Primary Button</button>
                    <code>.aisi-btn.aisi-btn--primary</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <button className="aisi-btn" type="button">Default Button</button>
                    <code>.aisi-btn</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <button className="aisi-btn" type="button" disabled>Disabled</button>
                    <code>.aisi-btn:disabled</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Icon Buttons</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-icon-button-row">
                  <button type="button" className="aisi-btn-icon">+</button>
                  <button type="button" className="aisi-btn-icon">-</button>
                  <button type="button" className="aisi-btn-icon">×</button>
                  <button type="button" className="aisi-btn-icon">Fit</button>
                </div>
                <code className="aisi-showcase-code">.aisi-btn-icon</code>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Button Groups</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-tool-controls">
                  <button className="aisi-btn" type="button">Auto Layout</button>
                  <button className="aisi-btn" type="button">Add Node +</button>
                  <button className="aisi-btn aisi-btn--primary" type="button">Run Calculation</button>
                </div>
                <code className="aisi-showcase-code">.aisi-tool-controls</code>
              </div>
            </div>
          </section>

          {/* Badges & Tags */}
          <section className="aisi-layout-section" id="badges">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">05</span>
              <h2 className="aisi-layout-section-title">Badges & Tags</h2>
              <p className="aisi-layout-section-subtitle">Labels, identifiers, and status indicators</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Circle Tags</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-badge-row">
                  <div className="aisi-showcase-button-example">
                    <span className="aisi-badge-circle">A</span>
                    <code className="aisi-showcase-code">.aisi-badge-circle</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
                    <code className="aisi-showcase-code">.aisi-badge-circle--primary</code>
                  </div>
                  <div className="aisi-showcase-button-example">
                    <span className="aisi-badge-circle aisi-badge-circle--accent">02</span>
                    <code className="aisi-showcase-code">.aisi-badge-circle--accent</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Node Type Badges</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-badge-row">
                  <span className="aisi-badge-type">SOURCE</span>
                  <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-highlight)', color: 'var(--aisi-color-brand-primary)', borderColor: 'transparent' }}>NATAL</span>
                  <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-node-accent-bg)', color: 'var(--aisi-color-brand-secondary)', borderColor: 'transparent' }}>TIME</span>
                  <span className="aisi-badge-type">RESULT</span>
                </div>
                <code className="aisi-showcase-code">.aisi-badge-type</code>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Node Index</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-badge-row">
                  <span className="aisi-badge-index">01</span>
                  <span className="aisi-badge-index aisi-badge-index--accent">02</span>
                  <span className="aisi-badge-index aisi-badge-index--neutral">03</span>
                </div>
                <code className="aisi-showcase-code">.aisi-badge-index</code>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <section className="aisi-layout-section" id="navigation">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">06</span>
              <h2 className="aisi-layout-section-title">Navigation</h2>
              <p className="aisi-layout-section-subtitle">Menu items and navigation patterns</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Navigation Items</h3>
              <div className="aisi-showcase-surface">
                <div className="aisi-showcase-nav-container">
                  <a href="#" className="aisi-nav-item">
                    <span className="aisi-nav-item__number">00</span>
                    <span>Dashboard</span>
                  </a>
                  <a href="#" className="aisi-nav-item active">
                    <span className="aisi-nav-item__number">01</span>
                    <span>Nodes</span>
                  </a>
                  <a href="#" className="aisi-nav-item">
                    <span className="aisi-nav-item__number">02</span>
                    <span>Reports</span>
                  </a>
                </div>
                <code className="aisi-showcase-code">.aisi-nav-item / .active</code>
              </div>
            </div>
          </section>

          {/* Node Cards */}
          <section className="aisi-layout-section" id="nodes">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">07</span>
              <h2 className="aisi-layout-section-title">Node Cards</h2>
              <p className="aisi-layout-section-subtitle">Data visualization cards and containers</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Node Variants</h3>
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
                      <div className="aisi-data-row">
                        <span>Moon</span>
                        <span className="aisi-data-value">12° Tau</span>
                      </div>
                    </div>
                  </div>
                  <code className="aisi-showcase-code">.aisi-card-node</code>
                </div>

                <div className="aisi-showcase-node-wrapper">
                  <div className="aisi-card-node aisi-card-node--selected" style={{ position: 'relative' }}>
                    <span className="aisi-badge-index">02</span>
                    <div className="aisi-card-node__header">
                      <span className="aisi-card-node__title">Current Transit</span>
                      <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-node-accent-bg)', color: 'var(--aisi-color-brand-secondary)', borderColor: 'transparent' }}>TIME</span>
                    </div>
                    <div className="aisi-card-node__content">
                      <div className="aisi-data-row">
                        <span>Date</span>
                        <span className="aisi-data-value">Oct 24, 2023</span>
                      </div>
                      <div className="aisi-data-row">
                        <span>Active</span>
                        <span className="aisi-data-value aisi-data-value--primary">Saturn Square</span>
                      </div>
                    </div>
                  </div>
                  <code className="aisi-showcase-code">.aisi-card-node--selected</code>
                </div>

                <div className="aisi-showcase-node-wrapper">
                  <div className="aisi-card-node aisi-card-node--natal" style={{ position: 'relative' }}>
                    <span className="aisi-badge-index aisi-badge-index--accent">03</span>
                    <div className="aisi-card-node__header">
                      <span className="aisi-card-node__title" style={{ color: 'var(--aisi-color-brand-secondary)' }}>Person B Profile</span>
                      <span className="aisi-badge-type" style={{ background: 'var(--aisi-color-node-accent-bg)', color: 'var(--aisi-color-brand-secondary)', borderColor: 'transparent' }}>NATAL</span>
                    </div>
                    <div className="aisi-card-node__content">
                      <div className="aisi-data-row">
                        <span>Subject</span>
                        <span className="aisi-data-value">A. Smith</span>
                      </div>
                      <div className="aisi-data-row">
                        <span>Sun</span>
                        <span className="aisi-data-value">08° Aqu</span>
                      </div>
                    </div>
                  </div>
                  <code className="aisi-showcase-code">.aisi-card-node--natal</code>
                </div>
              </div>
            </div>
          </section>

          {/* Panels */}
          <section className="aisi-layout-section" id="panels">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">08</span>
              <h2 className="aisi-layout-section-title">Panels</h2>
              <p className="aisi-layout-section-subtitle">Inspector panels and content sections</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Panel Sections</h3>
              <div className="aisi-showcase-surface" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="aisi-panel-section">
                  <div className="aisi-panel-section__header">
                    <span className="aisi-heading-section">
                      <span className="aisi-badge-circle aisi-badge-circle--primary">01</span>
                      Active Aspects
                    </span>
                  </div>
                  <div className="aisi-list-item">
                    <span style={{ fontWeight: 500 }}>Sun Square Saturn</span>
                    <span className="aisi-text-primary" style={{ fontFamily: 'var(--aisi-font-mono)' }}>0.2°</span>
                  </div>
                  <div className="aisi-list-item">
                    <span>Venus Trine Mars</span>
                    <span style={{ fontFamily: 'var(--aisi-font-mono)', color: 'var(--aisi-color-neutral-300)' }}>1.4°</span>
                  </div>
                </div>
                <code className="aisi-showcase-code">.aisi-panel-section</code>
              </div>

              <div className="aisi-showcase-surface" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div className="aisi-panel-section aisi-panel-section--highlight">
                  <div className="aisi-panel-section__header">
                    <span className="aisi-heading-section">
                      <span className="aisi-badge-circle aisi-badge-circle--primary">02</span>
                      Highlighted Section
                    </span>
                  </div>
                  <div className="aisi-stat-grid">
                    <div className="aisi-stat-item">
                      <span className="aisi-stat-label">Dominant</span>
                      <span className="aisi-stat-value">Fire</span>
                    </div>
                    <div className="aisi-stat-item">
                      <span className="aisi-stat-label">Vitality</span>
                      <span className="aisi-stat-value">High</span>
                    </div>
                  </div>
                </div>
                <code className="aisi-showcase-code">.aisi-panel-section--highlight</code>
              </div>
            </div>
          </section>

          {/* Data Display */}
          <section className="aisi-layout-section" id="data">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">09</span>
              <h2 className="aisi-layout-section-title">Data Display</h2>
              <p className="aisi-layout-section-subtitle">Data presentation components</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Data Rows</h3>
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
                  <span className="aisi-data-value aisi-data-value--accent">High Volatility</span>
                </div>
                <code className="aisi-showcase-code" style={{ marginTop: '12px' }}>.aisi-data-row + .aisi-data-value</code>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Stat Grid</h3>
              <div className="aisi-showcase-container">
                <div className="aisi-stat-grid">
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Align</span>
                    <span className="aisi-stat-value aisi-stat-value--primary">84%</span>
                  </div>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Friction</span>
                    <span className="aisi-stat-value">Low</span>
                  </div>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Dominant</span>
                    <span className="aisi-stat-value">Fire</span>
                  </div>
                  <div className="aisi-stat-item">
                    <span className="aisi-stat-label">Vitality</span>
                    <span className="aisi-stat-value">High</span>
                  </div>
                </div>
                <code className="aisi-showcase-code" style={{ marginTop: '12px' }}>.aisi-stat-grid + .aisi-stat-item</code>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Progress Bars</h3>
              <div className="aisi-showcase-container">
                <div className="aisi-stat-item" style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="aisi-stat-label">10th House (Career)</span>
                    <span className="aisi-stat-label">92%</span>
                  </div>
                  <div className="aisi-progress">
                    <div className="aisi-progress__fill" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="aisi-stat-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="aisi-stat-label">7th House (Relationships)</span>
                    <span className="aisi-stat-label">45%</span>
                  </div>
                  <div className="aisi-progress">
                    <div className="aisi-progress__fill aisi-progress__fill--neutral" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <code className="aisi-showcase-code" style={{ marginTop: '12px' }}>.aisi-progress + .aisi-progress__fill</code>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">List Items</h3>
              <div className="aisi-showcase-container">
                <div className="aisi-list-item">
                  <span style={{ fontWeight: 500 }}>Sun Square Saturn</span>
                  <span className="aisi-text-primary" style={{ fontFamily: 'var(--aisi-font-mono)' }}>0.2°</span>
                </div>
                <div className="aisi-list-item">
                  <span>Venus Trine Mars</span>
                  <span style={{ fontFamily: 'var(--aisi-font-mono)', color: 'var(--aisi-color-neutral-300)' }}>1.4°</span>
                </div>
                <div className="aisi-list-item">
                  <span>Moon Opp Pluto</span>
                  <span style={{ fontFamily: 'var(--aisi-font-mono)', color: 'var(--aisi-color-neutral-300)' }}>2.1°</span>
                </div>
                <code className="aisi-showcase-code" style={{ marginTop: '12px' }}>.aisi-list-item</code>
              </div>
            </div>
          </section>

          {/* Spacing */}
          <section className="aisi-layout-section" id="spacing">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">10</span>
              <h2 className="aisi-layout-section-title">Spacing System</h2>
              <p className="aisi-layout-section-subtitle">Consistent spacing scale based on 4px grid</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Spacing Scale</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="aisi-showcase-spacing-item">
                  <div className="aisi-showcase-spacing-visual" style={{ width: '4px' }}></div>
                  <div className="aisi-showcase-spacing-info">
                    <span className="aisi-showcase-spacing-size">4px</span>
                    <span className="aisi-showcase-spacing-token">--aisi-space-xs</span>
                  </div>
                </div>
                <div className="aisi-showcase-spacing-item">
                  <div className="aisi-showcase-spacing-visual" style={{ width: '8px' }}></div>
                  <div className="aisi-showcase-spacing-info">
                    <span className="aisi-showcase-spacing-size">8px</span>
                    <span className="aisi-showcase-spacing-token">--aisi-space-sm</span>
                  </div>
                </div>
                <div className="aisi-showcase-spacing-item">
                  <div className="aisi-showcase-spacing-visual" style={{ width: '12px' }}></div>
                  <div className="aisi-showcase-spacing-info">
                    <span className="aisi-showcase-spacing-size">12px</span>
                    <span className="aisi-showcase-spacing-token">--aisi-space-md</span>
                  </div>
                </div>
                <div className="aisi-showcase-spacing-item">
                  <div className="aisi-showcase-spacing-visual" style={{ width: '16px' }}></div>
                  <div className="aisi-showcase-spacing-info">
                    <span className="aisi-showcase-spacing-size">16px</span>
                    <span className="aisi-showcase-spacing-token">--aisi-space-lg</span>
                  </div>
                </div>
                <div className="aisi-showcase-spacing-item">
                  <div className="aisi-showcase-spacing-visual" style={{ width: '24px' }}></div>
                  <div className="aisi-showcase-spacing-info">
                    <span className="aisi-showcase-spacing-size">24px</span>
                    <span className="aisi-showcase-spacing-token">--aisi-space-xl</span>
                  </div>
                </div>
                <div className="aisi-showcase-spacing-item">
                  <div className="aisi-showcase-spacing-visual" style={{ width: '32px' }}></div>
                  <div className="aisi-showcase-spacing-info">
                    <span className="aisi-showcase-spacing-size">32px</span>
                    <span className="aisi-showcase-spacing-token">--aisi-space-2xl</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Export Section */}
          <section className="aisi-layout-section" id="export">
            <div className="aisi-layout-section-header-block">
              <span className="aisi-badge-circle aisi-badge-circle--primary">11</span>
              <h2 className="aisi-layout-section-title">Export & Sync</h2>
              <p className="aisi-layout-section-subtitle">Bridge the gap between code and Figma</p>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Figma Token JSON</h3>
              <p style={{ marginBottom: '16px', fontSize: 'var(--aisi-size-body)', color: 'var(--aisi-color-neutral-300)' }}>
                Copy these tokens to import into <strong>Tokens Studio</strong> or manually create <strong>Figma Local Variables</strong>. See <code>design/FIGMA_TOKEN_MAP.md</code> for full mapping.
              </p>
              <div className="aisi-showcase-export-container">
                <pre className="aisi-showcase-token-json">
{`{
  "colors": {
    "brand": {
      "primary": { "value": "#1F5673", "type": "color" },
      "secondary": { "value": "#D98E73", "type": "color" }
    },
    "semantic": {
      "bg": { "value": "#FDFCF9", "type": "color" },
      "fg": { "value": "#2A363B", "type": "color" },
      "border": { "value": "#DEDBD0", "type": "color" }
    },
    "neutral": {
      "100": { "value": "#F3F1EA", "type": "color" },
      "200": { "value": "#BCCACD", "type": "color" },
      "300": { "value": "#6B7C85", "type": "color" }
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": { "value": "Gill Sans", "type": "fontFamilies" },
      "mono": { "value": "Courier New", "type": "fontFamilies" }
    },
    "fontSize": {
      "micro": { "value": "9px", "type": "dimension" },
      "mini": { "value": "10px", "type": "dimension" },
      "base": { "value": "12px", "type": "dimension" },
      "body": { "value": "13px", "type": "dimension" },
      "stat": { "value": "22px", "type": "dimension" },
      "display": { "value": "24px", "type": "dimension" }
    }
  },
  "spacing": {
    "xs": { "value": "4px", "type": "dimension" },
    "sm": { "value": "8px", "type": "dimension" },
    "md": { "value": "12px", "type": "dimension" },
    "lg": { "value": "16px", "type": "dimension" },
    "xl": { "value": "24px", "type": "dimension" },
    "2xl": { "value": "32px", "type": "dimension" }
  }
}`}
                </pre>
                <button
                  type="button"
                  className="aisi-btn aisi-btn--primary"
                  style={{ marginTop: '16px' }}
                  onClick={async () => {
                    const text = document.querySelector('.aisi-showcase-token-json')?.textContent || "";
                    try {
                      await navigator.clipboard.writeText(text);
                      alert('Tokens copied to clipboard!');
                    } catch (err) {
                      const element = document.querySelector('.aisi-showcase-token-json');
                      if (element) {
                        const range = document.createRange();
                        range.selectNodeContents(element);
                        const selection = window.getSelection();
                        if (selection) {
                          selection.removeAllRanges();
                          selection.addRange(range);
                          alert('Copy blocked by browser permissions. The text is now selected—please press Ctrl+C (Cmd+C) to copy manually.');
                        }
                      }
                    }
                  }}
                >
                  Copy Tokens for Figma
                </button>
              </div>
            </div>

            <div className="aisi-showcase-group">
              <h3 className="aisi-showcase-group-title">Syncing Components</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="aisi-showcase-guide-step">
                  <span className="aisi-showcase-step-num">01</span>
                  <div className="aisi-showcase-step-content">
                    <strong>Install html.to.design</strong>
                    <p>Install the plugin from the Figma Community to convert live sites to Figma layers.</p>
                  </div>
                </div>
                <div className="aisi-showcase-guide-step">
                  <span className="aisi-showcase-step-num">02</span>
                  <div className="aisi-showcase-step-content">
                    <strong>Copy Preview URL</strong>
                    <p>Copy the URL of this running application from your browser address bar.</p>
                  </div>
                </div>
                <div className="aisi-showcase-guide-step">
                  <span className="aisi-showcase-step-num">03</span>
                  <div className="aisi-showcase-step-content">
                    <strong>Import to Figma</strong>
                    <p>Paste the URL into the plugin, select your viewport, and click &quot;Import&quot;.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="aisi-layout-footer">
        <div className="aisi-layout-footer-item">
          <span>Version:</span>
          <span className="aisi-layout-footer-value">2.4</span>
        </div>
        <div className="aisi-layout-footer-item">
          <span>System:</span>
          <span className="aisi-layout-footer-value">ZINC PROJECT</span>
        </div>
        <div className="aisi-layout-footer-item" style={{ marginLeft: 'auto' }}>
          <span>Components:</span>
          <span className="aisi-layout-footer-value">47</span>
        </div>
      </footer>
    </div>
  );
}
