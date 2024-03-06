'use client';

import { DishInterface } from '@/types/dish';
import { OrderInterface } from '@/types/order';
import { addString, calAmount } from '@/utils/dish';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderState {
  order: OrderInterface;
  allOrders: OrderInterface[];
}

const initialState: OrderState = {
  order: JSON.parse(
    localStorage.getItem('order') || '{"idOrder": "", "dishes": []}'
  ),
  allOrders: JSON.parse(localStorage.getItem('allOrders') || '[]'),
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

      localStorage.setItem('order', JSON.stringify(state.order));
    },
    updateOrder: (state, action: PayloadAction<DishInterface>) => {
      const {
        idDish,
        idCate,
        quantity = 1,
        total = '0',
      } = action.payload;

      let sameDish = state.order.dishes.find(
        (dish) => dish.idDish === idDish && dish.idCate === idCate
      );

      if (sameDish) {
        // const sameSize = sameDish.details.find(
        //   (detail) => detail.size === details[0].size
        // );

        // if (sameSize) {
        //   sameDish.details.map((detail) =>
        //     detail.size === details[0].size
        //       ? {
        //           ...detail,
        //           quantity: (detail.quantity += details[0].quantity),
        //         }
        //       : detail
        //   );
        // } else {
        //   sameDish.details = [...sameDish.details, details[0]];
        // }

        // sameDish.total = calTotal(sameDish.details);

        const { quantity: quantitySameDish, total: totalSameDish = '0' } =
          sameDish;

        sameDish.quantity = quantitySameDish + quantity;
        sameDish.total = addString([totalSameDish, total]);

        state.order.dishes.map((dish) => {
          dish.idDish === idDish ? sameDish : dish;
        });
      } else {
        // action.payload.total = calTotal(details);
        state.order.dishes = [...state.order.dishes, action.payload];
      }

      state.order.amount = calAmount(state.order.dishes);

      localStorage.setItem('order', JSON.stringify(state.order));
    },
    addDishes: (state, action: PayloadAction<string[]>) => {
      const dishIds = action.payload;

      const allDishes = JSON.parse(
        localStorage.getItem('allDishes') || '[]'
      ) as DishInterface[];
      const orderedDishIds = state.order.dishes.map(
        ({ idDish }: DishInterface) => idDish
      );

      for (let id of dishIds) {
        const currentDish =
          allDishes.length > 0 && allDishes.find((dish) => dish.idDish === id);

        if (orderedDishIds.includes(id) && currentDish) {
          const sameDish = state.order.dishes.find(
            (dish) => dish.idDish === id
          );

          if (sameDish) {
            const { quantity, total = '0' } = sameDish;
            sameDish.quantity = quantity + 1;
            sameDish.total = addString([total, currentDish?.price]);

            state.order.dishes.map((dish) =>
              dish.idDish === id ? sameDish : dish
            );
          }
        }

        if (!orderedDishIds.includes(id) && currentDish) {
          currentDish.quantity = 1;
          currentDish.total = currentDish.price;

          state.order.dishes.push(currentDish);
        }
      }

      state.order.amount = calAmount(state.order.dishes);
      localStorage.setItem('order', JSON.stringify(state.order));
    },
    updateDish: (
      state,
      action: PayloadAction<{ idDish: string; quantity: number; total: string }>
    ) => {
      const { idDish, quantity, total } = action.payload;

      const foundDish = state.order.dishes.find(
        (dish) => dish.idDish === idDish
      );

      if (foundDish) {
        foundDish.quantity = quantity;
        foundDish.total = total;

        state.order.dishes.map((dish) =>
          dish.idDish === idDish ? foundDish : dish
        );

        console.log({
          editedDish: JSON.parse(JSON.stringify(state.order.dishes)),
        });

        state.order.amount = calAmount(state.order.dishes);

        localStorage.setItem('order', JSON.stringify(state.order));
      }
    },
    deleteDish: (
      state,
      action: PayloadAction<{ idCate: string; idDish: string }>
    ) => {
      const { idCate, idDish } = action.payload;

      let dish = state.order.dishes.find(
        (dish) => dish.idDish === idDish && dish.idCate === idCate
      );

      if (dish) {
        state.order.dishes = state.order.dishes.filter(
          (dish) => dish.idCate !== idCate && dish.idDish !== idDish
        );

        state.order = {
          ...state.order,
          amount: addString([state.order.amount!, dish?.total || '0']),
        };
      }

      if (state.order.dishes.length === 0)
        state.order = { idOrder: '', dishes: [] };

      localStorage.setItem('order', JSON.stringify(state.order));
    },
    cancelOrder: (state) => {
      state.order = { idOrder: '', dishes: [] };
      localStorage.setItem('order', JSON.stringify(state.order));
    },
    getOrder: (state, action: PayloadAction<string>) => {
      const order = state.allOrders.find(
        (order) => order.idOrder === action.payload
      );

      if (order) state.order = order;
    },
    confirmOrder: (state) => {
      state.allOrders = [...state.allOrders, state.order];
      state.order = { idOrder: '', dishes: [] };

      localStorage.setItem('order', JSON.stringify(state.order));
      localStorage.setItem('allOrders', JSON.stringify(state.allOrders));
    },
  },
});

export const {
  createOrder,
  updateOrder,
  updateDish,
  addDishes,
  deleteDish,
  getOrder,
  confirmOrder,
  cancelOrder,
} = OrderSlice.actions;
export default OrderSlice.reducer;
