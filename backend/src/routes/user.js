const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills age gender"

// GET all connection requests in loggedIn user.
userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName"]);
        res.json({ connectionRequests: connectionRequests });
    }
    catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message });
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", ["firstName", "lastName"]);
        res.json({ connectionLists: connections });
    } catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message });
    }
})

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