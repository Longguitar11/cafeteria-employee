import { SizeType } from './size';

export type DishDetailsType = {
  size?: SizeType;
  quantity: number;
  price: string;
};

export interface DishInterface {
  idDish: string;
  name: string;
  thumbnail: string;
  details: DishDetailsType[];
  total: string;
}
