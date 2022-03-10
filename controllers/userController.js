const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Joke = require("../models/jokes.js");
const jwt = require("jsonwebtoken");
const {
  JoinValidationSchema,
  LoginValidationSchema,
} = require("../validation");
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

//MIDDLEWARE
const authenticateToken = require("../jwtAuth");

//CREATE a new user
router.post("/new", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  const newUserInput = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await User.create(newUserInput);
    //console.log("created user is: ", createdUser);
    res
      .status(200)
      .json({ status: "ok", message: "user created", data: newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "not ok",
      message:
        "Failed to create account, kindly check if the email is already registered. ",
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  //validate req.body

  //then check username and password against database
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username: username });
    // console.log("in user route foundUser", foundUser);
    if (!foundUser) {
      res.status(403).json({
        message: "Email And/Or Password are not valid",
      });
    } else {
      const result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        const accessToken = jwt.sign(
          {
            userId: foundUser._id,
            username: foundUser.username,
            rights: foundUser.rights,
          },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1800s",
          }
        );

        res.status(200).json({
          status: "ok",
          message: "Successfully logged in",
          data: accessToken,
        });
      } else {
        res.status(403).json({
          status: "not ok",
          message: "Email And/Or Password Is Invalid",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: "not ok", message: "Fail To Log In User ", error: err });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({
        status: "not ok",
        message: "logout was unsuccessful",
        error: error,
      });
    } else {
      res.status(200).json({ status: "ok", message: "logout was successful" });
    }
  });
});

//UPDATE a user credentials
router.put("/:userID", authenticateToken, async (req, res) => {
  const { userID } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      },
      { new: true }
    );
    res
      .status(200)
      .json({ status: "ok", message: "user info updated", data: updatedUser });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: "fail to update user info",
      error: error,
    });
  }
});

//UPDATE user add a favourite
router.put("/addFavorite/:item", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { item } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favorites: [item] },
      },
      { new: true }
    );
    res.status(200).json({ message: "favourite added" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "favorite request failed",
      error: error,
    });
  }
});

router.put("/removeFavorite/:item", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { item } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favorites: [item] },
      },
      { new: true }
    );
    res.status(200).json({ message: "favourite removed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "favorite request failed",
      error: error,
    });
  }
});

//! get user jokes
router.get("/jokes/:username", async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const user = await User.find({ username: username }).populate("jokes");
    console.log(user);
    // if (!user) {
    //   res.status(400).json('User not found')
    // } else {
    //   const allJokes = await Joke.find({ author: user._id });
    res.status(200).json({
      message: "successfully found all jokes by user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "user jokes fetch request failed",
      error: error,
      data: "test",
    });
  }
});

//! Delete user
router.delete("/:userID", authenticateToken, async (req, res) => {
  const { userID } = req.params;
  try {
    const updatedUser = await User.findOneAndDelete({ _id: userID });
    res
      .status(200)
      .json({ status: "ok", message: "user deleted", data: updatedUser });
  } catch (error) {
    res.status(400).json({
      status: "not ok",
      message: "fail to delete user ",
      error: error,
    });
  }
});

router.get("/:user/favorites", authenticateToken, async (req, res) => {
  const { user } = req.params;
  // console.log(req.user.username)
  // console.log(user)
  if (req.user.username !== user) {
    res.status(401);
  }
  try {
    const foundUser = await User.findOne({ _id: req.user.userId }).populate('favorites');
    res
      .status(200)
      .json({ status: "ok", message: "user found", data: foundUser });
  } catch (error) {
    res
      .status(400)
      .json({ status: "not ok", message: "fail to find user ", error: error });
  }
});

//READ INDIVIDUAL USER

router.get("/:userID", authenticateToken, async (req, res) => {
  const { userID } = req.params;
  try {
    const foundUser = await User.findOne({ _id: userID });
    res
      .status(200)
      .json({ status: "ok", message: "user found", data: foundUser });
  } catch (error) {
    res
      .status(400)
      .json({ status: "not ok", message: "fail to find user ", error: error });
  }
});

module.exports = router;
