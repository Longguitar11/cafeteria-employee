'use client';

import React from 'react';
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
import { signup } from '@/apis/user';
import { isBoolean } from 'lodash';
import { error } from 'console';
import { cn } from '@/lib/utils';
import { PasswordInput } from '@/components/InputCustom';

const Signup = (props: Props) => {
  const { className = '' } = props;

  const router = useRouter();

  const form = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirm: '',
    },
  });

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = form;

  const onSignupSubmit = ({
    email,
    phoneNumber,
    username,
    password,
  }: SignupForm) => {
    console.log({ email, phoneNumber, username, password });
    if (isValid) {
      const res = signup({
        email,
        name: username,
        contactNumber: phoneNumber,
        password,
      });

      res
        .then((res) => {
          if (res) router.replace('/signin');
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSignupSubmit)}
        className={cn('space-y-2 m-auto w-[400px]', className)}
      >
        <p className='font-extrabold text-center text-3xl text-green-500'>
          ĐĂNG KÝ
        </p>

        <FormField
          control={control}
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
          control={control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder='Nhập số điện thoại...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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

        <PasswordInput control={control} name='password' />

        <PasswordInput
          control={control}
          name='confirm'
          label='Xác nhận mật khẩu'
          placeholder='Nhập lại mật khẩu...'
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
