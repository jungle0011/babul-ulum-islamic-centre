import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '08033928846';
const SESSION_COOKIE = 'babul_admin_session';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set!');
}

export function setAdminSession() {
  console.log('Setting admin session cookie');
  cookies().set(SESSION_COOKIE, 'true', { 
    httpOnly: true, 
    path: '/', 
    maxAge: 60 * 60 * 24,
    sameSite: 'lax'
  });
  console.log('Admin session cookie set');
}

export function clearAdminSession() {
  console.log('Clearing admin session cookie');
  cookies().delete(SESSION_COOKIE);
}

export function isAdminAuthenticated(req?: any) {
  console.log('isAdminAuthenticated called');
  console.log('JWT_SECRET in isAdminAuthenticated:', JWT_SECRET);
  if (req && req.headers) {
    const authHeader = req.headers.get ? req.headers.get('authorization') : req.headers['authorization'];
    console.log('Authorization header in isAdminAuthenticated:', authHeader);
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET!);
        if (decoded && typeof decoded === 'object' && decoded.isAdmin === true) {
          return true;
        }
      } catch (err) {
        console.log('JWT verification failed:', err, 'Token:', token, 'Secret:', JWT_SECRET);
        return false;
      }
    }
  }
  // Fallback: legacy cookie-based auth
  const cookie = cookies().get(SESSION_COOKIE);
  const isAdmin = cookie?.value === 'true';
  return isAdmin;
}

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
} 