import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
console.log('JWT_SECRET in production:', JWT_SECRET ? 'SET' : 'NOT SET');
console.log('JWT_SECRET length:', JWT_SECRET ? JWT_SECRET.length : 0);

export async function POST(request: Request) {
  // Add request ID for debugging
  const requestId = Math.random().toString(36).substring(7);
  try {
    const { searchParams } = new URL(request.url);
    const forceAdmin = searchParams.get('forceAdmin');
    
    console.log(`[${requestId}] Admin check API called`);
    
    // Temporary: allow forcing admin status for testing
    if (forceAdmin === 'true') {
      console.log(`[${requestId}] Admin check API: forcing admin status for testing`);
      return NextResponse.json({ isAdmin: true });
    }
    
    // Get Authorization header
    const authHeader = request.headers.get('authorization');
    console.log(`[${requestId}] Authorization header:`, authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(`[${requestId}] No valid Authorization header found`);
      return NextResponse.json({ isAdmin: false });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log(`[${requestId}] JWT token received:`, token ? 'present' : 'missing');
    console.log(`[${requestId}] JWT token length:`, token ? token.length : 0);
    console.log(`[${requestId}] JWT token first 20 chars:`, token ? token.substring(0, 20) + '...' : 'none');
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin?: boolean };
      console.log(`[${requestId}] JWT decoded successfully:`, decoded);
      console.log(`[${requestId}] JWT payload isAdmin value:`, decoded.isAdmin);
      console.log(`[${requestId}] JWT payload isAdmin type:`, typeof decoded.isAdmin);
      const isAdmin = decoded.isAdmin === true;
      console.log(`[${requestId}] Final isAdmin result:`, isAdmin);
      console.log(`[${requestId}] Admin check API called, isAdmin:`, isAdmin);
      return NextResponse.json({ isAdmin });
    } catch (jwtError) {
      console.log(`[${requestId}] JWT verification failed:`, jwtError);
      if (jwtError instanceof Error) {
        console.log(`[${requestId}] JWT error name:`, jwtError.name);
        console.log(`[${requestId}] JWT error message:`, jwtError.message);
      }
      return NextResponse.json({ isAdmin: false });
    }
  } catch (error) {
    console.log(`[${requestId}] Admin check API error:`, error);
    return NextResponse.json({ isAdmin: false });
  }
} 