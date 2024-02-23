import { sizes } from '@/constants/sizes';
import React from 'react';
import { Props } from './Size.models';
import { cn } from '@/lib/utils';
import { getValueString } from '@/utils/currency';

const Size = (props: Props) => {
  const { className = '', value = 'S', onClick } = props;

  return (
    <div className={cn('flex gap-3 justify-between', className)}>
      {sizes.map((item) => {
        const { id, desc, price, size } = item;

        return (
          <div
            key={id}
            className={cn(
              'relative rounded-md cursor-pointer flex-1 text-center py-2 border-[0.5px] border-gray-300 hover:border-green-500 transition-colors duration-200',
              item.size === value && 'border-green-500'
            )}
            onClick={() => onClick({size: size, price: price})}
          >
            <span>{desc}</span>
            <span className='text-xs text-green-500 absolute right-2 bottom-0'>
              +{getValueString(price)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Size;
