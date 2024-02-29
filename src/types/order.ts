import { DishInterface } from './dish';

export interface OrderInterface {
  idOrder: string;
  dishes: DishInterface[];
  amount?: string;
}
