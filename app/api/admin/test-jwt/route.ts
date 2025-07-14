import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    
    console.log('=== JWT TEST ENDPOINT ===');
    console.log('JWT_SECRET set:', JWT_SECRET ? 'YES' : 'NO');
    console.log('JWT_SECRET length:', JWT_SECRET ? JWT_SECRET.length : 0);
    console.log('JWT_SECRET first 10 chars:', JWT_SECRET ? JWT_SECRET.substring(0, 10) + '...' : 'NONE');
    console.log('Token provided:', token ? 'YES' : 'NO');
    console.log('Token length:', token ? token.length : 0);
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Token decoded successfully:', decoded);
      return NextResponse.json({ 
        success: true, 
        decoded,
        isAdmin: (decoded as any).isAdmin,
        secretUsed: JWT_SECRET.substring(0, 10) + '...'
      });
    } catch (jwtError) {
      console.log('Token verification failed:', jwtError);
      return NextResponse.json({ 
        error: 'JWT verification failed',
        details: jwtError instanceof Error ? jwtError.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.log('Test endpoint error:', error);
    return NextResponse.json({ error: 'Internal error' });
  }
} 