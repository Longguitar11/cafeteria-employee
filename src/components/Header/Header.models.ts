import { DishType } from '@/types/dish';
import { OrderInterface, OrderedDishInterface } from '@/types/order';
import { SetStateAction } from 'react';

export interface props {
  className?: string;
}

export type Hovered = { header?: boolean; option?: boolean };

export type DropdownHoverType = {
  categories?: Hovered;
  bestSelling?: Hovered;
  account?: Hovered;
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

