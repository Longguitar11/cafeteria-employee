import { categories } from '@/constants/categories';
import { foodAndDrinks } from '@/constants/foodAndDrinks';
import { DishInterface } from '@/types/dish';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  dishes: DishInterface[],
  options: { text?: string; cateId?: string }
): DishInterface[] => {
  const { text = '', cateId } = options;

  if (text === '' && cateId === '') {
    return dishes;
  } else if (text !== '' && cateId === '') {
    const textLowercase = escapeText(text).toLowerCase();
    return filter(dishes, (o) => {
      const label = escapeText(o.name).toLowerCase();

      return (
        isEqual(label, text) ||
        label.includes(textLowercase) ||
        isEqual(o.name, text)
      );
    });
  } else if (text === '' && cateId !== '') {

    const cate = categories.find((cate) => cate.id === cateId);

    if (cate) {
      const foundDishes = foodAndDrinks.filter(
        (dish) => dish.idCate === cateId
      );
      return foundDishes;
    }

    return [];
  } else {

    const cate = categories.find((cate) => cate.id === cateId);

    if (cate) {
      const foundDishes = foodAndDrinks.filter(
        (dish) => dish.idCate === cateId
      );

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
