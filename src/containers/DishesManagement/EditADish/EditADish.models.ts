import { DishForm } from '@/schemas/dish';
import { DishInterface } from '@/types/dish';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  className?: string;
  selectedDish: DishInterface;
  open: boolean;
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: DishForm) => void;
}
