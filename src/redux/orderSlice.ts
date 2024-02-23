'use client';
import { DishDetailsType, DishInterface } from '@/types/dish';
import { calString, calAmount, calTotal } from '@/utils/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderInterface {
  idOrder: string;
  dishes: DishInterface[];
  amount?: string;
}

interface OrderState {
  order: OrderInterface;
  allOrders: OrderInterface[];
}

const initialState: OrderState = {
  order: { idOrder: '', dishes: [] },
  allOrders: [],
};

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<DishInterface>) => {
      const order: OrderInterface = {
        dishes: [action.payload],
        idOrder: new Date().getTime().toString(),
        amount: action.payload.total,
      };

      state.order = order;
    },
    updateOrder: (state, action: PayloadAction<DishInterface>) => {
      const { idDish, details } = action.payload;

      let sameDish = state.order.dishes.find(
        (dish) => dish.idDish === idDish
      );

      if (sameDish) {
        console.log('same dish');
        const sameSize = sameDish.details.find(
          (detail) => detail.size === details[0].size
        );

        if (sameSize) {
          console.log('same size');
          sameDish.details.map((detail) =>
            detail.size === details[0].size
              ? {
                  ...detail,
                  quantity: detail.quantity += details[0].quantity,
                }
              : detail
          );
        } else {
          console.log('unsame size');
          sameDish.details = [...sameDish.details, details[0]];
        }

        sameDish.total = calTotal(sameDish.details);
        state.order.dishes.map((dish) => {
          dish.idDish === idDish ? sameDish : dish;
        });
      } else {
        console.log('unsame dish');
        action.payload.total = calTotal(details);
        state.order.dishes = [...state.order.dishes, action.payload];
      }

      const amountOrder = calAmount(state.order.dishes);
      state.order.amount = amountOrder;
    },
    updateDish: (
      state,
      action: PayloadAction<{ idDish: string; detail: DishDetailsType }>
    ) => {
      // state.order =
    },
    getOrder: (state, action: PayloadAction<string>) => {
      const order = state.allOrders.find(
        (order) => order.idOrder === action.payload
      );

      if (order) state.order = order;
    },
  },
});

export const { createOrder, updateOrder, getOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
