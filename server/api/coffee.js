const router = require('express').Router();
const CartItem= require ('../db/models/CartItem')
const Cart= require ('../db/models/Cart')
const Coffee= require('../db/models/Coffee')

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
      const { productId, quantity } = req.body;
      const userId = req.session.userId;
  
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
        where: { cartId: Cart.id, productId },
      });
  
      if (shoppingCartItem) {
        // Update the quantity of the product in the shopping cart
        shoppingCartItem.quantity += quantity;
        await shoppingCartItem.save();
      } else {
        // Create a new shopping cart item with the product and its quantity
        await CartItem.create({
          cartId: Cart.id,
          productId,
          quantity,
        });
      }
  
      res.json({ message: 'Product added to cart.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

  

router.put('/:bId', async (req, res, next) => {});

router.delete('/:bId', async (req, res, next) => {});

module.exports = router;
