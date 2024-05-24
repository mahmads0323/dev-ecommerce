import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    userId: {
      type: String,
    },
    productId: {
      type: String,
    },
    userName: {
        type: String
    }
  },
  { timestamps: true }
);

const COMMENT = mongoose.model("comment", commentSchema);

export default COMMENT;
