import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET() {
  await dbConnect();
  const articles = await Article.find().sort({ date: -1 });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const { title, content, imageUrl, videoUrl, type, tags, author, authorAvatar, pinned } = data;
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
  }
  const article = await Article.create({
    title,
    content,
    imageUrl,
    videoUrl,
    type,
    tags,
    author,
    authorAvatar,
    pinned,
  });
  return NextResponse.json(article, { status: 201 });
} 