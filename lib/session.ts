import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '08033928846';
const SESSION_COOKIE = 'babul_admin_session';

export function setAdminSession() {
  cookies().set(SESSION_COOKIE, 'true', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });
}

export function clearAdminSession() {
  cookies().delete(SESSION_COOKIE);
}

export function isAdminAuthenticated() {
  return cookies().get(SESSION_COOKIE)?.value === 'true';
}

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
} 