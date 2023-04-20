import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCartItems,
  updateProductName,
} from '../redux/reducers/cartSlice';
import {
  deleteCartItemAction,
  fetchAllCartAction,
} from '../redux/actions/cartActions';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const cartState = useSelector((state) => state.cart.cartItems);
  console.log('value of cartstate', cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCartAction(1)).then(() => setLoading(false));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchAllCartAction(1));
  //   // setTimeout(() => {
  //   //   //update function here
  //   //   dispatch(updateProductName('Very Nice Coffee'));
  //   //   console.log(cartState);
  //   // }, 5000);
  // }, [dispatch]);

  function removeItemFromCart(cartId, productId) {
    dispatch(deleteCartItemAction({ cartId, productId }));
  }

  return (
    <div>
      <div>Cart Page</div>

      <h1>Cart Items</h1>
      {!loading &&
        cartState.map((cart) => (
          <div key={cart.id}>
            <h4>
              Name: {cart.coffee.name}, quantity: {cart.quantity}, price:{' '}
              {cart.coffee.price}
            </h4>
            <button
              onClick={() => removeItemFromCart(cart.cartId, cart.productId)}>
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default Cart;
