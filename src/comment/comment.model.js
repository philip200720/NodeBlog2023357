import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post ID is required"]
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    maxLength: [50, "Author cannot exceed 50 characters"]
  },
  content: {
    type: String,
    required: [true, "Comment content is required"],
    maxLength: [500, "Comment cannot exceed 500 characters"]
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false,
  timestamps: true
});

commentSchema.methods.toJSON = function () {
  const { _id, ...comment } = this.toObject();
  comment.id = _id;
  return comment;
};

export default model("Comment", commentSchema);
