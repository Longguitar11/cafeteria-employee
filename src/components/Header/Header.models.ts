import { DishInterface } from '@/types/dish';
import { OrderInterface } from '@/types/order';
import { MouseEventHandler, SetStateAction } from 'react';

export interface props {
  className?: string;
}

export type Hovered = { header?: boolean; option?: boolean };

export type DropdownHoverType = {
  categories?: Hovered;
  bestSelling?: Hovered;
  account?: Hovered;
};

export type OrderModalType = {
  className?: string;
  isOpen: boolean;
  order: OrderInterface;
  //
  setIsOpen: (value: boolean) => void;
  onConfirmCancelClick: () => void;
  onPayClick: () => void;
  onDeleteClick: ({
    idDish,
    idCate,
  }: {
    idDish: string;
    idCate: string;
  }) => void;
};

export type OptionsType = {
  className?: string;
  isOpen: boolean;
  isHover: DropdownHoverType;
  //
  setIsOpen: (value: boolean) => void;
  setIsHover: (value: DropdownHoverType) => void;
  onCategoryClick: (id: string) => void;
};

export type EditDishType = {
  className?: string;
  dish: DishInterface;
  quantity: number;
  //
  calTotalDish: (price: string) => string;
  setQuantity: (value: SetStateAction<number>) => void;
  onEditDishSubmit: (idDish: string) => void;
};

export type AddDishType = {
  className?: string
  
}
