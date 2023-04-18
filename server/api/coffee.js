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

router.post('/', async (req, res, next) => {});

router.put('/:aId', async (req, res, next) => {});

router.delete('/:aId', async (req, res, next) => {});

module.exports = router;
