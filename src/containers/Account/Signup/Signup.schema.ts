import { z } from 'zod';

export const SignupSchema = z
  .object({
    email: z
      .string()
      .email('Vui lòng nhập đúng định dạng email!'),
    username: z
      .string()
      .min(4, { message: 'Tên đăng nhập phải có ít nhất 4 ký tự!' })
      .max(15, 'Độ dài tên đăng nhập tối đa là 15!'),
    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(15, 'Độ dài mật khẩu tối đa là 15!'),
    confirm: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(15, 'Độ dài mật khẩu tối đa là 15!'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Mật khẩu không trùng khớp với nhau!',
    path: ['confirm']
  });

export type SignupForm = z.infer<typeof SignupSchema>;
