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
  const dispatch = useDispatch();
  console.log('value of cartstate', cartState);

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

  const handleInputChange = (cartId, productId, quantity) => {
    quantity && dispatch(updateCartItemAction({ cartId, productId, quantity }));
  };

  return (
    <div className='cart'>
      <h1 className='Shopping-Cart'>Shopping Cart</h1>

      {loading ? (
        <p>loading...</p>
      ) : (
        cartState.map((cartItem, index) => (
          <div key={`${index}-${cartItem.productid}`} className='Items'>
            <h4> {cartItem.coffee.name}</h4>
            {/*             <p>quantity: {cartItem.quantity}</p> */}
            <p>price: {cartItem.coffee.price}</p>
            <label id='Edit-Cart' onSubmit={handleSubmit}>
              Quantity:
              <input
                name='number'
                defaultValue={cartItem.quantity}
                onChange={(e) => {
                  console.log(e.target.value);
                  handleInputChange(
                    cartItem.cartId,
                    cartItem.productId,
                    e.target.value
                  );
                }}
              />
            </label>
            <button
              className='button'
              onClick={() =>
                removeItemFromCart(cartItem.cartId, cartItem.productId)
              }>
              Remove
            </button>
          </div>
        ))
      )}
      <Checkout cartState={cartState} />
    </div>
  );
};

export default Cart;
