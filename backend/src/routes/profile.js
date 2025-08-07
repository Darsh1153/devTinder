const express = require("express");
const userAuth = require("../middlewares/auth");
const { validateAllowedFields } = require("../utils/validations");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {

    const user = req.user;
    console.log(user);

    res.send(user);
})

profileRouter.patch("/profile/edit", userAuth, (req, res) => {
    const isValid = validateAllowedFields(req);
    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
    console.log(loggedInUser);
})


module.exports = profileRouter;