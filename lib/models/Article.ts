import mongoose, { Schema, models } from 'mongoose';

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: false, // For anonymous comments
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Add recursive replies after schema definition
CommentSchema.add({ replies: [CommentSchema] });

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
    default: [],
  },
  author: {
    type: String,
    required: false,
  },
  authorAvatar: {
    type: String,
    required: false,
  },
  pinned: {
    type: Boolean,
    required: false,
    default: false,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
  media: {
    type: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
      }
    ],
    default: [],
  },
});

const Article = models.Article || mongoose.model('Article', ArticleSchema);

export default Article; 