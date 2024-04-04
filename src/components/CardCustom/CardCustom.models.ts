import { DishType } from '@/types/dish';

export interface Props {
  className?: string;
  thumbnail?: string;
  name: string;
  price?: string;
  status?: boolean;
  numOfDishesPerCate?: number;
  //
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}
