require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure user is logged in - authentication
exports.loginRequired = function(req, res, next) { // not async because jwt uses callbacks..
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer xxxxx
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please login first"
                });
            }
        });
    } catch (error) {
        return next({
            status: 401,
            message: "Please login first"
        });
    }
}

// correct user - authorization
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer xxxxx
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        })
    } catch (error) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}