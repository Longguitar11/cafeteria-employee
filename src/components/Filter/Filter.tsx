import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { categories } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { Props } from './Filter.models';
import { filterOptions } from './Filter.utils';
import { CategoryFilter } from './Filter.views';
import { foodAndDrinks } from '@/constants/foodAndDrinks';

const Filter = (props: Props) => {
  const { className = '', dishes, setDishes } = props;

  const [cateId, setCateId] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const result = filterOptions(foodAndDrinks, { text: searchValue, cateId });

    if (result.toString() !== dishes.toString()) {
      setDishes(result);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, cateId]);

  return (
    <div className={cn('flex gap-3', className)}>
      <Input
        type='text'
        placeholder='Tìm tên món...'
        className='text-base'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <CategoryFilter
        categories={categories}
        cateId={cateId}
        setCateId={setCateId}
      />
    </div>
  );
};

export default Filter;
