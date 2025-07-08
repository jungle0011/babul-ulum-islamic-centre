import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/session';

export async function GET() {
  try {
    const isAdmin = isAdminAuthenticated();
    return NextResponse.json({ isAdmin });
  } catch (error) {
    return NextResponse.json({ isAdmin: false });
  }
} 