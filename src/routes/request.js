const express = require("express");
const userAuth = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + "Connection sent");
})



module.exports = requestRouter;