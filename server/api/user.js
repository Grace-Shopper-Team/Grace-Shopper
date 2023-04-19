const router = require('express').Router();
const User = require('../db/models/User');

router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
