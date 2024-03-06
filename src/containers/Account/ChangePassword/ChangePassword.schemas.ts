import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(15, 'Độ dài mật khẩu tối đa là 15!'),
    newPassword: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
      .max(15, 'Độ dài mật khẩu tối đa là 15!')
      .regex(passwordValidation, {
        message:
          'Mật khẩu phải bao gồm 1 ký tự hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt!',
      }),
  })
  .refine(({ oldPassword, newPassword }) => newPassword !== oldPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ!',
    path: ['newPassword'],
  });

export type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>;
