import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownType } from '@/types/dropdown';

const Dropdown = (props: DropdownType) => {
  const { className = '', data, onClick, onMouseLeave, onMouseOver } = props;

  return (
    <div
      className={cn(
        'absolute shadow bg-gray-50 rounded min-w-full w-fit',
        className
      )}
    >
      {data.map((item, index) => (
        <div
          key={index}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={() => {
            item.url ? onClick(item.url) : onClick(item.id);
          }}
          className={cn(
            'cursor-pointer p-3 text-gray-800 hover:bg-white transition-all duration-200',
            index === data.length - 1 && 'rounded-bl rounded-br',
            index === 0 && 'rounded-tl rounded-tr'
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
