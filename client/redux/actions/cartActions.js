import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCartItemsLocal = () => {
  var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems = cartItems.reduce((prev, next) => {
    if (next.id in prev) {
      prev[next.id].quantity += next.quantity;
      prev[next.id].price += next.price;
    } else {
      prev[next.id] = next;
    }
    return prev;
  }, {});
  let result = Object.keys(cartItems).map((id) => cartItems[id]);

  const orderItems = [];

  result.map((element) => {
    orderItems.push({
      id: element.id,
      cartId: element.cartId,
      productId: element.id,
      quantity: element.quantity,
      createdAt: element.createdAt,
      updatedAt: element.updatedAt,
      coffee: {
        name: element.name,
        price: element.price,
        imageUrl: element.imageUrl,
        stock: element.stock,
        stripe: element.stripe,
      },
    });
  });

  return orderItems;
};
//Action for Cart products
export const fetchAllCartAction = createAsyncThunk(
  "cartProducts/fetchAllCartAction",
  async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`/api/cart/cartItems/${id}`);
        console.log("fetchallCartaction");
        console.log(response);
        return response.data;
      } catch (error) {
        console.error("error", error);
      }
    } else {
      return getCartItemsLocal();
    }
  }
);

//Action for update a product Need To work on it (Not Working)
export const updateCartItemAction = createAsyncThunk(
  "cartProducts/updateCartItemAction",
  async ({ cartId, productId, quantity }, thunkApi) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.put(`/api/cart/${cartId}/${productId}`, {
          quantity,
        });
        console.log("response data", response);
        return { productId, quantity };
      } catch (error) {
        console.error("error", error);
        return rejectWithValue("Unable to update cart item");
      }
    } else {
      const itemCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const newItemCart = itemCart.map((item) => {
        if (item.id == productId) {
          return { ...item, quantity: parseInt(quantity) };
        } else {
          return item;
        }
      });
      const { dispatch, getState } = thunkApi;
      localStorage.setItem("cartItems", JSON.stringify(newItemCart));
      dispatch(fetchAllCartAction(1));
    }
  }
);

//Action for deleting a product
export const deleteCartItemAction = createAsyncThunk(
  "cartProducts/deleteCartItemAction",
  async (param, thunkApi) => {
    const token = localStorage.getItem("token");
    const { cartId, productId } = param;
    if (token) {
      try {
        const response = await axios.delete(`/api/cart/${cartId}/${productId}`);
        console.log(response);
        return { success: true, productId };
      } catch (error) {
        console.error("error", error);
      }
    } else {
      const itemCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const newItemCart = itemCart.filter((item) => item.id != productId);
      const { dispatch, getState } = thunkApi;
      localStorage.setItem("cartItems", JSON.stringify(newItemCart));
      dispatch(fetchAllCartAction(1));
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "coffee/addProductToCart",
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      console.log("addProductToCart ===", productId, quantity, userId);
      const { data } = await axios.post("/api/cart/", {
        productId,
        quantity,
        userId,
      });
      console.log("add data check ===", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Unable to add product to cart");
    }
  }
);

//Confirmation From Erica 
export const fetchOrderInfo = (sessionId) => async (dispatch) => {
  try {
    const response = await fetch(`/order-info?session_id=${sessionId}`);
    const data = await response.json();
    dispatch(setOrderInfo(data));
  } catch (error) {
    console.error(error);
    dispatch(setError('Failed to fetch order info'));
  }
};
export const setOrderInfo = (orderInfo) => ({
  type: 'SET_ORDER_INFO',
  payload: orderInfo,
});

