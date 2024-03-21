import { DishType } from '@/types/dish';

export interface Props {
  className?: string;
  open: boolean;
  selectedCard: DishType;
  amount: string;
  quantity: number;
  //
  setOpen: (value: boolean) => void;
  setQuantity: (value: number) => void;
  onSubmit: () => void;
}
