import { CategoryType } from '@/types/category';
import { DishType } from '@/types/dish';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  dishes: DishType[],
  options: { text?: string; cateId?: number }
): DishType[] => {
  const { text = '', cateId } = options;

  let categories: CategoryType[] = [];

  if (typeof window !== undefined)
    categories = JSON.parse(localStorage.getItem('categories') || '[]');

  if (text === '' && !cateId) {
    return dishes;
  } else if (text !== '' && !cateId) {
    const textLowercase = escapeText(text).toLowerCase();
    return filter(dishes, (o) => {
      const label = escapeText(o.name).toLowerCase();

      return (
        isEqual(label, text) ||
        label.includes(textLowercase) ||
        isEqual(o.name, text)
      );
    });
  } else if (text === '' && cateId) {
    const cate = categories.find((cate) => cate.id === cateId);

    if (cate) {
      const foundDishes = dishes.filter((dish) => dish.categoryId === cateId);
      return foundDishes;
    }

    return [];
  } else {
    const cate = categories.find((cate) => cate.id === cateId);

    if (cate) {
      const foundDishes = dishes.filter((dish) => dish.categoryId === cateId);

      const textLowercase = escapeText(text).toLowerCase();

      return filter(foundDishes, (o) => {
        const label = escapeText(o.name).toLowerCase();

        return (
          isEqual(label, text) ||
          label.includes(textLowercase) ||
          isEqual(o.name, text)
        );
      });
    }

    return [];
  }
};
