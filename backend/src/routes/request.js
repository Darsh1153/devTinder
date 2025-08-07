const express = require("express");
const userAuth = require("../middlewares/auth");

const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { Connection, connection } = require("mongoose");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const toUser = req.params.toUserId;
        const status = req.params.status;


        const toUserIdExists = await User.findById(toUser);
        if(!toUserIdExists){
            res.status(400).send("Invalid request sent");
        }

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.send("Invalid request");
        }

        const existingConnection = await ConnectionRequest.findOne({
            $or: [
                {loggedInUser: loggedInUser},
                {loggedInUser: toUser, toUser: loggedInUser},
            ]
        })
        if(existingConnection){
            res.status(400).send("Invalid request as already existing in database");
        }

        const connectionRequest = new ConnectionRequest(
            {
                fromUserId: loggedInUser,
                toUserId: toUser,
                status: status,
            }
        )
        const data = await connectionRequest.save();
        // console.log(data);
        res.json({
            message: req.user.firstName+" is "+status+" in "+toUserIdExists.firstName,
            data
        })
    }
    catch (err) {
        res.status(400).send("ERROR: " + err);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({message: "Status not allowed"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            fromUserId: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })
        if(!connectionRequest){
            res.status(404).json({message: "Connection request not found"});
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ message: "Connection request " + status, data});
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})


module.exports = requestRouter;