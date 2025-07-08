import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { isAdminAuthenticated } from '@/lib/session';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    if (!isAdminAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const { pinned } = await request.json();
    
    const article = await Article.findById(params.id);
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    article.pinned = pinned;
    await article.save();

    return NextResponse.json({ success: true, pinned: article.pinned });
  } catch (error) {
    console.error('Error updating pin status:', error);
    return NextResponse.json(
      { error: 'Failed to update pin status' },
      { status: 500 }
    );
  }
} 