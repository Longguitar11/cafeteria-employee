'use client';

import { DishType } from '@/types/dish';
import {
  BillInterface,
  OrderInterface,
  OrderedDishInterface,
} from '@/types/order';
import { calAmount } from '@/utils/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface OrderState {
  order: OrderInterface;
  allOrders: BillInterface[];
}

const defaultOrder: OrderInterface = {
  name: '',
  contactNumber: '',
  email: '',
  paymentMethod: '',
  productDetail: [],
  totalAmount: 0,
};

const initialState: OrderState = {
  order:
    typeof window !== undefined &&
    JSON.parse(localStorage.getItem('order') || JSON.stringify(defaultOrder)),

  allOrders:
    typeof window !== undefined &&
    JSON.parse(localStorage.getItem('allOrders') || '[]'),
};

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<OrderedDishInterface>) => {
      const { price, quantity = 1 } = action.payload;

      console.log({ price, quantity });
      state.order.productDetail = [action.payload];
      state.order.totalAmount = price * quantity;
      localStorage.setItem('order', JSON.stringify(state.order));

      toast.success('Tạo đơn hàng thành công!');
    },
    updateOrder: (state, action: PayloadAction<OrderedDishInterface>) => {
      const { id, quantity = 1, total } = action.payload;

      let sameDish = state.order.productDetail.find((dish) => dish.id === id);

      if (sameDish) {
        const { quantity: quantitySameDish, total: totalSameDish } = sameDish;

        sameDish.quantity = quantitySameDish + quantity;
        sameDish.total = totalSameDish + total;

        toast.success(
          `Cập nhật số lượng ${action.payload.name.toLowerCase()} thành công!`
        );

        state.order.productDetail.map((dish) => {
          dish.id === id ? sameDish : dish;
        });
      } else {
        toast.success(
          `Thêm ${action.payload.name.toLowerCase()} vào đơn hàng thành công!`
        );
        state.order.productDetail = [
          ...state.order.productDetail,
          action.payload,
        ];
      }

      state.order.totalAmount = calAmount(state.order.productDetail);

      localStorage.setItem('order', JSON.stringify(state.order));
    },
    addDishes: (state, action: PayloadAction<{ids: number[], allDishes: DishType[]}>) => {
      const {ids, allDishes} = action.payload;

      for (let id of ids) {
        const currentDish = allDishes.find((dish) => dish.id! === id);

        if (currentDish) {
          const { id: dishId, name, price, categoryName } = currentDish;

          const newDish: OrderedDishInterface = {
            id: dishId!,
            category: categoryName!,
            name,
            price,
            quantity: 1,
            total: price,
          };

          state.order.productDetail.push(newDish);
        }
      }
      
      state.order.totalAmount = calAmount(state.order.productDetail);
      localStorage.setItem('order', JSON.stringify(state.order));
      toast.success(`Đơn hàng đã được thêm món!`);
    },
    updateDish: (
      state,
      action: PayloadAction<{ id: number; quantity: number; total: number }>
    ) => {
      const { id, quantity, total } = action.payload;

      const foundDish = state.order.productDetail.find(
        (dish) => dish.id === id
      );

      if (foundDish) {
        foundDish.quantity = quantity;
        foundDish.total = total;

        state.order.productDetail.map((dish) =>
          dish.id === id ? foundDish : dish
        );

        state.order.totalAmount = calAmount(state.order.productDetail);
        localStorage.setItem('order', JSON.stringify(state.order));

        toast.success(
          `Cập nhật số lượng ${foundDish.name.toLowerCase()} thành công!`
        );
      }
    },
    deleteDish: (state, action: PayloadAction<number>) => {
      let dish = state.order.productDetail.find(
        (dish) => dish.id === action.payload
      );

      if (dish) {
        state.order.productDetail = state.order.productDetail.filter(
          (dish) => dish.id !== action.payload
        );

        state.order.totalAmount = calAmount(state.order.productDetail);
        localStorage.setItem('order', JSON.stringify(state.order));

        toast.success(
          `Xóa ${dish.name.toLowerCase()} khỏi đơn hàng thành công!`
        );
      }

      if (state.order.productDetail.length === 0) {
        state.order = defaultOrder;

        localStorage.removeItem('order');
      }
    },
    cancelOrder: (state) => {
      state.order = defaultOrder;
      localStorage.removeItem('order');

      toast.success(`Hủy đơn hàng thành công!`);
    },
    completeOrder: (state) => {
      state.order = defaultOrder;

      localStorage.removeItem('order');
      toast.success(`Thanh toán đơn hàng thành công!`);
    },
  },
});

export const {
  createOrder,
  updateOrder,
  updateDish,
  addDishes,
  deleteDish,
  completeOrder,
  cancelOrder,
} = OrderSlice.actions;
export default OrderSlice.reducer;
