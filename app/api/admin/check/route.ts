import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceAdmin = searchParams.get('forceAdmin');
    
    // Temporary: allow forcing admin status for testing
    if (forceAdmin === 'true') {
      console.log('Admin check API: forcing admin status for testing');
      return NextResponse.json({ isAdmin: true });
    }
    
    const isAdmin = isAdminAuthenticated();
    console.log('Admin check API called, isAdmin:', isAdmin);
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.log('Admin check API error:', error);
    return NextResponse.json({ isAdmin: false });
  }
} 