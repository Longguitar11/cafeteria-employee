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
  thumbnail: any;
  quantity: number;
  price: string;
  category?: string;
  total?: string;
}
