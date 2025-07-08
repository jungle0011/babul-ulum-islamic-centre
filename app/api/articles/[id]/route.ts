import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { isAdminAuthenticated } from '@/lib/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const article = await Article.findById(params.id);
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const data = await req.json();
  const { title, content, imageUrl, videoUrl, type, tags, author, authorAvatar, pinned } = data;
  const article = await Article.findByIdAndUpdate(
    params.id,
    { title, content, imageUrl, videoUrl, type, tags, author, authorAvatar, pinned },
    { new: true }
  );
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const article = await Article.findByIdAndDelete(params.id);
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
} 