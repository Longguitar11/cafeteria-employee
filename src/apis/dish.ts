'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';

export const getAllDishes = async () => {
  try {
    const { status, data } = await Axios.get('/product/get');

    console.log({ status, data });
    if (status >= 200 && status < 400) {
      return data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const getDishesByCateId = async (cateId: number) => {
  try {
    const { status, data } = await Axios.get(`/product/getByCategory/${cateId}`);

    console.log({ status, data });
    
    if (status >= 200 && status < 400) {
      return data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};



