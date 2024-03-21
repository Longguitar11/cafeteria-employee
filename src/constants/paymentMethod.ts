import { PaymentMethod } from '@/types/paymentMethod';

export const paymentMethodFilters: {
  label: string;
  value: PaymentMethod | 'ALL';
}[] = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Tiền mặt', value: 'CASH' },
  { label: 'Chuyển khoản', value: 'TRANSFER' },
  { label: 'Thẻ tín dụng', value: 'CREDITCARD' },
];

export const paymentMethods: { label: string; value: PaymentMethod }[] = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Tiền mặt', value: 'CASH' },
  { label: 'Chuyển khoản', value: 'TRANSFER' },
  { label: 'Thẻ tín dụng', value: 'CREDITCARD' },
];
