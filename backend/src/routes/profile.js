const express = require("express");
const userAuth = require("../middlewares/auth");
const { validateAllowedFields } = require("../utils/validations");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {

    const user = req.user;
    console.log(user);

    res.send(user);
})

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
    try {
        // if(!validateAllowedFields(req)){
        //     throw new Error("Invalid edit request");
        // }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        })
    } catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = profileRouter;