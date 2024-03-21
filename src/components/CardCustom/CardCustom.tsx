import React from 'react';
import { Props } from './CardCustom.models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { getValueString } from '@/utils/currency';
import { cn } from '@/lib/utils';
import { productNumOfCate } from '@/utils/categories';

const CardCustom = (props: Props) => {
  const {
    className = '',
    id,
    name,
    price,
    category,
    status = true,
    onClick,
  } = props;

  return (
    <Card
      className={cn(
        'border-[1px] p-3 relative hover:border-green-500 transition-colors duration-200',
        !status && 'hidden',
        className
      )}
      onClick={onClick}
    >
      {/* <CardHeader>
        <div className='relative h-96 sm:h-72'>
          <Image
            src={thumbnail}
            alt={alt || 'thumbnail'}
            fill
            priority
            className='rounded-tl rounded-tr'
          />
        </div>
      </CardHeader> */}
      <CardContent>
        <CardTitle>
          {name}{' '}
          <span className='text-green-500'>
            {productNumOfCate(id!) ? `(${productNumOfCate(id!)})` : ''}
          </span>
        </CardTitle>
        {price && <CardDescription>{getValueString(price)}</CardDescription>}
      </CardContent>
      {category && (
        <span className='absolute bottom-0 right-0 bg-green-500 text-white rounded-br-lg rounded-tl-lg p-2'>
          {category}
        </span>
      )}
    </Card>
  );
};

export default CardCustom;
