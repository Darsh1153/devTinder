const isAuthenticated = (req, res, next) => {
    const token = "xyz";
    const isAuthenticatedValue = token === "xyz";
    if(!isAuthenticatedValue){
        res.status(401).send("unauthorized user :(");
    }else{
        next();
    }
}
module.exports = isAuthenticated;