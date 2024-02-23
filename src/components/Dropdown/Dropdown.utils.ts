import { foodAndDrinks } from '@/constants/foodAndDrinks';

export const calculateProductQuantity = (id: string): string | number => {
  const count = foodAndDrinks.filter((item) => item.idCate === id).length;

  return count > 0 ? count : '';
};
