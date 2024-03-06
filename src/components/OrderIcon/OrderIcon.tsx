import Image from 'next/image';
import React from 'react';
import { Props } from './OrderIcon.models';
import { cn } from '@/lib/utils';

const OrderIcon = (props: Props) => {
  const { className = '', quantity, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-full hover:opacity-80 transition-opacity duration-200 bg-white p-2 cursor-pointer shadow',
        className
      )}
    >
      <div className='relative w-6 h-6'>
        <Image src='/images/order-icon.png' alt='order icon' fill sizes='24px' />
      </div>
      {quantity > 0 && (
        <div className='absolute h-5 w-5 -bottom-1 -right-1 flex bg-green-500 rounded-full shadow'>
          <span className='text-white font-medium text-xs m-auto'>
            {quantity}
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderIcon;
