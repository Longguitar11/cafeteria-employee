'use client';

import { CardCustom } from '@/components/CardCustom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Props } from './Category.models';
import { getAllCategories } from '@/apis/category';

const Category = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const categories = useAppSelector((state) => state.categoryStore.categories);

  useEffect(() => {
    getAllCategories(dispatch);
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
            return (
              <CardCustom
                key={id}
                id={id}
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
