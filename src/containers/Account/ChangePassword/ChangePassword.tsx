'use client';

import React from 'react';
import { Props } from './ChangePassword.models';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordForm,
  ChangePasswordSchema,
} from './ChangePassword.schemas';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { changePassword } from '@/apis/user';

const ChangePassword = (props: Props) => {
  const { className = '' } = props;

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onSubmit',
    defaultValues: { oldPassword: '', newPassword: '' },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const router = useRouter();

  const onSigninSubmit = ({ oldPassword, newPassword }: ChangePasswordForm) => {
    if (isValid) {
      console.log({ oldPassword, newPassword });
      const res = changePassword({ oldPassword, newPassword });

      res
        .then((res) => {
          if (res) router.replace('/signin');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSigninSubmit)}
        className={cn('space-y-6 m-auto w-[400px]', className)}
      >
        <p className='font-extrabold text-center text-3xl text-green-500'>
          ĐỔI MẬT KHẨU
        </p>

        <FormField
          control={control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Nhập mật khẩu cũ...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Nhập mật khẩu mới...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-3'>
          <Button variant='outline' className='flex-1'>
            <Link href='/'>Quay lại trang chủ</Link>
          </Button>
          <Button variant='success' type='submit' className='flex-1'>
            Xác nhận
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;
