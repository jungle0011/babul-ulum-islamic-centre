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
});

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
});

const Article = models.Article || mongoose.model('Article', ArticleSchema);

export default Article; 