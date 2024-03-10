'use client';

import { DishType } from '@/types/dish';
import { OrderInterface, OrderedDishInterface } from '@/types/order';
import { calAmount } from '@/utils/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderState {
  order: OrderInterface;
  allOrders: OrderInterface[];
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
      state.order.productDetail = [action.payload];

      localStorage.setItem('order', JSON.stringify(state.order));
    },
    updateOrder: (state, action: PayloadAction<OrderedDishInterface>) => {
      const { id, quantity = 1, total } = action.payload;

      let sameDish = state.order.productDetail.find((dish) => dish.id === id);

      if (sameDish) {
        const { quantity: quantitySameDish, total: totalSameDish } = sameDish;

        sameDish.quantity = quantitySameDish + quantity;
        sameDish.total = totalSameDish + total;

        state.order.productDetail.map((dish) => {
          dish.id === id ? sameDish : dish;
        });
      } else {
        state.order.productDetail = [
          ...state.order.productDetail,
          action.payload,
        ];
      }

      state.order.totalAmount = calAmount(state.order.productDetail);

      localStorage.setItem('order', JSON.stringify(state.order));
    },
    addDishes: (state, action: PayloadAction<number[]>) => {
      const dishIds = action.payload;

      const allDishes = JSON.parse(
        localStorage.getItem('allDishes') || '[]'
      ) as DishType[];

      const orderedDishIds = state.order.productDetail.map(
        ({ id }: OrderedDishInterface) => id
      );

      for (let id of dishIds) {
        const currentDish = allDishes.find((dish) => dish.id! === id);

        if (currentDish) {
          const { id: dishId, name, price, categoryName } = currentDish;

          if (orderedDishIds.includes(id)) {
            const sameDish = state.order.productDetail.find(
              (dish) => dish.id === id
            );

            if (sameDish) {
              const { quantity, total } = sameDish;
              sameDish.quantity = quantity + 1;
              sameDish.total = total + currentDish.price;

              state.order.productDetail.map((dish) =>
                dish.id === id ? sameDish : dish
              );
            }
          } else {
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
      }

      state.order.totalAmount = calAmount(state.order.productDetail);
      localStorage.setItem('order', JSON.stringify(state.order));
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
      }

      if (state.order.productDetail.length === 0) {
        state.order = defaultOrder;

        localStorage.removeItem('order');
      }
    },
    cancelOrder: (state) => {
      state.order = defaultOrder;
      localStorage.removeItem('order');
    },
    // getOrder: (state, action: PayloadAction<string>) => {
    //   const order = state.allOrders.find(
    //     (order) => order.idOrder === action.payload
    //   );

    //   if (order) state.order = order;
    // },
    // confirmOrder: (state) => {
    //   state.allOrders = [...state.allOrders, state.order];
    //   state.order = { idOrder: '', dishes: [] };

    //   localStorage.setItem('order', JSON.stringify(state.order));
    //   localStorage.setItem('allOrders', JSON.stringify(state.allOrders));
    // },
  },
});

export const {
  createOrder,
  updateOrder,
  updateDish,
  addDishes,
  deleteDish,
  // getOrder,
  // confirmOrder,
  cancelOrder,
} = OrderSlice.actions;
export default OrderSlice.reducer;
