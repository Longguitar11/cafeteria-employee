import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import Image from 'next/image';
import { CategorySelect } from '../CategorySelect';
import { PriceInput } from '../InputCustom';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { DishForm, DishSchema } from '@/schemas/dish';
import { zodResolver } from '@hookform/resolvers/zod';

const DishForm = (props: Props) => {
    const { className = '', open, setOpen, onSubmit } = props;

  const [image, setImage] = useState<File | null>(null);

  console.log({ image });
  const form = useForm<DishForm>({
    resolver: zodResolver(DishSchema),
    // mode: 'o',
    defaultValues: {
      name: '',
      price: 12000,
      categogy: '',
      stock: 1,
      thumbnail: '',
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('min-w-[500px]', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>TẠO MÓN</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className={cn('space-y-2', className)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên món</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên món ăn...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='thumbnail'
              render={({ field: { name, ref, onBlur, onChange } }) => (
                <FormItem>
                  <FormLabel>Ảnh nền</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      placeholder='Chọn ảnh nền cho món...'
                      ref={ref}
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                        setImage(e.target.files?.[0] || null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {image && (
              <div className='md:max-w-[200px]'>
                <Image
                  src={URL.createObjectURL(image)}
                  alt='selected image'
                  width={60}
                  height={60}
                />
              </div>
            )}

            <CategorySelect form={form} />

            <PriceInput form={form} />

            <FormField
              control={control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng hàng trong kho</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='1'
                      max='1000'
                      placeholder='Nhập số lượng hàng trong kho...'
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={onStockBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between'>
              <Button variant='destructive' onClick={(e) => onResetClick(e)}>
                Reset
              </Button>
              <div className='flex gap-3'>
                <DialogClose asChild>
                  <Button variant='secondary'>Hủy bỏ</Button>
                </DialogClose>

                <Button variant='primary' type='submit'>
                  Tạo
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DishForm;
