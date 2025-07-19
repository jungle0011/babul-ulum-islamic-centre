import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    await connectDB();
    // JWT admin check
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
    }
    let isAdmin = false;
    try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin?: boolean };
      isAdmin = !!decoded.isAdmin;
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    const article = await Article.findById(params.id);
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    // Check for parentId query param
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    if (parentId) {
      // Delete a reply (nested comment)
      // Recursively find the parent comment and remove the reply from its replies array
      function deleteReply(comments, parentId, replyId) {
        for (let comment of comments) {
          if (comment._id && comment._id.toString() === parentId && Array.isArray(comment.replies)) {
            const idx = comment.replies.findIndex(r => r._id && r._id.toString() === replyId);
            if (idx !== -1) {
              comment.replies.splice(idx, 1);
              return true;
            }
          }
          if (comment.replies && comment.replies.length > 0) {
            const found = deleteReply(comment.replies, parentId, replyId);
            if (found) return true;
          }
        }
        return false;
      }
      const deleted = deleteReply(article.comments, parentId, params.commentId);
      if (!deleted) {
        return NextResponse.json({ error: 'Reply not found' }, { status: 404 });
      }
      article.markModified('comments');
      await article.save();
      return NextResponse.json({ success: true });
    } else {
      // Delete a top-level comment (existing logic)
      const commentIndex = article.comments.findIndex(
        (comment: any) => comment._id && comment._id.toString() === params.commentId
      );
      if (commentIndex === -1) {
        return NextResponse.json(
          { error: 'Comment not found' },
          { status: 404 }
        );
      }
      article.comments.splice(commentIndex, 1);
      await article.save();
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

// Helper to recursively find the parent comment and its array
interface CommentDoc {
  _id?: any;
  replies?: CommentDoc[];
  [key: string]: any;
}
function findParentAndArray(comments: CommentDoc[], parentId: string): { parent: CommentDoc, array: CommentDoc[] } | null {
  for (let comment of comments) {
    if (comment._id && comment._id.toString() === parentId) {
      return { parent: comment, array: comments };
    }
    if (comment.replies && comment.replies.length > 0) {
      const found = findParentAndArray(comment.replies, parentId);
      if (found) return found;
    }
  }
  return null;
}

// Find the path to the parent for markModified
function findPath(comments: CommentDoc[], parentId: string, basePath: string): string | null {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment._id && comment._id.toString() === parentId) {
      return basePath + `.${i}.replies`;
    }
    if (comment.replies && comment.replies.length > 0) {
      const subPath = findPath(comment.replies, parentId, basePath + `.${i}.replies`);
      if (subPath) return subPath;
    }
  }
  return null;
}

// Add reply to a comment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    await connectDB();
    const { content, isAdmin } = await request.json();
    const article = await Article.findById(params.id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    const reply = {
      name: isAdmin ? 'Admin' : 'Anonymous',
      content,
      date: new Date(),
      userId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      isAdmin,
      replies: [],
    };
    const found = findParentAndArray(article.comments, params.commentId);
    if (!found) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    found.parent.replies = found.parent.replies || [];
    found.parent.replies.push(reply);
    // Mark the path as modified for Mongoose
    const modifiedPath = findPath(article.comments, params.commentId, 'comments');
    if (modifiedPath) {
      article.markModified(modifiedPath);
    } else {
      article.markModified('comments');
    }
    console.log('COMMENTS BEFORE SAVE:', JSON.stringify(article.comments, null, 2));
    await article.save();
    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error('Error replying to comment:', error);
    return NextResponse.json({ error: 'Failed to reply to comment' }, { status: 500 });
  }
} 