import Axios from "../configAxios";
import { getDishesByCate, getAllDishes as getAll } from "../dishSlice";

export const getDishes = async (dispatch, idCate) => {
  const res = await Axios.get("/api/dish", { params: { category: idCate } });
  dispatch(getDishesByCate(res.data.data.dishes));
};

export const getAllDishes = async (dispatch) => {
  const res = await Axios.get("/api/dish", { params: { category: "all" } });
  dispatch(getAll(res.data.data.dishes));
};

export const toggleExistDish = async (dispatch, idDish) => {
  await Axios.post(`/api/dish/${idDish}/togglestate`);
  await getAllDishes(dispatch);
};
