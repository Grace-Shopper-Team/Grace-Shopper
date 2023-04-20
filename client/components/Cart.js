import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartItemAction,
  fetchAllCartAction,
  updateCartItemAction,
} from '../redux/actions/cartActions';
import { selectCart } from '../redux/reducers/cartSlice';
import Checkout from './checkout';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const cartState = useSelector(selectCart);
  console.log('value of cartstate', cartState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCartAction(1)).then(() => setLoading(false));
  }, []);

  function removeItemFromCart(cartId, productId) {
    dispatch(deleteCartItemAction({ cartId, productId }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateCartItemAction({ cartId, productId })); // cartId product id
  };

  return (
    <div className='Shopping-Cart'>
      <h1>Shopping Cart</h1>

      <h2>Cart Items</h2>
      {cartState.map((cart) => (
        <div key={cart.id}>
          <h4>
            Name: {cart.coffee.name}, quantity: {cart.quantity}, price:{' '}
            {cart.coffee.price}
          </h4>
          {/*         I need To Fix the edit Input */}
          <label id='Edit-Cart' onSubmit={handleSubmit}>
            Quantity:
            <input
              name='number'
              value={cart.quantity}
              onChange={(e) => (cart.cartId, cart.productId, e.target.value)}
            />
          </label>
          <button
            onClick={() => removeItemFromCart(cart.cartId, cart.productId)}>
            Remove
          </button>
        </div>
      ))}
      {/* <Checkout cartState={cartState} /> */}
    </div>
  );
};

export default Cart;
