'use client';

import React from 'react';
import cns from 'classnames';
import { useForm } from 'react-hook-form';
import { SignupForm, SignupSchema } from './Signup.schema';
import { Props } from './Signup.models';
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
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Signup = (props: Props) => {
  const { className = '' } = props;

  const router = useRouter();

  const form = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    mode: 'onSubmit',
    defaultValues: { email: '', username: '', password: '', confirm: '' },
  });

  const onSignupSubmit = ({
    email,
    username,
    password,
    confirm,
  }: SignupForm) => {
    console.log({ email, username, password, confirm });
    console.log('error: ', form.formState.errors);
    if (Object.keys(form.formState.errors).length === 0) {
      toast.success('Đăng ký thành công!');
    }
    router.push('/signin');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSignupSubmit)}
        className={cns('space-y-6 m-auto w-[400px]', className)}
      >
        <p className='font-extrabold text-center text-3xl text-green-500'>
          ĐĂNG KÝ
        </p>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Nhập email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel>Mật khẩu</FormLabel>
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

        <FormField
          control={form.control}
          name='confirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Nhập lại mật khẩu...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-green-500 w-full'>
          Đăng ký
        </Button>

        <p className='text-center'>
          Đã có tài khoản?{' '}
          <Link
            href='/signin'
            className='text-green-500 hover:text-blue-400 transition-colors duration-150'
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Signup;
