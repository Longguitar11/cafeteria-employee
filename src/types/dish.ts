import { SizeType } from './size';

export type DishDetailsType = {
  size?: SizeType;
  quantity: number;
  totalValue: string;
};

export interface DishInterface {
  idDish: string;
  idCate: string;
  name: string;
  thumbnail: string;
  quantity: number;
  price: string;
  total?: string;
}
