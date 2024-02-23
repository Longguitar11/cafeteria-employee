import { DishDetailsType, DishInterface } from '@/types/dish';

export const calTotal = (details: DishDetailsType[]) => {
  let calTotal = 0;

  for (let detail of details) {
    calTotal += parseInt(detail.price) * detail.quantity;
  }

  return calTotal.toString();
};

export const calAmount = (dishes: DishInterface[]) => {
  let calAmount = 0;

  for (let dish of dishes) {
    calAmount += parseInt(dish.total);
  }

  return calAmount.toString();
};

export const calString = (
  numbers: string[],
  operator?: '+' | '-' | '*' | '/'
) => {
  if (operator === '+' || operator === '-') {
    let result = 0;
    for (const num of numbers) {
      if (operator === '+') result += parseInt(num);

      if (operator === '-') result -= parseInt(num);
    }
    return result.toString();
  } else {
    let result = 1;
    for (const num of numbers) {
      if (operator === '*') result *= parseInt(num);

      if (operator === '/') result /= parseInt(num);
    }
    return result.toString();
  }
};
