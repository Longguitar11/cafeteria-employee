'use client';

import { DishType } from '@/types/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DishesState {
  dishes: DishType[];
  allDishes: DishType[];
}

export const initialState: DishesState = {
  dishes:
    typeof window !== undefined &&
    JSON.parse(localStorage.getItem('dishes') || '[]'),
  allDishes:
    typeof window !== undefined &&
    JSON.parse(localStorage.getItem('allDishes') || '[]'),
};

const DishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    getDishesReducer: (state, action: PayloadAction<DishType[]>) => {
      let dishes = action.payload;
      for (const dish of dishes) {
        const { id } = dish;
        const currentDish = state.allDishes.find((dish) => dish.id === id);

        if (currentDish) {
          dishes = dishes.map((dish) =>
            dish.id === currentDish.id ? currentDish : dish
          );
        }
      }

      state.dishes = dishes;

      localStorage.setItem('dishes', JSON.stringify(state.dishes));
    },
    getAllDishesReducer: (state, action: PayloadAction<DishType[]>) => {
      state.allDishes = action.payload;
      localStorage.setItem('allDishes', JSON.stringify(state.allDishes));
    },
  },
});

export const { getDishesReducer, getAllDishesReducer } = DishesSlice.actions;
export default DishesSlice.reducer;
