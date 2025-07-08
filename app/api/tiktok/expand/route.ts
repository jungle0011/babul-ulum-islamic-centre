import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || !url.startsWith('https://vm.tiktok.com/')) {
      return NextResponse.json({ error: 'Invalid TikTok short link.' }, { status: 400 });
    }
    // Follow the redirect to get the full URL
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    const expandedUrl = res.url;
    if (!expandedUrl.includes('tiktok.com/@')) {
      return NextResponse.json({ error: 'Could not expand TikTok link.' }, { status: 400 });
    }
    return NextResponse.json({ expandedUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to expand TikTok link.' }, { status: 500 });
  }
} 