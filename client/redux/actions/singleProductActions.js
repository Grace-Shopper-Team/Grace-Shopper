import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProduct = createAsyncThunk(
  'singleProduct/fetchOne',
  async (id) => {
    try {
      const response = await axios.get(`/api/coffee/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('error');
    }
  }
);
// Nataly Move something here 
const authAddProductCart = async (productId, quantity) => {
  try {
    console.log('inside of thunk', productId, quantity);
    const response = await axios.post('/api/coffee/cart', {
      productId,
      quantity,
    });
    console.log('API response:', response);
    const { data } = response;
    console.log('API response data:', data);

    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Unable to add product to cart');
  }
}
export const addProductToCart = createAsyncThunk(
  'coffee/addProductToCart',
  async (product , { rejectWithValue }) => {
    console.log("hellooooooo", product)
    const {productId, quantity} = product;
    const token = localStorage.getItem('token');
    if(token){
      authAddProductCart(productId, quantity);
    } else {
      const cartItem = JSON.parse(localStorage.getItem('cartItems') || '[]');
      product.price = parseFloat(product.price)
      cartItem.push(product)
      console.log("helllooooooo", cartItem)
      localStorage.setItem('cartItems', JSON.stringify(cartItem));
    }
  }
);
  

  export const toggleFavoriteProduct = createAsyncThunk(
    'singleProduct/toggleFavoriteProduct',
    async (productId, { getState }) => {
      console.log('Product favorited:', productId);
      try {
        const state = getState();
        const favorites = state.singleProduct.favorites;
  
        const isFavorite = favorites.includes(productId);
  
        const updatedFavorites = isFavorite
          ? favorites.filter((id) => id !== productId)
          : [...favorites, productId];
  
        const response = await fetch(`/api/coffee/${productId}`);
        const product = await response.json();
  
        return { updatedFavorites, product };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );


export const updateProduct = createAsyncThunk(
  'singleProduct/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/coffee/${product.id}`, product);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Unable to update product');
    }
  }
);
