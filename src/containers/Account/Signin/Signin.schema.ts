import { z } from 'zod';

export const SigninSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Tên đăng nhập phải có ít nhất 4 ký tự!' })
    .max(15, 'Độ dài tên đăng nhập tối đa là 15!'),
  password: z
    .string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
    .max(15, 'Độ dài mật khẩu tối đa là 15!'),
});

export type SigninForm = z.infer<typeof SigninSchema>;
