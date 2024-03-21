import { toast } from 'react-toastify';
import Axios from './axiosConfig';
import axios from 'axios';
import { getAllOrders } from '@/redux/orderSlice';

export interface GenerateReportInterface {
  name: string;
  contactNumber: string;
  email: string;
  paymentMethod: string;
  productDetail: string;
  totalAmount: string;
  createdAt: string;
}

export const generateReport = async (
  data: GenerateReportInterface,
  dispatch: any
) => {
  const {
    name,
    contactNumber,
    email,
    paymentMethod,
    productDetail,
    totalAmount,
    createdAt
  } = data;

  console.log({billdata: data})

  try {
    const { status, data } = await Axios.post(`/bill/generateReport`, {
      name,
      contactNumber,
      email,
      paymentMethod,
      productDetail,
      totalAmount,
      createdAt
    });

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      getBills(dispatch);
      toast.success('Xuất hóa đơn thành công!');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};

export const getBills = async (dispatch: any) => {
  try {
    const { status, data } = await Axios.get(`/bill/getBills`);

    console.log({ status, data });

    if (status >= 200 && status < 400) {
      dispatch(getAllOrders(data));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('Đã xảy ra lỗi không mong muốn!');
    }
  }
};
