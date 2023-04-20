const router = require('express').Router();
const Coffee = require('../db/models/Coffee');

router.get('/', async (req, res, next) => {
  try {
    const getAllCoffee = await Coffee.findAll();
    res.send(getAllCoffee);
  } catch (error) {
    console.error('error getting all coffee', error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const getSingleCoffee = await Coffee.findByPk(req.params.id);
    res.send(getSingleCoffee);
  } catch (error) {
    console.error('error getting single coffee', error);
    next(error);
  }
});


router.put('/:bId', async (req, res, next) => {});

router.delete('/:bId', async (req, res, next) => {});

module.exports = router;
