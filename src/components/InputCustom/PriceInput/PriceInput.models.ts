import { UseFormReturn } from 'react-hook-form';

export interface Props {
  className?: string;
  form: UseFormReturn<
    {
      name: string;
      price: number;
      stock: number;
      categogy: string;
      thumbnail?: any;
    },
    any,
    undefined
  >;
}
