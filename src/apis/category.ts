'use client';

import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { getCategories } from '@/redux/categorySlice';

export const getAllCategories = async (dispatch: any) => {
  try {
    const { status, data } = await Axios.get('/category/get');

    console.log({ status, data });
    if (status >= 200 && status < 400) {
      dispatch(getCategories(data));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

