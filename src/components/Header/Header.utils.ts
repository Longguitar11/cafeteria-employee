import { foodAndDrinks } from "@/constants/foodAndDrinks"

export const calculateProductQuantity = (id: number): number | string => {
    const count = foodAndDrinks.filter((item) => item.idCate === id).length;

    return count > 0 ? count : '';
}