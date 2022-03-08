const express = require("express");
const router = express.Router();
const Joke = require("../models/jokes.js");
const jwt = require("jsonwebtoken");

//MIDDLEWARE
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (token === undefined) return res.sendStatus(401);
  // console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//! New Joke
router.post("/new", authenticateToken, async (req, res) => {
  console.log(req.body);
  const userId = req.user.userId;
  try {
    const newJoke = await Joke.create({
      setup: req.body.setup,
      punchline: req.body.punchline,
      tags: req.body.tags,
      author: userId,
    });
    res.status(200).json({
      status: "ok",
      message: "new joke created",
      data: newJoke,
    }); // .json() will send proper headers in response so client knows it's json coming back
  } catch (err) {
    res.status(400).json({
      status: "not ok",
      message: "joke creation request failed",
      error: err,
    });
  }
});

//! get all
router.get("/", async (req, res) => {
  try {
    const allJokes = await Joke.find({})
      .populate("upvotes", "upvote")
      .sort({ date: -1 })
      .limit(20);
    res.status(200).json({
      message: "successfully get all jokes",
      data: allJokes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "get jokes request failed ",
      error: error,
    });
  }
});

//! get one
router.get("/:id", async (req, res) => {
  try {
    const oneJoke = await Joke.findById(req.params.id).populate(
      "upvotes",
      "upvote"
    );
    res.status(200).json({
      message: "successfully get one joke",
      data: oneJoke,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "get joke request failed ",
      error: error,
    });
  }
});

module.exports = router;
