const router = require('express').Router()
const User = require('../db/models/User')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username'] //hide all other info
        })
        res.json(users)
    } catch (error) {
        next(error)
    }
})