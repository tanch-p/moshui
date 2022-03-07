const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema(
  {
    setup: {
      type: String,
      required: true,
    },
    punchline: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Upvote",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Joke", jokeSchema);
