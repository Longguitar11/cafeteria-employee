import { createSlice } from "@reduxjs/toolkit";

const TableSlice = createSlice({
  name: "table",
  initialState: {
    tables: null,
    usedTable: JSON.parse(localStorage.getItem("usedTable")) || [],
  },
  reducers: {
    updateTables: (state, action) => {
      state.tables = action.payload;
    }, // useless now
    getAllTables: (state, action) => {
      state.tables = action.payload;
    },
    addOneUsedTable: (state, action) => {
      state.usedTable = [...state.usedTable, action.payload];
      localStorage.setItem("usedTable", JSON.stringify(state.usedTable));
    },
    removedOneUsedTable: (state, action) => {
      state.usedTable = state.usedTable.filter(
        (ut) => action.payload !== ut.cusId
      );
      console.log(state.usedTable)
      localStorage.setItem("usedTable", JSON.stringify(state.usedTable));
    },
    orderedUsedTable: (state, action) => {
      const update = state.usedTable.find(ut => ut.cusId === action.payload);
      update.ordered = true;
      const newUsedTable = state.usedTable.filter(ut => ut.cusId !== action.payload);
      state.usedTable = [...newUsedTable, update];
      localStorage.setItem("usedTable", JSON.stringify(state.usedTable));
    }
  },
});

export const {
  updateTables,
  getAllTables,
  addOneUsedTable,
  removedOneUsedTable,
  orderedUsedTable
} = TableSlice.actions;
export default TableSlice.reducer;
