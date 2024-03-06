import { DishForm } from '@/schemas/dish';
import {
  Dispatch,
  SetStateAction,
} from 'react';

export interface Props {
  className?: string;
  open: boolean;
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (value: DishForm) => void;
}
