import Axios from "../configAxios"
import { getAllCategories } from "../categorySlice"

export const getCategories = async (dispatch) => {
    const res = await Axios.get('/api/category')
    dispatch(getAllCategories(res.data.data.categories))
}