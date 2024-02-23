import { createSlice } from "@reduxjs/toolkit";

const DishCategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
  },
  reducers: {
    updateCategory: (state, action) => {
      state.categories = action.payload;
    },
    getAllCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { updateCategory, getAllCategories } = DishCategoriesSlice.actions;
export default DishCategoriesSlice.reducer;
