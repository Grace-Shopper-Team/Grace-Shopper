import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchSingleProduct,
  addProductToCart,
  deleteProduct,
} from '../../redux/actions/singleProductActions';

const SingleProduct = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const singleProduct = useSelector(
    (state) => state.singleProduct.singleProduct
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (productId) => {
    dispatch(addProductToCart({ productId, quantity }));
  };
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  //   const isAdmin = user && user.isAdmin;
  const isAdmin = true;

  return (
    <div className='product-container'>
      <div className='back-btn'>
        <Link id='back-btn' to={'/home'}>
          ⇦ Back
        </Link>
      </div>
      {singleProduct ? (
        <>
          <img
            className='singleproduct-img'
            src={singleProduct.imageUrl}
            alt={singleProduct.name}
          />
          <h1>{singleProduct.name}</h1>
          <p>{singleProduct.price}</p>
          <p>{singleProduct.description}</p>
          <div>
            <form
              id='spform'
              onSubmit={(e) => {
                e.preventDefault();
                handleAddToCart(singleProduct.id);
              }}>
              <label htmlFor='quantity'>Quantity:</label>
              <input
                type='number'
                id='quantity'
                name='quantity'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min='1'
                max='10'
              />

              <button className='spstyle' type='submit'>
                Add To Cart
              </button>
            </form>
          </div>
          {isAdmin && (
            <>
              <div className='styles.admin-buttons'>
                <button className='spstyle' onClick={() => console.log('edit')}>
                  Edit
                </button>
              </div>{' '}
            </>
            // <div className='styles.admin-buttons'>
            //   <button className='spstyle' onClick={() => handleDelete(singleProduct.id)}>
            //     Delete
            //   </button>
            //   <button className='spstyle' onClick={() => console.log('edit')}>Edit</button>
            // </div> </>
          )}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SingleProduct;
