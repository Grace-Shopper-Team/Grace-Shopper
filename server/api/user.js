const router = require('express').Router();
const User = require('../db/models/User');
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteThisUser = await User.findByPk(req.params.id);
    await CartItem.destroy({
      where: { cartId: req.params.id },
    });
    await Cart.destroy({
      where: { userId: req.params.id },
    });
    await deleteThisUser.destroy();
    res.send(deleteThisUser);
  } catch (error) {
    console.error('error deleting user', error);
    next(error);
  }
});

module.exports = router;
