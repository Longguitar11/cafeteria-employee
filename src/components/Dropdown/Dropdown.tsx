import React from 'react';
import cns from 'classnames';
import { DropdownType } from '@/types/dropdown';
import { calculateProductQuantity } from './Dropdown.utils';

const Dropdown = (props: DropdownType) => {
  const { className = '', data, onClick, onMouseLeave, onMouseOver } = props;
  return (
    <div className={cns('absolute shadow bg-gray-50 rounded w-fit', className)}>
      {data.map((item, index) => {
        const quantity = calculateProductQuantity(item.id)
          ? `(${calculateProductQuantity(item.id)})`
          : '';
        return (
          <div
            key={index}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={() => onClick(item.id)}
            className={cns(
              'cursor-pointer p-3 text-gray-800 hover:bg-white transition-all duration-200',
              index === data.length - 1 && 'rounded-bl rounded-br',
              index === 0 && 'rounded-tl rounded-tr'
            )}
          >
            {item.name} <span className='text-red-500'>{quantity}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
