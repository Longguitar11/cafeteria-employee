import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Props } from './Quantity.models';

const Quantity = (props: Props) => {
  const { className = '', quantity = 1, setQuantity } = props;

  const onSubtractClick = () => {
    if (quantity > 1) setQuantity((pre) => --pre);
  };

  const onAddClick = () => {
    console.log(quantity < 101);
    if (quantity < 101) setQuantity((pre) => ++pre);
  };
  return (
    <div className={cn('grid items-center gap-3 grid-cols-3', className)}>
      <Button
        variant='outline'
        className='text-lg font-semibold'
        onClick={onSubtractClick}
      >
        -
      </Button>
      <span className='text-2xl font-semibold text-center'>{quantity}</span>
      <Button
        variant='outline'
        className='text-lg font-semibold'
        onClick={onAddClick}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
