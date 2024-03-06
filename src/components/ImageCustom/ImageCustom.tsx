import Image from 'next/image';
import React from 'react';
import { Props } from './ImageCustom.models';
import { cn } from '@/lib/utils';

const ImageCustom = (props: Props) => {
    const { className = '', thumbnail } = props;
  return (
    <div className={cn('relative w-14 h-14', className)}>
      <Image src={URL.createObjectURL(thumbnail)} alt='thumbnail' fill />
    </div>
  );
};

export default ImageCustom;
