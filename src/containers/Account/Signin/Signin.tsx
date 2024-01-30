'use client';

import React from 'react';
import cns from 'classnames';
import { useForm } from 'react-hook-form';
import { SigninForm, SigninSchema } from './Signin.schema';
import { Props } from './Signin.models';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { toast } from 'react-toastify';

const Signin = (props: Props) => {
  const { className = '' } = props;

  const form = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
    mode: 'onSubmit',
    defaultValues: { username: '', password: '' },
  });

  const router = useRouter();

  const onSigninSubmit = ({ username, password }: SigninForm) => {
    console.log({ username, password });
    if (username === account.username && password === account.password) {
      toast.success('Đăng nhập thành công!')
      router.push('/');
    }
    else toast.error('Sai tên đăng nhập hoặc mật khẩu!')
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSigninSubmit)}
        className={cns('space-y-6 m-auto w-[400px]', className)}
      >
        <p className='font-extrabold text-center text-3xl text-green-500'>
          ĐĂNG NHẬP
        </p>

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input placeholder='Nhập tên đăng nhập...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Mật khẩu</FormLabel>
                <FormLabel>
                  <Link
                    href='/forgot-password'
                    className='text-green-500 hover:text-blue-400 transition-colors duration-150'
                  >
                    Quên mật khẩu?
                  </Link>
                </FormLabel>
              </div>

              <FormControl>
                <Input
                  type='password'
                  placeholder='Nhập mật khẩu...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-green-500 w-full'>
          Đăng nhập
        </Button>

        <p className='text-center'>
          Chưa có tài khoản?{' '}
          <Link
            href='/signup'
            className='text-green-500 hover:text-blue-400 transition-colors duration-150'
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Signin;
