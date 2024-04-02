import { DishType } from '@/types/dish';

export interface Props {
  className?: string;
  thumbnail?: string;
  id?: number;
  name: string;
  price?: string;
  status?: boolean;
  // category?: string;
  //
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}
