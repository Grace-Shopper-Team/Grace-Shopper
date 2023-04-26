import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartItemAction,
  fetchAllCartAction,
  updateCartItemAction,
} from '../redux/actions/cartActions';
import { selectCart } from '../redux/reducers/cartSlice';
import Checkout from './checkout';
import { fetchSingleProduct } from '../redux/actions/singleProductActions';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const coffee = useSelector((state) => state.singleProduct.singleProduct);
  const cartState = useSelector(selectCart);
  const favorites = useSelector((state) => state.singleProduct.favorites);
  const dispatch = useDispatch();
  console.log('value of cartstate', cartState);

  useEffect(() => {
    dispatch(fetchAllCartAction(1)).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Fetch the details of each favorited product and add them to the state
    const fetchFavoriteProducts = async () => {
      const products = await Promise.all(
        favorites.map((favoriteId) => dispatch(fetchSingleProduct(favoriteId)))
      );
      setFavoriteProducts(products.map((product) => product.payload));
    };

    fetchFavoriteProducts();
  }, [favorites, dispatch]);

  function removeItemFromCart(cartId, productId) {
    dispatch(deleteCartItemAction({ cartId, productId }));
  }

  const handleSubmit = (evt, cartId, productId) => {
    evt.preventDefault();
    dispatch(updateCartItemAction({ cartId, productId }));
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
        cartState &&
        cartState.map((cartItem, index) => (
          <div key={`${index}-${cartItem.productid}`} className='Items'>
            <h4> {cartItem.coffee.name}</h4>
            <p>price: {cartItem.coffee.price}</p>
            <label id='Edit-Cart' onSubmit={handleSubmit}>
              Quantity:
              <input
                type='number'
                name='quantity'
                defaultValue={cartItem.quantity}
                onChange={(e) => {
                  handleInputChange(
                    cartItem.cartId,
                    cartItem.productId,
                    e.target.value
                  );
                }}
                min='1'
                max='10'
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

      <div className='favorites-container'>
        <h2>Favorited Items</h2>
        {favoriteProducts.map((favoriteProduct) => (
          <div
            key={favoriteProduct.id}
            className='favorite-item favorite-details'>
            <img
              className='favproduct-img'
              src={favoriteProduct.imageUrl}
              alt={favoriteProduct.name}
            />
            <div className='product-details'>
              <Link to={`coffee/${favoriteProduct.id}`}>
                <h4>{favoriteProduct.name}</h4>
              </Link>
              <p>Price: {favoriteProduct.price}</p>
              {/* Add more product details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
