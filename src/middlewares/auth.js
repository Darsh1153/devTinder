const auth = (req, res, next) =>{
    const token = "xyz";
    const isAuthenticated = token === "xyz";
    if(!isAuthenticated){
        res.status(401).send("Unauthorized user");
    }else{
        next();
    }
}

const userData = (req, res, next) => {
    const token = "xyz";
    const isAuthenticated = token === "xydhwz";
    if(!isAuthenticated){
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

module.exports = {
    auth,
    userData,
}