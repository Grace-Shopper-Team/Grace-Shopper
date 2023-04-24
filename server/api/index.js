const router = require('express').Router();
const coffeeRouter = require('./coffee');
const authRouter = require('../auth/auth.router');

router.use('/coffee', coffeeRouter);
router.use('/users', authRouter);
router.use('/cart', require('./cart'));
router.use('/order', require('./order'));

// error handling for non existent routes
router.use(async (req, res, next) => {
  const err = new Error('Cannot find API route!');
  err.status = 404;
  next(err);
});

module.exports = router;

