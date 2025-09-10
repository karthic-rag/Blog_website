import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
