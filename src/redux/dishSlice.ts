'use client';

import { CategoryType } from '@/types/category';
import { DishInterface } from '@/types/dish';
import { getBase64 } from '@/utils/image';
import { escapeText } from '@/utils/text';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface DishState {
  allDishes: DishInterface[];
}

const initialState: DishState = {
  allDishes: JSON.parse(localStorage.getItem('allDishes') || '[]'),
};

const DishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    createADish: (state, action: PayloadAction<DishInterface>) => {
      const { name, idCate } = action.payload;

      const dishNames = state.allDishes.map(({ name }: DishInterface) =>
        escapeText(name)
      );

      if (!dishNames.includes(escapeText(name))) {
        const categories: CategoryType[] = JSON.parse(
          localStorage.getItem('categories') || '[]'
        );

        const currentCate = categories.find((cate) => cate.idCate === idCate);

        if (currentCate)
          state.allDishes = [
            ...state.allDishes,
            { ...action.payload, category: currentCate.label },
          ];
        else state.allDishes = [...state.allDishes, action.payload];

        localStorage.setItem('allDishes', JSON.stringify(state.allDishes));

        toast.success(`Thêm món ${name} thành công!`);
      } else {
        toast.error(`Tên sản phẩm ${name} đã tồn tại!`);
      }
    },
    deleteADish: (state, action: PayloadAction<string>) => {
      const dish = state.allDishes.find(
        (dish) => dish.idDish === action.payload
      );

      if (dish) {
        state.allDishes = state.allDishes.filter(
          (dish) => dish.idDish !== action.payload
        );
        localStorage.setItem('allDishes', JSON.stringify(state.allDishes));
      } else {
        toast.error('Id món không tồn tại!');
      }
    },

    editADish: (state, action: PayloadAction<DishInterface>) => {
      const { idDish, name } = action.payload;
      const dish = state.allDishes.find((dish) => dish.idDish === idDish);

      if (dish && JSON.stringify(dish) !== JSON.stringify(action.payload)) {
        state.allDishes.map((dish) =>
          dish.idDish === idDish ? action.payload : dish
        );
        localStorage.setItem('allDishes', JSON.stringify(state.allDishes));

        toast.success(`Chỉnh sửa món ${name} thành công!`);
      } else if (
        dish &&
        JSON.stringify(dish) === JSON.stringify(action.payload)
      ) {
      } else toast.error('Id món không tồn tại!');
    },
  },
});

export const { createADish, deleteADish, editADish } = DishSlice.actions;
export default DishSlice.reducer;
