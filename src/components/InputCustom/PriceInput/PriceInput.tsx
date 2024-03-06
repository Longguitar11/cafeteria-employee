'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Props } from './PriceInput.models';
import { getValueString } from '@/utils/currency';

const PriceInput = (props: Props) => {
  const { className = '', form } = props;

  const { control, getValues, setValue, resetField } = form;
  const [isFocusing, setIsFocusing] = useState<boolean>(false);

  const priceType = isFocusing ? 'number' : 'text';

  const onPriceInputBlur = () => {
    setIsFocusing(false);

    if (getValues('price') < 12000 || Number.isNaN(getValues('price')))
      resetField("price");
  };

  return (
    <FormField
      control={control}
      name='price'
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel>Giá bán</FormLabel>
          <FormControl>
            <Input
              className={className}
              type={priceType}
              min='12000'
              max='50000'
              placeholder='Nhập giá bán...'
              value={isFocusing ? value : getValueString(value.toString())}
              onBlur={onPriceInputBlur}
              onFocus={() => setIsFocusing(true)}
              onChange={(e) => onChange(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceInput;
