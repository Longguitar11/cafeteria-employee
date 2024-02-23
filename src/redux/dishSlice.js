import { createSlice } from "@reduxjs/toolkit";

const DishSlice = createSlice({
  name: "dishes",
  initialState: {
    dishes: null,
    allDishes: null,
  },
  reducers: {
    getDishesByCate: (state, action) => {
      state.dishes = action.payload;
    },
    getAllDishes: (state, action) => {
      state.allDishes = action.payload;
    },
    updateDishes: (state, action) => {
      state.allDishes = action.payload;
    },
  },
});

export const { getDishesByCate, getAllDishes } = DishSlice.actions;
export default DishSlice.reducer;
