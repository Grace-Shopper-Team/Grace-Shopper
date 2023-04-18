import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSingleProduct = createAsyncThunk (
    'singleProduct/fetchOne',
    async (id) => {
        try {
            const data = await axios.get (`api/coffee/${id}`);
            return data
        } catch (error){
            console.error ('error')
        }
    }
)

export const addProductToCart = createAsyncThunk (
    'coffee/addProductToCart',
    async (id)=> {
try {
    const data= await axios.put ('/api/coffee/shoppingcart')
    return data
} catch (error){
    console.error ('error')
}
}
)