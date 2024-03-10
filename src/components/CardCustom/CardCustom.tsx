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

const CardCustom = (props: Props) => {
  const {
    className = '',
    name,
    price = '10000',
    status = true,
    onClick,
  } = props;

  return (
    <Card className={cn(!status && 'hidden', className)} onClick={onClick}>
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
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {getValueString(price || '10000')}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardCustom;
