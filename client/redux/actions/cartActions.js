import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const req = axios.create({
  baseURL: "http://localhost:3000/"
})


export const fetchAllCartAction = createAsyncThunk (
    'cartProducts/fetchAllCartAction',
    async (id) => {
        try {
            const response = await req.get(`/api/cart/${id}`);
            console.log(response)
            return response.data
        } catch (error){
            console.error ('error', error)
        }
    }
)

export const deleteCartItemAction = createAsyncThunk (
  'cartProducts/deleteCartItemAction',
  async (param) => {
      try {
          const {cartId, productId} = param
          const response = await req.delete(`/api/cart/${cartId}/${productId}`);
          console.log(response)
          return {success: true, productId}
      } catch (error){
          console.error ('error', error)
      }
  }
)

export const addProductToCart = createAsyncThunk(
    'coffee/addProductToCart',
    async ({ productId, quantity, cartId}, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('/api/cart/', {
            cartId,
          productId,
          quantity
        });
        return data;
      } catch (error) {
        console.error(error);
        return rejectWithValue('Unable to add product to cart');
      }
    }
  );


  // export const deleteProductCart = createAsyncThunk(
  //   "deleteProductCart",
  //   async (id) => {
  //     try {
  //       await axios.delete(`/api/cart/${id}`);
  //       return id;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // );