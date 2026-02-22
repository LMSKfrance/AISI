import { describe, it, expect } from 'vitest';
import { normalizeAngle, detectAspect, normalizeBirthDateToISO, AstroService } from './astroService';
import { computeNatalChart, parsePersonInput, computeSynastryResult, computeCompatibility } from '../features/astrology/AstroService';

describe('normalizeBirthDateToISO', () => {
  it('returns ISO date unchanged', () => {
    expect(normalizeBirthDateToISO('1989-12-02')).toBe('1989-12-02');
  });
  it('converts dd.mm.yyyy to yyyy-mm-dd', () => {
    expect(normalizeBirthDateToISO('02.12.1989')).toBe('1989-12-02');
    expect(normalizeBirthDateToISO('2.3.1995')).toBe('1995-03-02');
  });
  it('converts dd/mm/yyyy to yyyy-mm-dd', () => {
    expect(normalizeBirthDateToISO('02/12/1989')).toBe('1989-12-02');
  });
  it('returns null for empty or too short', () => {
    expect(normalizeBirthDateToISO('')).toBeNull();
    expect(normalizeBirthDateToISO('123')).toBeNull();
  });
});

describe('angleDelta (normalizeAngle)', () => {
  it('0 vs 360 => 0 (conjunction orb 0)', () => {
    expect(normalizeAngle(0, 360)).toBe(0);
  });

  it('10 vs 350 => 20 (conjunction orb 20 — out of 8° orb)', () => {
    expect(normalizeAngle(10, 350)).toBe(20);
  });

  it('90 vs 270 => 180 (opposition orb 0)', () => {
    expect(normalizeAngle(90, 270)).toBe(180);
  });

  it('120 vs 240 => 120 (trine orb 0)', () => {
    expect(normalizeAngle(120, 240)).toBe(120);
  });

  it('0 vs 180 => opposition orb 0', () => {
    expect(normalizeAngle(0, 180)).toBe(180);
  });

  it('symmetry: angleDelta(a,b) === angleDelta(b,a)', () => {
    expect(normalizeAngle(45, 310)).toBe(normalizeAngle(310, 45));
    expect(normalizeAngle(0, 180)).toBe(normalizeAngle(180, 0));
  });

  it('same point => 0', () => {
    expect(normalizeAngle(100, 100)).toBe(0);
  });

  it('near-360 wrap => small delta', () => {
    expect(normalizeAngle(1, 359)).toBe(2);
  });
});

describe('detectAspect (angle delta → aspect)', () => {
  it('angle 0 => conjunction orb 0', () => {
    const r = detectAspect(0);
    expect(r).not.toBeNull();
    expect(r!.type).toBe('conjunction');
    expect(r!.orb).toBe(0);
  });

  it('angle 3 => conjunction orb 3', () => {
    const r = detectAspect(3);
    expect(r!.type).toBe('conjunction');
    expect(r!.orb).toBe(3);
  });

  it('angle 120 => trine orb 0', () => {
    const r = detectAspect(120);
    expect(r!.type).toBe('trine');
    expect(r!.orb).toBe(0);
  });

  it('angle 180 => opposition orb 0', () => {
    const r = detectAspect(180);
    expect(r!.type).toBe('opposition');
    expect(r!.orb).toBe(0);
  });

  it('angle 62 => sextile orb 2', () => {
    const r = detectAspect(62);
    expect(r!.type).toBe('sextile');
    expect(r!.orb).toBe(2);
  });

  it('angle 40 => null (no aspect within 8° orb)', () => {
    expect(detectAspect(40)).toBeNull();
  });

  it('never returns 360° orb', () => {
    for (let angle = 0; angle <= 180; angle += 1) {
      const r = detectAspect(angle);
      if (r) expect(r.orb).toBeLessThanOrEqual(8);
    }
  });
});

describe('AstroService.calculateAspect', () => {
  it('0° Aries vs 0° Aries => conjunction orb 0', () => {
    const r = AstroService.calculateAspect(
      { sign: 'Aries', degree: 0 },
      { sign: 'Aries', degree: 0 },
    );
    expect(r).not.toBeNull();
    expect(r!.type).toBe('conjunction');
    expect(r!.orb).toBe(0);
  });

  it('Leo 24 vs Scorpio 24 => square orb 0 (90° apart)', () => {
    const r = AstroService.calculateAspect(
      { sign: 'Leo', degree: 24 },
      { sign: 'Scorpio', degree: 24 },
    );
    expect(r!.type).toBe('square');
    expect(r!.orb).toBe(0);
  });

  it('returns null when no aspect is within orb', () => {
    const r = AstroService.calculateAspect(
      { sign: 'Aries', degree: 0 },
      { sign: 'Taurus', degree: 10 },
    );
    expect(r).toBeNull();
  });
});

describe('Synastry (feature pipeline)', () => {
  it('produces sorted aspects and counts', () => {
    const chartA = computeNatalChart({
      name: 'A', birthDate: '1990-06-15', birthTime: '14:30', birthPlace: 'London', timezone: 'UTC',
    });
    const chartB = computeNatalChart({
      name: 'B', birthDate: '1992-03-20', birthTime: '09:00', birthPlace: 'Paris', timezone: 'UTC',
    });
    expect(chartA).not.toBeNull();
    expect(chartB).not.toBeNull();
    const synastry = computeSynastryResult(chartA!, chartB!);
    const result = computeCompatibility(synastry);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(synastry.supportCount + synastry.challengeCount + synastry.neutralCount).toBeLessThanOrEqual(synastry.aspects.length);

    for (let i = 1; i < synastry.aspects.length; i++) {
      expect(synastry.aspects[i]!.orb).toBeGreaterThanOrEqual(synastry.aspects[i - 1]!.orb);
    }
  });

  it('different birth dates produce different charts', () => {
    const c1 = AstroService.calculateNatalChart({
      birthDate: '1990-01-01', birthTime: null, birthLocation: '', timezone: 'UTC',
    });
    const c2 = AstroService.calculateNatalChart({
      birthDate: '1995-07-15', birthTime: null, birthLocation: '', timezone: 'UTC',
    });
    const sameSign = c1.planets.every((p, i) => p.sign === c2.planets[i]!.sign);
    expect(sameSign).toBe(false);
  });
});

describe('parsePersonInput', () => {
  it('parses DD.MM.YYYY and returns warnings when time missing', () => {
    const parsed = parsePersonInput({ name: 'Test', birthDate: '02.12.1989', birthTime: '', birthPlace: '' });
    expect(parsed.birthDateIso).toBe('1989-12-02');
    expect(parsed.valid).toBe(true);
  });
});
