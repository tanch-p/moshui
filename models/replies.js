const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {recipeId:{},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
    comment: { type: String, required: true },
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
