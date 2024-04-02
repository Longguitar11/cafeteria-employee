export interface OrderedDishInterface {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  thumbnail?: string;
}

export interface OrderInterface {
  name: string;
  contactNumber: string;
  email: string;
  paymentMethod: string;
  productDetail: OrderedDishInterface[];
  totalAmount: number;
}

export interface BillInterface {
  id: number;
  uuid: string;
  createdBy: string;
  name: string;
  contactNumber: string;
  email: string;
  paymentMethod: string;
  productDetail: string;
  total: number;
  createdAt: string
}
