import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: "products",
    initialState: { products: [] },
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload; // Store the entire array at once
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
        updateProduct: (state, action) => {
            const updatedProduct = action.payload;
            state.products = state.products.map(product =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
        }
    }
});

export const { addProducts, deleteProduct, updateProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
