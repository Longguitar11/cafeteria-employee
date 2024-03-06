import { z } from 'zod';

const phoneRegex = new RegExp(
  /^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/
);

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const SignupSchema = z
  .object({
    email: z.string().email('Vui lòng nhập đúng định dạng email!'),
    phoneNumber: z
      .string()
      .min(10, 'SĐT phải chứa 10 số!')
      .max(10, 'SĐT phải chứa 10 số!')
      .superRefine((val, ctx) => {
        // if (val.length < 10) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.too_small,
        //     minimum: 10,
        //     message: 'SĐT phải chứa 10 số!',
        //     inclusive: true,
        //     type: 'string',
        //     fatal: true,
        //   });
        // }
        // if (val.length > 10) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.too_big,
        //     maximum: 10,
        //     message: 'SĐT phải chứa 10 số!',
        //     inclusive: true,
        //     type: 'string',
        //     fatal: true,
        //   });
        // }

        if (!phoneRegex.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Sai định dạng số điện thoại!',
          });
        }
      }),
    username: z
      .string()
      .min(4, { message: 'Tên đăng nhập phải có ít nhất 4 ký tự!' })
      .max(15, 'Độ dài tên đăng nhập tối đa là 15!'),
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
