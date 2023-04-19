const router = require('express').Router();
const coffeeRouter = require('./coffee');

router.use('/coffee', coffeeRouter);
<<<<<<< HEAD
router.use('/cart', require('./cart'));
=======
router.use('/b', require('./b'));
>>>>>>> 62881b6b1ec7f2e48fe8502b4f1c94e89d959109

// error handling for non existent routes
router.use(async (req, res, next) => {
  const err = new Error('Cannot find API route!');
  err.status = 404;
  next(err);
});

module.exports = router;
