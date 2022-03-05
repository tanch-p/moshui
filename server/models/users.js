const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
