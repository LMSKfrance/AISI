import { describe, it, expect } from 'vitest';
import { angleDelta, normalizeLongitude, detectAspect } from './aspects';

describe('aspects', () => {
  describe('normalizeLongitude', () => {
    it('keeps 0..360 unchanged', () => {
      expect(normalizeLongitude(0)).toBe(0);
      expect(normalizeLongitude(180)).toBe(180);
      expect(normalizeLongitude(359.5)).toBe(359.5);
    });
    it('wraps negative to positive', () => {
      expect(normalizeLongitude(-90)).toBe(270);
    });
  });

  describe('angleDelta (shortest arc)', () => {
    it('0 vs 360 => 0 (conjunction orb 0)', () => {
      expect(angleDelta(0, 360)).toBe(0);
    });
    it('10 vs 350 => 20', () => {
      expect(angleDelta(10, 350)).toBe(20);
    });
    it('90 vs 270 => 180 (opposition orb 0)', () => {
      expect(angleDelta(90, 270)).toBe(180);
    });
    it('120 vs 240 => 120 (trine); 240-120=120, shortest arc 120', () => {
      expect(angleDelta(120, 240)).toBe(120);
    });
    it('120 vs 240 from other direction', () => {
      expect(angleDelta(240, 120)).toBe(120);
    });
    it('0 vs 180 => 180 (opposition orb 0)', () => {
      expect(angleDelta(0, 180)).toBe(180);
    });
  });

  describe('detectAspect', () => {
    it('delta 120 => trine orb 0', () => {
      const r = detectAspect(120);
      expect(r?.type).toBe('trine');
      expect(r?.orb).toBe(0);
    });
    it('delta 180 => opposition orb 0', () => {
      const r = detectAspect(180);
      expect(r?.type).toBe('opposition');
      expect(r?.orb).toBe(0);
    });
  });
});
