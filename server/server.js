// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");



const userController = require("./controllers/userController")
const jokeController = require("./controllers/jokeController");
const upvoteController = require("./controllers/upvoteController");
const commentController = require("./controllers/commentController")
const replyController = require("./controllers/replyController");

//* CONFIG
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;


//* CONNECT MONGODB
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongodb not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose at " + MONGODB_URI);
});


//* MIDDLEWARE
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// app.use(
//   session({
//     secret: SECRET,
//     resave: false,
//     saveUninitialized:false
//   })
//   )
  
  //* ROUTES MIDDLEWARE
  app.use('/api/users', userController)
  app.use("/api/jokes", jokeController);
  app.use('/api/upvotes', upvoteController)
  // app.use('/api/comments', commentController);
  // app.use('/api/replies', replyController)
 
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});


app.listen(port, () => {
  console.log(`Server is now listening at http://localhost:${port}`);
});
