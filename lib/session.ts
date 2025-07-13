import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '08033928846';
const SESSION_COOKIE = 'babul_admin_session';

export function setAdminSession() {
  console.log('Setting admin session cookie');
  cookies().set(SESSION_COOKIE, 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  console.log('Admin session cookie set');
}

export function clearAdminSession() {
  console.log('Clearing admin session cookie');
  cookies().delete(SESSION_COOKIE);
}

export function isAdminAuthenticated() {
  const cookie = cookies().get(SESSION_COOKIE);
  console.log('Checking admin session cookie:', cookie);
  const isAdmin = cookie?.value === 'true';
  console.log('isAdminAuthenticated result:', isAdmin);
  return isAdmin;
}

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
} 