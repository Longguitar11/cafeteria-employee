import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Props } from './Quantity.models';

const Quantity = (props: Props) => {
  const { className = '', quantity = 1, setQuantity } = props;

  const onSubtractClick = () => {
    let result = quantity - 1;
    if (quantity > 1) setQuantity(result);
  };

  const onAddClick = () => {
    let result = quantity + 1;
    if (quantity < 101) setQuantity(result);
  };
  return (
    <div className={cn('grid items-center gap-3 grid-cols-3', className)}>
      <Button
        variant='destructive'
        className='text-2xl font-semibold'
        onClick={onSubtractClick}
      >
        -
      </Button>
      <span className='text-2xl h-full font-semibold text-center'>{quantity}</span>
      <Button
        variant='primary'
        className='text-2xl font-semibold'
        onClick={onAddClick}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
