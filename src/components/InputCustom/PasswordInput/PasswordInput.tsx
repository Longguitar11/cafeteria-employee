import React, { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Props } from './PasswordInput.models';
import Image from 'next/image';

const PasswordInput = (props: Props) => {
  const { className, control, name, label, placeholder } = props;

  const [isHide, setIsHide] = useState<boolean>(true);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label || 'Mật khẩu'}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                type={isHide ? 'password' : 'text'}
                placeholder={placeholder || 'Nhập mật khẩu...'}
                {...field}
              />
              <div
                className='absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer'
                onClick={() => setIsHide((pre) => !pre)}
              >
                {isHide ? (
                  <Image
                    src='/images/show-eye.png'
                    alt='show pw icon'
                    fill
                    sizes='28px'
                  />
                ) : (
                  <Image
                    src='/images/hide-eye.png'
                    alt='hide pw icon'
                    fill
                    sizes='28px'
                  />
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
