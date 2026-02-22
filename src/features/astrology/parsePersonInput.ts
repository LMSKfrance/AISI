/**
 * Parse Person node config into normalized input and warnings.
 */

import type { ParsedPersonInput } from './types';

/** Normalize birth date to ISO (yyyy-mm-dd). Supports dd.mm.yyyy, dd/mm/yyyy, yyyy-mm-dd. */
export function normalizeBirthDateToISO(raw: string): string | null {
  const s = raw.trim();
  if (!s || s.length < 8) return null;
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(s)) return s.slice(0, 10);
  const dot = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(s);
  if (dot) {
    const [, d, m, y] = dot;
    return `${y}-${m!.padStart(2, '0')}-${d!.padStart(2, '0')}`;
  }
  const slash = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (slash) {
    const [, d, m, y] = slash;
    return `${y}-${m!.padStart(2, '0')}-${d!.padStart(2, '0')}`;
  }
  return null;
}

/** Parse time string HH:mm (24h). */
export function parseTimeString(s: string | null | undefined): string | null {
  if (s == null) return null;
  const t = s.trim();
  if (!t) return null;
  if (/^\d{1,2}:\d{2}$/.test(t)) return t;
  return null;
}

/**
 * Parse raw Person node data into ParsedPersonInput.
 * Never throws; returns warnings for missing or invalid fields.
 */
export function parsePersonNodeInput(data: {
  name?: unknown;
  birthDate?: unknown;
  birthTime?: unknown;
  birthPlace?: unknown;
  timezone?: unknown;
}): ParsedPersonInput {
  const warnings: string[] = [];
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const rawDate = data.birthDate != null ? String(data.birthDate).trim() : '';
  const birthDateIso = rawDate ? normalizeBirthDateToISO(rawDate) : null;
  if (rawDate && !birthDateIso) {
    warnings.push('Birth date format not recognized; use YYYY-MM-DD or DD.MM.YYYY.');
  }
  if (!rawDate) {
    warnings.push('Birth date is required for chart calculation.');
  }
  const birthTime = parseTimeString(
    data.birthTime != null ? String(data.birthTime) : null,
  );
  const birthPlace =
    data.birthPlace != null && String(data.birthPlace).trim()
      ? String(data.birthPlace).trim()
      : null;
  const timezone =
    data.timezone != null && String(data.timezone).trim()
      ? String(data.timezone).trim()
      : null;
  const valid = Boolean(birthDateIso);
  return {
    name: name || 'Unnamed',
    birthDateIso,
    birthTime,
    birthPlace,
    timezone,
    warnings,
    valid,
  };
}
