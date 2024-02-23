import React from 'react';
import { Props } from './CardCustom.models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Image from 'next/image';
import { getValueString } from '@/utils/currency';

const CardCustom = (props: Props) => {
  const { className = '', thumbnail, name, price, alt, onClick } = props;
  return (
    <Card className={className} onClick={onClick}>
      <CardHeader>
        <div className='relative h-96 sm:h-72'>
          <Image
            src={thumbnail}
            alt={alt || 'thumbnail'}
            fill
            priority
            className='rounded-tl rounded-tr'
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{getValueString(price)}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardCustom;
