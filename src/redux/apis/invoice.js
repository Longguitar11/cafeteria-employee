import Axios from "../configAxios"
import { updateInvoice } from "../invoiceSlice";

export const createInvoice = async (cusId, openAt, dispatch) => {
    const res = await Axios.post('/api/invoice/', {cusId, openAt});
    console.log(res.data.data.invoice);
    dispatch(updateInvoice(res.data.data.invoice))
}

// export const getInvoice = async (idInvoice, dispatch) => {
//     const res = await Axios.get('/api/invoice/', {id: idInvoice});
//     console.log(res.data.data.invoice);
//     dispatch(updateInvoice(res.data.data.invoice))
// }