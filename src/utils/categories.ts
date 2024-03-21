import { CategoryType } from '@/types/category';
import { DishType } from '@/types/dish';

export const categoriesDropdownData = (categories: CategoryType[]) => {
  const data = categories.map((cate) => ({
    id: cate.id.toString(),
    label: cate.name,
    url: `/category/${cate.id}`,
  }));

  return data;
};

export const getCategoryById = (categories: CategoryType[], id: number) => {
  const currentCategory = categories.find((cate) => cate.id === id);

  if (currentCategory) return currentCategory;
  return null;
};

export const productNumOfCate = (id: number) => {
  if (typeof window !== undefined) {
    const dishes: DishType[] = JSON.parse(
      localStorage.getItem('allDishes') || '[]'
    );
    const numOfProPerCate = dishes.filter(
      (dish) => dish.categoryId === id && dish.status === 'true'
    ).length;

    return numOfProPerCate;
  }
};
