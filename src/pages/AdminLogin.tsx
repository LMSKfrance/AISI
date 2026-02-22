import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../auth/adminAuth';
import './admin-design.css';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="aisi-layout-app" style={{ gridTemplateColumns: '1fr' }}>
      <main className="aisi-admin-login-wrap">
        <div className="aisi-admin-login-card">
          <div className="aisi-layout-section-header-block" style={{ marginBottom: 'var(--aisi-space-xl)' }}>
            <span className="aisi-badge-circle aisi-badge-circle--primary">A</span>
            <h1 className="aisi-layout-section-title" style={{ marginBottom: 'var(--aisi-space-xs)' }}>Admin</h1>
            <p className="aisi-layout-section-subtitle">Sign in to the AISI admin dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="aisi-admin-form">
            <label className="aisi-admin-label">Username</label>
            <input
              type="text"
              className="aisi-admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
            <label className="aisi-admin-label">Password</label>
            <input
              type="password"
              className="aisi-admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="aisi-admin-error">{error}</p>}
            <button type="submit" className="aisi-btn aisi-btn--primary">
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
