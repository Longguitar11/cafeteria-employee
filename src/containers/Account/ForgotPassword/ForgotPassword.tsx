'use client';

import React from 'react';
import cns from 'classnames';
import { useForm } from 'react-hook-form';
import {
  ForgotPasswordForm,
  ForgotPasswordSchema,
} from './ForgotPassword.schema';
import { Props } from './ForgotPassword.models';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { account } from '../../../constants/account';
import { useRouter } from 'next/navigation';

const ForgotPassword = (props: Props) => {
  const { className = '' } = props;

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onSubmit',
    defaultValues: { email: '' },
  });

  const router = useRouter();

  const onForgotPasswordSubmit = ({ email }: ForgotPasswordForm) => {
    console.log({ email });
    if (email === account.email) router.push('/change-password');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onForgotPasswordSubmit)}
        className={cns('space-y-6 m-auto w-[400px]', className)}
      >
        <p className='font-extrabold text-center text-3xl text-green-500'>
          QUÊN MẬT KHẨU
        </p>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                  <FormLabel>Email</FormLabel>
                <FormLabel>
                  <Link
                    href='/signin'
                    className='text-green-500 hover:text-blue-400 transition-colors duration-150'
                  >
                    Quay lại đăng nhập?
                  </Link>
                </FormLabel>
              </div>
              <FormControl>
                <Input placeholder='Nhập email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-green-500 w-full'>
          Xác nhận
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
