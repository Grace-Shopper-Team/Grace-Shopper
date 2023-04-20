const router = require('express').Router();
const Coffee = require('../db/models/Coffee');
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const User = require('../db/models/User');

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

router.post('/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    const { productId, quantity } = req.body;
    console.log(quantity);
    const userId = user.id;

    let shoppingCart = await Cart.findOne({
      where: { userId },
    });

    //******/
    if (!shoppingCart) {
      // Create a new shopping cart object if none exists for the user
      shoppingCart = await Cart.create({
        userId,
      });
    }

    // Check if the product already exists in the shopping cart
    const shoppingCartItem = await CartItem.findOne({
      where: { cartId: shoppingCart.id, productId },
    });

    if (shoppingCartItem) {
      // Update the quantity of the product in the shopping cart
      shoppingCartItem.quantity += quantity;
      await shoppingCartItem.save();
    } else {
      // Create a new shopping cart item with the product and its quantity
      await CartItem.create({
        cartId: shoppingCart.id,
        productId,
        quantity,
      });
    }

    res.json(shoppingCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
