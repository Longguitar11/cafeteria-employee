'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CategoryType } from '@/types/category';
import { escapeText } from '@/utils/text';
import { toast } from 'react-toastify';

export interface CategoriesState {
  categories: CategoryType[];
}

export const initialState: CategoriesState = {
  categories: JSON.parse(localStorage.getItem('categories') || '[]'),
};

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createACategory: (state, action: PayloadAction<CategoryType>) => {
      const { label } = action.payload;
      const categoryLabels = state.categories.map(({ label }: CategoryType) =>
        escapeText(label)
      );

      if (!categoryLabels.includes(escapeText(label))) {
        state.categories = [
          ...state.categories,
          { ...action.payload, value: escapeText(label) },
        ];

        localStorage.setItem('categories', JSON.stringify(state.categories));

        toast.success(`${label} được thêm vào loại!`);
      }
    },
    editACategory: (
      state,
      action: PayloadAction<{ category: CategoryType }>
    ) => {
      const { category } = action.payload;

      const foundCate = state.categories.find(
        (cate) => cate.idCate === category.idCate
      );

      if (foundCate) {
        state.categories = state.categories.map((cate) =>
          cate.idCate === category.idCate
            ? { ...foundCate, value: escapeText(category.label) }
            : cate
        );
        localStorage.setItem('categories', JSON.stringify(state.categories));
      }
    },
    deleteACategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (cate) => cate.idCate !== action.payload
      );

      localStorage.setItem('categories', JSON.stringify(state.categories));
    },
  },
});

export const { createACategory, deleteACategory, editACategory } =
  CategoriesSlice.actions;
export default CategoriesSlice.reducer;
