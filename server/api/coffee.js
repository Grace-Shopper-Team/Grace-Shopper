const router = require('express').Router();
const Coffee = require('../db/models/Coffee');
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const User = require('../db/models/User');
// const Favorite= require ('../db/models/Favorite');

router.get('/', async (req, res, next) => {
  try {
    const getAllCoffee = await Coffee.findAll();
    res.send(getAllCoffee);
  } catch (error) {
    console.error('error getting all coffee', error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCoffee = req.body;
    const addNewCoffee = await Coffee.create(newCoffee);
    res.send(addNewCoffee);
  } catch (error) {
    console.error('error adding coffee to shop stock', error);
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

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteThisCoffee = await Coffee.findByPk(req.params.id);
    await CartItem.destroy({
      where: { productId: req.params.id },
    });
    await deleteThisCoffee.destroy();
    res.send(deleteThisCoffee);
  } catch (error) {
    console.error('error deleting coffee', error);
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

    const updatedCartItem = await CartItem.findOne({
      where: { cartId: shoppingCart.id, productId },
      include: { model: Coffee },
    });

    res.json(updatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Coffee.findByPk(req.params.id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      const updatedProduct = await product.update(req.body);
      res.json(updatedProduct);
    }
  } catch (error) {
    console.error('Error updating product', error);
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const deleteThisCoffee = await Coffee.findByPk(req.params.id);
    await CartItem.destroy({
      where: { productId: req.params.id },
    });
    await deleteThisCoffee.destroy();
    res.send(deleteThisCoffee);
  } catch (error) {
    console.error('error deleting coffee', error);
    next(error);
  }
});

// // Add a coffee to the user's favorites
// router.post('/favorites', async (req, res, next) => {
//   try {
//     const { userId, productId } = req.body;
//     const favorite = await Favorite.create({ userId, productId });
//     res.json(favorite);
//   } catch (error) {
//     console.error('Error adding favorite coffee', error);
//     next(error);
//   }
// });

// // Remove a coffee from the user's favorites
// router.delete('/favorites/:userId/:productId', async (req, res, next) => {
//   try {
//     const { userId, productId } = req.params;
//     await Favorite.destroy({ where: { userId, productId } });
//     res.sendStatus(204);
//   } catch (error) {
//     console.error('Error removing favorite coffee', error);
//     next(error);
//   }
// });

// // Get all favorite coffees for a user
// router.get('/favorites/:userId', async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const favorites = await Favorite.findAll({
//       where: { userId },
//       include: { model: Coffee },
//     });
//     res.json(favorites);
//   } catch (error) {
//     console.error('Error fetching favorite coffees', error);
//     next(error);
//   }
// });

module.exports = router;
