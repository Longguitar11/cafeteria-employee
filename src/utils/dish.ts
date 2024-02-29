import { DishDetailsType, DishInterface } from '@/types/dish';

// export const calTotal = (details: DishDetailsType[]) => {
//   let calTotal = 0;

//   for (let detail of details) {
//     calTotal += parseInt(detail.price) * detail.quantity;
//   }

//   return calTotal.toString();
// };

export const calAmount = (dishes: DishInterface[]) => {
  let calAmount = 0;

  for (let dish of dishes) {
    if (dish.total) calAmount += parseInt(dish.total);
  }

  return calAmount.toString();
};

export const addString = (numbers: string[]) => {
  let result = 0;
  for (const num of numbers) {
    result += parseInt(num);
  }

  console.log(result.toString());
  return result.toString();
};
