const express = require("express");
const router = express.Router();
const Upvote = require("../models/upvote.js");
const Joke = require("../models/jokes.js");
const User = require("../models/users.js");
const jwt = require("jsonwebtoken");

//MIDDLEWARE
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (token === undefined) return res.sendStatus(401);
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//!create
router.post("/new", authenticateToken, async (req, res) => {
  console.log("upvote", req.body);
  const userId = req.user.userId;
  const itemId = req.body.id;
  switch (req.body.item) {
    case "joke":
      try {
        const newUpvote = await Upvote.create({
          userId: userId,
          item: itemId,
        });
        const updatedJoke = await Joke.findByIdAndUpdate(
          itemId,
          { $push: { upvotes: newUpvote._id } },
          { new: true, upsert: true }
        );
        console.log(updatedJoke);

        res.status(200).json({
          message: "sucessfully upvoted",
        });
      } catch (error) {
        res.status(400).json({
          error: error,
        });
      }
      break;

    default:
      res.status(400).json({
        status: "upvote request failed",
        message: "invalid item",
      });
  }
});

//!delete
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRating = await Rating.findByIdAndDelete(id);
    res.status(200).json({
      message: "delete rating route is working",
      data: deletedRating,
    });
  } catch (error) {
    console.log(error);
  }
});

//!update
router.put("/", authenticateToken, async (req, res) => {
  console.log("req body", req.body);
  const { id, rating } = req.body;
  try {
    const editedRating = await Rating.findByIdAndUpdate(
      id,
      { rating: rating },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "ok",
      message: "update rating route is working",
      data: editedRating,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "failed to update rating",
    });
  }
});

//!get
router.post("/", async (req, res) => {
  const userId = req.body?.userId;
  const recipeId = req.body?.recipeId;
  // console.log(req.body);
  try {
    const foundRating = await Rating.findOne({
      userId: userId,
      recipeId: recipeId,
    });
    // console.log(foundRating);
    let message = "rating found";
    if (!foundRating) {
      message = "no rating found for this recipe & user";
    }

    res.status(200).json({
      status: "ok",
      message: message,
      data: foundRating ?? 0,
    });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: "rating not found",
      error: error,
    });
  }
});

//!get
router.get("/:id/:user", async (req, res) => {
  const itemId = req.params.id;
  const user = jwt.decode(req.params.user).userId;
  // console.log(user);
  // console.log(itemId);
  try {
    const foundUpvote = await Upvote.findOne({
      userId: user,
      item: itemId,
    });

    let message = "upvote for user and item successfully found";
    if (!foundUpvote) {
      message = "no upvote found for this item & user";
    }
    res.status(200).json({
      message: message,
      data: foundUpvote ?? false,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "finding upvote for user failed",
      error: error,
    });
  }
});

module.exports = router;
