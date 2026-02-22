/**
 * Simple admin auth for /admin. Credentials: admin / admin
 * Session stored in sessionStorage (cleared when tab closes).
 */

const ADMIN_USER = 'admin';
const ADMIN_PASS = '123';
const STORAGE_KEY = 'aisi_admin_session';

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(STORAGE_KEY, '1');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isAdmin(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}
