import { DishType } from '@/types/dish';
import { OrderedDishInterface } from '@/types/order';

export const calAmount = (dishes: OrderedDishInterface[]) => {
  let calAmount = 0;

  for (let dish of dishes) {
    if (dish.total) calAmount += dish.total;
  }

  return calAmount;
};

export const getDishById = (dishes: DishType[], id: number) => {
  const currentDish = dishes.find((dish) => dish.id === id);

  if (currentDish) return currentDish;
  return null;
};

export const storeCategoryIds = (allDishes: DishType[]) => {
  const dishList = allDishes.filter((dish) => dish.status === 'true');
  const categoryIds: number[] = [];
  for (const dish of dishList) {
    if (!categoryIds.includes(dish.categoryId))
      categoryIds.push(dish.categoryId);
  }
  localStorage.setItem('categoryIds', JSON.stringify(categoryIds));
};
