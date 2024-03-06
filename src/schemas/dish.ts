import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const DishSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên món!'),
  thumbnail: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `Kích cỡ ảnh tối đa là 5MB!`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      'Chỉ hỗ trợ những định dạng sau đây (.jpg, .jpeg, .png .webp).'
    ),
  price: z
    .number()
    .min(12000, 'Giá bán thấp nhất là 12.000đ!')
    .max(100000, 'Giá bán cao nhất là 100.000đ!'),
  stock: z
    .number()
    .min(1, 'Số lượng hàng tồn kho phải lớn hơn 0!')
    .max(1000, 'Số lượng hàng tồn kho không được quá 1000!'),
  categogy: z.string().min(1, 'Vui lòng chọn loại!'),
});

export type DishForm = z.infer<typeof DishSchema>;
