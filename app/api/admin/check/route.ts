import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceAdmin = searchParams.get('forceAdmin');
    
    // Temporary: allow forcing admin status for testing
    if (forceAdmin === 'true') {
      console.log('Admin check API: forcing admin status for testing');
      return NextResponse.json({ isAdmin: true });
    }
    
    // Get Authorization header
    const authHeader = request.headers.get('authorization');
    console.log('Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid Authorization header found');
      return NextResponse.json({ isAdmin: false });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('JWT token received:', token ? 'present' : 'missing');
    console.log('JWT token length:', token ? token.length : 0);
    console.log('JWT token first 20 chars:', token ? token.substring(0, 20) + '...' : 'none');
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin?: boolean };
      console.log('JWT decoded successfully:', decoded);
      const isAdmin = decoded.isAdmin === true;
      console.log('Admin check API called, isAdmin:', isAdmin);
      return NextResponse.json({ isAdmin });
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError);
      if (jwtError instanceof Error) {
        console.log('JWT error name:', jwtError.name);
        console.log('JWT error message:', jwtError.message);
      }
      return NextResponse.json({ isAdmin: false });
    }
  } catch (error) {
    console.log('Admin check API error:', error);
    return NextResponse.json({ isAdmin: false });
  }
} 