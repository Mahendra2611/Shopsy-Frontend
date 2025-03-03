import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: {}, // { "categoryName": [products] }
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = {};
    
      let categorizedProducts = {};
      action.payload.forEach((product) => {
        const category = product.category; // Assuming each product has a category field
        if (!categorizedProducts[category]) {
          categorizedProducts[category] = [];
        }
        categorizedProducts[category].push(product);
      });

      state.products = categorizedProducts;
    },
    
    updateProduct: (state, action) => {
      const { category, id, updatedProduct } = action.payload;
      if (state.products[category]) {
        state.products[category] = state.products[category].map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        );
      }
    },

    deleteProduct: (state, action) => {
      const { category, id } = action.payload;
      if (state.products[category]) {
        state.products[category] = state.products[category].filter(
          (product) => product.id !== id
        );

        // Remove category if empty
        if (state.products[category].length === 0) {
          delete state.products[category];
        }
      }
    },
  },
});

export const { addProducts, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
