import Axios from "../configAxios";
import {
  updateOrder,
  updateOrderedDishes,
} from "../orderSlice";
import { orderedUsedTable } from "../tableSlice";

export const getOrdersByType = async (cusId, type, dispatch) => {
  const res = await Axios.get("/api/order/", { params: { cusId, type } });
  console.log(res)
  dispatch(updateOrderedDishes(res.data.data.orders));
};

export const getOrdersByID = async (orderId) => {
  const res = await Axios.get(`/api/order/${orderId}`);
  console.log(res)
  return res.data.data.order.dishes;
};

export const createOrder = async (
  tableId,
  cusId,
  orderDishes,
  note,
  dispatch
) => {
  const res = await Axios.post("/api/order", {
    tableId,
    cusId,
    dishes: orderDishes,
    note,
  });

  console.log(res);
  if (res.data.status === "success") {
    dispatch(orderedUsedTable(cusId)), dispatch(updateOrder([]));
  }
};

export const completeOrder = async (idOrder, dispatch) => {
  const res = await Axios.get(`/api/order/${idOrder}/served`, {
    params: { id: idOrder },
  });
  await getOrdersByType("", "kitchen", dispatch);
};
