import { DishType } from '@/types/dish';
import { OrderedDishInterface } from '@/types/order';

// export const calTotal = (details: DishDetailsType[]) => {
//   let calTotal = 0;

//   for (let detail of details) {
//     calTotal += parseInt(detail.price) * detail.quantity;
//   }

//   return calTotal.toString();
// };

export const calAmount = (dishes: OrderedDishInterface[]) => {
  let calAmount = 0;

  for (let dish of dishes) {
    if (dish.total) calAmount += dish.total;
  }

  return calAmount;
};

export const addString = (numbers: string[]) => {
  let result = 0;
  for (const num of numbers) {
    result += parseInt(num);
  }

  console.log(result.toString());
  return result.toString();
};

export const getDishById = (dishes: DishType[], id: number) => {
  const currentDish = dishes.find((dish) => dish.id === id);

  if (currentDish) return currentDish;
  return null;
};
