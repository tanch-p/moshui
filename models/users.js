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
    upvotes: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Upvote"}],
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Favorite" },
    ],
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
