import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Props } from './ImageCustom.models';
import { cn } from '@/lib/utils';
import { decodeBase64String } from '@/utils/image';

const ImageCustom = (props: Props) => {
  const { className = '', thumbnail } = props;

  const [imageUrl, setImageUrl] = useState<string>('/images/milk-coffee.jpg');

  useEffect(() => {
    if (thumbnail) {
      const byteArray = decodeBase64String(thumbnail);
      if (byteArray) {
        createImageFromByteArray(byteArray);
      }
    }
  }, [thumbnail]);

  const createImageFromByteArray = (byteArray: Uint8Array) => {
    const blob = new Blob([byteArray], {
      type: 'image/jpeg, image/jpg, image/png, image/webp, image/jfif,',
    });
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
  };

  return (
    <div className={cn('relative w-full h-full', className)}>
      <Image src={imageUrl} alt='thumbnail' fill />
    </div>
  );
};

export default ImageCustom;
