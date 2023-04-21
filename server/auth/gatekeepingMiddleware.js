const User = require('../db/models/User');

const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

const isAdmin = async (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).send("Unauthorized to view this page");
    } else {
        next();
    }
}

module.exports = { requireToken, isAdmin }