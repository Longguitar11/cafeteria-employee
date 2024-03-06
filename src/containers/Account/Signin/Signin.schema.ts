import { z } from 'zod';

export const SigninSchema = z.object({
  email: z.string().email('Vui lòng nhập đúng định dạng email!'),
  password: z
    .string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
    .max(15, 'Độ dài mật khẩu tối đa là 15!'),
});

export type SigninForm = z.infer<typeof SigninSchema>;
