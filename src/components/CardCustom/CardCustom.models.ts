import { DishType } from "@/types/dish";

export interface Props {
  className?: string;
  // thumbnail?: string;
  // alt?: string;
  name: string
  price: string
  status: boolean
  //
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}
