const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    item: { type: mongoose.Schema.Types.ObjectId, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);
