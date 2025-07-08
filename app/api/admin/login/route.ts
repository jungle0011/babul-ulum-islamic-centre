import { NextRequest, NextResponse } from 'next/server';
import { setAdminSession, validateAdminCredentials } from '@/lib/session';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (validateAdminCredentials(username, password)) {
    setAdminSession();
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
} 