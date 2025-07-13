import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials } from '@/lib/session';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (validateAdminCredentials(username, password)) {
    const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '1d' });
    return NextResponse.json({ success: true, token });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
} 