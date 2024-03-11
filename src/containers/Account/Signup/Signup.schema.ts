import { phoneRegex } from '@/constants/phoneRegex';
import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const SignupSchema = z
  .object({
    email: z.string().email('Vui lòng nhập đúng định dạng email!'),
    contactNumber: z
      .string()
      .min(10, 'SĐT phải chứa 10 số!')
      .max(10, 'SĐT phải chứa 10 số!')
      .superRefine((val, ctx) => {
        if (!phoneRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Sai định dạng số điện thoại!',
          });
        }
      }),
    name: z
      .string()
      .min(4, { message: 'Tên phải có ít nhất 4 ký tự!' })
      .max(15, 'Độ dài tên tối đa là 15!'),
    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(15, 'Độ dài mật khẩu tối đa là 15!')
      .regex(passwordValidation, {
        message:
          'Mật khẩu phải bao gồm 1 ký tự hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt!',
      }),
    confirm: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(15, 'Độ dài mật khẩu tối đa là 15!'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Mật khẩu không trùng khớp với nhau!',
    path: ['confirm'],
  });

// SignupSchema.parse({phoneNumber: '0396714802'})

export type SignupForm = z.infer<typeof SignupSchema>;
