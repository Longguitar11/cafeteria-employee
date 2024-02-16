import { categories } from '@/constants/categories';
import React from 'react';
import cns from 'classnames';
import { calculateProductQuantity } from './Header.utils';

export const Dropdown = (props: {
  className?: string;
  setIsHover: (value: boolean) => void;
}) => {
  const { className, setIsHover } = props;
  return (
    <div
      className={cns(
        'absolute bg-yellow-100 bg-opacity-90 rounded w-fit',
        className
      )}
    >
      {categories.map((item, index) => {
        const quantity = calculateProductQuantity(item.id)
          ? `(${calculateProductQuantity(item.id)})`
          : '';
        return (
          <div
            key={index}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => setIsHover(false)}
            className='cursor-pointer p-3 text-gray-600 hover:text-red-400'
          >
            {item.name} {quantity}
          </div>
        );
      })}
    </div>
  );
};
