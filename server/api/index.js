const router = require('express').Router();
const coffeeRouter = require('./coffee');

router.use('/coffee', coffeeRouter);
router.use('/b', require('./b'));

// error handling for non existent routes
router.use(async (req, res, next) => {
  const err = new Error('Cannot find API route!');
  err.status = 404;
  next(err);
});

//

module.exports = router;
