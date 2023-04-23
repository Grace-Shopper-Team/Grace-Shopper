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

router.get('/cartItems/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    let shoppingCart = await Cart.findOne({
      where: { userId },
    });
    if (!shoppingCart) {
      // Create a new shopping cart object if none exists for the user
      res
        .status(204)
        .json({ error: 'Not founded a cart asociated to this user.' });
    }
    // Check if the product already exists in the shopping cart
    const shoppingCartItems = await CartItem.findAll({
      where: {
        cartId: shoppingCart.id,
      },
      include: [
        {
          model: Coffee,
          attributes: ['name', 'price', 'imageUrl', 'stock'],
        },
      ],
    });
    if (shoppingCartItems) {
      res.json(shoppingCartItems);
    } else {
      res.status(204).json({ error: 'there are not products in cart.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// update quantity inside the Cart (Need to work on the update input)
router.put('/:cartID/:productID', async (req, res, next) => {
  try {
    const { cartID, productID } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findByPk(cartID);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cartID,
        productId: productID,
      },
      include: [
        {
          model: Coffee,
          attributes: ['name', 'price', 'imageUrl', 'stock'],
        },
      ],
    });
    if (!cartItem) {
      return res
        .status(404)
        .json({ error: 'Product not found inside the cart.' });
    }
    cartItem.quantity = quantity;
    const data = await cartItem.save();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
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

router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity, userId } = req.body;
    //const userId = req.session.userId;
    console.log('userId addCart ===', req.body);
    let shoppingCart = await Cart.findOne({
      where: { userId },
    });
    if (!shoppingCart) {
      shoppingCart = await Cart.create({
        userId,
      });
    }
    const shoppingCartItem = await CartItem.findOne({
      where: {
        cartId: shoppingCart.id,
        productId: productId,
      },
      include: [
        {
          model: Coffee,
          attributes: ['name', 'price', 'imageUrl', 'stock'],
        },
      ],
    });
    let data = {};
    if (shoppingCartItem) {
      shoppingCartItem.quantity += quantity;
      data = await shoppingCartItem.save();
    } else {
      data = await CartItem.create({
        cartId: shoppingCart.id,
        productId,
        quantity,
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
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
