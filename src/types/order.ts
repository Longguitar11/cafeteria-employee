export interface OrderedDishInterface {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderInterface {
  name: string;
  contactNumber: string;
  email: string;
  paymentMethod: string;
  productDetail: OrderedDishInterface[];
  totalAmount: number;
}


