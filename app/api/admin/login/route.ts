import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials } from '@/lib/session';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (validateAdminCredentials(username, password)) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('babul_admin_session', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
      // secure: process.env.NODE_ENV === 'production', // can add back later if needed
    });
    return res;
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
} 