'use client';

import { CardCustom } from '@/components/CardCustom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { Props } from './Category.models';
import { getAllCategories } from '@/apis/category';
import { getAllDishes } from '@/apis/dish';
import { DishType } from '@/types/dish';

const Category = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [allDishes, setAllDishes] = useState<DishType[]>([]);

  const categories = useAppSelector((state) => state.categoryStore.categories);

  // useMemo

  const activatedDishes = useMemo(() => {
    const newDishes = allDishes.filter((dish) => dish.status === 'true');
    return newDishes;
  }, [allDishes]);

  useEffect(() => {
    getAllCategories(dispatch);

    const res = getAllDishes();
    res.then((res) => setAllDishes(res)).catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        TẤT CẢ CÁC LOẠI
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10'>
        {categories.length > 0 ? (
          categories.map((cate) => {
            const { id, name } = cate;
            const numOfDishesPerCate = activatedDishes.filter(
              (dish) => dish.categoryId === id
            ).length;

            console.log({numOfDishesPerCate})

            return (
              <CardCustom
                key={id}
                numOfDishesPerCate={numOfDishesPerCate}
                name={name}
                onClick={() => router.push(`/category/${id}`)}
              />
            );
          })
        ) : (
          <div>Không có loại nào!</div>
        )}
      </div>
    </section>
  );
};

export default Category;
