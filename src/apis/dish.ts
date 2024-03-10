'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { getAllDishesReducer, getDishesReducer } from '@/redux/dishSlice';

export const getAllDishes = async (dispatch: any) => {
  try {
    const { status, data } = await Axios.get('/product/get');

    console.log({ status, data });
    if (status >= 200 && status < 400) {
      dispatch(getAllDishesReducer(data));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const getDishesByCateId = async (cateId: number, dispatch: any) => {
  try {
    const { status, data } = await Axios.get(`/product/getByCategory/${cateId}`);

    console.log({ status, data });
    
    if (status >= 200 && status < 400) {
      dispatch(getDishesReducer(data));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};



