/**
 * Screen 1 — Onboarding / Birth Data (idea.md)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { UserProfile } from '../types/profile';
import styles from './BirthDataPage.module.css';

const DEFAULT_PROFILE: Omit<UserProfile, 'id' | 'natalChartData'> = {
  name: '',
  birthDate: '',
  birthTime: null,
  birthLocation: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export function BirthDataPage() {
  const navigate = useNavigate();
  const { profile, setProfile, calculateNatalChart } = useStore();
  const [form, setForm] = useState<Omit<UserProfile, 'id' | 'natalChartData'>>(
    profile
      ? {
          name: profile.name,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime,
          birthLocation: profile.birthLocation,
          timezone: profile.timezone,
        }
      : DEFAULT_PROFILE,
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.birthDate.trim()) {
      setError('Please enter date of birth.');
      return;
    }
    const newProfile: UserProfile = {
      id: profile?.id ?? `user_${Date.now()}`,
      ...form,
      natalChartData: null,
    };
    setProfile(newProfile);
    calculateNatalChart();
    navigate('/nodes');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Birth Data</h1>
        <p className={styles.subtitle}>Enter birth details to calculate your natal chart and use the Nodes workspace.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name (optional)
            <input
              type="text"
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. J. Doe"
            />
          </label>
          <label className={styles.label}>
            Date of birth *
            <input
              type="date"
              className={styles.input}
              value={form.birthDate}
              onChange={(e) => setForm((f) => ({ ...f, birthDate: e.target.value }))}
              required
            />
          </label>
          <label className={styles.label}>
            Time of birth (optional)
            <input
              type="time"
              className={styles.input}
              value={form.birthTime ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, birthTime: e.target.value || null }))}
            />
          </label>
          <label className={styles.label}>
            Place of birth
            <input
              type="text"
              className={styles.input}
              value={form.birthLocation}
              onChange={(e) => setForm((f) => ({ ...f, birthLocation: e.target.value }))}
              placeholder="City, Country"
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submit}>
            Calculate chart &amp; open workspace
          </button>
        </form>
      </div>
    </div>
  );
}
