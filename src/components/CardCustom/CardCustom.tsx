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
import { ImageCustom } from '../ImageCustom';

const CardCustom = (props: Props) => {
  const {
    className = '',
    name,
    price,
    thumbnail,
    numOfDishesPerCate,
    status = true,
    onClick,
  } = props;

  return (
    <Card
      className={cn(
        'border-[0.5px] p-3 relative flex flex-col hover:border-gray-600 transition-colors duration-200',
        !status && 'hidden',
        className
      )}
      onClick={onClick}
    >
      {thumbnail && (
        <CardHeader>
          <div className='relative h-96 sm:h-72'>
            <ImageCustom thumbnail={thumbnail!} />
          </div>
        </CardHeader>
      )}
      <CardContent className='flex-1 flex flex-col justify-between'>
        <CardTitle>
          <span className='text-gray-500'>{name}{' '}</span>
          {numOfDishesPerCate! >= 0 && (
            <span className='text-green-500'>{`(${numOfDishesPerCate})`}</span>
          )}
        </CardTitle>
        {price && <CardDescription>{getValueString(price)}</CardDescription>}
      </CardContent>
    </Card>
  );
};

export default CardCustom;
