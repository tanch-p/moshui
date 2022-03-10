const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    jokes: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Joke" },
    ],
    upvotes: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Upvote" },
    ],
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Joke" },
    ],
    rights: {
      type: String,
      default: "user",
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
