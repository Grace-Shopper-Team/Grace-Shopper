import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchSingleProduct,
  addProductToCart,
  deleteProduct,
  updateProduct,
  //   toggleFavoriteProduct
} from '../../redux/actions/singleProductActions';

import { fetchSingleUserAsync } from '../../redux/actions/allUserActions';
import jwt_decode from 'jwt-decode';

const SingleProduct = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();

  const singleProduct = useSelector(
    (state) => state.singleProduct.singleProduct
  );

  // const favorites = useSelector((state) => state.singleProduct.favorites);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const [quantity, setQuantity] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);

  const handleAddToCart = (productId) => {
    dispatch(addProductToCart({ productId, quantity }));
    setItemAdded(true);
    setTimeout(() => {
      setItemAdded(false);
    }, 2000);
  };
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const handleEditProduct = () => {
    if (editMode) {
      dispatch(updateProduct(editedProduct)).then(() => setEditMode(false));
    } else {
      setEditedProduct(singleProduct);
      setEditMode(true);
    }
  };
  //   const handleFavoriteClick = (productId) => {
  //     dispatch(toggleFavoriteProduct(productId));
  //   };

<<<<<<< HEAD

=======
>>>>>>> combined auth logic with current updates
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIsAdmin = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const userID = decodedToken.id;
      const data = await dispatch(fetchSingleUserAsync(userID));
<<<<<<< HEAD
      console.log(data.payload.isAdmin)
      if(data.payload.isAdmin){
=======
      console.log(data.payload.isAdmin);
      if (data.payload.isAdmin) {
>>>>>>> combined auth logic with current updates
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkIsAdmin();
  }, [dispatch]);

  return (
    <div className='product-container'>
      <div className='back-btn'>
        <Link id='back-btn' to={'/home'}>
          ⇦ Back
        </Link>
      </div>
      {singleProduct ? (
        <>
          {/* <button className='spstyle' onClick={() => handleFavoriteClick(singleProduct.id)}>
    {favorites.includes(singleProduct.id) ? 'Unfavorite' : 'Favorite'}
  </button> */}

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
          {itemAdded && <p className='item-added-msg'>Item added to cart!</p>}
          {isAdmin && (
            <>
              <div className='styles.admin-buttons'>
                <button className='spstyle' onClick={handleEditProduct}>
                  {editMode ? 'Save' : 'Edit'}
                </button>
              </div>
              {editMode && (
                <div>
                  <form
                    className='admin-form'
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditProduct();
                    }}>
                    <label htmlFor='name'>Name:</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='price'>Price:</label>
                    <input
                      type='number'
                      id='price'
                      name='price'
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                    <label htmlFor='description'>Description:</label>
                    <textarea
                      id='description'
                      name='description'
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <button type='submit'>Save</button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SingleProduct;
