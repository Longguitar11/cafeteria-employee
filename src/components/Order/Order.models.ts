import { OrderInterface, OrderedDishInterface } from '@/types/order';
import { SetStateAction } from 'react';

export interface Props {
  className?: string;
  isOpen: boolean;
  order: OrderInterface;
  //
  setIsOpen: (value: boolean) => void;
  onConfirmCancelClick: () => void;
  onPayClick: () => void;
  onDeleteClick: (idDish: number) => void;
}

export type EditDishType = {
  className?: string;
  dish: OrderedDishInterface;
  quantity: number;
  //
  calTotalDish: (price: string) => string;
  setQuantity: (value: SetStateAction<number>) => void;
  onEditDishSubmit: (idDish: number) => void;
};

export type AddDishType = {
  className?: string;
  buttonClassName?: string;
};
