const express = require("express");
const router = express.Router();
const Joke = require("../models/jokes.js");
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

//! get
router.get("/", async (req, res) => {
  try {
    const allJokes = await Joke.find({})
      .populate("upvotes", "upvote")
      .sort({ date: -1 })
      .limit(20);
    res.status(200).json({
      status: "ok",
      message: "successfully get all jokes",
      data: allJokes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "not ok",
      message: "get jokes request failed ",
      error: error,
    });
  }
});

//! New Joke
router.post("/new", authenticateToken, async (req, res) => {
  console.log(req.body);
  const userId = req.user.userId;
  try {
    const newJoke = await Joke.create({
      setup: req.body.setup,
      punchline: req.body.punchline,
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

//READ a recipe
router.get("/:id", async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id).populate(
      "author",
      "username"
    );
    res.status(200).json({
      status: "ok",
      message: "one recipe fetched ",
      data: foundRecipe,
    });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: "fail to fetch the requested recipe ",
      error: error,
    });
  }
});

//DELETE a recipe
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .json({ status: "ok", message: "recipe deleted", data: deletedRecipe });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: "fail to delete recipe ",
      error: error,
    });
  }
});

//UPDATE a recipe details
router.put("/:id", authenticateToken, async (req, res) => {
  //validate req.body
  const input = req.body;
  const { error } = NewRecipeValidationSchema.validate({
    name: input.name,
    description: input.description,
    servings: input.servings,
    duration: input.duration,
    // tags: input.tags
  });
  if (error) {
    res
      .status(400)
      .json({ status: "not ok", message: "fail to update the recipe ", error });
  } else {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({ status: "ok", message: "recipe updated", data: updatedRecipe });
    } catch (err) {
      res.status(400).json({
        status: "not ok",
        message: "fail to update recipe ",
        error: err,
      });
    }
  }
});

module.exports = router;
