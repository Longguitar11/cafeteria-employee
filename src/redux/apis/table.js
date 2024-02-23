import Axios from "../configAxios";
import { addOneUsedTable, getAllTables } from "../tableSlice";

export const getTables = async (dispatch) => {
  const res = await Axios.get("/api/table");
  dispatch(getAllTables(res.data.data.tables));
};

export const openOneTable = async (tableId, dispatch) => {
  const res = await Axios.post(`api/table/${tableId}/open`);
  dispatch(addOneUsedTable({ tableId, cusId: res.data.data.cusId, openAt: res.data.data.openAt, ordered: false }));
  getTables(dispatch);
};

export const closeOneTable = async (tableId, dispatch) => {
  await Axios.post(`/api/table/${tableId}/close`);
  // console.log(res)
  getTables(dispatch);
};
