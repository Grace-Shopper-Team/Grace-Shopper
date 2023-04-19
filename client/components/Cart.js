import React, { useEffect } from 'react';
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
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

 

  useEffect(() => {
    dispatch(fetchAllCartAction(1));
    // setTimeout(() => {
    //   //update function here
    //   dispatch(updateProductName('Very Nice Coffee'));
    //   console.log(cartState);
    // }, 5000);
  }, []);

  

  function removeItemFromCart(cartId, productId) {
    dispatch(deleteCartItemAction({ cartId, productId }));
  }

  // function startEditingQuantity(quantity) {
  //   setEditedQuantity(quantity);
  // }
  

  return (
    <div>
      <div>Cart Page</div>

      <h1>Cart Items</h1>
      {cartState.cartItems.map((cart) => (
        <div key={cart.id}>
          <h4>
            Name: {cart.coffee.name}, quantity: {cart.quantity}, price:{' '}
            {cart.coffee.price}
          </h4>
          <button
            onClick={() => removeItemFromCart(cart.cartId, cart.productId)}>
            Remove
          </button>
          {/*<button onClick={checkout}>Checkout</button>
           <label htmlFor='quantity'>Quantity:</label>
              <input
                type='number'
                id='quantity'
                name='quantity'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min='1'
                max='10'
              /> */}
        </div>
      ))}
    </div>
  );
};

export default Cart;
