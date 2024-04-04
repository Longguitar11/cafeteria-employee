import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../ui/input';
import isEqual from 'lodash/isEqual';
import { cn } from '@/lib/utils';
import { Props } from './DishFilter.models';
import { filterOptions } from './DishFilter.utils';
import { CategoryFilter } from './DishFilter.views';

const DishFilter = (props: Props) => {
  const { className = '', dishes, allDishes, setDishes } = props;

  const [cateId, setCateId] = useState<number | null>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const timerUpdateSearchText = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerUpdateSearchText.current !== null)
      clearTimeout(timerUpdateSearchText.current);

    timerUpdateSearchText.current = setTimeout(() => {
      const result = filterOptions(allDishes, {
        text: searchValue,
        cateId: cateId!,
      });

      if (!isEqual(result, dishes)) {
        setDishes(result);
      }
    }, 800);

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

      <CategoryFilter cateId={cateId} setCateId={setCateId} />
    </div>
  );
};

export default DishFilter;
