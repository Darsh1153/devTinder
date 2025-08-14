const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills age gender"

// GET all connection requests in loggedIn user.
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
      const userId = req.user._id;
  
      const connections = await ConnectionRequest.find({
        $or: [
          { fromUserId: userId, status: "accepted" },
          { toUserId: userId, status: "accepted" }
        ]
      })
        .populate("fromUserId", "firstName lastName emailId photoUrl about skills") // Only needed fields
        .populate("toUserId", "firstName lastName emailId photoUrl about skills");
  
      res.json(connections);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });



userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hideRepetitiveConnectionUsers = new Set();
        connectionRequests.forEach((req) => {
            hideRepetitiveConnectionUsers.add(req.fromUserId.toString());
            hideRepetitiveConnectionUsers.add(req.toUserId.toString());
        });
        hideRepetitiveConnectionUsers.add(loggedInUser._id.toString());

        const users = await User.find({
            _id: { $nin: Array.from(hideRepetitiveConnectionUsers) }
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        res.json(users);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = userRouter;