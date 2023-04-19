const router = require('express').Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const Coffee = require('../db/models/Coffee');

CartItem.belongsTo(Coffee, {
  foreignKey: 'productId',
});

router.get('/', async (req, res, next) => {
  try {
    const getAll = await Cart.findAll();
    res.send(getAll);
  } catch (error) {
    console.error('error getting all product in cart', error);
    next(error);
  }
});

router.get('/:cartID', async (req, res, next) => {
  try {
    const getAll = await CartItem.findAll({
      where: {
        cartId: req.params.cartID,
      },
      include: [
        {
          model: Coffee,
          attributes: ['name', 'price', 'imageUrl', 'stock'],
        },
      ],
    });
    res.json(getAll);
  } catch (error) {
    console.error('error getting all product in cart', error);
    next(error);
  }
});

router.get('/:cartID/:productID', async (req, res, next) => {
  try {
    const getSingle = await CartItem.findOne({
      where: {
        cartId: req.params.cartID,
        productId: req.params.productID,
      },
      include: [
        {
          model: Coffee,
          attributes: ['name', 'price'],
        },
      ],
    });
    res.json(getSingle);
  } catch (error) {
    console.error('error getting single Cart', error);
    next(error);
  }
});

// POST /api/campuses/update
router.post('/update', async (req, res, next) => {
  try {
    console.log(req.body);
    const data = {
      name: req.body.name,
      address: req.body.address,
    };
    await Campus.update(data, {
      where: {
        id: req.body.id,
      },
    });
    //const student = await Student.findByPk(req.body.id)
    //res.sendStatus(200);
    res.status(201).send(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartID/:productID', async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: {
        cartId: req.params.cartID,
        productId: req.params.productID,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
