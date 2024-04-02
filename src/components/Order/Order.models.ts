import { PaymentForm } from '@/schemas/payment';
import { DishType } from '@/types/dish';
import { OrderInterface, OrderedDishInterface } from '@/types/order';
import { SetStateAction } from 'react';

export interface Props {
  className?: string;
  isOpen: boolean;
  order: OrderInterface;
  //
  setIsOpen: (value: boolean) => void;
  onConfirmCancelClick: () => void;
  onDeleteClick: (idDish: number) => void;
}

export type EditDishType = {
  className?: string;
  dish: OrderedDishInterface;
  quantity: number;
  allDishes: DishType[]
  //
  calTotalDish: (price: string) => string;
  setQuantity: (value: SetStateAction<number>) => void;
  onEditDishSubmit: (idDish: number) => void;
};

export type AddDishType = {
  className?: string;
  buttonClassName?: string;
  allDishes: DishType[]
};

export type PaymentButtonType = {
  className?: string;
  open: boolean;
  //
  setOpen: (value: boolean) => void;
  onSubmit: (values: PaymentForm) => void;
};
