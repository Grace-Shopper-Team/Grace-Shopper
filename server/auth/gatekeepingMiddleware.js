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

const matchUserId = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
        } else if (user.id !== req.user.id) {
            res.status(403).send('Unauthorized to view this page');
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { requireToken, isAdmin, matchUserId }
