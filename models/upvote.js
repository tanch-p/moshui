const mongoose = require("mongoose");

const upvoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    item: { type: mongoose.Schema.Types.ObjectId, required: true },
}, {timestamps: true});

module.exports = mongoose.model("Upvote", upvoteSchema);

