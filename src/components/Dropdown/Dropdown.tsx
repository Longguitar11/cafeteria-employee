import React, { useEffect } from 'react';
import { DropdownType } from '@/types/dropdown';
import { calculateProductQuantity } from './Dropdown.utils';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const Dropdown = (props: DropdownType) => {
  const {
    className = '',
    data,
    onClick,
    onMouseLeave,
    onMouseOver,
  } = props;

  return (
    <div className={cn('absolute shadow bg-gray-50 rounded w-fit', className)}>
      {data.map((item, index) => (
        <div
          key={index}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={() => {
              item.url ?  
               onClick(item.url)
              : onClick(item.id)
          }}
          className={cn(
            'cursor-pointer p-3 text-gray-800 hover:bg-white transition-all duration-200',
            index === data.length - 1 && 'rounded-bl rounded-br',
            index === 0 && 'rounded-tl rounded-tr'
          )}
        >
          {item.label}{' '}
          {item.url ? (
            ''
          ) : (
            <span className='text-red-500'>
              {calculateProductQuantity(item.id)
                ? `(${calculateProductQuantity(item.id)})`
                : '(0)'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
