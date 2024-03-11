import { DishType } from '@/types/dish';

export interface Props {
  className?: string;
  // thumbnail?: string;
  // alt?: string;
  id?: number;
  name: string;
  price?: string;
  status?: boolean;
  //
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}
