const router = require('express').Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const Coffee = require('../db/models/Coffee');
const stripe = require('stripe')(
  'sk_test_51N06kKL5OKQc1cZTVGNrpPhuQwycZnP1Cvtl6PVqSAh9ETMDZXh3GobuAsAs0qUFDp9haM24xnXW5n61PjiRgHom00kKpNQJbl'
);

CartItem.belongsTo(Coffee, {
  foreignKey: 'productId',
});

router.get('/', async (req, res, next) => {
  try {
    const getAll = await Cart.findAll();
    console.log(getAll);
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
          attributes: ['name', 'price', 'imageUrl', 'stock', 'stripe'],
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

router.post('/stripe', async (req, res) => {
  const products = req.body;
  console.log('products: ', products);
  if (products.length < 1) {
    return res.redirect(303, 'https://thebeanhub-7p0o.onrender.com/home');
  } else {
    let productsToPay = products.map((product) => {
      return { price: product.coffee.stripe, quantity: product.quantity };
    });
    console.log(productsToPay);

    const session = await stripe.checkout.sessions.create({
      line_items: productsToPay,
      mode: 'payment',
      success_url: 'https://thebeanhub-7p0o.onrender.com/confirmation',
      //error_url: "http://localhost:3000/home"
    });
    //res.redirect(303, session.url);
    res.status(200).json({ url: session.url });
  }
});

// Confirmation From Erica
router.post('/stripe', async (req, res) => {
  const { firstname, lastname, email, address, city, state, zip } = req.body;
  const order = {
    firstname,
    lastname,
    email,
    address,
    city,
    state,
    zip,
  };
  const orderId = uuid.v4(); // Generate a unique ID for the order
  orders.set(orderId, order);
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: 'price_1N06nLL5OKQc1cZTxYFo9msk', quantity: '1' }],
    mode: 'payment',
    // success_url: "http://localhost:3000/home"
    success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
  });
  res.redirect(303, session.url);
});

router.get('/order-info', async (req, res) => {
  const orderId = req.query.order_id;
  const order = orders.get(orderId);
  try {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customer = await stripe.customers.retrieve(session.customer);
    console.log('session:', session);
    console.log('customer:', customer);
    res.json({
      session: session,
      customer: customer,
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
  console.log('Response sent for /order-info');
});

module.exports = router;
