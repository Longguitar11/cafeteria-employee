import { CategoryType } from '@/types/category';

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
