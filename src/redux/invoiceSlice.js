import { createSlice } from "@reduxjs/toolkit";

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoice: JSON.parse(localStorage.getItem("invoice")) || null,
  },
  reducers: {
    updateInvoice: (state, action) => {
      state.invoice = action.payload;
      localStorage.setItem("invoice", JSON.stringify(state.invoice));
    },
    removeInvoice: (state) => {
      localStorage.removeItem("invoice");
      state.invoice = null;
    },
  },
});

export const { updateInvoice, removeInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
