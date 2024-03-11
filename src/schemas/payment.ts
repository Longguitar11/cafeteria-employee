import { phoneRegex } from '@/constants/phoneRegex';
import { z } from 'zod';

export const PaymentSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên khách hàng!'),
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
  paymentMethod: z.enum(['CASH','TRANSFER']),
});

export type PaymentForm = z.infer<typeof PaymentSchema>;
