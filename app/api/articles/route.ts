import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET() {
  await dbConnect();
  const articles = await Article.find().sort({ date: -1 });
  // Ensure every article has a media field (default to empty array if missing)
  const articlesWithMedia = articles.map(article => ({
    ...article.toObject(),
    media: Array.isArray(article.media) ? article.media : [],
  }));
  return NextResponse.json(articlesWithMedia);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const { title, content, media, type, tags, author, authorAvatar, pinned } = data;
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
  }
  const article = await Article.create({
    title,
    content,
    media: media || [],
    type,
    tags,
    author,
    authorAvatar,
    pinned,
  });
  return NextResponse.json(article, { status: 201 });
}
