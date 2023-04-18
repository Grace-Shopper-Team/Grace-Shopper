const router = require('express').Router();
const coffeeRouter= require ('./coffee')

// individual api routes
// router.use('/a', require('./a'));
// router.use('/b', require('./b'));
router.use('/coffee', coffeeRouter)


// error handling for non existent routes
router.use(async (req, res, next) => {
  const err = new Error('Cannot find API route!');
  err.status = 404;
  next(err);
});

//

module.exports = router;
