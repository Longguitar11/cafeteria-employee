import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Vui lòng nhập đúng định dạng email!'),
});

export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;
