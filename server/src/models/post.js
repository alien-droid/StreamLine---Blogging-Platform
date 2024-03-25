import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Optional: reference to user who posted the comment
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  comments: [commentSchema],
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export { Post, Comment };