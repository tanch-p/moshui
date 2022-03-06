const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const {
	JoinValidationSchema,
	LoginValidationSchema,
} = require("../validation");
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

//  MIDDLEWARE
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

//CREATE a new user
router.post("/new", async (req, res) => {
	//validation
	// const { error, value } = JoinValidationSchema.validate(req.body)
	if (false) {
		res.status(400).json({
			status: "not ok",
			message: "Failed to create account, kindly enter the correct format",
			error,
		});
	} else {
		//encrypt password
		req.body.password = bcrypt.hashSync(
			req.body.password,
			bcrypt.genSaltSync(10)
		);
		const newUserInput = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		};
		try {
			const createdUser = await User.create(newUserInput);
			//console.log("created user is: ", createdUser);
			res
				.status(200)
				.json({ status: "ok", message: "user created", data: createdUser });
		} catch (err) {
			res.status(400).json({
				status: "not ok",
				message:
					"Failed to create account, kindly check if the email is already registered. ",
				error: err,
			});
		}
	}
});

//GET, to check if email already exist

router.get("/login/:emailID", async (req, res) => {
	const { emailID } = req.params;
	console.log("emailID", emailID);
	try {
		const foundUser = await User.findOne({ email: emailID });
		if (foundUser) {
			res.status(200).json({
				status: "ok",
				message: "fetched an account under this email ",
			});
		} else {
			res.status(400).json({
				status: "not ok",
				message: "Fail To fetch any account under this email ",
				error: err,
			});
		}
	} catch (err) {
		res.status(400).json({
			status: "not ok",
			message: "Fail To fetch any account under this email ",
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
		console.log("foundUser", foundUser);
		if (!foundUser) {
			res.status(403).json({
				status: "not ok",
				message: "Email And/Or Password are not valid",
			});
		} else {
			const result = await bcrypt.compare(password, foundUser.password);
			if (result) {
				const accessToken = jwt.sign(
					{ userid: foundUser._id, username: foundUser.username },
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

//READ INDIVIDUAL USER

router.get("/:userID", authenticateToken, async (req, res) => {
	const { userID } = req.params;
	//TODO: add  a if condition req.session.currentUser.id === userID to make sure user can only access their own data, not other user
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
router.put("/:userID/addFavorite", async (req, res) => {
	const { userID } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			userID,
			{
				$addToSet: { favorites: [req.body.recipeID] },
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ status: "ok", message: "favourite added", data: updatedUser });
	} catch (error) {
		res.status(400).json({
			status: "not ok",
			message: "fail to add favorite",
			error: error,
		});
	}
});

//UPDATE user remove a favourite
router.put("/:userID/removeFavorite", async (req, res) => {
	const { userID } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			userID,
			{
				$pull: { favorites: req.body.recipeID },
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ status: "ok", message: "favourite removed", data: updatedUser });
	} catch (error) {
		res.status(400).json({
			status: "not ok",
			message: "fail to remove favorite",
			error: error,
		});
	}
});

//Update use add a post
router.put("/:userID/addPost", async (req, res) => {
	const { userID } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			userID,
			{
				$addToSet: { posts: [req.body.recipeID] },
			},
			{ new: true }
		);
		res.status(200).json({
			status: "ok",
			message: "recipeID added to user posts",
			data: updatedUser,
		});
	} catch (error) {
		res.status(400).json({
			status: "not ok",
			message: "fail to add recipeID to user posts",
			error: error,
		});
	}
});

//Update user remove a post
router.put("/:userID/removePost", async (req, res) => {
	const { userID } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			userID,
			{
				$pull: { posts: req.body.recipeID },
			},
			{ new: true }
		);
		console.log("updatedUser", updatedUser);
		res.status(200).json({
			status: "ok",
			message: "recipeID removed from user posts",
			data: updatedUser,
		});
	} catch (error) {
		res.status(400).json({
			status: "not ok",
			message: "fail to remove recipeID from user posts",
			error: error,
		});
	}
});

//Get user favorite
router.get("/:userID/favorite", async (req, res) => {
	const { userID } = req.params;
	try {
		const favRecipes = await User.findById({ _id: userID }).populate({
			path: "favorites",
			select: ["name", "description", "image"],
		});
		//console.log('favRecipes',favRecipes)
		res.status(200).json({
			status: "ok",
			message: "favorite recipes details fetched",
			data: favRecipes,
		});
	} catch (error) {
		res.status(400).json({
			status: "not ok",
			message: "fail to fetch favorite recipes",
			error: error,
		});
	}
});

//Get user posts
router.get("/:userID/posts", async (req, res) => {
	const { userID } = req.params;
	try {
		const allPosts = await User.findById({ _id: userID }).populate({
			path: "posts",
			select: ["name", "description", "image"],
		});
		res.status(200).json({
			status: "ok",
			message: "posted recipes fetched",
			data: allPosts,
		});
	} catch (error) {
		res.status(400).json({
			status: "not ok",
			message: "fail to fetch posted recipes",
			error: error,
		});
	}
});

//DELETE a user
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

//DELETE a user favourite aka when the user remove a recipe from their favourite

module.exports = router;
