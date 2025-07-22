const express = require("express");

const app = express();

// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params);
//     res.send({firstname: "Darshan", lastname: "Sharma"})
// })

// app.post("/test", (req, res) => {

//     res.send("data stored inside db");
// })


app.use("/user", [(req, res, next) => {
    console.log("user response 1");
    next();
    // res.send("user response 1");
},
(req, res, next) => {
    console.log("user response 2");
    // res.send("user response 2");
    next();
}],
(req, res, next) => {
    console.log("user response 3");
    res.send("user response 3");
    next();
})


app.listen(7777, () => {
    console.log("Server is running on port 7777");
})