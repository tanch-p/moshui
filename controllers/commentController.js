const express = require("express");
const router = express.Router();
const Comment = require("../models/comments.js");

//MIDDLEWARE
const authenticateToken = require("../jwtAuth");

//!create
router.post("/new", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const item = req.body.item;
  const parent = req.body.parent;
  console.log('item',item)
  try {
    const newComment = await Comment.create({
      author: userId,
      item: item,
      parent: parent,
      comment: req.body.comment,
    });
    const populatedComment = await Comment.findById(newComment._id).populate(
      "author"
    );
    res.status(200).json({
      status: "ok",
      message: "comment successfully created",
      data: populatedComment,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "not ok",
      message: error,
    });
  }
});

//!delete
router.put("/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const editedComment = await Comment.findByIdAndUpdate(
      id,
      { comment: req.body.comment, deleted: true },
      {
        new: true,
      }
    ).populate("userId", "username");
    res.status(200).json({
      status: "ok",
      message: "delete Comment route is working",
      data: editedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to delete Comment",
    });
  }
});
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedComment = await Comment.findByIdAndDelete(id);
//     res.status(200).json({
//       status: "ok",
//       message: "delete individual comment route is working",
//       data: deletedComment,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//!update
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const editedComment = await Comment.findByIdAndUpdate(
      id,
      { comment: req.body.comment, edited: true },
      {
        new: true,
      }
    ).populate("userId", "username");
    res.status(200).json({
      status: "ok",
      message: "update Comment route is working",
      data: editedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to update Comment",
    });
  }
});

//!get
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundComment = await Comment.find({
      item: id,
    }).populate("author");
    console.log(foundComment);
    let message = "comments retrieved";
    if (!foundComment) {
      message = "no comments";
    }

    res.status(200).json({
      message: message,
      data: foundComment,
    });
  } catch (error) {
    res.status(400).json({
      message: "get comment request failed",
      error: error,
    });
  }
});

module.exports = router;
